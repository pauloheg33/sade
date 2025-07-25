"""
Configuração otimizada do Django Admin para o Sistema SADE
"""

from django.contrib import admin
from django.db.models import Count, Avg, Q
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe

from .models import (
    Escola, Turma, Aluno, Disciplina, Questao, Resposta, 
    Gabarito, UploadResultado, AnaliseDesempenho
)


# ==================== CUSTOMIZAÇÕES DO ADMIN ====================

@admin.register(Escola)
class EscolaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'codigo_inep', 'get_total_turmas', 'get_total_alunos', 'ativa', 'created_at')
    list_filter = ('ativa', 'created_at', 'updated_at')
    search_fields = ('nome', 'codigo_inep', 'endereco')
    ordering = ('nome',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('nome', 'codigo_inep', 'ativa')
        }),
        ('Endereço', {
            'fields': ('endereco',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def get_total_turmas(self, obj):
        return obj.turmas.filter(ativa=True).count()
    get_total_turmas.short_description = 'Total Turmas'
    get_total_turmas.admin_order_field = 'turmas__count'
    
    def get_total_alunos(self, obj):
        return Aluno.objects.filter(turma__escola=obj, ativo=True).count()
    get_total_alunos.short_description = 'Total Alunos'
    
    def get_queryset(self, request):
        return super().get_queryset(request).annotate(
            turmas_count=Count('turmas', filter=Q(turmas__ativa=True))
        )


@admin.register(Turma)
class TurmaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'get_ano_display', 'turno', 'escola', 'get_total_alunos', 'ano_letivo', 'ativa')
    list_filter = ('ano', 'turno', 'escola', 'ano_letivo', 'ativa', 'created_at')
    search_fields = ('nome', 'escola__nome')
    ordering = ('escola__nome', 'ano', 'nome')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Informações da Turma', {
            'fields': ('escola', 'nome', 'ano', 'turno', 'ano_letivo', 'ativa')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def get_total_alunos(self, obj):
        count = obj.total_alunos
        if count > 0:
            url = reverse('admin:dashboard_aluno_changelist') + f'?turma__id__exact={obj.id}'
            return format_html('<a href="{}">{} alunos</a>', url, count)
        return '0 alunos'
    get_total_alunos.short_description = 'Total Alunos'
    get_total_alunos.allow_tags = True


@admin.register(Aluno)
class AlunoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'codigo_aluno', 'turma', 'get_escola', 'get_idade', 'ativo', 'created_at')
    list_filter = ('turma__escola', 'turma__ano', 'ativo', 'created_at')
    search_fields = ('nome', 'codigo_aluno', 'turma__nome', 'turma__escola__nome')
    ordering = ('nome',)
    readonly_fields = ('created_at', 'updated_at', 'get_idade')
    
    fieldsets = (
        ('Informações do Aluno', {
            'fields': ('nome', 'codigo_aluno', 'turma', 'data_nascimento', 'ativo')
        }),
        ('Informações Calculadas', {
            'fields': ('get_idade',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def get_escola(self, obj):
        return obj.turma.escola.nome
    get_escola.short_description = 'Escola'
    get_escola.admin_order_field = 'turma__escola__nome'
    
    def get_idade(self, obj):
        idade = obj.idade
        return f'{idade} anos' if idade else 'Não informado'
    get_idade.short_description = 'Idade'


@admin.register(Disciplina)
class DisciplinaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'codigo', 'get_total_questoes', 'ativa', 'created_at')
    list_filter = ('ativa', 'created_at')
    search_fields = ('nome', 'codigo', 'descricao')
    ordering = ('nome',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Informações da Disciplina', {
            'fields': ('nome', 'codigo', 'ativa')
        }),
        ('Descrição', {
            'fields': ('descricao',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    def get_total_questoes(self, obj):
        count = Questao.objects.filter(gabarito__disciplina=obj).count()
        return f'{count} questões'
    get_total_questoes.short_description = 'Total Questões'


@admin.register(Gabarito)
class GabaritoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'disciplina', 'ano_escolar', 'get_total_questoes', 'ativo', 'data_criacao')
    list_filter = ('disciplina', 'ano_escolar', 'ativo', 'data_criacao')
    search_fields = ('nome', 'disciplina__nome')
    ordering = ('-data_criacao',)
    readonly_fields = ('data_criacao',)
    
    def get_total_questoes(self, obj):
        count = obj.questao_set.count()
        if count > 0:
            url = reverse('admin:dashboard_questao_changelist') + f'?gabarito__id__exact={obj.id}'
            return format_html('<a href="{}">{} questões</a>', url, count)
        return '0 questões'
    get_total_questoes.short_description = 'Total Questões'


@admin.register(Questao)
class QuestaoAdmin(admin.ModelAdmin):
    list_display = ('get_questao_display', 'gabarito', 'resposta_correta', 'get_total_respostas', 'get_percentual_acerto')
    list_filter = ('gabarito__disciplina', 'gabarito__ano_escolar', 'resposta_correta')
    search_fields = ('numero', 'gabarito__nome', 'habilidade')
    ordering = ('gabarito__nome', 'numero')
    
    def get_questao_display(self, obj):
        return f'Q{obj.numero} - {obj.gabarito.nome}'
    get_questao_display.short_description = 'Questão'
    get_questao_display.admin_order_field = 'numero'
    
    def get_total_respostas(self, obj):
        return obj.resposta_set.count()
    get_total_respostas.short_description = 'Total Respostas'
    
    def get_percentual_acerto(self, obj):
        total = obj.resposta_set.count()
        if total == 0:
            return 'N/A'
        acertos = obj.resposta_set.filter(correta=True).count()
        percentual = (acertos / total) * 100
        
        # Colorir baseado no desempenho
        if percentual >= 80:
            color = 'green'
        elif percentual >= 60:
            color = 'orange'
        else:
            color = 'red'
        
        return format_html(
            '<span style="color: {}; font-weight: bold;">{:.1f}%</span>',
            color, percentual
        )
    get_percentual_acerto.short_description = '% Acerto'


@admin.register(Resposta)
class RespostaAdmin(admin.ModelAdmin):
    list_display = ('get_aluno_turma', 'get_questao', 'resposta_aluno', 'get_correta_display', 'upload_resultado')
    list_filter = ('correta', 'questao__gabarito__disciplina', 'aluno__turma__escola')
    search_fields = ('aluno__nome', 'questao__numero', 'aluno__turma__nome')
    ordering = ('aluno__nome', 'questao__numero')
    
    def get_aluno_turma(self, obj):
        return f'{obj.aluno.nome} ({obj.aluno.turma})'
    get_aluno_turma.short_description = 'Aluno (Turma)'
    get_aluno_turma.admin_order_field = 'aluno__nome'
    
    def get_questao(self, obj):
        return f'Q{obj.questao.numero} - {obj.questao.gabarito.disciplina.nome}'
    get_questao.short_description = 'Questão'
    get_questao.admin_order_field = 'questao__numero'
    
    def get_correta_display(self, obj):
        if obj.correta:
            return format_html('<span style="color: green; font-weight: bold;">✓ Correta</span>')
        else:
            return format_html('<span style="color: red; font-weight: bold;">✗ Incorreta</span>')
    get_correta_display.short_description = 'Status'
    get_correta_display.admin_order_field = 'correta'


@admin.register(UploadResultado)
class UploadResultadoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'escola', 'get_processado_display', 'get_file_size', 'data_upload')
    list_filter = ('escola', 'processado', 'data_upload')
    search_fields = ('nome', 'escola__nome')
    ordering = ('-data_upload',)
    readonly_fields = ('data_upload', 'get_file_size')
    
    def get_processado_display(self, obj):
        if obj.processado:
            return format_html('<span style="color: green; font-weight: bold;">✓ Processado</span>')
        else:
            return format_html('<span style="color: orange; font-weight: bold;">⏳ Pendente</span>')
    get_processado_display.short_description = 'Status'
    get_processado_display.admin_order_field = 'processado'
    
    def get_file_size(self, obj):
        if obj.arquivo_csv:
            size = obj.arquivo_csv.size
            if size < 1024:
                return f'{size} bytes'
            elif size < 1024**2:
                return f'{size/1024:.1f} KB'
            else:
                return f'{size/(1024**2):.1f} MB'
        return 'N/A'
    get_file_size.short_description = 'Tamanho do Arquivo'


@admin.register(AnaliseDesempenho)
class AnaliseDesempenhoAdmin(admin.ModelAdmin):
    list_display = ('get_upload_name', 'total_alunos', 'total_questoes', 'get_media_display', 'data_analise')
    list_filter = ('data_analise',)
    search_fields = ('upload_resultado__nome', 'upload_resultado__escola__nome')
    ordering = ('-data_analise',)
    readonly_fields = ('data_analise',)
    
    def get_upload_name(self, obj):
        return obj.upload_resultado.nome
    get_upload_name.short_description = 'Upload'
    get_upload_name.admin_order_field = 'upload_resultado__nome'
    
    def get_media_display(self, obj):
        media = obj.media_geral
        if media >= 80:
            color = 'green'
        elif media >= 60:
            color = 'orange'
        else:
            color = 'red'
        
        return format_html(
            '<span style="color: {}; font-weight: bold;">{:.1f}%</span>',
            color, media
        )
    get_media_display.short_description = 'Média Geral'
    get_media_display.admin_order_field = 'media_geral'


# ==================== CUSTOMIZAÇÕES GLOBAIS ====================

# Personalizar o cabeçalho do admin
admin.site.site_header = "SADE - Sistema de Avaliação e Desempenho Educacional"
admin.site.site_title = "SADE Admin"
admin.site.index_title = "Painel de Administração"
