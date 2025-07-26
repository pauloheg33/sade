#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SADE - Sistema de Avaliação e Desempenho Escolar
Script para processar dados dos gráficos e gerar arquivo de dados estruturado.
Este script lê os nomes dos arquivos de imagem da pasta 'data', extrai metadados 
e gera um arquivo sade_data.js para ser usado pela aplicação web.

Autor: Paulo Henrique
Data: 26 de julho de 2025
"""

import os
import json
import re
from pathlib import Path
from datetime import datetime

class SADEDataProcessor:
    """
    Processa os dados dos gráficos do SADE, extraindo informações dos nomes dos arquivos
    e estruturando-os em um formato JSON aninhado para a aplicação.
    """
    def __init__(self, base_path="./data"):
        """
        Inicializa o processador.
        Args:
            base_path (str): Caminho para a pasta raiz dos dados (anteriormente 'Graficos').
        """
        self.base_path = Path(base_path)
        self.data = {
            "PROEA": {},
            "CNCA": {},
            "metadata": {
                "generation_date": datetime.now().isoformat(),
                "total_evaluations": 0,
                "schools": set(),
                "subjects": set(),
                "grades": set()
            }
        }
        print(f"🚀 SADE Data Processor v2.0 inicializado. Lendo de: {self.base_path.resolve()}")

    def process_data(self):
        """
        Orquestra o processo de leitura, processamento e salvamento dos dados.
        """
        print("🔍 Iniciando varredura e processamento dos diretórios...")
        
        # Mapeamento de diretórios para programas
        program_paths = {
            "PROEA": self.base_path / "AVALIAÇÃO DAS APRENDIZAGENS DOS ANOS FINAIS - PROEA",
            "CNCA": self.base_path / "CNCA - COMPROMISSO CRIANÇA ALFABETIZADA"
        }

        for program, path in program_paths.items():
            if path.exists():
                print(f"Processing {program} data from {path}...")
                self._process_program_data(program, path)
            else:
                print(f"⚠️  Aviso: Diretório do programa {program} não encontrado em {path}")

        self._finalize_metadata()
        self._save_data_as_js()
        
        print("\n✅ Processamento concluído com sucesso!")
        self._print_summary()

    def _process_program_data(self, program_name, program_path):
        """
        Processa os dados para um programa específico (PROEA ou CNCA).
        """
        for grade_folder in program_path.iterdir():
            if not grade_folder.is_dir():
                continue
            
            grade_name = grade_folder.name
            self.data["metadata"]["grades"].add(grade_name)

            for subject_folder in grade_folder.iterdir():
                if not subject_folder.is_dir():
                    continue
                
                subject_name = subject_folder.name
                self.data["metadata"]["subjects"].add(subject_name)

                for image_file in subject_folder.glob("*.png"):
                    self._parse_and_store_file_info(program_name, grade_name, subject_name, image_file)

    def _parse_and_store_file_info(self, program, grade, subject, image_path):
        """
        Extrai informações do nome do arquivo e as armazena na estrutura de dados.
        """
        filename = image_path.name
        
        # Regex para extrair: Escola, Média e Alunos
        # Ex: 6º_Ano_ANTONIO_DE_SOUSA_BARROS_CN_Media65.1_Alunos12.png
        match = re.search(r'_(.+?)_Media([\d.]+)_Alunos(\d+)\.png', filename)
        
        if not match:
            print(f"⚠️  Padrão não reconhecido no arquivo: {filename}")
            return

        school_part, media_str, alunos_str = match.groups()
        
        # Limpa o nome da escola, removendo o código da disciplina se presente
        school_name = re.sub(f'_{subject}$', '', school_part).replace('_', ' ').strip()
        
        # Adiciona à lista de escolas nos metadados
        self.data["metadata"]["schools"].add(school_name)

        # Estrutura os dados
        data_point = {
            "media": float(media_str),
            "alunos": int(alunos_str),
            "imagem": str(image_path).replace('\\', '/') # Garante barras corretas
        }

        # Insere na estrutura aninhada
        if grade not in self.data[program]:
            self.data[program][grade] = {}
        if subject not in self.data[program][grade]:
            self.data[program][grade][subject] = {}
        
        self.data[program][grade][subject][school_name] = data_point
        self.data["metadata"]["total_evaluations"] += 1

    def _finalize_metadata(self):
        """
        Converte sets em listas ordenadas para o JSON final.
        """
        meta = self.data["metadata"]
        meta["schools"] = sorted(list(meta["schools"]))
        meta["subjects"] = sorted(list(meta["subjects"]))
        meta["grades"] = sorted(list(meta["grades"]))
        meta["total_schools"] = len(meta["schools"])
        meta["total_subjects"] = len(meta["subjects"])
        meta["total_grades"] = len(meta["grades"])

    def _save_data_as_js(self):
        """
        Salva a estrutura de dados em um arquivo JavaScript (sade_data.js).
        """
        output_file = "sade_data.js"
        
        # Converte o dicionário Python para uma string JSON formatada
        json_string = json.dumps(self.data, ensure_ascii=False, indent=4)
        
        # Cria o conteúdo do arquivo JS
        js_content = f"""/**
 * SADE - Sistema de Avaliação e Desempenho Escolar
 * Base de Dados Estruturada
 * 
 * Gerado automaticamente em: {self.data['metadata']['generation_date']}
 * ATENÇÃO: Não edite este arquivo manualmente. Ele é gerado pelo script process_data.py
 */
const SADE_DATA = {json_string};

// Exportar para uso em ambientes Node.js (se necessário)
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {{
    module.exports = SADE_DATA;
}}
"""
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"\n� Dados estruturados e salvos com sucesso em: '{output_file}'")

    def _print_summary(self):
        """
        Imprime um resumo dos dados processados.
        """
        meta = self.data["metadata"]
        print("\n📊 Resumo do Processamento:")
        print("-" * 30)
        print(f"  - Data de Geração: {meta['generation_date']}")
        print(f"  - Total de Avaliações: {meta['total_evaluations']}")
        print(f"  - Total de Escolas: {meta['total_schools']}")
        print(f"  - Total de Disciplinas: {meta['total_subjects']}")
        print(f"  - Total de Anos/Séries: {meta['total_grades']}")
        print("\n🏫 Escolas Encontradas:")
        for school in meta['schools']:
            print(f"    - {school}")
        print("-" * 30)


if __name__ == "__main__":
    # O script espera ser executado do diretório raiz do projeto
    processor = SADEDataProcessor(base_path="./data")
    processor.process_data()
    processor.process_all_data()
    processor.generate_report()
