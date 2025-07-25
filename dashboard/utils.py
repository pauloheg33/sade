import csv
import pandas as pd
import re
from django.core.exceptions import ValidationError
from .models import Escola, Turma, Aluno, Disciplina, Gabarito, Questao, Resposta, UploadResultado

class ProcessadorCSV:
    """
    Classe para processar arquivos CSV de gabaritos e resultados
    Reconhece automaticamente os formatos específicos do sistema
    """
    
    @staticmethod
    def processar_gabarito(arquivo_csv, nome_gabarito, disciplina_nome, ano_escolar):
        """
        Processa arquivo de gabarito no formato:
        Ano,Componente,Questão,Gabarito,Identificador
        1º,Língua Portuguesa,1,A,PZD677983
        """
        try:
            # Lê o arquivo CSV
            df = pd.read_csv(arquivo_csv)
            
            # Verifica se tem as colunas necessárias
            colunas_esperadas = ['Ano', 'Componente', 'Questão', 'Gabarito']
            if not all(col in df.columns for col in colunas_esperadas):
                raise ValidationError(f"Arquivo deve conter as colunas: {', '.join(colunas_esperadas)}")
            
            # Obtém ou cria a disciplina
            disciplina, _ = Disciplina.objects.get_or_create(nome=disciplina_nome)
            
            # Cria o gabarito
            gabarito = Gabarito.objects.create(
                nome=nome_gabarito,
                disciplina=disciplina,
                ano_escolar=ano_escolar,
                ativo=True
            )
            
            # Processa cada questão
            questoes_criadas = 0
            for _, row in df.iterrows():
                questao_num = int(row['Questão'])
                resposta_correta = str(row['Gabarito']).strip().upper()
                
                # Ignora questões sem gabarito (em branco)
                if resposta_correta and resposta_correta != ' ':
                    Questao.objects.create(
                        gabarito=gabarito,
                        numero=questao_num,
                        resposta_correta=resposta_correta
                    )
                    questoes_criadas += 1
            
            return gabarito, questoes_criadas
            
        except Exception as e:
            raise ValidationError(f"Erro ao processar gabarito: {str(e)}")
    
    @staticmethod
    def processar_resultados(arquivo_csv, nome_upload, escola_nome):
        """
        Processa arquivo de resultados no formato:
        "Identificador do aluno","Nome do aluno","Nome do teste","Nome da turma","Pontuação percentual","P. 1 Resposta","P. 2 Resposta",...
        """
        try:
            # Lê o arquivo CSV
            df = pd.read_csv(arquivo_csv)
            
            # Verifica colunas essenciais
            if 'Nome do aluno' not in df.columns or 'Nome da turma' not in df.columns:
                raise ValidationError("Arquivo deve conter as colunas 'Nome do aluno' e 'Nome da turma'")
            
            # Obtém ou cria a escola
            escola, _ = Escola.objects.get_or_create(nome=escola_nome)
            
            # Cria o upload de resultado
            upload_resultado = UploadResultado.objects.create(
                nome=nome_upload,
                escola=escola
            )
            
            # Identifica colunas de respostas (P. 1 Resposta, P. 2 Resposta, etc.)
            colunas_respostas = [col for col in df.columns if 'Resposta' in col and 'P.' in col]
            colunas_respostas.sort(key=lambda x: int(re.search(r'P\. (\d+)', x).group(1)))
            
            alunos_processados = 0
            respostas_processadas = 0
            
            # Processa cada aluno
            for _, row in df.iterrows():
                nome_aluno = row['Nome do aluno']
                nome_turma = row['Nome da turma']
                
                # Extrai ano da turma (ex: "1º ANO A" -> "1ano")
                ano_match = re.search(r'(\d+)º\s*ANO', nome_turma.upper())
                if ano_match:
                    ano_num = ano_match.group(1)
                    ano_escolar = f"{ano_num}ano"
                else:
                    ano_escolar = "1ano"  # default
                
                # Obtém ou cria a turma
                turma, _ = Turma.objects.get_or_create(
                    escola=escola,
                    nome=nome_turma,
                    defaults={'ano': ano_escolar}
                )
                
                # Obtém ou cria o aluno
                aluno, _ = Aluno.objects.get_or_create(
                    turma=turma,
                    nome=nome_aluno
                )
                
                alunos_processados += 1
                
                # Processa as respostas do aluno
                for i, coluna_resposta in enumerate(colunas_respostas, 1):
                    resposta_aluno = str(row[coluna_resposta]).strip().upper()
                    
                    # Só processa se há resposta válida
                    if resposta_aluno and resposta_aluno != 'NAN':
                        # Aqui você pode associar com questões específicas
                        # Por enquanto, vamos armazenar temporariamente
                        # Depois implementaremos a associação com gabaritos
                        respostas_processadas += 1
            
            upload_resultado.processado = True
            upload_resultado.save()
            
            return upload_resultado, alunos_processados, respostas_processadas
            
        except Exception as e:
            raise ValidationError(f"Erro ao processar resultados: {str(e)}")
    
    @staticmethod
    def associar_resultados_gabarito(upload_resultado, gabarito):
        """
        Associa os resultados processados com um gabarito específico
        e calcula se as respostas estão corretas
        """
        try:
            # Re-processa o arquivo CSV para associar com o gabarito
            df = pd.read_csv(upload_resultado.arquivo_csv.path)
            
            # Identifica colunas de respostas
            colunas_respostas = [col for col in df.columns if 'Resposta' in col and 'P.' in col]
            colunas_respostas.sort(key=lambda x: int(re.search(r'P\. (\d+)', x).group(1)))
            
            # Obtém as questões do gabarito
            questoes = Questao.objects.filter(gabarito=gabarito).order_by('numero')
            
            respostas_criadas = 0
            acertos_total = 0
            total_respostas = 0
            
            # Processa cada aluno
            for _, row in df.iterrows():
                nome_aluno = row['Nome do aluno']
                nome_turma = row['Nome da turma']
                
                # Encontra o aluno
                try:
                    turma = Turma.objects.get(nome=nome_turma, escola=upload_resultado.escola)
                    aluno = Aluno.objects.get(nome=nome_aluno, turma=turma)
                    
                    # Processa cada resposta
                    for i, (coluna_resposta, questao) in enumerate(zip(colunas_respostas, questoes)):
                        resposta_aluno = str(row[coluna_resposta]).strip().upper()
                        
                        if resposta_aluno and resposta_aluno != 'NAN':
                            # Cria ou atualiza a resposta
                            resposta_obj, created = Resposta.objects.get_or_create(
                                aluno=aluno,
                                questao=questao,
                                defaults={
                                    'resposta_aluno': resposta_aluno,
                                    'upload_resultado': upload_resultado
                                }
                            )
                            
                            if created:
                                respostas_criadas += 1
                                total_respostas += 1
                                if resposta_obj.correta:
                                    acertos_total += 1
                
                except (Turma.DoesNotExist, Aluno.DoesNotExist):
                    continue
            
            # Calcula estatísticas
            media_geral = (acertos_total / total_respostas * 100) if total_respostas > 0 else 0
            
            return respostas_criadas, media_geral
            
        except Exception as e:
            raise ValidationError(f"Erro ao associar resultados: {str(e)}")

def extrair_ano_do_nome_arquivo(nome_arquivo):
    """Extrai o ano escolar do nome do arquivo"""
    match = re.search(r'(\d+)[oº]?\s*ano', nome_arquivo.lower())
    if match:
        return f"{match.group(1)}ano"
    return "1ano"  # default

def extrair_disciplina_do_nome_arquivo(nome_arquivo):
    """Extrai a disciplina do nome do arquivo"""
    nome_lower = nome_arquivo.lower()
    if 'portugues' in nome_lower or 'língua' in nome_lower or 'lingua' in nome_lower:
        return "Língua Portuguesa"
    elif 'matematica' in nome_lower or 'matemática' in nome_lower:
        return "Matemática"
    elif 'ciencias' in nome_lower or 'ciências' in nome_lower:
        return "Ciências"
    elif 'historia' in nome_lower or 'história' in nome_lower:
        return "História"
    elif 'geografia' in nome_lower:
        return "Geografia"
    else:
        return "Geral"
