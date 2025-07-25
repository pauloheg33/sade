"""
URLs otimizadas para o dashboard SADE
"""

from django.urls import path
from django.views.generic import RedirectView
from . import views

app_name = 'dashboard'

urlpatterns = [
    # Redirecionamento da raiz
    path('', RedirectView.as_view(pattern_name='dashboard:home'), name='root'),
    
    # Autenticação
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    
    # Dashboard principal
    path('home/', views.home, name='home'),
    path('dashboard/', RedirectView.as_view(pattern_name='dashboard:home'), name='dashboard'),
    
    # Configurações
    path('configuracoes/', views.configuracoes, name='configuracoes'),
    
    # Upload de dados
    path('upload/', views.upload_csv, name='upload_csv'),
    path('upload-csv/', RedirectView.as_view(pattern_name='dashboard:upload_csv'), name='upload_csv_legacy'),
    
    # Relatórios
    path('relatorio-turmas/', views.relatorio_turmas, name='relatorio_turmas'),
    path('relatorio-questoes/', views.relatorio_questoes, name='relatorio_questoes'),
    
    # APIs AJAX
    path('api/turma-dados/<int:turma_id>/', views.api_turma_dados, name='api_turma_dados'),
    path('api/dashboard-stats/', views.api_dashboard_stats, name='api_dashboard_stats'),
    
    # Health check
    path('health/', views.health_check, name='health_check'),
] 