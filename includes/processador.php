<?php
/**
 * SADE - Processador de Arquivos
 * Processa gabaritos e provas das pastas existentes
 */

class ProcessadorArquivos {
    private $db;
    
    public function __construct() {
        $this->db = getDatabase();
    }
    
    /**
     * Processar todos os gabaritos
     */
    public function processarGabaritos() {
        $gabaritosDir = GABARITOS_DIR;
        $arquivos = glob($gabaritosDir . '*.csv');
        $processados = 0;
        
        foreach ($arquivos as $arquivo) {
            if ($this->processarGabarito($arquivo)) {
                $processados++;
            }
        }
        
        return $processados;
    }
    
    /**
     * Processar um gabarito específico
     */
    private function processarGabarito($arquivo) {
        $nomeArquivo = basename($arquivo);
        
        // Verificar se já foi processado
        $stmt = $this->db->prepare("SELECT id FROM gabaritos WHERE arquivo_origem = ?");
        $stmt->execute([$nomeArquivo]);
        if ($stmt->fetch()) {
            return false; // Já processado
        }
        
        // Extrair informações do nome do arquivo
        // Formato: 1oano_Língua_Portuguesa.csv
        if (preg_match('/(\d+)o?ano_(.+)\.csv/', $nomeArquivo, $matches)) {
            $ano = $matches[1] . 'º';
            $componente = str_replace('_', ' ', $matches[2]);
        } else {
            return false; // Formato inválido
        }
        
        // Ler arquivo CSV
        $handle = fopen($arquivo, 'r');
        if (!$handle) return false;
        
        // Pular cabeçalho
        $header = fgetcsv($handle);
        
        $identificador = null;
        $questoes = [];
        
        while (($data = fgetcsv($handle)) !== FALSE) {
            if (count($data) >= 4) {
                $identificador = $data[4] ?? null;
                $questao = (int)$data[2];
                $resposta = trim($data[3]);
                
                if ($questao > 0) {
                    $questoes[$questao] = $resposta;
                }
            }
        }
        fclose($handle);
        
        if (empty($questoes)) return false;
        
        try {
            $this->db->beginTransaction();
            
            // Inserir gabarito
            $stmt = $this->db->prepare("
                INSERT INTO gabaritos (ano, componente, identificador, arquivo_origem) 
                VALUES (?, ?, ?, ?)
            ");
            $stmt->execute([$ano, $componente, $identificador, $nomeArquivo]);
            $gabaritoId = $this->db->lastInsertId();
            
            // Inserir questões
            $stmt = $this->db->prepare("
                INSERT INTO questoes_gabarito (gabarito_id, questao, resposta_correta) 
                VALUES (?, ?, ?)
            ");
            
            foreach ($questoes as $numero => $resposta) {
                $stmt->execute([$gabaritoId, $numero, $resposta]);
            }
            
            $this->db->commit();
            return true;
            
        } catch (Exception $e) {
            $this->db->rollback();
            logActivity("Erro ao processar gabarito", $e->getMessage());
            return false;
        }
    }
    
    /**
     * Processar todas as provas
     */
    public function processarProvas() {
        $provasDir = PROVAS_DIR;
        $arquivos = glob($provasDir . '*.csv');
        $processados = 0;
        
        foreach ($arquivos as $arquivo) {
            if ($this->processarProva($arquivo)) {
                $processados++;
            }
        }
        
        return $processados;
    }
    
    /**
     * Processar uma prova específica
     */
    private function processarProva($arquivo) {
        $nomeArquivo = basename($arquivo);
        
        // Verificar se já foi processado
        $stmt = $this->db->prepare("SELECT id FROM provas WHERE arquivo_origem = ?");
        $stmt->execute([$nomeArquivo]);
        if ($stmt->fetch()) {
            return false; // Já processado
        }
        
        // Ler arquivo CSV
        $handle = fopen($arquivo, 'r');
        if (!$handle) return false;
        
        // Ler cabeçalho
        $header = fgetcsv($handle);
        if (!$header) {
            fclose($handle);
            return false;
        }
        
        $alunos = [];
        $nomeTesteGlobal = '';
        $turmaGlobal = '';
        
        while (($data = fgetcsv($handle)) !== FALSE) {
            if (count($data) >= 5) {
                $identificador = $data[0];
                $nome = $data[1];
                $nomeTeste = $data[2];
                $turma = $data[3];
                $pontuacao = str_replace('%', '', $data[4]);
                
                // Extrair respostas (colunas 5 em diante)
                $respostas = array_slice($data, 5);
                
                $alunos[] = [
                    'identificador' => $identificador,
                    'nome' => $nome,
                    'nome_teste' => $nomeTeste,
                    'turma' => $turma,
                    'pontuacao' => (float)$pontuacao,
                    'respostas' => $respostas
                ];
                
                if (empty($nomeTesteGlobal)) $nomeTesteGlobal = $nomeTeste;
                if (empty($turmaGlobal)) $turmaGlobal = $turma;
            }
        }
        fclose($handle);
        
        if (empty($alunos)) return false;
        
        // Extrair informações do teste
        $info = $this->extrairInfoTeste($nomeTesteGlobal, $turmaGlobal);
        
        try {
            $this->db->beginTransaction();
            
            // Inserir prova
            $stmt = $this->db->prepare("
                INSERT INTO provas (nome_teste, turma, escola, ano, componente, arquivo_origem) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $nomeTesteGlobal,
                $turmaGlobal,
                $info['escola'],
                $info['ano'],
                $info['componente'],
                $nomeArquivo
            ]);
            $provaId = $this->db->lastInsertId();
            
            // Buscar gabarito correspondente
            $gabaritoId = $this->buscarGabarito($info['ano'], $info['componente']);
            
            // Inserir alunos e respostas
            foreach ($alunos as $aluno) {
                // Inserir/atualizar aluno
                $stmt = $this->db->prepare("
                    INSERT OR REPLACE INTO alunos (identificador, nome) 
                    VALUES (?, ?)
                ");
                $stmt->execute([$aluno['identificador'], $aluno['nome']]);
                $alunoId = $this->db->lastInsertId();
                
                // Inserir respostas
                $this->inserirRespostas($provaId, $alunoId, $aluno, $gabaritoId);
            }
            
            $this->db->commit();
            return true;
            
        } catch (Exception $e) {
            $this->db->rollback();
            logActivity("Erro ao processar prova", $e->getMessage());
            return false;
        }
    }
    
    /**
     * Extrair informações do teste
     */
    private function extrairInfoTeste($nomeTeste, $turma) {
        $info = [
            'ano' => '',
            'componente' => '',
            'escola' => ''
        ];
        
        // Extrair ano do nome do teste ou turma
        if (preg_match('/(\d+)º?\s*ano/i', $nomeTeste . ' ' . $turma, $matches)) {
            $info['ano'] = $matches[1] . 'º';
        }
        
        // Extrair componente
        if (strpos($nomeTeste, 'LÍNGUA PORTUGUESA') !== false || strpos($nomeTeste, 'Língua Portuguesa') !== false) {
            $info['componente'] = 'Língua Portuguesa';
        } elseif (strpos($nomeTeste, 'MATEMÁTICA') !== false || strpos($nomeTeste, 'Matemática') !== false) {
            $info['componente'] = 'Matemática';
        }
        
        // Extrair escola do nome da turma
        if (preg_match('/- (.+?) \d{4}/', $turma, $matches)) {
            $info['escola'] = trim($matches[1]);
        }
        
        return $info;
    }
    
    /**
     * Buscar gabarito correspondente
     */
    private function buscarGabarito($ano, $componente) {
        $stmt = $this->db->prepare("
            SELECT id FROM gabaritos 
            WHERE ano = ? AND componente = ? 
            LIMIT 1
        ");
        $stmt->execute([$ano, $componente]);
        $resultado = $stmt->fetch();
        
        return $resultado ? $resultado['id'] : null;
    }
    
    /**
     * Inserir respostas do aluno
     */
    private function inserirRespostas($provaId, $alunoId, $aluno, $gabaritoId) {
        if (!$gabaritoId) return;
        
        // Buscar gabarito
        $stmt = $this->db->prepare("
            SELECT questao, resposta_correta 
            FROM questoes_gabarito 
            WHERE gabarito_id = ? 
            ORDER BY questao
        ");
        $stmt->execute([$gabaritoId]);
        $gabarito = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
        
        // Inserir respostas
        $stmt = $this->db->prepare("
            INSERT INTO respostas_alunos 
            (prova_id, aluno_id, identificador_aluno, nome_aluno, pontuacao_percentual, questao, resposta, correta) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        foreach ($aluno['respostas'] as $indice => $resposta) {
            $numeroQuestao = $indice + 1;
            $respostaCorreta = isset($gabarito[$numeroQuestao]) ? 
                ($resposta === $gabarito[$numeroQuestao]) : false;
            
            $stmt->execute([
                $provaId,
                $alunoId,
                $aluno['identificador'],
                $aluno['nome'],
                $aluno['pontuacao'],
                $numeroQuestao,
                $resposta,
                $respostaCorreta ? 1 : 0
            ]);
        }
    }
    
    /**
     * Obter estatísticas do processamento
     */
    public function getEstatisticas() {
        $stats = [];
        
        // Gabaritos processados
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM gabaritos");
        $stmt->execute();
        $stats['gabaritos'] = $stmt->fetchColumn();
        
        // Provas processadas
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM provas");
        $stmt->execute();
        $stats['provas'] = $stmt->fetchColumn();
        
        // Alunos únicos
        $stmt = $this->db->prepare("SELECT COUNT(DISTINCT identificador) FROM alunos");
        $stmt->execute();
        $stats['alunos'] = $stmt->fetchColumn();
        
        // Total de respostas
        $stmt = $this->db->prepare("SELECT COUNT(*) FROM respostas_alunos");
        $stmt->execute();
        $stats['respostas'] = $stmt->fetchColumn();
        
        return $stats;
    }
}
?>
