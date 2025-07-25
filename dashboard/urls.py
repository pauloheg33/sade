from django.urls import path
from . import views
from .views_processamento import teste_processamento

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('relatorio-desempenho/', views.relatorio_desempenho, name='relatorio_desempenho'),
    path('exportar-relatorio-pdf/', views.exportar_relatorio_pdf, name='exportar_relatorio_pdf'),
    path('api/dados-relatorio/', views.api_dados_relatorio, name='api_dados_relatorio'),
    path('api/grafico-desempenho/', views.grafico_desempenho, name='grafico_desempenho'),
    path('upload-csv/', views.upload_csv, name='upload_csv'),
    path('login/', views.custom_login, name='custom_login'),
    path('teste-processamento/', teste_processamento, name='teste_processamento'),
] 