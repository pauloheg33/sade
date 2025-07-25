"""
Calculadora de estatísticas educacionais otimizada
"""

from typing import Dict, List, Optional
from django.db.models import Count, Q, Avg, Sum, F, FloatField, Case, When, IntegerField
from django.core.cache import cache
from django.utils import timezone

from ..models import Escola, Turma, Aluno, Disciplina, Questao, Resposta

import logging

logger = logging.getLogger(__name__)


class StatisticsCalculator:
    """
    Classe responsável por calcular estatísticas educacionais
    com otimizações de cache e performance
    """
    
    def __init__(self):
        self.cache_timeout = 300  # 5 minutos
    
    def get_dashboard_statistics(self) -> Dict:
        """
        Retorna estatísticas principais para o dashboard
        
        Returns:
            Dict com estatísticas consolidadas
        """
        cache_key = 'dashboard_statistics'
        cached_stats = cache.get(cache_key)
        
        if cached_stats:
            return cached_stats
        
        try:
            # Estatísticas básicas
            basic_stats = self._get_basic_statistics()
            
            # Performance por ano escolar
            performance_by_year = self._get_performance_by_year()
            
            # Performance por disciplina
            performance_by_subject = self._get_performance_by_subject()
            
            # Top escolas
            top_schools = self._get_top_schools()
            
            # Tendências recentes
            recent_trends = self._get_recent_trends()
            
            statistics = {
                'basic': basic_stats,
                'performance_by_year': performance_by_year,
                'performance_by_subject': performance_by_subject,
                'top_schools': top_schools,
                'recent_trends': recent_trends,
                'last_updated': timezone.now().isoformat()
            }
            
            # Cache por 5 minutos
            cache.set(cache_key, statistics, self.cache_timeout)
            
            return statistics
            
        except Exception as e:
            logger.error(f"Erro ao calcular estatísticas do dashboard: {str(e)}")
            return self._get_empty_statistics()
    
    def get_chart_data(self, chart_type: str, filters: Dict = None) -> Dict:
        """
        Retorna dados formatados para gráficos
        
        Args:
            chart_type: Tipo do gráfico
            filters: Filtros opcionais
            
        Returns:
            Dict com dados do gráfico
        """
        cache_key = f'chart_data_{chart_type}_{hash(str(filters))}'
        cached_data = cache.get(cache_key)
        
        if cached_data:
            return cached_data
        
        try:
            if chart_type == 'performance_by_year':
                data = self._get_performance_by_year_chart()
            elif chart_type == 'performance_by_subject':
                data = self._get_performance_by_subject_chart()
            elif chart_type == 'questions_difficulty':
                data = self._get_questions_difficulty_chart()
            elif chart_type == 'students_distribution':
                data = self._get_students_distribution_chart()
            else:
                data = {'error': 'Tipo de gráfico não reconhecido'}
            
            # Cache por 5 minutos
            cache.set(cache_key, data, self.cache_timeout)
            
            return data
            
        except Exception as e:
            logger.error(f"Erro ao gerar dados do gráfico {chart_type}: {str(e)}")
            return {'error': str(e)}
    
    def _get_basic_statistics(self) -> Dict:
        """Calcula estatísticas básicas do sistema"""
        try:
            total_escolas = Escola.objects.filter(ativa=True).count()
            total_turmas = Turma.objects.filter(ativa=True).count()
            total_alunos = Aluno.objects.filter(ativo=True).count()
            total_disciplinas = Disciplina.objects.filter(ativa=True).count()
            total_questoes = Questao.objects.count()
            total_respostas = Resposta.objects.count()
            total_acertos = Resposta.objects.filter(correta=True).count()
            
            media_geral = (total_acertos / total_respostas * 100) if total_respostas > 0 else 0
            
            return {
                'total_escolas': total_escolas,
                'total_turmas': total_turmas,
                'total_alunos': total_alunos,
                'total_disciplinas': total_disciplinas,
                'total_questoes': total_questoes,
                'total_respostas': total_respostas,
                'total_acertos': total_acertos,
                'media_geral': round(media_geral, 2)
            }
            
        except Exception as e:
            logger.error(f"Erro ao calcular estatísticas básicas: {str(e)}")
            return {}
    
    def _get_performance_by_year(self) -> List[Dict]:
        """Calcula performance por ano escolar"""
        try:
            performance_data = []
            
            # Mapear choices de ano para nomes legíveis
            ano_choices = dict(Turma.ANO_CHOICES)
            
            for ano_codigo, ano_nome in ano_choices.items():
                respostas_ano = Resposta.objects.filter(aluno__turma__ano=ano_codigo)
                total_respostas = respostas_ano.count()
                total_acertos = respostas_ano.filter(correta=True).count()
                
                if total_respostas > 0:
                    media_ano = (total_acertos / total_respostas) * 100
                    performance_data.append({
                        'ano_codigo': ano_codigo,
                        'ano_nome': ano_nome,
                        'total_respostas': total_respostas,
                        'total_acertos': total_acertos,
                        'media': round(media_ano, 2),
                        'total_alunos': respostas_ano.values('aluno').distinct().count()
                    })
            
            # Ordenar por ano
            performance_data.sort(key=lambda x: x['ano_codigo'])
            
            return performance_data
            
        except Exception as e:
            logger.error(f"Erro ao calcular performance por ano: {str(e)}")
            return []
    
    def _get_performance_by_subject(self) -> List[Dict]:
        """Calcula performance por disciplina"""
        try:
            performance_data = []
            
            disciplinas = Disciplina.objects.filter(ativa=True)
            
            for disciplina in disciplinas:
                respostas_disc = Resposta.objects.filter(
                    questao__gabarito__disciplina=disciplina
                )
                total_respostas = respostas_disc.count()
                total_acertos = respostas_disc.filter(correta=True).count()
                
                if total_respostas > 0:
                    media_disc = (total_acertos / total_respostas) * 100
                    performance_data.append({
                        'disciplina_id': disciplina.id,
                        'disciplina_nome': disciplina.nome,
                        'total_respostas': total_respostas,
                        'total_acertos': total_acertos,
                        'media': round(media_disc, 2),
                        'total_questoes': Questao.objects.filter(
                            gabarito__disciplina=disciplina
                        ).count()
                    })
            
            # Ordenar por média decrescente
            performance_data.sort(key=lambda x: x['media'], reverse=True)
            
            return performance_data
            
        except Exception as e:
            logger.error(f"Erro ao calcular performance por disciplina: {str(e)}")
            return []
    
    def _get_top_schools(self, limit: int = 5) -> List[Dict]:
        """Retorna top escolas por desempenho"""
        try:
            top_schools = []
            
            escolas = Escola.objects.filter(ativa=True)
            
            for escola in escolas:
                respostas_escola = Resposta.objects.filter(
                    aluno__turma__escola=escola
                )
                total_respostas = respostas_escola.count()
                total_acertos = respostas_escola.filter(correta=True).count()
                
                if total_respostas > 0:
                    media_escola = (total_acertos / total_respostas) * 100
                    top_schools.append({
                        'escola_id': escola.id,
                        'escola_nome': escola.nome,
                        'total_respostas': total_respostas,
                        'total_acertos': total_acertos,
                        'media': round(media_escola, 2),
                        'total_alunos': Aluno.objects.filter(
                            turma__escola=escola, ativo=True
                        ).count(),
                        'total_turmas': Turma.objects.filter(
                            escola=escola, ativa=True
                        ).count()
                    })
            
            # Ordenar por média e retornar top N
            top_schools.sort(key=lambda x: x['media'], reverse=True)
            
            return top_schools[:limit]
            
        except Exception as e:
            logger.error(f"Erro ao calcular top escolas: {str(e)}")
            return []
    
    def _get_recent_trends(self) -> Dict:
        """Calcula tendências recentes (último mês)"""
        try:
            one_month_ago = timezone.now() - timezone.timedelta(days=30)
            
            # Uploads recentes
            recent_uploads = UploadResultado.objects.filter(
                data_upload__gte=one_month_ago,
                processado=True
            ).count()
            
            # Novas escolas
            new_schools = Escola.objects.filter(
                created_at__gte=one_month_ago
            ).count()
            
            # Novos alunos
            new_students = Aluno.objects.filter(
                created_at__gte=one_month_ago
            ).count()
            
            return {
                'recent_uploads': recent_uploads,
                'new_schools': new_schools,
                'new_students': new_students,
                'period_days': 30
            }
            
        except Exception as e:
            logger.error(f"Erro ao calcular tendências recentes: {str(e)}")
            return {}
    
    def _get_performance_by_year_chart(self) -> Dict:
        """Dados para gráfico de performance por ano"""
        performance_data = self._get_performance_by_year()
        
        return {
            'type': 'bar',
            'labels': [item['ano_nome'] for item in performance_data],
            'datasets': [{
                'label': 'Desempenho por Ano (%)',
                'data': [item['media'] for item in performance_data],
                'backgroundColor': 'rgba(79, 70, 229, 0.8)',
                'borderColor': 'rgba(79, 70, 229, 1)',
                'borderWidth': 2
            }]
        }
    
    def _get_performance_by_subject_chart(self) -> Dict:
        """Dados para gráfico de performance por disciplina"""
        performance_data = self._get_performance_by_subject()
        
        colors = [
            'rgba(239, 68, 68, 0.8)',   # Red
            'rgba(59, 130, 246, 0.8)',  # Blue
            'rgba(34, 197, 94, 0.8)',   # Green
            'rgba(249, 115, 22, 0.8)',  # Orange
            'rgba(168, 85, 247, 0.8)',  # Purple
            'rgba(236, 72, 153, 0.8)',  # Pink
        ]
        
        return {
            'type': 'doughnut',
            'labels': [item['disciplina_nome'] for item in performance_data],
            'datasets': [{
                'data': [item['media'] for item in performance_data],
                'backgroundColor': colors[:len(performance_data)],
                'borderWidth': 2
            }]
        }
    
    def _get_questions_difficulty_chart(self) -> Dict:
        """Dados para gráfico de dificuldade das questões"""
        try:
            questoes_stats = Resposta.objects.values('questao__numero').annotate(
                total_respostas=Count('id'),
                total_acertos=Count('id', filter=Q(correta=True))
            ).annotate(
                percentual_acerto=Case(
                    When(total_respostas=0, then=0),
                    default=100.0 * F('total_acertos') / F('total_respostas'),
                    output_field=FloatField()
                )
            ).order_by('questao__numero')
            
            # Categorizar por dificuldade
            faceis = sum(1 for q in questoes_stats if q['percentual_acerto'] >= 80)
            medias = sum(1 for q in questoes_stats if 60 <= q['percentual_acerto'] < 80)
            dificeis = sum(1 for q in questoes_stats if q['percentual_acerto'] < 60)
            
            return {
                'type': 'pie',
                'labels': ['Fáceis (≥80%)', 'Médias (60-79%)', 'Difíceis (<60%)'],
                'datasets': [{
                    'data': [faceis, medias, dificeis],
                    'backgroundColor': [
                        'rgba(34, 197, 94, 0.8)',   # Green
                        'rgba(249, 115, 22, 0.8)',  # Orange
                        'rgba(239, 68, 68, 0.8)'    # Red
                    ],
                    'borderWidth': 2
                }]
            }
            
        except Exception as e:
            logger.error(f"Erro no gráfico de dificuldade: {str(e)}")
            return {'error': str(e)}
    
    def _get_students_distribution_chart(self) -> Dict:
        """Dados para gráfico de distribuição de alunos"""
        try:
            distribuicao = Escola.objects.annotate(
                total_alunos=Count('turma__aluno', filter=Q(turma__aluno__ativo=True))
            ).filter(total_alunos__gt=0).order_by('-total_alunos')[:8]
            
            return {
                'type': 'bar',
                'labels': [escola.nome[:20] + '...' if len(escola.nome) > 20 else escola.nome for escola in distribuicao],
                'datasets': [{
                    'label': 'Número de Alunos',
                    'data': [escola.total_alunos for escola in distribuicao],
                    'backgroundColor': 'rgba(168, 85, 247, 0.8)',
                    'borderColor': 'rgba(168, 85, 247, 1)',
                    'borderWidth': 2
                }]
            }
            
        except Exception as e:
            logger.error(f"Erro no gráfico de distribuição: {str(e)}")
            return {'error': str(e)}
    
    def _get_empty_statistics(self) -> Dict:
        """Retorna estrutura vazia em caso de erro"""
        return {
            'basic': {},
            'performance_by_year': [],
            'performance_by_subject': [],
            'top_schools': [],
            'recent_trends': {},
            'last_updated': timezone.now().isoformat(),
            'error': True
        }
    
    def clear_cache(self):
        """Limpa cache de estatísticas"""
        cache_keys = [
            'dashboard_statistics',
            'chart_data_performance_by_year',
            'chart_data_performance_by_subject',
            'chart_data_questions_difficulty',
            'chart_data_students_distribution'
        ]
        
        for key in cache_keys:
            cache.delete(key)
        
        logger.info("Cache de estatísticas limpo com sucesso")
