from django.contrib import admin
from .models import (
    Escola, Turma, Aluno, Disciplina, Questao, Resposta, 
    Gabarito, UploadResultado, AnaliseDesempenho
)

# Register your models here.

@admin.register(Escola)
class EscolaAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    search_fields = ('nome',)
    ordering = ('nome',)

@admin.register(Turma)
class TurmaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'ano', 'escola')
    list_filter = ('ano', 'escola')
    search_fields = ('nome', 'escola__nome')
    ordering = ('escola__nome', 'ano', 'nome')

@admin.register(Aluno)
class AlunoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'turma', 'get_escola')
    list_filter = ('turma__escola', 'turma__ano')
    search_fields = ('nome', 'turma__nome', 'turma__escola__nome')
    ordering = ('nome',)
    
    def get_escola(self, obj):
        return obj.turma.escola.nome
    get_escola.short_description = 'Escola'

@admin.register(Disciplina)
class DisciplinaAdmin(admin.ModelAdmin):
    list_display = ('nome',)
    search_fields = ('nome',)
    ordering = ('nome',)

@admin.register(Gabarito)
class GabaritoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'disciplina', 'ano_escolar', 'ativo', 'data_criacao')
    list_filter = ('disciplina', 'ano_escolar', 'ativo', 'data_criacao')
    search_fields = ('nome', 'disciplina__nome')
    ordering = ('-data_criacao',)
    readonly_fields = ('data_criacao',)

@admin.register(UploadResultado)
class UploadResultadoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'escola', 'processado', 'data_upload')
    list_filter = ('escola', 'processado', 'data_upload')
    search_fields = ('nome', 'escola__nome')
    ordering = ('-data_upload',)
    readonly_fields = ('data_upload',)

@admin.register(AnaliseDesempenho)
class AnaliseDesempenhoAdmin(admin.ModelAdmin):
    list_display = ('upload_resultado', 'total_alunos', 'total_questoes', 'media_geral', 'data_analise')
    list_filter = ('data_analise',)
    search_fields = ('upload_resultado__nome',)
    ordering = ('-data_analise',)
    readonly_fields = ('data_analise',)

@admin.register(Questao)
class QuestaoAdmin(admin.ModelAdmin):
    list_display = ('gabarito', 'numero', 'resposta_correta')
    list_filter = ('gabarito__disciplina', 'gabarito__ano_escolar')
    ordering = ('gabarito__nome', 'numero')

@admin.register(Resposta)
class RespostaAdmin(admin.ModelAdmin):
    list_display = ('aluno', 'questao', 'resposta_aluno', 'correta')
    list_filter = ('correta', 'questao__gabarito__disciplina', 'aluno__turma__escola')
    search_fields = ('aluno__nome',)
    ordering = ('aluno__nome', 'questao__numero')
