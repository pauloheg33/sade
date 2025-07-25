from django.db import models

# Create your models here.

class Escola(models.Model):
    nome = models.CharField(max_length=255)
    
    def __str__(self):
        return self.nome

class Turma(models.Model):
    escola = models.ForeignKey(Escola, on_delete=models.CASCADE)
    nome = models.CharField(max_length=50)
    ano = models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.nome} ({self.ano}) - {self.escola.nome}"

class Aluno(models.Model):
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE)
    nome = models.CharField(max_length=255)
    
    def __str__(self):
        return self.nome

class Disciplina(models.Model):
    nome = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nome

class Questao(models.Model):
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)
    numero = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.disciplina.nome} - Questão {self.numero}"

class Resposta(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE)
    questao = models.ForeignKey(Questao, on_delete=models.CASCADE)
    resposta = models.CharField(max_length=10)
    
    def __str__(self):
        return f"{self.aluno.nome} - {self.questao}"
