<?php
require_once 'config.php';

$db = getDatabase();
$total_escolas = $db->query("SELECT COUNT(DISTINCT escola) FROM provas")->fetchColumn() ?: 0;
$total_turmas = $db->query("SELECT COUNT(DISTINCT turma) FROM provas")->fetchColumn() ?: 0;
$total_provas = $db->query("SELECT COUNT(*) FROM provas")->fetchColumn() ?: 0;
$total_alunos = $db->query("SELECT COUNT(*) FROM respostas_alunos")->fetchColumn() ?: 0;

$escolas = $db->query("SELECT DISTINCT escola FROM provas ORDER BY escola")->fetchAll(PDO::FETCH_COLUMN);
$turmas = $db->query("SELECT DISTINCT turma FROM provas ORDER BY turma")->fetchAll(PDO::FETCH_COLUMN);
$anos = $db->query("SELECT DISTINCT ano FROM provas ORDER BY ano")->fetchAll(PDO::FETCH_COLUMN);
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SADE - Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
        .main-container { background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 20px 0; }
        .header-section { background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); color: white; padding: 2rem; border-radius: 15px 15px 0 0; text-align: center; }
        .stats-card { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; border-radius: 10px; padding: 1.5rem; margin: 10px 0; text-align: center; }
        .filter-section { background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin: 20px 0; }
        .chart-container { background: white; padding: 1.5rem; border-radius: 10px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="main-container">
            <div class="header-section">
                <h1><i class="fas fa-chart-line me-3"></i>SADE</h1>
                <p class="mb-0">Sistema de Avaliação e Desempenho Educacional</p>
                <small>Dashboard Analítico - Versão 3.0 (Sem Login)</small>
            </div>
            
            <div class="container-fluid px-4 py-3">
                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="stats-card">
                            <i class="fas fa-school fa-2x mb-2"></i>
                            <h3><?php echo $total_escolas; ?></h3>
                            <p class="mb-0">Escolas</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stats-card">
                            <i class="fas fa-users fa-2x mb-2"></i>
                            <h3><?php echo $total_turmas; ?></h3>
                            <p class="mb-0">Turmas</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stats-card">
                            <i class="fas fa-file-alt fa-2x mb-2"></i>
                            <h3><?php echo $total_provas; ?></h3>
                            <p class="mb-0">Provas</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="stats-card">
                            <i class="fas fa-user-graduate fa-2x mb-2"></i>
                            <h3><?php echo $total_alunos; ?></h3>
                            <p class="mb-0">Alunos</p>
                        </div>
                    </div>
                </div>
                
                <div class="filter-section">
                    <h5><i class="fas fa-filter me-2"></i>Filtros</h5>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="form-label">Escola</label>
                            <select id="filtroEscola" class="form-select">
                                <option value="">Todas</option>
                                <?php foreach($escolas as $escola): ?>
                                    <option value="<?php echo htmlspecialchars($escola); ?>"><?php echo htmlspecialchars($escola); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Turma</label>
                            <select id="filtroTurma" class="form-select">
                                <option value="">Todas</option>
                                <?php foreach($turmas as $turma): ?>
                                    <option value="<?php echo htmlspecialchars($turma); ?>"><?php echo htmlspecialchars($turma); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Ano</label>
                            <select id="filtroAno" class="form-select">
                                <option value="">Todos</option>
                                <?php foreach($anos as $ano): ?>
                                    <option value="<?php echo htmlspecialchars($ano); ?>"><?php echo htmlspecialchars($ano); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">&nbsp;</label>
                            <button class="btn btn-primary d-block w-100" onclick="atualizarGraficos()">
                                <i class="fas fa-sync me-2"></i>Atualizar
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="chart-container">
                            <h6><i class="fas fa-chart-bar me-2"></i>Desempenho por Turma</h6>
                            <canvas id="graficoTurmas"></canvas>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="chart-container">
                            <h6><i class="fas fa-chart-line me-2"></i>Desempenho por Questão</h6>
                            <canvas id="graficoQuestoes"></canvas>
                        </div>
                    </div>
                </div>
                
                <div class="chart-container">
                    <h6><i class="fas fa-table me-2"></i>Dados Detalhados</h6>
                    <div class="table-responsive">
                        <table id="tabelaDados" class="table table-striped">
                            <thead class="table-dark">
                                <tr>
                                    <th>Escola</th>
                                    <th>Turma</th>
                                    <th>Ano</th>
                                    <th>Alunos</th>
                                    <th>Média (%)</th>
                                </tr>
                            </thead>
                            <tbody id="tabelaCorpo"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        let graficoTurmas, graficoQuestoes;
        
        document.addEventListener('DOMContentLoaded', function() {
            atualizarGraficos();
        });
        
        function atualizarGraficos() {
            const escola = document.getElementById('filtroEscola').value;
            const turma = document.getElementById('filtroTurma').value;
            const ano = document.getElementById('filtroAno').value;
            
            const params = new URLSearchParams();
            if (escola) params.append('escola', escola);
            if (turma) params.append('turma', turma);
            if (ano) params.append('ano', ano);
            
            carregarDadosTurmas(params);
            carregarDadosQuestoes(params);
            carregarTabelaDados(params);
        }
        
        function carregarDadosTurmas(params) {
            fetch(`api/dados_turmas.php?${params}`)
                .then(response => response.json())
                .then(data => {
                    if (graficoTurmas) graficoTurmas.destroy();
                    const ctx = document.getElementById('graficoTurmas').getContext('2d');
                    graficoTurmas = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: data.labels || [],
                            datasets: [{
                                label: 'Média (%)',
                                data: data.valores || [],
                                backgroundColor: 'rgba(54, 162, 235, 0.8)'
                            }]
                        },
                        options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } }
                    });
                })
                .catch(error => console.error('Erro:', error));
        }
        
        function carregarDadosQuestoes(params) {
            fetch(`api/dados_questoes.php?${params}`)
                .then(response => response.json())
                .then(data => {
                    if (graficoQuestoes) graficoQuestoes.destroy();
                    const ctx = document.getElementById('graficoQuestoes').getContext('2d');
                    graficoQuestoes = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data.labels || [],
                            datasets: [{
                                label: 'Acertos (%)',
                                data: data.valores || [],
                                borderColor: 'rgba(75, 192, 192, 1)',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                fill: true
                            }]
                        },
                        options: { responsive: true, scales: { y: { beginAtZero: true, max: 100 } } }
                    });
                })
                .catch(error => console.error('Erro:', error));
        }
        
        function carregarTabelaDados(params) {
            fetch(`api/dados_tabela.php?${params}`)
                .then(response => response.json())
                .then(data => {
                    const tbody = document.getElementById('tabelaCorpo');
                    tbody.innerHTML = '';
                    (data || []).forEach(row => {
                        tbody.innerHTML += `<tr>
                            <td>${row.escola}</td>
                            <td>${row.turma}</td>
                            <td>${row.ano}</td>
                            <td>${row.total_alunos}</td>
                            <td>${row.media}%</td>
                        </tr>`;
                    });
                })
                .catch(error => console.error('Erro:', error));
        }
    </script>
</body>
</html>
