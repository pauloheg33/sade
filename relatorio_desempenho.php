<?php
/**
 * SADE - Relatório de Desempenho
 * Página para visualização de relatórios de desempenho por questão
 */

require_once 'config.php';

// Verificar autenticação
checkAuth();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SADE - Relatório de Desempenho</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .stats-card {
            transition: transform 0.2s;
        }
        .stats-card:hover {
            transform: translateY(-5px);
        }
        .chart-container {
            position: relative;
            height: 400px;
        }
        .filter-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .filter-card .form-control, .filter-card .form-select {
            background-color: rgba(255, 255, 255, 0.9);
        }
    </style>
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <div class="container-fluid">
        <div class="row">
            <?php include 'includes/sidebar.php'; ?>
            
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">
                        <i class="fas fa-chart-bar text-primary me-2"></i>
                        Relatório de Desempenho
                    </h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <button class="btn btn-outline-secondary" onclick="exportarRelatorio()">
                            <i class="fas fa-download me-2"></i>Exportar
                        </button>
                    </div>
                </div>

                <!-- Filtros -->
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card filter-card shadow">
                            <div class="card-header border-0">
                                <h5 class="mb-0">
                                    <i class="fas fa-filter me-2"></i>
                                    Filtros de Relatório
                                </h5>
                            </div>
                            <div class="card-body">
                                <form id="filterForm">
                                    <div class="row g-3">
                                        <div class="col-md-3">
                                            <label for="escola" class="form-label fw-bold">Escola</label>
                                            <select class="form-select" id="escola" name="escola">
                                                <option value="">Todas as Escolas</option>
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="ano" class="form-label fw-bold">Ano</label>
                                            <select class="form-select" id="ano" name="ano">
                                                <option value="">Todos</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <label for="turma" class="form-label fw-bold">Turma</label>
                                            <select class="form-select" id="turma" name="turma">
                                                <option value="">Todas as Turmas</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <label for="disciplina" class="form-label fw-bold">Disciplina</label>
                                            <select class="form-select" id="disciplina" name="disciplina">
                                                <option value="">Todas</option>
                                                <option value="Matemática">Matemática</option>
                                                <option value="Língua Portuguesa">Língua Portuguesa</option>
                                            </select>
                                        </div>
                                        <div class="col-md-1 d-flex align-items-end">
                                            <button type="button" class="btn btn-light w-100" onclick="generateReport()">
                                                <i class="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Estatísticas -->
                <div class="row mb-4">
                    <div class="col-md-3">
                        <div class="card stats-card border-0 shadow-sm">
                            <div class="card-body text-center">
                                <div class="display-6 text-primary mb-2">
                                    <i class="fas fa-school"></i>
                                </div>
                                <h3 class="mb-1" id="totalEscolas">-</h3>
                                <p class="text-muted mb-0">Escolas</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stats-card border-0 shadow-sm">
                            <div class="card-body text-center">
                                <div class="display-6 text-success mb-2">
                                    <i class="fas fa-users"></i>
                                </div>
                                <h3 class="mb-1" id="totalTurmas">-</h3>
                                <p class="text-muted mb-0">Turmas</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stats-card border-0 shadow-sm">
                            <div class="card-body text-center">
                                <div class="display-6 text-warning mb-2">
                                    <i class="fas fa-user-graduate"></i>
                                </div>
                                <h3 class="mb-1" id="totalAlunos">-</h3>
                                <p class="text-muted mb-0">Alunos</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card stats-card border-0 shadow-sm">
                            <div class="card-body text-center">
                                <div class="display-6 text-info mb-2">
                                    <i class="fas fa-file-alt"></i>
                                </div>
                                <h3 class="mb-1" id="totalProvas">-</h3>
                                <p class="text-muted mb-0">Provas</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Gráfico Principal -->
                <div class="row">
                    <div class="col-12">
                        <div class="card border-0 shadow">
                            <div class="card-header bg-white border-bottom">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h5 class="mb-1" id="chartTitle">RELATÓRIO DE DESEMPENHO POR QUESTÃO</h5>
                                        <p class="mb-0 text-muted" id="chartSubtitle">Selecione os filtros para gerar o relatório</p>
                                    </div>
                                    <div class="col-auto">
                                        <div id="loadingSpinner" class="d-none">
                                            <div class="spinner-border spinner-border-sm text-primary" role="status">
                                                <span class="visually-hidden">Carregando...</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="chart-container">
                                    <canvas id="performanceChart"></canvas>
                                </div>
                                
                                <!-- Legenda de cores -->
                                <div class="row mt-3">
                                    <div class="col-12">
                                        <div class="d-flex justify-content-center gap-4">
                                            <div class="d-flex align-items-center">
                                                <div class="bg-success" style="width: 20px; height: 20px; border-radius: 3px; margin-right: 8px;"></div>
                                                <small class="text-muted">≥ 80% - Ótimo</small>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <div class="bg-warning" style="width: 20px; height: 20px; border-radius: 3px; margin-right: 8px;"></div>
                                                <small class="text-muted">60-79% - Bom</small>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <div class="bg-danger" style="width: 20px; height: 20px; border-radius: 3px; margin-right: 8px;"></div>
                                                <small class="text-muted">< 60% - Necessita Atenção</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Resumo Detalhado -->
                <div class="row mt-4" id="detailsSection" style="display: none;">
                    <div class="col-12">
                        <div class="card border-0 shadow">
                            <div class="card-header bg-light">
                                <h5 class="mb-0">
                                    <i class="fas fa-list-alt me-2"></i>
                                    Detalhamento por Questão
                                </h5>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover mb-0" id="detailsTable">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Questão</th>
                                                <th>Gabarito</th>
                                                <th>Acertos</th>
                                                <th>Total</th>
                                                <th>Percentual</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        let performanceChart = null;
        let currentData = null;
        
        // Carrega os dados iniciais
        document.addEventListener('DOMContentLoaded', function() {
            loadFilters();
            loadStatistics();
        });

        function loadFilters() {
            fetch('api/get_filters.php')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Popula escolas
                        const escolaSelect = document.getElementById('escola');
                        data.escolas.forEach(escola => {
                            const option = document.createElement('option');
                            option.value = escola;
                            option.textContent = escola.replace(/_/g, ' ');
                            escolaSelect.appendChild(option);
                        });

                        // Popula anos
                        const anoSelect = document.getElementById('ano');
                        data.anos.forEach(ano => {
                            const option = document.createElement('option');
                            option.value = ano;
                            option.textContent = ano;
                            anoSelect.appendChild(option);
                        });

                        // Listener para mudança de escola
                        escolaSelect.addEventListener('change', function() {
                            loadTurmas(this.value);
                        });
                    }
                })
                .catch(error => console.error('Erro ao carregar filtros:', error));
        }

        function loadTurmas(escola) {
            const turmaSelect = document.getElementById('turma');
            turmaSelect.innerHTML = '<option value="">Todas as Turmas</option>';
            
            if (escola) {
                fetch(`api/get_turmas.php?escola=${encodeURIComponent(escola)}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            data.turmas.forEach(turma => {
                                const option = document.createElement('option');
                                option.value = turma;
                                option.textContent = turma.replace(/_/g, ' ');
                                turmaSelect.appendChild(option);
                            });
                        }
                    })
                    .catch(error => console.error('Erro ao carregar turmas:', error));
            }
        }

        function loadStatistics() {
            fetch('api/get_statistics.php')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('totalEscolas').textContent = data.escolas;
                        document.getElementById('totalTurmas').textContent = data.turmas;
                        document.getElementById('totalAlunos').textContent = data.alunos;
                        document.getElementById('totalProvas').textContent = data.provas;
                    }
                })
                .catch(error => console.error('Erro ao carregar estatísticas:', error));
        }

        function generateReport() {
            const formData = new FormData(document.getElementById('filterForm'));
            const params = new URLSearchParams(formData);
            
            // Mostra spinner
            document.getElementById('loadingSpinner').classList.remove('d-none');
            
            fetch(`api/get_performance_data.php?${params.toString()}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        currentData = data;
                        updateChart(data);
                        updateChartTitle(data);
                        updateDetailsTable(data);
                        document.getElementById('detailsSection').style.display = 'block';
                    } else {
                        alert('Erro ao gerar relatório: ' + (data.message || 'Erro desconhecido'));
                    }
                    document.getElementById('loadingSpinner').classList.add('d-none');
                })
                .catch(error => {
                    console.error('Erro ao gerar relatório:', error);
                    alert('Erro ao conectar com o servidor');
                    document.getElementById('loadingSpinner').classList.add('d-none');
                });
        }

        function updateChart(data) {
            const ctx = document.getElementById('performanceChart').getContext('2d');
            
            if (performanceChart) {
                performanceChart.destroy();
            }

            const questoes = data.questoes.map((_, index) => `Q${index + 1}`);
            const percentuais = data.questoes.map(q => q.percentual_acerto);

            performanceChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: questoes,
                    datasets: [{
                        label: 'Percentual de Acertos (%)',
                        data: percentuais,
                        backgroundColor: percentuais.map(p => {
                            if (p >= 80) return 'rgba(34, 197, 94, 0.8)';  // Verde
                            if (p >= 60) return 'rgba(251, 191, 36, 0.8)'; // Amarelo
                            return 'rgba(239, 68, 68, 0.8)';               // Vermelho
                        }),
                        borderColor: percentuais.map(p => {
                            if (p >= 80) return 'rgba(34, 197, 94, 1)';
                            if (p >= 60) return 'rgba(251, 191, 36, 1)';
                            return 'rgba(239, 68, 68, 1)';
                        }),
                        borderWidth: 2,
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const questao = data.questoes[context.dataIndex];
                                    return [
                                        `Acertos: ${questao.acertos}/${questao.total}`,
                                        `Percentual: ${questao.percentual_acerto.toFixed(1)}%`,
                                        `Gabarito: ${questao.gabarito}`
                                    ];
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        },
                        x: {
                            ticks: {
                                maxRotation: 0
                            }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
        }

        function updateChartTitle(data) {
            const ano = document.getElementById('ano').value || 'TODOS OS ANOS';
            const disciplina = document.getElementById('disciplina').value || 'TODAS AS DISCIPLINAS';
            const escola = document.getElementById('escola').value || 'TODAS AS ESCOLAS';
            const turma = document.getElementById('turma').value || 'TODAS AS TURMAS';
            
            document.getElementById('chartTitle').textContent = 'RELATÓRIO DE DESEMPENHO POR QUESTÃO';
            document.getElementById('chartSubtitle').textContent = `${ano} - ${disciplina} | ${escola.replace(/_/g, ' ')} - ${turma.replace(/_/g, ' ')}`;
        }

        function updateDetailsTable(data) {
            const tbody = document.querySelector('#detailsTable tbody');
            tbody.innerHTML = '';

            data.questoes.forEach(questao => {
                const row = document.createElement('tr');
                
                const status = questao.percentual_acerto >= 80 ? 'Ótimo' : 
                              questao.percentual_acerto >= 60 ? 'Bom' : 'Atenção';
                const statusClass = questao.percentual_acerto >= 80 ? 'success' : 
                                   questao.percentual_acerto >= 60 ? 'warning' : 'danger';

                row.innerHTML = `
                    <td><strong>Q${questao.questao}</strong></td>
                    <td><span class="badge bg-secondary">${questao.gabarito}</span></td>
                    <td>${questao.acertos}</td>
                    <td>${questao.total}</td>
                    <td><strong>${questao.percentual_acerto.toFixed(1)}%</strong></td>
                    <td><span class="badge bg-${statusClass}">${status}</span></td>
                `;
                tbody.appendChild(row);
            });
        }

        function exportarRelatorio() {
            if (!currentData) {
                alert('Gere um relatório primeiro');
                return;
            }
            
            // Implementar exportação (CSV, PDF, etc.)
            const csvContent = generateCSV(currentData);
            downloadCSV(csvContent, 'relatorio_desempenho.csv');
        }

        function generateCSV(data) {
            let csv = 'Questão,Gabarito,Acertos,Total,Percentual,Status\n';
            
            data.questoes.forEach(questao => {
                const status = questao.percentual_acerto >= 80 ? 'Ótimo' : 
                              questao.percentual_acerto >= 60 ? 'Bom' : 'Atenção';
                csv += `Q${questao.questao},${questao.gabarito},${questao.acertos},${questao.total},${questao.percentual_acerto.toFixed(1)}%,${status}\n`;
            });
            
            return csv;
        }

        function downloadCSV(content, filename) {
            const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    </script>
</body>
</html>
