#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SADE - Sistema de Avaliação e Desempenho Escolar
Script para processar dados dos gráficos e gerar arquivo de dados JSON
Secretaria da Educação de Ararendá
"""

import os
import json
import re
from pathlib import Path

class SADEDataProcessor:
    def __init__(self, base_path="./Graficos"):
        self.base_path = Path(base_path)
        self.data = {
            "proea": [],
            "cnca": [],
            "metadata": {
                "total_schools": 0,
                "total_students": 0,
                "total_evaluations": 0,
                "generation_date": None
            }
        }
    
    def process_all_data(self):
        """Processa todos os dados dos gráficos"""
        print("🔍 Iniciando processamento dos dados do SADE...")
        
        # Processar PROEA
        proea_path = self.base_path / "AVALIAÇÃO DAS APRENDIZAGENS DOS ANOS FINAIS - PROEA"
        if proea_path.exists():
            self.process_proea_data(proea_path)
        
        # Processar CNCA
        cnca_path = self.base_path / "CNCA - COMPROMISSO CRIANÇA ALFABETIZADA"
        if cnca_path.exists():
            self.process_cnca_data(cnca_path)
        
        # Calcular metadados
        self.calculate_metadata()
        
        # Salvar dados
        self.save_data()
        
        print(f"✅ Processamento concluído!")
        print(f"📊 Total de avaliações PROEA: {len(self.data['proea'])}")
        print(f"📊 Total de avaliações CNCA: {len(self.data['cnca'])}")
        print(f"🎯 Total de escolas: {self.data['metadata']['total_schools']}")
        print(f"👥 Total de alunos: {self.data['metadata']['total_students']}")
    
    def process_proea_data(self, proea_path):
        """Processa dados do PROEA"""
        print("📈 Processando dados PROEA...")
        
        for grade_folder in proea_path.iterdir():
            if not grade_folder.is_dir():
                continue
                
            # Extrair número do ano
            grade_match = re.search(r'(\d+)_ano', grade_folder.name)
            if not grade_match:
                continue
                
            grade = int(grade_match.group(1))
            
            for subject_folder in grade_folder.iterdir():
                if not subject_folder.is_dir():
                    continue
                    
                subject = subject_folder.name
                
                for image_file in subject_folder.glob("*.png"):
                    data_item = self.parse_filename(image_file, "PROEA", grade, subject)
                    if data_item:
                        self.data["proea"].append(data_item)
    
    def process_cnca_data(self, cnca_path):
        """Processa dados do CNCA"""
        print("📚 Processando dados CNCA...")
        
        for grade_folder in cnca_path.iterdir():
            if not grade_folder.is_dir():
                continue
                
            # Extrair número do ano
            grade_match = re.search(r'(\d+)_ano', grade_folder.name)
            if not grade_match:
                continue
                
            grade = int(grade_match.group(1))
            
            for subject_folder in grade_folder.iterdir():
                if not subject_folder.is_dir():
                    continue
                    
                subject = subject_folder.name
                
                for image_file in subject_folder.glob("*.png"):
                    data_item = self.parse_filename(image_file, "CNCA", grade, subject)
                    if data_item:
                        self.data["cnca"].append(data_item)
    
    def parse_filename(self, image_path, program, grade, subject):
        """Analisa o nome do arquivo para extrair dados"""
        filename = image_path.name
        
        # Padrões para extrair informações
        # Exemplo: 6º_Ano_21_DE_DEZEMBRO_CN_Media71.5_Alunos32.png
        patterns = [
            r'(\d+)[ºo]_Ano_(.+?)_([A-Z]+)_Media([\d.]+)_Alunos(\d+)\.png',
            r'(\d+)[ºo]_Ano_(.+)_Media([\d.]+)_Alunos(\d+)\.png'
        ]
        
        for pattern in patterns:
            match = re.match(pattern, filename)
            if match:
                if len(match.groups()) == 5:
                    file_grade, school_variation, file_subject, average, students = match.groups()
                    subject_code = file_subject
                elif len(match.groups()) == 4:
                    file_grade, school_variation, average, students = match.groups()
                    subject_code = subject
                else:
                    continue
                
                # Limpar nome da escola
                school_name = self.clean_school_name(school_variation)
                
                # Determinar desempenho
                avg_float = float(average)
                performance = self.get_performance_level(avg_float)
                
                return {
                    "program": program,
                    "school": school_name,
                    "school_variation": school_variation,
                    "grade": int(file_grade),
                    "subject": subject_code,
                    "subject_name": self.get_subject_name(subject_code),
                    "students": int(students),
                    "average": avg_float,
                    "performance": performance,
                    "performance_name": self.get_performance_name(performance),
                    "image_path": str(image_path.relative_to(Path("."))),
                    "filename": filename
                }
        
        print(f"⚠️  Não foi possível analisar: {filename}")
        return None
    
    def clean_school_name(self, variation):
        """Limpa e padroniza nomes de escolas"""
        # Remover prefixos como A_-_, B_-_
        clean_name = re.sub(r'^[AB]_-_', '', variation)
        
        # Substituir underscores por espaços
        clean_name = clean_name.replace('_', ' ')
        
        # Remover sufixos como _A, _B
        clean_name = re.sub(r'_[ABC]$', '', clean_name)
        
        # Casos especiais
        replacements = {
            'JOSE ALVES DE SENA': 'JOSE ALVES',
            'FIRMINO JOSÉ': 'FIRMINO JOSÉ',
            '03 DE DEZEMBRO': '03 DE DEZEMBRO',
            '21 DE DEZEMBRO': '21 DE DEZEMBRO',
            'ANTONIO DE SOUSA BARROS': 'ANTONIO DE SOUSA BARROS',
            'JOAQUIM FERREIRA': 'JOAQUIM FERREIRA',
            'MOURÃO LIMA': 'MOURÃO LIMA'
        }
        
        for old, new in replacements.items():
            if old in clean_name:
                return new
        
        return clean_name.title()
    
    def get_subject_name(self, code):
        """Retorna nome completo da disciplina"""
        subjects = {
            'LP': 'Língua Portuguesa',
            'MAT': 'Matemática',
            'CN': 'Ciências Naturais'
        }
        return subjects.get(code, code)
    
    def get_performance_level(self, average):
        """Determina nível de desempenho"""
        if average >= 80:
            return 'excellent'
        elif average >= 70:
            return 'good'
        elif average >= 60:
            return 'average'
        else:
            return 'poor'
    
    def get_performance_name(self, level):
        """Retorna nome do nível de desempenho"""
        levels = {
            'excellent': 'Excelente',
            'good': 'Bom',
            'average': 'Regular',
            'poor': 'Insuficiente'
        }
        return levels.get(level, level)
    
    def calculate_metadata(self):
        """Calcula metadados gerais"""
        all_data = self.data["proea"] + self.data["cnca"]
        
        # Total de escolas únicas
        schools = set()
        total_students = 0
        
        for item in all_data:
            schools.add(item["school"])
            total_students += item["students"]
        
        self.data["metadata"] = {
            "total_schools": len(schools),
            "total_students": total_students,
            "total_evaluations": len(all_data),
            "generation_date": "2025-07-25",
            "municipality": "Ararendá",
            "state": "Ceará",
            "programs": {
                "proea": {
                    "name": "Programa de Avaliação da Educação - Anos Finais",
                    "grades": [6, 7, 8, 9],
                    "subjects": ["LP", "MAT", "CN"],
                    "evaluations": len(self.data["proea"])
                },
                "cnca": {
                    "name": "Compromisso Nacional Criança Alfabetizada",
                    "grades": [1, 2, 3, 4, 5],
                    "subjects": ["LP", "MAT"],
                    "evaluations": len(self.data["cnca"])
                }
            },
            "schools": sorted(list(schools))
        }
    
    def save_data(self):
        """Salva dados em arquivo JSON"""
        output_file = "sade_data.json"
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
        
        print(f"💾 Dados salvos em: {output_file}")
        
        # Também criar uma versão JavaScript
        js_content = f"""// Dados do SADE - Sistema de Avaliação e Desempenho Escolar
// Gerado automaticamente em {self.data['metadata']['generation_date']}
// Secretaria da Educação de Ararendá

const SADE_DATA = {json.dumps(self.data, ensure_ascii=False, indent=2)};

// Exportar para uso no sistema
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = SADE_DATA;
}}
"""
        
        with open("sade_data.js", 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"📄 Arquivo JavaScript gerado: sade_data.js")
    
    def generate_report(self):
        """Gera relatório resumido"""
        print("\n" + "="*60)
        print("📋 RELATÓRIO DO SISTEMA SADE")
        print("="*60)
        
        all_data = self.data["proea"] + self.data["cnca"]
        
        # Estatísticas gerais
        avg_performance = sum(item["average"] for item in all_data) / len(all_data)
        
        print(f"🏫 Município: {self.data['metadata']['municipality']}")
        print(f"📊 Total de Avaliações: {self.data['metadata']['total_evaluations']}")
        print(f"🎯 Total de Escolas: {self.data['metadata']['total_schools']}")
        print(f"👥 Total de Alunos: {self.data['metadata']['total_students']}")
        print(f"📈 Média Geral: {avg_performance:.1f}")
        
        # Por programa
        print(f"\n📚 PROEA (Anos Finais): {len(self.data['proea'])} avaliações")
        if self.data['proea']:
            proea_avg = sum(item["average"] for item in self.data["proea"]) / len(self.data["proea"])
            print(f"   Média PROEA: {proea_avg:.1f}")
        
        print(f"📝 CNCA (Alfabetização): {len(self.data['cnca'])} avaliações")
        if self.data['cnca']:
            cnca_avg = sum(item["average"] for item in self.data["cnca"]) / len(self.data["cnca"])
            print(f"   Média CNCA: {cnca_avg:.1f}")
        
        # Por disciplina
        print(f"\n📊 DESEMPENHO POR DISCIPLINA:")
        subjects = {}
        for item in all_data:
            subject = item["subject_name"]
            if subject not in subjects:
                subjects[subject] = []
            subjects[subject].append(item["average"])
        
        for subject, averages in subjects.items():
            avg = sum(averages) / len(averages)
            print(f"   {subject}: {avg:.1f} ({len(averages)} avaliações)")
        
        print("\n" + "="*60)

if __name__ == "__main__":
    processor = SADEDataProcessor()
    processor.process_all_data()
    processor.generate_report()
