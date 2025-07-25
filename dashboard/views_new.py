"""
Configuração de views otimizada para o projeto SADE
Arquivo principal contendo apenas as views essenciais
"""

from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.db.models import Count, Q, Avg, Sum, F
from django.utils import timezone
from django.views.decorators.http import require_http_methods
from django.views.decorators.cache import cache_page

from .models import Escola, Turma, Aluno, Disciplina, Questao, Resposta, Gabarito, UploadResultado
from .services.csv_processor import CSVProcessor
from .services.reports import ReportGenerator
from .services.statistics import StatisticsCalculator

import json
import logging

logger = logging.getLogger(__name__)


# ==================== VIEWS DE AUTENTICAÇÃO ====================

def login_view(request):
    """View de login moderna e otimizada"""
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        if not username or not password:
            messages.error(request, 'Por favor, preencha todos os campos.')
            return render(request, 'dashboard/login.html')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            next_url = request.GET.get('next', 'home')
            return redirect(next_url)
        else:
            messages.error(request, 'Usuário ou senha inválidos.')
    
    return render(request, 'dashboard/login.html')


@login_required
def logout_view(request):
    """Logout do usuário"""
    logout(request)
    messages.success(request, 'Logout realizado com sucesso.')
    return redirect('login')


# ==================== VIEWS PRINCIPAIS ====================

@login_required
@cache_page(60 * 5)  # Cache por 5 minutos
def home(request):
    """Dashboard principal com estatísticas otimizadas"""
    try:
        stats_calculator = StatisticsCalculator()
        statistics = stats_calculator.get_dashboard_statistics()
        
        context = {
            'statistics': statistics,
            'recent_uploads': UploadResultado.objects.filter(processado=True).order_by('-data_upload')[:5],
            'recent_schools': Escola.objects.filter(ativa=True).order_by('-created_at')[:5],
        }
        
        return render(request, 'dashboard/home.html', context)
    
    except Exception as e:
        logger.error(f"Erro no dashboard: {str(e)}")
        messages.error(request, 'Erro ao carregar estatísticas do dashboard.')
        return render(request, 'dashboard/home.html', {'statistics': {}})


@login_required
def configuracoes(request):
    """Página de configurações do sistema"""
    if request.method == 'POST':
        # Processar configurações aqui
        messages.success(request, 'Configurações salvas com sucesso!')
    
    return render(request, 'dashboard/configuracoes.html')


# ==================== VIEWS DE UPLOAD ====================

@login_required
@require_http_methods(["GET", "POST"])
def upload_csv(request):
    """Upload e processamento de arquivos CSV"""
    if request.method == 'POST':
        csv_file = request.FILES.get('csv_file')
        
        if not csv_file:
            messages.error(request, 'Nenhum arquivo enviado.')
            return render(request, 'dashboard/upload_csv.html')
        
        try:
            processor = CSVProcessor()
            result = processor.process_file(csv_file)
            
            if result['success']:
                messages.success(
                    request, 
                    f'Arquivo processado com sucesso! {result["processed_lines"]} linha(s) importada(s).'
                )
                if result['errors']:
                    for error in result['errors'][:5]:  # Mostrar apenas os primeiros 5 erros
                        messages.warning(request, error)
            else:
                messages.error(request, f'Erro no processamento: {result["error"]}')
                
        except Exception as e:
            logger.error(f"Erro no upload CSV: {str(e)}")
            messages.error(request, 'Erro interno no processamento do arquivo.')
    
    return render(request, 'dashboard/upload_csv.html')


# ==================== VIEWS DE RELATÓRIOS ====================

@login_required
def relatorio_turmas(request):
    """Relatório detalhado por turmas"""
    try:
        report_generator = ReportGenerator()
        turmas_data = report_generator.generate_classes_report()
        
        context = {
            'turmas_dados': turmas_data,
            'total_turmas': len(turmas_data)
        }
        
        return render(request, 'dashboard/relatorio_turmas.html', context)
    
    except Exception as e:
        logger.error(f"Erro no relatório de turmas: {str(e)}")
        messages.error(request, 'Erro ao gerar relatório de turmas.')
        return render(request, 'dashboard/relatorio_turmas.html', {'turmas_dados': []})


@login_required
def relatorio_questoes(request):
    """Relatório detalhado por questões"""
    try:
        report_generator = ReportGenerator()
        questions_data = report_generator.generate_questions_report()
        
        context = {
            'questoes_dados': questions_data['all_questions'],
            'questoes_dificeis': questions_data['difficult_questions'],
            'questoes_medias': questions_data['medium_questions'],
            'questoes_faceis': questions_data['easy_questions'],
        }
        
        return render(request, 'dashboard/relatorio_questoes.html', context)
    
    except Exception as e:
        logger.error(f"Erro no relatório de questões: {str(e)}")
        messages.error(request, 'Erro ao gerar relatório de questões.')
        return render(request, 'dashboard/relatorio_questoes.html', {'questoes_dados': []})


# ==================== APIs AJAX ====================

@login_required
def api_turma_dados(request, turma_id):
    """API para dados específicos de uma turma"""
    try:
        turma = get_object_or_404(Turma, id=turma_id)
        report_generator = ReportGenerator()
        turma_data = report_generator.generate_single_class_report(turma)
        
        return JsonResponse(turma_data, safe=False)
    
    except Exception as e:
        logger.error(f"Erro na API de turma {turma_id}: {str(e)}")
        return JsonResponse({'error': 'Erro interno'}, status=500)


@login_required
def api_dashboard_stats(request):
    """API para estatísticas do dashboard"""
    try:
        stats_calculator = StatisticsCalculator()
        chart_type = request.GET.get('type', 'performance_by_year')
        
        data = stats_calculator.get_chart_data(chart_type)
        return JsonResponse(data, safe=False)
    
    except Exception as e:
        logger.error(f"Erro na API de estatísticas: {str(e)}")
        return JsonResponse({'error': 'Erro interno'}, status=500)


# ==================== VIEWS DE TESTE ====================

def health_check(request):
    """Health check para monitoramento"""
    try:
        # Testa conexão com banco
        total_schools = Escola.objects.count()
        
        return JsonResponse({
            'status': 'healthy',
            'timestamp': timezone.now().isoformat(),
            'database': 'connected',
            'schools_count': total_schools
        })
    except Exception as e:
        return JsonResponse({
            'status': 'unhealthy',
            'error': str(e)
        }, status=500)


# ==================== ERROR HANDLERS ====================

def handler404(request, exception):
    """Handler personalizado para erro 404"""
    return render(request, 'dashboard/404.html', status=404)


def handler500(request):
    """Handler personalizado para erro 500"""
    return render(request, 'dashboard/500.html', status=500)
