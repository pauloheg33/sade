from django.db import models
from django.core.validators import FileExtensionValidator
import os

# Create your models here.

class Escola(models.Model):
    nome = models.CharField(max_length=255)
    
    def __str__(self):
        return self.nome

class Turma(models.Model):
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
    
    escola = models.ForeignKey(Escola, on_delete=models.CASCADE)
    nome = models.CharField(max_length=50)
    ano = models.CharField(max_length=20, choices=ANO_CHOICES)
    
    def __str__(self):
        return f"{self.nome} ({self.get_ano_display()}) - {self.escola.nome}"

class Aluno(models.Model):
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE)
    nome = models.CharField(max_length=255)
    
    def __str__(self):
        return self.nome

class Disciplina(models.Model):
    nome = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nome

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
