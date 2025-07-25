from django.contrib import admin
from .models import Escola, Turma, Aluno, Disciplina, Questao, Resposta

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

@admin.register(Questao)
class QuestaoAdmin(admin.ModelAdmin):
    list_display = ('disciplina', 'numero')
    list_filter = ('disciplina',)
    ordering = ('disciplina__nome', 'numero')

@admin.register(Resposta)
class RespostaAdmin(admin.ModelAdmin):
    list_display = ('aluno', 'questao', 'resposta')
    list_filter = ('questao__disciplina', 'aluno__turma__escola')
    search_fields = ('aluno__nome', 'questao__disciplina__nome')
    ordering = ('aluno__nome', 'questao__disciplina__nome', 'questao__numero')
