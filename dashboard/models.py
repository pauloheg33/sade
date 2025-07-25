"""
Models para o Sistema SADE (Sistema de Avaliação e Desempenho Educacional)
Modelos otimizados com boas práticas Django
"""

from django.db import models
from django.core.validators import FileExtensionValidator, MinValueValidator, MaxValueValidator
from django.utils import timezone
from django.urls import reverse
import os


class TimeStampedModel(models.Model):
    """Model abstrato com campos de timestamp"""
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Criado em")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Atualizado em")
    
    class Meta:
        abstract = True


class Escola(TimeStampedModel):
    """Modelo representando uma escola"""
    nome = models.CharField(
        max_length=255, 
        unique=True,
        verbose_name="Nome da Escola",
        help_text="Nome oficial da instituição de ensino"
    )
    codigo_inep = models.CharField(
        max_length=20, 
        unique=True, 
        null=True, 
        blank=True,
        verbose_name="Código INEP",
        help_text="Código único da escola no INEP"
    )
    endereco = models.TextField(
        blank=True, 
        verbose_name="Endereço",
        help_text="Endereço completo da escola"
    )
    ativa = models.BooleanField(
        default=True,
        verbose_name="Escola Ativa",
        help_text="Indica se a escola está ativa no sistema"
    )
    
    class Meta:
        verbose_name = "Escola"
        verbose_name_plural = "Escolas"
        ordering = ['nome']
    
    def __str__(self):
        return self.nome
    
    def get_absolute_url(self):
        return reverse('escola_detail', kwargs={'pk': self.pk})

class Turma(TimeStampedModel):
    """Modelo representando uma turma escolar"""
    ANO_CHOICES = [
        ('1ano', '1º Ano'),
        ('2ano', '2º Ano'),
        ('3ano', '3º Ano'),
        ('4ano', '4º Ano'),
        ('5ano', '5º Ano'),
        ('6ano', '6º Ano'),
        ('7ano', '7º Ano'),
        ('8ano', '8º Ano'),
        ('9ano', '9º Ano'),
    ]
    
    TURNO_CHOICES = [
        ('matutino', 'Matutino'),
        ('vespertino', 'Vespertino'),
        ('noturno', 'Noturno'),
        ('integral', 'Integral'),
    ]
    
    escola = models.ForeignKey(
        Escola, 
        on_delete=models.CASCADE,
        related_name='turmas',
        verbose_name="Escola"
    )
    nome = models.CharField(
        max_length=50,
        verbose_name="Nome da Turma",
        help_text="Ex: 5º A, 7º B, etc."
    )
    ano = models.CharField(
        max_length=20, 
        choices=ANO_CHOICES,
        verbose_name="Ano Escolar"
    )
    turno = models.CharField(
        max_length=20,
        choices=TURNO_CHOICES,
        default='matutino',
        verbose_name="Turno"
    )
    ano_letivo = models.PositiveIntegerField(
        default=timezone.now().year,
        validators=[MinValueValidator(2020), MaxValueValidator(2050)],
        verbose_name="Ano Letivo"
    )
    ativa = models.BooleanField(
        default=True,
        verbose_name="Turma Ativa"
    )
    
    class Meta:
        verbose_name = "Turma"
        verbose_name_plural = "Turmas"
        ordering = ['escola__nome', 'ano', 'nome']
        unique_together = ['escola', 'nome', 'ano_letivo']
    
    def __str__(self):
        return f"{self.nome} ({self.get_ano_display()}) - {self.escola.nome}"
    
    @property
    def total_alunos(self):
        """Retorna o total de alunos na turma"""
        return self.alunos.count()
    
    def get_absolute_url(self):
        return reverse('turma_detail', kwargs={'pk': self.pk})

class Aluno(TimeStampedModel):
    """Modelo representando um aluno"""
    turma = models.ForeignKey(
        Turma, 
        on_delete=models.CASCADE,
        related_name='alunos',
        verbose_name="Turma"
    )
    nome = models.CharField(
        max_length=255,
        verbose_name="Nome Completo",
        help_text="Nome completo do aluno"
    )
    codigo_aluno = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True,
        verbose_name="Código do Aluno",
        help_text="Matrícula ou código único do aluno"
    )
    data_nascimento = models.DateField(
        null=True,
        blank=True,
        verbose_name="Data de Nascimento"
    )
    ativo = models.BooleanField(
        default=True,
        verbose_name="Aluno Ativo"
    )
    
    class Meta:
        verbose_name = "Aluno"
        verbose_name_plural = "Alunos"
        ordering = ['nome']
        unique_together = ['turma', 'codigo_aluno']
    
    def __str__(self):
        return f"{self.nome} - {self.turma}"
    
    @property
    def idade(self):
        """Calcula a idade do aluno baseada na data de nascimento"""
        if self.data_nascimento:
            today = timezone.now().date()
            return today.year - self.data_nascimento.year - ((today.month, today.day) < (self.data_nascimento.month, self.data_nascimento.day))
        return None
    
    def get_absolute_url(self):
        return reverse('aluno_detail', kwargs={'pk': self.pk})

class Disciplina(TimeStampedModel):
    """Modelo representando uma disciplina"""
    nome = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Nome da Disciplina"
    )
    codigo = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True,
        verbose_name="Código da Disciplina"
    )
    descricao = models.TextField(
        blank=True,
        verbose_name="Descrição",
        help_text="Descrição detalhada da disciplina"
    )
    ativa = models.BooleanField(
        default=True,
        verbose_name="Disciplina Ativa"
    )
    
    class Meta:
        verbose_name = "Disciplina"
        verbose_name_plural = "Disciplinas"
        ordering = ['nome']
    
    def __str__(self):
        return self.nome
    
    def get_absolute_url(self):
        return reverse('disciplina_detail', kwargs={'pk': self.pk})

def gabarito_upload_path(instance, filename):
    """Define o caminho de upload para gabaritos baseado no ano escolar"""
    ano = instance.ano_escolar
    if ano in ['1ano', '2ano', '3ano', '4ano', '5ano']:
        nivel = 'ensino_fundamental_1'
    else:
        nivel = 'ensino_fundamental_2'
    
    return f'gabaritos/{nivel}/{ano}/{filename}'

class Gabarito(models.Model):
    ANO_CHOICES = [
        ('1ano', '1º Ano'),
        ('2ano', '2º Ano'),
        ('3ano', '3º Ano'),
        ('4ano', '4º Ano'),
        ('5ano', '5º Ano'),
        ('6ano', '6º Ano'),
        ('7ano', '7º Ano'),
        ('8ano', '8º Ano'),
        ('9ano', '9º Ano'),
    ]
    
    nome = models.CharField(max_length=255, help_text="Nome identificador do gabarito")
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)
    ano_escolar = models.CharField(max_length=20, choices=ANO_CHOICES)
    arquivo_csv = models.FileField(
        upload_to=gabarito_upload_path,
        validators=[FileExtensionValidator(['csv'])],
        help_text="Arquivo CSV com as respostas corretas"
    )
    data_criacao = models.DateTimeField(auto_now_add=True)
    ativo = models.BooleanField(default=True, help_text="Gabarito ativo para uso")
    
    class Meta:
        verbose_name = "Gabarito"
        verbose_name_plural = "Gabaritos"
        ordering = ['-data_criacao']
    
    def __str__(self):
        return f"{self.nome} - {self.disciplina.nome} ({self.get_ano_escolar_display()})"

def resultado_upload_path(instance, filename):
    """Define o caminho de upload para resultados"""
    return f'resultados/{filename}'

class UploadResultado(models.Model):
    nome = models.CharField(max_length=255, help_text="Nome identificador do upload")
    escola = models.ForeignKey(Escola, on_delete=models.CASCADE)
    arquivo_csv = models.FileField(
        upload_to=resultado_upload_path,
        validators=[FileExtensionValidator(['csv'])],
        help_text="Arquivo CSV com os resultados dos alunos"
    )
    data_upload = models.DateTimeField(auto_now_add=True)
    processado = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = "Upload de Resultado"
        verbose_name_plural = "Uploads de Resultados"
        ordering = ['-data_upload']
    
    def __str__(self):
        return f"{self.nome} - {self.escola.nome}"

class Questao(models.Model):
    gabarito = models.ForeignKey(Gabarito, on_delete=models.CASCADE)
    numero = models.PositiveIntegerField()
    resposta_correta = models.CharField(max_length=1, choices=[
        ('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E')
    ])
    habilidade = models.CharField(max_length=255, blank=True, help_text="Habilidade avaliada (opcional)")
    
    class Meta:
        unique_together = ['gabarito', 'numero']
        ordering = ['numero']
    
    def __str__(self):
        return f"Q{self.numero} - {self.gabarito.nome}"

class Resposta(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE)
    questao = models.ForeignKey(Questao, on_delete=models.CASCADE)
    resposta_aluno = models.CharField(max_length=1, choices=[
        ('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('E', 'E'), ('', 'Não respondida')
    ])
    correta = models.BooleanField()
    upload_resultado = models.ForeignKey(UploadResultado, on_delete=models.CASCADE, null=True, blank=True)
    
    class Meta:
        unique_together = ['aluno', 'questao']
    
    def save(self, *args, **kwargs):
        # Automaticamente define se a resposta está correta
        self.correta = self.resposta_aluno == self.questao.resposta_correta
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.aluno.nome} - {self.questao}"

class AnaliseDesempenho(models.Model):
    upload_resultado = models.OneToOneField(UploadResultado, on_delete=models.CASCADE)
    total_alunos = models.PositiveIntegerField()
    total_questoes = models.PositiveIntegerField()
    media_geral = models.FloatField(help_text="Média geral de acertos (%)")
    data_analise = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Análise de Desempenho"
        verbose_name_plural = "Análises de Desempenho"
    
    def __str__(self):
        return f"Análise - {self.upload_resultado.nome}"
