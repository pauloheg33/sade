<?php
/**
 * Funções e classes utilitárias do SADE
 */

// ----------------------
// Funções auxiliares
// ----------------------

/** Sanitiza entradas de formulários */
function sanitizeInput($input) {
    if (is_array($input)) {
        return array_map('sanitizeInput', $input);
    }
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/** Valida e-mails */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/** Escreve logs simples de atividade */
function logActivity($action, $details = '') {
    $log  = date('Y-m-d H:i:s') . " - $action";
    if ($details) {
        $log .= " - $details";
    }
    $log .= " - IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'CLI') . "\n";
    file_put_contents(LOGS_DIR . '/activity.log', $log, FILE_APPEND | LOCK_EX);
}

/** Faz login fictício (mantido para compatibilidade) */
function doLogin($user, $pass) {
    // Sistema sem autenticação
    $_SESSION['user_id'] = 1;
    $_SESSION['username'] = $user;
    return true;
}

/** Finaliza sessão fictícia */
function doLogout() {
    session_destroy();
}

/** Formata bytes em unidades legíveis */
function formatBytes($bytes, $precision = 2) {
    $units = ['B', 'KB', 'MB', 'GB', 'TB'];
    for ($i = 0; $bytes >= 1024 && $i < count($units) - 1; $i++) {
        $bytes /= 1024;
    }
    return round($bytes, $precision) . ' ' . $units[$i];
}

/** Lista escolas disponíveis */
function getAvailableSchools() {
    $db = getDatabase();
    $stmt = $db->query("SELECT DISTINCT escola FROM provas ORDER BY escola");
    return $stmt->fetchAll(PDO::FETCH_COLUMN);
}

/** Lista anos disponíveis */
function getAvailableYears() {
    $db = getDatabase();
    $stmt = $db->query("SELECT DISTINCT ano FROM provas ORDER BY ano");
    return $stmt->fetchAll(PDO::FETCH_COLUMN);
}

/** Obtém turmas de uma escola */
function getTurmasBySchool($escola) {
    $db = getDatabase();
    $stmt = $db->prepare("SELECT DISTINCT turma FROM provas WHERE escola = ? ORDER BY turma");
    $stmt->execute([$escola]);
    return $stmt->fetchAll(PDO::FETCH_COLUMN);
}

/** Estatísticas globais do sistema */
function getSystemStatistics() {
    $db = getDatabase();
    return [
        'provas'     => (int)$db->query("SELECT COUNT(*) FROM provas")->fetchColumn(),
        'gabaritos'  => (int)$db->query("SELECT COUNT(*) FROM gabaritos")->fetchColumn(),
        'alunos'     => (int)$db->query("SELECT COUNT(DISTINCT identificador_aluno) FROM respostas_alunos")->fetchColumn(),
        'respostas'  => (int)$db->query("SELECT COUNT(*) FROM respostas_alunos")->fetchColumn(),
    ];
}

// ----------------------
// Classes auxiliares
// ----------------------

class DataManager {
    private $db;

    public function __construct() {
        $this->db = getDatabase();
    }

    public function getAnos() {
        $stmt = $this->db->query("SELECT DISTINCT ano FROM provas ORDER BY ano");
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public function getComponentes() {
        $stmt = $this->db->query("SELECT DISTINCT componente FROM provas ORDER BY componente");
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    public function getEscolas() {
        return getAvailableSchools();
    }

    public function getTurmas() {
        $stmt = $this->db->query("SELECT DISTINCT turma FROM provas ORDER BY turma");
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
}

class CSVProcessor {
    private $processor;

    public function __construct() {
        $this->processor = new ProcessadorArquivos();
    }

    public function processarTodos() {
        $g = $this->processor->processarGabaritos();
        $p = $this->processor->processarProvas();
        return ['gabaritos' => $g, 'provas' => $p];
    }
}

class ReportGenerator {
    private $db;

    public function __construct() {
        $this->db = getDatabase();
    }

    public function gerarRelatorio(array $filtros = []) {
        $where = [];
        $params = [];
        foreach (['ano','componente','escola','turma'] as $campo) {
            if (!empty($filtros[$campo])) {
                $where[] = "$campo = ?";
                $params[] = $filtros[$campo];
            }
        }
        $sqlWhere = $where ? ('WHERE ' . implode(' AND ', $where)) : '';

        $stmt = $this->db->prepare(
            "SELECT COUNT(DISTINCT identificador_aluno) AS total_alunos, " .
            "AVG(pontuacao_percentual) AS media_geral, " .
            "COUNT(DISTINCT p.id) AS total_provas " .
            "FROM provas p LEFT JOIN respostas_alunos ra ON p.id = ra.prova_id $sqlWhere"
        );
        $stmt->execute($params);
        $resumo = $stmt->fetch() ?: ['total_alunos' => 0, 'media_geral' => 0, 'total_provas' => 0];

        $stmt = $this->db->prepare(
            "SELECT componente, COUNT(DISTINCT identificador_aluno) AS total_alunos, " .
            "AVG(pontuacao_percentual) AS media FROM provas p " .
            "LEFT JOIN respostas_alunos ra ON p.id = ra.prova_id $sqlWhere " .
            "GROUP BY componente ORDER BY componente"
        );
        $stmt->execute($params);
        $porComponente = $stmt->fetchAll();

        $stmt = $this->db->prepare(
            "SELECT escola, turma, COUNT(DISTINCT identificador_aluno) AS total_alunos, " .
            "AVG(pontuacao_percentual) AS media FROM provas p " .
            "LEFT JOIN respostas_alunos ra ON p.id = ra.prova_id $sqlWhere " .
            "GROUP BY escola, turma ORDER BY escola, turma"
        );
        $stmt->execute($params);
        $porTurma = $stmt->fetchAll();

        return [
            'resumo' => $resumo,
            'por_componente' => $porComponente,
            'por_turma' => $porTurma,
        ];
    }
}

