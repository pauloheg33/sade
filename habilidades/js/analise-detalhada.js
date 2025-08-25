// Dados reais das correlações questões x descritores baseados nos arquivos de análise
const correlacoesQuestoes = {
    '2': {
        'portugues': [
            { numero: 1, codigo: 'P00131129', descritor: 'D009_P', nome: 'Ler palavras formadas por sílabas canônicas', texto: 'VEJA A FIGURA ABAIXO. QUAL É O NOME DESSA FIGURA?' },
            { numero: 2, codigo: 'P00132850', descritor: 'D008_P', nome: 'Identificar sílabas de uma palavra', texto: 'VEJA A FIGURA ABAIXO. QUAL É A FIGURA QUE TEM O NOME COM A PRIMEIRA SÍLABA (PEDAÇO) IGUAL À DO NOME DA FIGURA QUE VOCÊ VIU?' },
            { numero: 3, codigo: 'P00132863', descritor: 'D006_P', nome: 'Identificar rimas', texto: 'NESSE TEXTO, A PALAVRA QUE RIMA COM "BRINCALHÃO" É' },
            { numero: 4, codigo: 'P00132862', descritor: 'D009_P', nome: 'Ler palavras formadas por sílabas canônicas', texto: 'QUAL É A PALAVRA QUE VOCÊ OUVIU?' },
            { numero: 5, codigo: 'P00120957', descritor: 'D008_P', nome: 'Identificar sílabas de uma palavra', texto: 'VEJA A FIGURA ABAIXO. QUAL É A FIGURA QUE TEM O NOME COM A ÚLTIMA SÍLABA (PEDAÇO) IGUAL À DO NOME DA FIGURA QUE VOCÊ VIU?' },
            { numero: 6, codigo: 'P00116516', descritor: 'D017_P', nome: 'Reconhecer o gênero de um texto', texto: 'ESSE TEXTO SERVE PARA' },
            { numero: 7, codigo: 'P00116517', descritor: 'D017_P', nome: 'Reconhecer o gênero de um texto', texto: 'ESSE TEXTO É' },
            { numero: 8, codigo: 'P00037791', descritor: 'D009_P', nome: 'Ler palavras formadas por sílabas canônicas', texto: 'VEJA A FIGURA ABAIXO. QUAL É O NOME DESSA FIGURA?' },
            { numero: 9, codigo: 'P00117319', descritor: 'D002_P', nome: 'Reconhecer as letras do alfabeto', texto: 'VEJA A FIGURA ABAIXO. QUAL É A PRIMEIRA LETRA DO NOME DA FIGURA QUE VOCÊ VIU?' },
            { numero: 10, codigo: 'P00137338', descritor: 'D021_P', nome: 'Localizar informação explícita', texto: 'DE ACORDO COM ESSE TEXTO, O MENINO DESCOBRIU QUE A SENHORA ESTAVA' },
            { numero: 11, codigo: 'P00120965', descritor: 'D021_P', nome: 'Localizar informação explícita', texto: 'ONDE ACONTECE ESSA HISTÓRIA?' },
            { numero: 12, codigo: 'P00090189', descritor: 'D009_P', nome: 'Ler palavras formadas por sílabas canônicas', texto: 'QUAL É A PALAVRA QUE VOCÊ OUVIU?' },
            { numero: 13, codigo: 'P013455', descritor: 'D002_P', nome: 'Reconhecer as letras do alfabeto', texto: 'VEJA A FIGURA ABAIXO. QUAL É A PRIMEIRA LETRA DO NOME DA FIGURA QUE VOCÊ VIU?' },
            { numero: 14, codigo: 'P00061512', descritor: 'D006_P', nome: 'Identificar rimas', texto: 'NESSE TEXTO, AS PALAVRAS QUE RIMAM SÃO' },
            { numero: 15, codigo: 'P00075407', descritor: 'D008_P', nome: 'Identificar sílabas de uma palavra', texto: 'VEJA A FIGURA ABAIXO. QUAL É A FIGURA QUE TEM O NOME COM A ÚLTIMA SÍLABA (PEDAÇO) IGUAL À DO NOME DA FIGURA QUE VOCÊ VIU?' },
            { numero: 16, codigo: 'P018649', descritor: 'D009_P', nome: 'Ler palavras formadas por sílabas canônicas', texto: 'VEJA A FIGURA ABAIXO. QUAL É O NOME DESSA FIGURA?' },
            { numero: 17, codigo: 'P010965H6', descritor: 'D014_P', nome: 'Identificar variações de sons de grafemas', texto: 'MARQUE A ALTERNATIVA DA PALAVRA EM QUE A LETRA "G" TEM O MESMO SOM QUE NA PALAVRA GATO.' },
            { numero: 18, codigo: 'P00058066', descritor: 'D030_P', nome: 'Reconhecer os elementos que compõem uma narrativa e o conflito gerador', texto: 'QUAL É A PERSONAGEM PRINCIPAL DESSA HISTÓRIA?' },
            { numero: 19, codigo: 'P00058067', descritor: 'D021_P', nome: 'Localizar informação explícita', texto: 'DE ACORDO COM ESSE TEXTO, O JACARÉ' },
            { numero: 20, codigo: 'P00075421', descritor: 'D009_P', nome: 'Ler palavras formadas por sílabas canônicas', texto: 'QUAL É A PALAVRA QUE VOCÊ OUVIU?' },
            { numero: 21, codigo: 'P00042789', descritor: 'D017_P', nome: 'Reconhecer o gênero de um texto', texto: 'ESSE TEXTO SERVE PARA' },
            { numero: 22, codigo: 'P00114324', descritor: 'D017_P', nome: 'Reconhecer o gênero de um texto', texto: 'ESSE TEXTO É' }
        ],
        'matematica': [
            { numero: 1, codigo: 'M00097144', descritor: 'D082_M', nome: 'Executar a medição de grandezas por meio de medidas convencionais', texto: 'QUAL DOS INSTRUMENTOS DE MEDIDA ABAIXO É UTILIZADO PARA MEDIR TEMPO?' },
            { numero: 2, codigo: 'M00076057', descritor: 'D097_M', nome: 'Comparar ou ordenar quantidades pela contagem', texto: 'OBSERVE, NO QUADRO ABAIXO, UMA SEQUÊNCIA DE NÚMEROS. ELA SEGUE UM PADRÃO. 161 – 163 – ___ – 167 – 169 QUAL É O NÚMERO QUE ESTÁ FALTANDO NESSA SEQUÊNCIA?' },
            { numero: 3, codigo: 'M00068556', descritor: 'D005_M', nome: 'Utilizar números naturais na resolução de problemas', texto: 'LÚCIA E FELIPE ESTÃO ARRUMANDO UM SALÃO DE FESTAS. NESSE SALÃO, LÚCIA ORGANIZOU 62 CADEIRAS, E FELIPE ORGANIZOU 34 CADEIRAS. QUANTAS CADEIRAS LÚCIA E FELIPE ORGANIZARAM, NO TOTAL, NESSE SALÃO?' },
            { numero: 4, codigo: 'M00063829', descritor: 'D002_M', nome: 'Reconhecer características do sistema de numeração decimal', texto: 'OBSERVE ABAIXO A DECOMPOSIÇÃO DE UM NÚMERO. 1 CENTENA, 2 DEZENAS E 4 UNIDADES ESSA É A DECOMPOSIÇÃO DE QUAL NÚMERO?' },
            { numero: 5, codigo: 'M00097124', descritor: 'D011_M', nome: 'Identificar representações de figuras tridimensionais', texto: 'OBSERVE ABAIXO A IMAGEM DE UM SABONETE. A FORMA DESSE SABONETE LEMBRA QUAL SÓLIDO GEOMÉTRICO?' },
            { numero: 6, codigo: 'M00076059', descritor: 'D004_M', nome: 'Executar adição ou subtração com números naturais', texto: 'RESOLVA A OPERAÇÃO ABAIXO. 36 + 20 QUAL É O RESULTADO DESSA OPERAÇÃO?' },
            { numero: 7, codigo: 'M013985', descritor: 'D015_M', nome: 'Corresponder cédulas e/ou moedas do Sistema Monetário Brasileiro', texto: 'LUCAS COMPROU ALGUNS PÃES. OBSERVE ABAIXO A CÉDULA QUE LUCAS UTILIZOU PARA PAGAR ESSES PÃES. QUAL O VALOR, EM MOEDAS, QUE CORRESPONDE À CÉDULA QUE LUCAS UTILIZOU?' },
            { numero: 8, codigo: 'M00045812', descritor: 'D002_M', nome: 'Reconhecer características do sistema de numeração decimal', texto: 'OBSERVE O NÚMERO NO QUADRO ABAIXO. 627 QUAL É O VALOR POSICIONAL DO ALGARISMO 2 NESSE NÚMERO?' },
            { numero: 9, codigo: 'M00075280', descritor: 'D009_M', nome: 'Identificar informações apresentadas em tabelas ou gráficos', texto: 'OBSERVE, NA TABELA ABAIXO, AS NOTAS DE QUATRO AMIGOS NAS PROVAS DE PORTUGUÊS E MATEMÁTICA. DE ACORDO COM ESSA TABELA, QUAL FOI A NOTA DE CARLOS NA PROVA DE MATEMÁTICA?' },
            { numero: 10, codigo: 'M00117837', descritor: 'D004_M', nome: 'Executar adição ou subtração com números naturais', texto: 'RESOLVA A OPERAÇÃO APRESENTADA NO QUADRO ABAIXO. 16 + 2 QUAL É O RESULTADO DESSA OPERAÇÃO?' },
            { numero: 11, codigo: 'M00068554', descritor: 'D002_M', nome: 'Reconhecer características do sistema de numeração decimal', texto: 'OBSERVE OS NÚMEROS NO QUADRO ABAIXO. 321 - 235 - 123 - 368 EM QUAL DESSES NÚMEROS O ALGARISMO 3 OCUPA A ORDEM DAS UNIDADES?' },
            { numero: 12, codigo: 'M00058836', descritor: 'D082_M', nome: 'Executar a medição de grandezas por meio de medidas convencionais', texto: 'QUAL DOS INSTRUMENTOS DE MEDIDA ABAIXO É USADO PARA MEDIR A TEMPERATURA?' },
            { numero: 13, codigo: 'M013951', descritor: 'D011_M', nome: 'Identificar representações de figuras tridimensionais', texto: 'OBSERVE ABAIXO O BANCO QUE FELIPE COMPROU. A FORMA DESSE BANCO SE ASSEMELHA A QUAL FIGURA GEOMÉTRICA?' },
            { numero: 14, codigo: 'M00051314', descritor: 'D009_M', nome: 'Identificar informações apresentadas em tabelas ou gráficos', texto: 'OBSERVE, NA TABELA ABAIXO, A QUANTIDADE DE CRIANÇAS QUE PARTICIPARAM DAS OFICINAS DE UM CLUBE. DE ACORDO COM ESSA TABELA, QUANTAS CRIANÇAS PARTICIPARAM DA OFICINA DE PINTURA?' },
            { numero: 15, codigo: 'M00076066', descritor: 'D015_M', nome: 'Corresponder cédulas e/ou moedas do Sistema Monetário Brasileiro', texto: 'OBSERVE ABAIXO A QUANTIA QUE MIGUEL RECEBEU PELA VENDA DE UM BOLO. QUAL FOI A QUANTIA QUE MIGUEL RECEBEU PELA VENDA DESSE BOLO?' },
            { numero: 16, codigo: 'M00032088', descritor: 'D002_M', nome: 'Reconhecer características do sistema de numeração decimal', texto: 'OBSERVE ABAIXO UMA DAS DECOMPOSIÇÕES DE UM NÚMERO. 90 + 2 ESSA É UMA DAS DECOMPOSIÇÕES DE QUAL NÚMERO?' },
            { numero: 17, codigo: 'M021860H6', descritor: 'D082_M', nome: 'Executar a medição de grandezas por meio de medidas convencionais', texto: 'QUAL DOS INSTRUMENTOS DE MEDIDA ABAIXO É UTILIZADO PARA MEDIR COMPRIMENTO?' },
            { numero: 18, codigo: 'M00056988', descritor: 'D004_M', nome: 'Executar adição ou subtração com números naturais', texto: 'RESOLVA A OPERAÇÃO ABAIXO. 64 - 23 QUAL É O RESULTADO DESSA OPERAÇÃO?' },
            { numero: 19, codigo: 'M018662', descritor: 'D097_M', nome: 'Comparar ou ordenar quantidades pela contagem', texto: 'OBSERVE OS NÚMEROS NO QUADRO ABAIXO. 71 - 66 - 73 - 62 - 74 QUAL É A ORDEM CRESCENTE DESSES NÚMEROS?' },
            { numero: 20, codigo: 'M00075518', descritor: 'D002_M', nome: 'Reconhecer características do sistema de numeração decimal', texto: 'O NÚMERO 52 PODE SER DECOMPOSTO EM' },
            { numero: 21, codigo: 'M016412', descritor: 'D005_M', nome: 'Utilizar números naturais na resolução de problemas', texto: 'BEATRIZ FEZ 27 PÃES DE QUEIJO PARA O LANCHE. SEUS FILHOS COMERAM 13 DESSES PÃES DE QUEIJO. QUANTOS PÃES DE QUEIJO SOBRARAM?' },
            { numero: 22, codigo: 'M00076058', descritor: 'D097_M', nome: 'Comparar ou ordenar quantidades pela contagem', texto: 'OBSERVE OS ALGARISMOS NO QUADRO ABAIXO. 6 - 8 - 2 QUAL É O MENOR NÚMERO QUE PODE SER FORMADO COM TODOS OS ALGARISMOS DESSE QUADRO?' }
        ]
    },
    
    '4': {
        'portugues': [
            { numero: 1, codigo: 'P050393I7', descritor: 'D022_P', nome: 'Inferir o sentido de palavra ou expressão a partir do contexto', texto: 'No trecho "Quando estou numa boa.", a expressão destacada significa' },
            { numero: 2, codigo: 'P00115863', descritor: 'D023_P', nome: 'Inferir informações em textos', texto: 'Nesse texto, ao cuidar de sua plantação, Sophia demonstrou' },
            { numero: 3, codigo: 'P00115864', descritor: 'D021_P', nome: 'Localizar informação explícita', texto: 'Onde acontece essa história?' },
            { numero: 4, codigo: 'P00115862', descritor: 'D037_P', nome: 'Reconhecer relações entre partes de um texto (recursos coesivos)', texto: 'No trecho ". nasce um amor por ela aqui no peito.", a palavra "ela" está no lugar de' },
            { numero: 5, codigo: 'P00115673', descritor: 'D025_P', nome: 'Reconhecer efeitos de sentido da pontuação e outras notações', texto: 'Nesse texto, a expressão "UHUUL!" foi usada para indicar que o menino estava' },
            { numero: 6, codigo: 'P00115674', descritor: 'D017_P', nome: 'Reconhecer o gênero de um texto', texto: 'Esse texto é' },
            { numero: 7, codigo: 'P00115675', descritor: 'D021_P', nome: 'Localizar informação explícita', texto: 'De acordo com esse texto, o que o vento derrubou?' },
            { numero: 8, codigo: 'P00115676', descritor: 'D022_P', nome: 'Inferir o sentido de palavra ou expressão a partir do contexto', texto: 'No trecho "Ela atingiu o canto do nosso telhado.", a palavra "atingiu" significa' },
            { numero: 9, codigo: 'P00089197', descritor: 'D017_P', nome: 'Reconhecer o gênero de um texto', texto: 'Esse texto é' },
            { numero: 10, codigo: 'P00107526', descritor: 'D025_P', nome: 'Reconhecer efeitos de sentido da pontuação e outras notações', texto: 'No terceiro quadrinho, a expressão "SLAP!" foi usada para indicar' },
            { numero: 11, codigo: 'P00058434', descritor: 'D028_P', nome: 'Reconhecer o assunto de um texto lido', texto: 'Qual é o assunto desse texto?' },
            { numero: 12, codigo: 'P00058435', descritor: 'D016_P', nome: 'Identificar a finalidade de textos de diferentes gêneros', texto: 'Esse texto serve para' },
            { numero: 13, codigo: 'P00062994', descritor: 'D017_P', nome: 'Reconhecer o gênero de um texto', texto: 'Esse texto é' },
            { numero: 14, codigo: 'P04115017', descritor: 'D021_P', nome: 'Localizar informação explícita', texto: 'De acordo com esse texto, o que aconteceu quando a menina abriu a caixa?' },
            { numero: 15, codigo: 'P04115417', descritor: 'D021_P', nome: 'Localizar informação explícita', texto: 'Onde acontece essa história?' },
            { numero: 16, codigo: 'P02019517', descritor: 'D016_P', nome: 'Identificar a finalidade de textos de diferentes gêneros', texto: 'Esse texto serve para' },
            { numero: 17, codigo: 'P00107698', descritor: 'D028_P', nome: 'Reconhecer o assunto de um texto lido', texto: 'Qual é o assunto desse texto?' },
            { numero: 18, codigo: 'P00107699', descritor: 'D021_P', nome: 'Localizar informação explícita', texto: 'De acordo com esse texto, o livro reúne' },
            { numero: 19, codigo: 'P018697', descritor: 'D021_P', nome: 'Localizar informação explícita', texto: 'Essa história acontece em uma' },
            { numero: 20, codigo: 'P018249', descritor: 'D023_P', nome: 'Inferir informações em textos', texto: 'Nesse texto, ao fazer perguntas à mãe, Lili demonstrou ser' },
            { numero: 21, codigo: 'P018250', descritor: 'D037_P', nome: 'Reconhecer relações entre partes de um texto (recursos coesivos)', texto: 'No trecho "Elas têm luz, calor e água." (6° parágrafo), a palavra "elas" está no lugar de' },
            { numero: 22, codigo: 'P041484H6', descritor: 'D016_P', nome: 'Identificar a finalidade de textos de diferentes gêneros', texto: 'Esse texto serve para' }
        ],
        'matematica': [
            { numero: 23, codigo: 'M00121542', descritor: 'D025_M', nome: 'Utilizar área de figuras bidimensionais na resolução de problemas', texto: 'Para a construção de um chafariz, Mário cercará uma região de uma praça. Observe, na malha quadriculada abaixo, a região dessa praça representada em cinza. Qual é a medida do perímetro, em metro, da região dessa praça que será cercada?' },
            { numero: 24, codigo: 'M00068588', descritor: 'D013_M', nome: 'Identificar números naturais segundo critérios de ordem', texto: 'Observe os números no quadro abaixo. 5,6 – 8,6 – 4,2 – 5,9 Qual é a ordem crescente desses números?' },
            { numero: 25, codigo: 'M041015H6', descritor: 'D002_M', nome: 'Reconhecer características do sistema de numeração decimal', texto: 'Observe o número no quadro abaixo. 213 Qual é o valor posicional do algarismo 2 nesse número?' },
            { numero: 26, codigo: 'M0410135H6', descritor: 'D029_M', nome: 'Reconhecer fração como representação de diferentes significados', texto: 'Observe, na imagem abaixo, a pizza que Julieta fez para lanchar. As partes riscadas representam as fatias que Julieta já comeu. Qual é a fração que representa as fatias que Julieta comeu?' },
            { numero: 27, codigo: 'M041382H6', descritor: 'D009_M', nome: 'Identificar informações apresentadas em tabelas ou gráficos', texto: 'Observe abaixo o gráfico que apresenta o resultado de uma pesquisa, feita por uma professora, sobre os aniversariantes do quarto ano nos meses de janeiro a abril. De acordo com esse gráfico, qual mês possui a menor quantidade de aniversariantes?' },
            { numero: 28, codigo: 'M00068594', descritor: 'D004_M', nome: 'Executar adição ou subtração com números naturais', texto: 'Observe a operação apresentada no quadro abaixo. 15 + 3 = 18 Para confirmar esse resultado, qual é a operação inversa que deve ser feita?' },
            { numero: 29, codigo: 'M00073045', descritor: 'D009_M', nome: 'Identificar informações apresentadas em tabelas ou gráficos', texto: 'Observe, na tabela abaixo, a quantidade de cadeiras das salas de reunião de uma casa de eventos. De acordo com essa tabela, qual sala de reunião tem mais de 150 cadeiras?' },
            { numero: 30, codigo: 'M045527I7', descritor: 'D013_M', nome: 'Identificar números naturais segundo critérios de ordem', texto: 'Observe os números no quadro abaixo. 5,5 - 6,3 - 2,6 - 3,3 Qual desses números é o maior?' },
            { numero: 31, codigo: 'M04045717', descritor: 'D086_M', nome: 'Executar multiplicação ou divisão com números naturais', texto: 'Resolva a operação abaixo. 2 × 240 Qual é o resultado dessa operação?' },
            { numero: 32, codigo: 'M00079978', descritor: 'D084_M', nome: 'Utilizar conversão entre unidades de medidas de tempo', texto: 'Joana foi assistir a uma partida de futebol. Essa partida terminou às 10h30min e teve duração de 2 horas. Qual foi o horário de início da partida a que Joana assistiu?' },
            { numero: 33, codigo: 'M00038174', descritor: 'D025_M', nome: 'Utilizar área de figuras bidimensionais na resolução de problemas', texto: 'Helena recortou uma letra para decorar a mesa de seu aniversário. Observe, na malha quadriculada abaixo, a representação da letra que Helena recortou. A área de cada quadradinho dessa malha é igual a 1 cm². Qual é a área, em centímetro quadrado, da letra que Helena recortou?' },
            { numero: 34, codigo: 'M00057014', descritor: 'D086_M', nome: 'Executar multiplicação ou divisão com números naturais', texto: 'Henrique comprou 5 pacotes com 72 lenços em cada um. Quantos lenços Henrique comprou ao todo?' },
            { numero: 35, codigo: 'M045980I7', descritor: 'D009_M', nome: 'Identificar informações apresentadas em tabelas ou gráficos', texto: 'Observe abaixo o gráfico que apresenta o resultado de uma pesquisa feita por uma agência de viagens sobre os passeios preferidos de seus clientes durante o mês de janeiro. De acordo com esse gráfico, quantos clientes preferem passear na fazenda?' },
            { numero: 36, codigo: 'M041394H6', descritor: 'D001_M', nome: 'Identificar a localização ou movimentação de pessoas/objetos no espaço', texto: 'Observe abaixo Renan e seus colegas em uma palestra na faculdade. Quem está à esquerda de Renan?' },
            { numero: 37, codigo: 'M00057007', descritor: 'D002_M', nome: 'Reconhecer características do sistema de numeração decimal', texto: 'Observe os números no quadro abaixo. 986 - 876 - 765 - 657 Em qual desses números o algarismo 6 ocupa a ordem das dezenas?' },
            { numero: 38, codigo: 'M00076111', descritor: 'D009_M', nome: 'Identificar informações apresentadas em tabelas ou gráficos', texto: 'Observe, na tabela abaixo, os complementos e tamanhos de copos de açaí que Marcelo vendeu em sua lanchonete em um dia. De acordo com essa tabela, quantos copos de açaí de 300 mL com complemento de leite em pó Marcelo vendeu nesse dia?' },
            { numero: 39, codigo: 'M00039099', descritor: 'D086_M', nome: 'Executar multiplicação ou divisão com números naturais', texto: 'Resolva a operação abaixo. 28 ÷ 4 Qual é o resultado dessa operação?' },
            { numero: 40, codigo: 'M00074522', descritor: 'D025_M', nome: 'Utilizar área de figuras bidimensionais na resolução de problemas', texto: 'Observe a figura em cinza apresentada na malha quadriculada abaixo. Nessa malha quadriculada, a medida da área de cada quadradinho é de 1 metro quadrado. Qual é a medida da área, em metro quadrado, dessa figura?' },
            { numero: 41, codigo: 'M00039097', descritor: 'D084_M', nome: 'Utilizar conversão entre unidades de medidas de tempo', texto: 'Paula deixou o seu carro no estacionamento, às 13 horas e 10 minutos. Depois de 35 minutos, ela voltou para buscar. Em qual horário Paula foi buscar o seu carro?' },
            { numero: 42, codigo: 'M00068593', descritor: 'D086_M', nome: 'Executar multiplicação ou divisão com números naturais', texto: 'Gilberto utilizou alguns cestos para distribuir 369 maçãs. Em cada cesto, ele colocou 9 maçãs. Quantos cestos Gilberto utilizou para distribuir essas maçãs?' },
            { numero: 43, codigo: 'M040811H6', descritor: 'D001_M', nome: 'Identificar a localização ou movimentação de pessoas/objetos no espaço', texto: 'Observe abaixo a imagem da planta da casa de Leandro. Leandro passou pela porta da entrada, caminhou e entrou a sua esquerda e, em seguida, caminhou e entrou na segunda porta à direita. A qual cômodo da casa Leandro chegou?' },
            { numero: 44, codigo: 'M040641H6', descritor: 'D029_M', nome: 'Reconhecer fração como representação de diferentes significados', texto: 'Rafaela ganhou uma barra de chocolate e a dividiu em 2 partes iguais. Qual é a fração que representa a metade dessa barra de chocolate?' }
        ]
    }
    // Dados para outros anos serão adicionados conforme necessário
};

// Informações sobre os descritores
const descritoresInfo = {
    // Português
    'D002_P': { area: 'Alfabetização', cor: '#FF6384' },
    'D006_P': { area: 'Alfabetização', cor: '#36A2EB' },
    'D008_P': { area: 'Alfabetização', cor: '#FFCE56' },
    'D009_P': { area: 'Alfabetização', cor: '#4BC0C0' },
    'D014_P': { area: 'Alfabetização', cor: '#9966FF' },
    'D016_P': { area: 'Procedimentos de Leitura', cor: '#FF9F40' },
    'D017_P': { area: 'Procedimentos de Leitura', cor: '#C9CBCF' },
    'D021_P': { area: 'Procedimentos de Leitura', cor: '#FF6384' },
    'D022_P': { area: 'Implicações do Suporte, do Gênero e/ou do Enunciador', cor: '#36A2EB' },
    'D023_P': { area: 'Implicações do Suporte, do Gênero e/ou do Enunciador', cor: '#FFCE56' },
    'D025_P': { area: 'Relação entre Textos', cor: '#4BC0C0' },
    'D028_P': { area: 'Procedimentos de Leitura', cor: '#9966FF' },
    'D030_P': { area: 'Procedimentos de Leitura', cor: '#FF9F40' },
    'D037_P': { area: 'Coerência e Coesão no Processamento do Texto', cor: '#C9CBCF' },
    'D039_P': { area: 'Relação entre Recursos Expressivos e Efeitos de Sentido', cor: '#FF6384' },
    'D044_P': { area: 'Variação Linguística', cor: '#36A2EB' },
    
    // Matemática
    'D001_M': { area: 'Espaço e Forma', cor: '#FF6384' },
    'D002_M': { area: 'Números e Operações', cor: '#36A2EB' },
    'D004_M': { area: 'Números e Operações', cor: '#FFCE56' },
    'D005_M': { area: 'Números e Operações', cor: '#4BC0C0' },
    'D009_M': { area: 'Tratamento da Informação', cor: '#9966FF' },
    'D011_M': { area: 'Espaço e Forma', cor: '#FF9F40' },
    'D013_M': { area: 'Números e Operações', cor: '#C9CBCF' },
    'D015_M': { area: 'Números e Operações', cor: '#FF6384' },
    'D025_M': { area: 'Grandezas e Medidas', cor: '#36A2EB' },
    'D029_M': { area: 'Números e Operações', cor: '#FFCE56' },
    'D082_M': { area: 'Grandezas e Medidas', cor: '#4BC0C0' },
    'D084_M': { area: 'Grandezas e Medidas', cor: '#9966FF' },
    'D086_M': { area: 'Números e Operações', cor: '#FF9F40' },
    'D097_M': { area: 'Números e Operações', cor: '#C9CBCF' }
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    configurarEventos();
});

function configurarEventos() {
    // Eventos para os botões de ano
    document.querySelectorAll('input[name="ano-radio"]').forEach(radio => {
        radio.addEventListener('change', verificarSelecoes);
    });
    
    // Eventos para os botões de disciplina
    document.querySelectorAll('input[name="disciplina-radio"]').forEach(radio => {
        radio.addEventListener('change', verificarSelecoes);
    });
}

function verificarSelecoes() {
    const anoSelecionado = document.querySelector('input[name="ano-radio"]:checked');
    const disciplinaSelecionada = document.querySelector('input[name="disciplina-radio"]:checked');
    
    if (anoSelecionado && disciplinaSelecionada) {
        exibirAnalise(anoSelecionado.value, disciplinaSelecionada.value);
    }
}

function exibirAnalise(ano, disciplina) {
    const placeholder = document.getElementById('placeholder-analise');
    const resultados = document.getElementById('resultados-analise');
    
    // Esconder placeholder e mostrar resultados
    placeholder.style.display = 'none';
    resultados.style.display = 'block';
    
    // Atualizar título
    const titulo = document.getElementById('titulo-analise');
    const disciplinaTexto = disciplina === 'portugues' ? 'Português' : 'Matemática';
    titulo.textContent = `${ano}º Ano - ${disciplinaTexto}`;
    
    // Buscar dados das correlações
    const questoes = correlacoesQuestoes[ano] && correlacoesQuestoes[ano][disciplina];
    
    if (!questoes) {
        exibirMensagemSemDados(ano, disciplinaTexto);
        return;
    }
    
    // Atualizar informações da análise
    atualizarInfoAnalise(questoes, disciplinaTexto);
    
    // Exibir lista de questões
    exibirListaQuestoes(questoes);
}

function atualizarInfoAnalise(questoes, disciplina) {
    const infoElement = document.getElementById('info-analise');
    const totalQuestoes = questoes.length;
    
    // Contar descritores únicos
    const descritoresUnicos = new Set(questoes.map(q => q.descritor));
    const totalDescritores = descritoresUnicos.size;
    
    // Contar questões por descritor
    const contagemDescritores = {};
    questoes.forEach(q => {
        contagemDescritores[q.descritor] = (contagemDescritores[q.descritor] || 0) + 1;
    });
    
    // Descritor mais frequente
    const descritorMaisFrequente = Object.entries(contagemDescritores)
        .reduce((a, b) => a[1] > b[1] ? a : b);
    
    infoElement.innerHTML = `
        <div class="row">
            <div class="col-md-3">
                <strong>Total de Questões:</strong><br>
                <span class="h4 text-primary">${totalQuestoes}</span>
            </div>
            <div class="col-md-3">
                <strong>Descritores Únicos:</strong><br>
                <span class="h4 text-success">${totalDescritores}</span>
            </div>
            <div class="col-md-6">
                <strong>Descritor Mais Frequente:</strong><br>
                <span class="descritor-badge">${descritorMaisFrequente[0]}</span>
                <small class="text-muted ms-2">(${descritorMaisFrequente[1]} questão${descritorMaisFrequente[1] > 1 ? 'ões' : ''})</small>
            </div>
        </div>
    `;
}

function exibirListaQuestoes(questoes) {
    const container = document.getElementById('lista-questoes');
    container.innerHTML = '';
    
    questoes.forEach(questao => {
        const descritorInfo = descritoresInfo[questao.descritor] || { area: 'Não categorizado', cor: '#6c757d' };
        
        const questaoCard = document.createElement('div');
        questaoCard.className = 'questao-card card';
        questaoCard.innerHTML = `
            <div class="card-body">
                <div class="row align-items-start">
                    <div class="col-auto">
                        <div class="questao-numero">${questao.numero}</div>
                    </div>
                    <div class="col">
                        <div class="d-flex flex-wrap align-items-center mb-2">
                            <span class="descritor-badge me-3" style="background: linear-gradient(45deg, ${descritorInfo.cor}, ${ajustarCor(descritorInfo.cor, -20)})">
                                ${questao.descritor}
                            </span>
                            <small class="text-muted">
                                <i class="fas fa-code me-1"></i>${questao.codigo}
                            </small>
                        </div>
                        <h6 class="card-title text-primary mb-2">
                            <i class="fas fa-bullseye me-2"></i>${questao.nome}
                        </h6>
                        <p class="card-text mb-2">
                            <strong>Questão:</strong> ${questao.texto}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-layer-group me-1"></i>Área: ${descritorInfo.area}
                            </small>
                            <small class="text-muted">
                                AVALIE CE
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(questaoCard);
    });
}

function exibirMensagemSemDados(ano, disciplina) {
    const container = document.getElementById('lista-questoes');
    container.innerHTML = `
        <div class="text-center py-5">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #ffc107; margin-bottom: 1rem;"></i>
            <h4 class="text-warning">Dados não disponíveis</h4>
            <p class="text-muted">
                Os dados de correlação para ${ano}º Ano - ${disciplina} ainda não foram processados.
            </p>
        </div>
    `;
}

function ajustarCor(cor, porcentagem) {
    // Função para ajustar a luminosidade da cor
    const num = parseInt(cor.replace("#", ""), 16);
    const amt = Math.round(2.55 * porcentagem);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}
