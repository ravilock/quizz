// Classe para criar o objeto da pergunta


class ModeloQuestao {
    constructor(titulo, opA, opB, opC, opD, opE, certa) {
        this.titulo = titulo;
        this.opA = opA;
        this.opB = opB;
        this.opC = opC;
        this.opD = opD;
        this.opE = opE;
        this.certa = certa;
    }
}

// Minhas variáveis de controle
let numeroDaQuestao = 0;
let placar = 0;
let cronometro;
let tempoMaximo = 20;

// Array com as perguntas do quiz
const listaDePerguntas = [
    new ModeloQuestao("Em que ano a Pilar foi fundada?", "1875", "1950", "1922", "1998", "2000", "1875"),
    new ModeloQuestao("Em qual cidade a Pilar foi fundada?", "Fortaleza", "Recife", "Salvador", "João Pessoa", "Olinda", "Recife"),
    new ModeloQuestao("Quem fundou a Pilar?", "Francisco Brennand", "Domingos Peixoto", "José de Alencar", "Luiz da Fonseca Oliveira", "Pedro II", "Luiz da Fonseca Oliveira"),
    new ModeloQuestao("Quem comprou a Pilar em 2011?", "Nestlé", "Bauducco", "M. Dias Branco", "Pepsico", "Kraft", "M. Dias Branco"),
    new ModeloQuestao("Qual o principal produto da Pilar?", "Carnes", "Refrigerantes", "Biscoitos e massas", "Limpeza", "Roupas", "Biscoitos e massas"),
    new ModeloQuestao("Região mais tradicional da Pilar?", "Sudeste", "Nordeste", "Centro-Oeste", "Sul", "Norte", "Nordeste"),
    new ModeloQuestao("Qual NÃO é produto da Pilar?", "Macarrão", "Biscoito", "Talharim", "Achocolatado", "Cracker", "Achocolatado"),
    new ModeloQuestao("A marca existe há mais de:", "20 anos", "50 anos", "140 anos", "80 anos", "5 anos", "140 anos"),
    new ModeloQuestao("A Pilar integra o portfólio da:", "JBS", "BRF", "Camil", "M. Dias Branco", "Seara", "M. Dias Branco"),
    new ModeloQuestao("Além de biscoitos, fabrica:", "Café", "Massas", "Sorvetes", "Refrigerantes", "Doces", "Massas"),
    new ModeloQuestao("A Pilar começou como:", "Padaria", "Móveis", "Fábrica de alimentos", "Roupas", "Oficina", "Fábrica de alimentos"),
    new ModeloQuestao("A marca é forte em qual estado?", "Pernambuco", "São Paulo", "Rio", "Rio Grande do Sul", "Bahia", "Pernambuco"),
    new ModeloQuestao("Qual o setor da Pilar?", "Tecnologia", "Cosméticos", "Carros", "Alimentos", "Saúde", "Alimentos"),
    new ModeloQuestao("Tipo de massa da Pilar?", "Talharim", "Panetone", "Frango", "Pen Drive", "Sushi", "Talharim"),
    new ModeloQuestao("Ano da compra pela M. Dias Branco?", "2003", "2018", "1990", "2011", "2022", "2011"),
    new ModeloQuestao("Marca irmã da Pilar no grupo:", "Ambev", "Natura", "Samsung", "Vitarella", "Apple", "Vitarella"),
    new ModeloQuestao("Produto de memória afetiva:", "Suco", "Água", "Biscoitos tradicionais", "Salgadinhos", "Bolo", "Biscoitos tradicionais"),
    new ModeloQuestao("Pilar existe desde:", "2001", "1960", "1875", "1910", "1980", "1875"),
    new ModeloQuestao("Principal mercado consumidor:", "EUA", "Portugal", "Argentina", "Nordeste", "Europa", "Nordeste"),
    new ModeloQuestao("Expansão incluiu segmento de:", "Material escolar", "Massas", "Roupas", "Eletrônicos", "Jogos", "Massas")
];

// Selecionando os elementos do HTML
const textoPergunta = document.getElementById('titulo-pergunta');
const textoTempo = document.getElementById('mostrador-tempo');
const contador_perguntas = document.getElementById('contador-perguntas')
const contador_acertos = document.getElementById('acertos')
const btn_recomecar = document.getElementById('btn-recomecar')

btn_recomecar.addEventListener('click', () => {
    location.reload()
})

// Lista com os botões das respostas
const botoesResposta = [
    document.getElementById('opcao1'),
    document.getElementById('opcao2'),
    document.getElementById('opcao3'),
    document.getElementById('opcao4'),
    document.getElementById('opcao5')
];

// Zera a pontuação e inicia o jogo
function comecarQuiz() {
    numeroDaQuestao = 0;

    placar = 0;
    montarTela();
}

// Carrega os dados da pergunta na tela
function montarTela() {
    // Confere se acabaram as perguntas
    if (numeroDaQuestao >= listaDePerguntas.length) {
        encerrarJogo();
        return;
    }

    const perguntaAtual = listaDePerguntas[numeroDaQuestao];

    // Atualiza os textos
    textoPergunta.textContent = perguntaAtual.titulo;
    botoesResposta[0].querySelector('p').textContent = perguntaAtual.opA;
    botoesResposta[1].querySelector('p').textContent = perguntaAtual.opB;
    botoesResposta[2].querySelector('p').textContent = perguntaAtual.opC;
    botoesResposta[3].querySelector('p').textContent = perguntaAtual.opD;
    botoesResposta[4].querySelector('p').textContent = perguntaAtual.opE;
    contador_perguntas.textContent = `${numeroDaQuestao + 1}/${listaDePerguntas.length}`
    contador_acertos.textContent = `Acertos: ${placar}`

    // Reseta o estilo dos botões
    botoesResposta.forEach(botao => {
        botao.style.backgroundColor = "#fff";
        botao.style.pointerEvents = "auto";
        botao.classList.remove('certa')
        botao.classList.remove('errada')
    });

    // Começa a contar o tempo
    ligarCronometro();
}

// Função do timer
function ligarCronometro() {
    const barraTimer = document.getElementById('timer')
    barraTimer.classList.add('timerAtivo')
    clearInterval(cronometro);

    let segundos = tempoMaximo;
    textoTempo.textContent = segundos;

    cronometro = setInterval(() => {
        segundos--;
        textoTempo.textContent = segundos;

        // Se o tempo acabar, vai pra próxima
        if (segundos <= 0) {
            clearInterval(cronometro);
            proxima();
        }
    }, 1000);
}

// Verifica se acertou ou errou
function conferirResposta(botaoClicado) {
    const barraTimer = document.getElementById('timer')
    barraTimer.classList.remove('timerAtivo')

    clearInterval(cronometro);

    const respostaEscolhida = botaoClicado.querySelector('p').textContent;
    const respostaCerta = listaDePerguntas[numeroDaQuestao].certa;

    if (respostaEscolhida === respostaCerta) {
        // Pinta de verde se acertar
        placar++;
        contador_acertos.textContent = `Acertos: ${placar}`
        playAudio('./sons/certo.mp3')
        botaoClicado.classList.add('certa')
    } else {

        // Pinta de vermelho se errar
        playAudio('./sons/errado.mp3')
        botaoClicado.classList.add('errada')
        // Mostra qual era a certa
        botoesResposta.forEach(botao => {
            if (botao.querySelector('p').textContent === respostaCerta) {
                botao.classList.add('certa')
            }
        });
    }

    // Bloqueia cliques repetidos
    botoesResposta.forEach(b => b.style.pointerEvents = "none");

    // Espera um pouco e avança
    setTimeout(proxima, 1500);
}

function proxima() {
    numeroDaQuestao++;
    montarTela();
}

function playAudio(caminho) {
    const audio = new Audio(caminho)
    audio.volume = 0.2
    audio.play()
}

// Mostra o resultado final
function encerrarJogo() {
    const pop_up_fim = document.getElementById('pop-up-fim')
    pop_up_fim.showModal()
    const text_pontuacao = document.getElementById('text-pontuacao')
    text_pontuacao.textContent = `Você acertou ${placar} de ${listaDePerguntas.length} questões`
    playAudio('./sons/fim.mp3')
}

// Adiciona o click nos botões
botoesResposta.forEach(botao => {
    botao.addEventListener("click", () => conferirResposta(botao));
});


// Inicia tudo
comecarQuiz();