from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('relatorio-desempenho/', views.relatorio_desempenho, name='relatorio_desempenho'),
    path('api/grafico-desempenho/', views.grafico_desempenho, name='grafico_desempenho'),
    path('upload-csv/', views.upload_csv, name='upload_csv'),
    path('login/', views.custom_login, name='custom_login'),
] 