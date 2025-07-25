"""
Gerador de relatórios otimizado
"""

from typing import Dict, List
from django.db.models import Count, Q, Avg, Sum, F, FloatField, Case, When, IntegerField
from django.utils import timezone

from ..models import Escola, Turma, Aluno, Disciplina, Questao, Resposta

import logging

logger = logging.getLogger(__name__)


class ReportGenerator:
    """
    Classe responsável pela geração de relatórios educacionais
    """
    
    def __init__(self):
        self.cache = {}
    
    def generate_classes_report(self) -> List[Dict]:
        """
        Gera relatório detalhado por turmas
        
        Returns:
            Lista com dados de cada turma
        """
        try:
            turmas_data = []
            turmas = Turma.objects.filter(ativa=True).select_related('escola').order_by('escola__nome', 'nome')
            
            for turma in turmas:
                turma_report = self.generate_single_class_report(turma)
                turmas_data.append(turma_report)
            
            return turmas_data
            
        except Exception as e:
            logger.error(f"Erro ao gerar relatório de turmas: {str(e)}")
            return []
    
    def generate_single_class_report(self, turma: Turma) -> Dict:
        """
        Gera relatório para uma turma específica
        
        Args:
            turma: Instância da turma
            
        Returns:
            Dict com dados da turma
        """
        try:
            # Respostas da turma
            respostas = Resposta.objects.filter(aluno__turma=turma).select_related(
                'questao', 'questao__gabarito__disciplina'
            )
            
            total_respostas = respostas.count()
            total_acertos = respostas.filter(correta=True).count()
            
            # Análise por questão
            questoes_analise = self._analyze_questions_for_class(respostas)
            
            return {
                'turma': turma,
                'total_alunos': turma.alunos.filter(ativo=True).count(),
                'total_respostas': total_respostas,
                'total_acertos': total_acertos,
                'percentual_geral': round((total_acertos / total_respostas * 100), 1) if total_respostas > 0 else 0,
                'questoes_analise': questoes_analise[:10],  # Top 10 questões mais difíceis
                'questoes_total': len(questoes_analise)
            }
            
        except Exception as e:
            logger.error(f"Erro ao gerar relatório da turma {turma.id}: {str(e)}")
            return {
                'turma': turma,
                'total_alunos': 0,
                'total_respostas': 0,
                'total_acertos': 0,
                'percentual_geral': 0,
                'questoes_analise': [],
                'questoes_total': 0
            }
    
    def generate_questions_report(self) -> Dict:
        """
        Gera relatório detalhado por questões
        
        Returns:
            Dict com análise das questões
        """
        try:
            # Análise geral de todas as questões
            questoes_data = Resposta.objects.values(
                'questao__numero',
                'questao__gabarito__disciplina__nome'
            ).annotate(
                total_respostas=Count('id'),
                total_acertos=Count('id', filter=Q(correta=True)),
                total_alunos=Count('aluno', distinct=True),
                total_turmas=Count('aluno__turma', distinct=True)
            ).order_by('questao__numero')
            
            # Processar dados
            all_questions = []
            for q in questoes_data:
                if q['total_respostas'] > 0:
                    percentual_acerto = (q['total_acertos'] / q['total_respostas']) * 100
                    question_data = {
                        'numero': q['questao__numero'],
                        'disciplina': q['questao__gabarito__disciplina__nome'] or 'N/A',
                        'total_respostas': q['total_respostas'],
                        'total_acertos': q['total_acertos'],
                        'total_erros': q['total_respostas'] - q['total_acertos'],
                        'total_alunos': q['total_alunos'],
                        'total_turmas': q['total_turmas'],
                        'percentual_acerto': round(percentual_acerto, 1),
                        'percentual_erro': round(100 - percentual_acerto, 1),
                        'nivel_dificuldade': self._classify_difficulty(percentual_acerto)
                    }
                    all_questions.append(question_data)
            
            # Categorizar por dificuldade
            difficult_questions = [q for q in all_questions if q['percentual_acerto'] < 60]
            medium_questions = [q for q in all_questions if 60 <= q['percentual_acerto'] < 80]
            easy_questions = [q for q in all_questions if q['percentual_acerto'] >= 80]
            
            # Ordenar questões difíceis por menor percentual de acerto
            difficult_questions.sort(key=lambda x: x['percentual_acerto'])
            
            return {
                'all_questions': all_questions,
                'difficult_questions': difficult_questions,
                'medium_questions': medium_questions,
                'easy_questions': easy_questions,
                'summary': {
                    'total_questions': len(all_questions),
                    'difficult_count': len(difficult_questions),
                    'medium_count': len(medium_questions),
                    'easy_count': len(easy_questions)
                }
            }
            
        except Exception as e:
            logger.error(f"Erro ao gerar relatório de questões: {str(e)}")
            return {
                'all_questions': [],
                'difficult_questions': [],
                'medium_questions': [],
                'easy_questions': [],
                'summary': {
                    'total_questions': 0,
                    'difficult_count': 0,
                    'medium_count': 0,
                    'easy_count': 0
                }
            }
    
    def _analyze_questions_for_class(self, respostas_queryset) -> List[Dict]:
        """
        Analisa questões para uma turma específica
        
        Args:
            respostas_queryset: QuerySet de respostas
            
        Returns:
            Lista com análise das questões
        """
        try:
            questoes_data = respostas_queryset.values(
                'questao__numero',
                'questao__gabarito__disciplina__nome'
            ).annotate(
                total_respostas_questao=Count('id'),
                total_acertos_questao=Count('id', filter=Q(correta=True))
            ).order_by('questao__numero')
            
            questoes_analise = []
            for q in questoes_data:
                if q['total_respostas_questao'] > 0:
                    percentual_acerto = (q['total_acertos_questao'] / q['total_respostas_questao']) * 100
                    questoes_analise.append({
                        'numero': q['questao__numero'],
                        'disciplina': q['questao__gabarito__disciplina__nome'] or 'N/A',
                        'total_respostas': q['total_respostas_questao'],
                        'total_acertos': q['total_acertos_questao'],
                        'percentual_acerto': round(percentual_acerto, 1),
                        'dificuldade': self._classify_difficulty(percentual_acerto)
                    })
            
            # Ordenar por dificuldade (mais erradas primeiro)
            questoes_analise.sort(key=lambda x: x['percentual_acerto'])
            
            return questoes_analise
            
        except Exception as e:
            logger.error(f"Erro na análise de questões: {str(e)}")
            return []
    
    def _classify_difficulty(self, percentual_acerto: float) -> str:
        """
        Classifica a dificuldade baseada no percentual de acerto
        
        Args:
            percentual_acerto: Percentual de acertos da questão
            
        Returns:
            String com classificação da dificuldade
        """
        if percentual_acerto >= 80:
            return 'Fácil'
        elif percentual_acerto >= 60:
            return 'Média'
        else:
            return 'Difícil'
    
    def generate_performance_summary(self, filters: Dict = None) -> Dict:
        """
        Gera resumo geral de desempenho
        
        Args:
            filters: Filtros opcionais para aplicar
            
        Returns:
            Dict com resumo de desempenho
        """
        try:
            base_query = Resposta.objects.all()
            
            # Aplicar filtros se fornecidos
            if filters:
                if filters.get('escola_id'):
                    base_query = base_query.filter(aluno__turma__escola_id=filters['escola_id'])
                if filters.get('disciplina_id'):
                    base_query = base_query.filter(questao__gabarito__disciplina_id=filters['disciplina_id'])
                if filters.get('ano_letivo'):
                    base_query = base_query.filter(aluno__turma__ano_letivo=filters['ano_letivo'])
            
            # Calcular estatísticas
            total_respostas = base_query.count()
            total_acertos = base_query.filter(correta=True).count()
            total_alunos = base_query.values('aluno').distinct().count()
            total_questoes = base_query.values('questao').distinct().count()
            
            media_geral = (total_acertos / total_respostas * 100) if total_respostas > 0 else 0
            
            return {
                'total_respostas': total_respostas,
                'total_acertos': total_acertos,
                'total_erros': total_respostas - total_acertos,
                'total_alunos': total_alunos,
                'total_questoes': total_questoes,
                'media_geral': round(media_geral, 2),
                'total_escolas': base_query.values('aluno__turma__escola').distinct().count(),
                'total_turmas': base_query.values('aluno__turma').distinct().count()
            }
            
        except Exception as e:
            logger.error(f"Erro ao gerar resumo de desempenho: {str(e)}")
            return {
                'total_respostas': 0,
                'total_acertos': 0,
                'total_erros': 0,
                'total_alunos': 0,
                'total_questoes': 0,
                'media_geral': 0,
                'total_escolas': 0,
                'total_turmas': 0
            }
