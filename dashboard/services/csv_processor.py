"""
Processador de arquivos CSV otimizado com boas práticas
"""

import csv
import re
import logging
from typing import Dict, List, Tuple, Optional
from django.core.exceptions import ValidationError
from django.db import transaction
from django.utils import timezone

from ..models import Escola, Turma, Aluno, Disciplina, Questao, Resposta

logger = logging.getLogger(__name__)


class CSVProcessor:
    """
    Classe responsável pelo processamento de arquivos CSV
    com validação e tratamento de erros
    """
    
    def __init__(self):
        self.max_file_size = 5 * 1024 * 1024  # 5MB
        self.allowed_encodings = ['utf-8', 'latin-1', 'cp1252']
        self.errors = []
        self.processed_lines = 0
    
    def process_file(self, csv_file) -> Dict:
        """
        Processa o arquivo CSV principal
        
        Args:
            csv_file: Arquivo CSV enviado
            
        Returns:
            Dict com resultado do processamento
        """
        try:
            # Validações iniciais
            validation_result = self._validate_file(csv_file)
            if not validation_result['valid']:
                return {
                    'success': False,
                    'error': validation_result['error'],
                    'processed_lines': 0,
                    'errors': []
                }
            
            # Decodificar arquivo
            decoded_data = self._decode_file(csv_file)
            if not decoded_data:
                return {
                    'success': False,
                    'error': 'Erro na decodificação do arquivo',
                    'processed_lines': 0,
                    'errors': []
                }
            
            # Processar CSV
            with transaction.atomic():
                result = self._process_csv_data(decoded_data)
            
            return {
                'success': True,
                'processed_lines': self.processed_lines,
                'errors': self.errors,
                'data': result
            }
            
        except Exception as e:
            logger.error(f"Erro no processamento CSV: {str(e)}")
            return {
                'success': False,
                'error': f'Erro interno: {str(e)}',
                'processed_lines': 0,
                'errors': []
            }
    
    def _validate_file(self, csv_file) -> Dict:
        """Valida o arquivo CSV"""
        if not csv_file:
            return {'valid': False, 'error': 'Nenhum arquivo enviado'}
        
        if not csv_file.name.endswith('.csv'):
            return {'valid': False, 'error': 'Arquivo deve ter extensão .csv'}
        
        if csv_file.size > self.max_file_size:
            return {'valid': False, 'error': f'Arquivo muito grande. Máximo: {self.max_file_size // (1024*1024)}MB'}
        
        if csv_file.size == 0:
            return {'valid': False, 'error': 'Arquivo vazio'}
        
        return {'valid': True}
    
    def _decode_file(self, csv_file) -> Optional[List[str]]:
        """Decodifica o arquivo CSV testando múltiplas codificações"""
        for encoding in self.allowed_encodings:
            try:
                csv_file.seek(0)
                decoded_content = csv_file.read().decode(encoding)
                return decoded_content.splitlines()
            except UnicodeDecodeError:
                continue
        
        logger.error("Falha na decodificação do arquivo")
        return None
    
    def _process_csv_data(self, lines: List[str]) -> Dict:
        """Processa os dados do CSV"""
        reader = csv.reader(lines)
        
        # Processar cabeçalho
        try:
            header = next(reader)
        except StopIteration:
            raise ValidationError("Arquivo CSV vazio")
        
        column_mapping = self._map_columns(header)
        
        # Processar linhas de dados
        escola_obj = None
        turma_obj = None
        disciplina_obj = None
        
        for line_num, row in enumerate(reader, start=2):
            try:
                result = self._process_row(
                    row, column_mapping, line_num,
                    escola_obj, turma_obj, disciplina_obj
                )
                
                if result:
                    escola_obj = result.get('escola', escola_obj)
                    turma_obj = result.get('turma', turma_obj)
                    disciplina_obj = result.get('disciplina', disciplina_obj)
                    self.processed_lines += 1
                    
            except Exception as e:
                self.errors.append(f"Linha {line_num}: {str(e)}")
                continue
        
        return {
            'escola': escola_obj.nome if escola_obj else None,
            'turma': turma_obj.nome if turma_obj else None,
            'disciplina': disciplina_obj.nome if disciplina_obj else None
        }
    
    def _map_columns(self, header: List[str]) -> Dict:
        """Mapeia as colunas do CSV"""
        mapping = {
            'nome_aluno': None,
            'nome_turma': None,
            'nome_teste': None,
            'respostas': []
        }
        
        for i, col_name in enumerate(header):
            col_lower = col_name.lower()
            
            if 'nome do aluno' in col_lower or 'aluno' in col_lower:
                mapping['nome_aluno'] = i
            elif 'nome da turma' in col_lower or 'turma' in col_lower:
                mapping['nome_turma'] = i
            elif 'nome do teste' in col_lower or 'teste' in col_lower:
                mapping['nome_teste'] = i
            elif 'resposta' in col_lower and ('p.' in col_lower or 'pergunta' in col_lower):
                # Extrair número da questão
                match = re.search(r'p\.?\s*(\d+)', col_lower)
                if match:
                    question_num = int(match.group(1))
                    mapping['respostas'].append((question_num, i))
        
        # Validar mapeamento
        required_columns = ['nome_aluno', 'nome_turma', 'nome_teste']
        for req_col in required_columns:
            if mapping[req_col] is None:
                raise ValidationError(f"Coluna obrigatória não encontrada: {req_col}")
        
        if not mapping['respostas']:
            raise ValidationError("Nenhuma coluna de resposta encontrada")
        
        # Ordenar respostas por número da questão
        mapping['respostas'].sort(key=lambda x: x[0])
        
        return mapping
    
    def _process_row(self, row: List[str], mapping: Dict, line_num: int, 
                    escola_obj, turma_obj, disciplina_obj) -> Optional[Dict]:
        """Processa uma linha individual do CSV"""
        if len(row) <= max(mapping['nome_aluno'], mapping['nome_turma'], mapping['nome_teste']):
            raise ValidationError("Número de colunas insuficiente")
        
        # Extrair dados básicos
        nome_aluno = row[mapping['nome_aluno']].strip()
        nome_turma_completo = row[mapping['nome_turma']].strip()
        nome_teste = row[mapping['nome_teste']].strip()
        
        if not all([nome_aluno, nome_turma_completo, nome_teste]):
            raise ValidationError("Dados obrigatórios em branco")
        
        # Extrair informações estruturadas
        turma_info = self._extract_class_info(nome_turma_completo)
        disciplina_nome = self._extract_subject(nome_teste)
        
        # Criar/buscar objetos
        escola_obj = self._get_or_create_school(turma_info['escola'])
        turma_obj = self._get_or_create_class(
            escola_obj, turma_info['nome'], turma_info['ano']
        )
        disciplina_obj = self._get_or_create_subject(disciplina_nome)
        aluno_obj = self._get_or_create_student(turma_obj, nome_aluno)
        
        # Processar respostas
        saved_answers = self._process_answers(
            row, mapping['respostas'], aluno_obj, disciplina_obj
        )
        
        if saved_answers == 0:
            raise ValidationError("Nenhuma resposta válida encontrada")
        
        return {
            'escola': escola_obj,
            'turma': turma_obj,
            'disciplina': disciplina_obj,
            'aluno': aluno_obj,
            'respostas_salvas': saved_answers
        }
    
    def _extract_class_info(self, nome_turma_completo: str) -> Dict:
        """Extrai informações da turma"""
        # Padrão: "1º ANO A - ESCOLA 2025/2026"
        match = re.match(
            r'(\d+º\s+ANO)\s*([A-Z]?)?\s*-\s*(.+?)\s+(\d{4}/\d{4})', 
            nome_turma_completo.strip(), 
            re.IGNORECASE
        )
        
        if match:
            serie = match.group(1).strip()
            turma_letra = match.group(2).strip() if match.group(2) else ""
            escola = match.group(3).strip()
            ano_letivo = match.group(4).strip()
            
            turma_nome = f"{serie} {turma_letra}".strip() if turma_letra else serie
            
            return {
                'serie': serie,
                'nome': turma_nome,
                'escola': escola,
                'ano': ano_letivo.split('/')[0]  # Primeiro ano do período
            }
        
        # Fallback
        return {
            'serie': nome_turma_completo,
            'nome': nome_turma_completo,
            'escola': "Escola Desconhecida",
            'ano': str(timezone.now().year)
        }
    
    def _extract_subject(self, nome_teste: str) -> str:
        """Extrai a disciplina do nome do teste"""
        disciplinas_conhecidas = [
            'MATEMÁTICA', 'PORTUGUÊS', 'HISTÓRIA', 'GEOGRAFIA', 
            'CIÊNCIAS', 'INGLÊS', 'EDUCAÇÃO FÍSICA', 'ARTES'
        ]
        
        nome_teste_upper = nome_teste.upper()
        for disciplina in disciplinas_conhecidas:
            if disciplina in nome_teste_upper:
                return disciplina.title()
        
        # Fallback: última palavra
        palavras = nome_teste.strip().split()
        return palavras[-1].title() if palavras else "Disciplina Desconhecida"
    
    def _get_or_create_school(self, nome: str) -> Escola:
        """Busca ou cria uma escola"""
        escola, created = Escola.objects.get_or_create(
            nome=nome,
            defaults={'ativa': True}
        )
        return escola
    
    def _get_or_create_class(self, escola: Escola, nome: str, ano: str) -> Turma:
        """Busca ou cria uma turma"""
        # Mapear ano para choices
        ano_choices_map = {
            '2020': '1ano', '2021': '2ano', '2022': '3ano', '2023': '4ano',
            '2024': '5ano', '2025': '6ano', '2026': '7ano', '2027': '8ano', '2028': '9ano'
        }
        
        ano_choice = ano_choices_map.get(ano, '1ano')
        
        turma, created = Turma.objects.get_or_create(
            escola=escola,
            nome=nome,
            ano_letivo=int(ano),
            defaults={
                'ano': ano_choice,
                'ativa': True
            }
        )
        return turma
    
    def _get_or_create_subject(self, nome: str) -> Disciplina:
        """Busca ou cria uma disciplina"""
        disciplina, created = Disciplina.objects.get_or_create(
            nome=nome,
            defaults={'ativa': True}
        )
        return disciplina
    
    def _get_or_create_student(self, turma: Turma, nome: str) -> Aluno:
        """Busca ou cria um aluno"""
        aluno, created = Aluno.objects.get_or_create(
            turma=turma,
            nome=nome,
            defaults={'ativo': True}
        )
        return aluno
    
    def _process_answers(self, row: List[str], respostas_mapping: List[Tuple], 
                        aluno: Aluno, disciplina: Disciplina) -> int:
        """Processa as respostas do aluno"""
        saved_count = 0
        
        for numero_questao, col_index in respostas_mapping:
            if col_index < len(row):
                resposta_valor = row[col_index].strip().upper()
                
                if resposta_valor and resposta_valor in ['A', 'B', 'C', 'D', 'E']:
                    questao, created = Questao.objects.get_or_create(
                        numero=numero_questao,
                        defaults={
                            'resposta_correta': 'A',  # Placeholder
                            'habilidade': f'Habilidade Q{numero_questao}'
                        }
                    )
                    
                    # Aqui você precisa definir como determinar se a resposta está correta
                    # Por enquanto, assumindo que precisa de um gabarito separado
                    Resposta.objects.update_or_create(
                        aluno=aluno,
                        questao=questao,
                        defaults={
                            'resposta_aluno': resposta_valor,
                            'correta': False  # Será calculado quando houver gabarito
                        }
                    )
                    saved_count += 1
        
        return saved_count
