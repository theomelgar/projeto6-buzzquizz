
//simula a criacao de um quizz, no caso aparece quizzes feitos
const criarQuizz = () =>{
    let indicador = document.querySelector(".quizzUsuario");
    indicador.classList.remove("escondido");
    let meuQuizz = document.querySelector(".meuQuizz");
    meuQuizz.innerHTML = "";
    meuQuizz.innerHTML = `
    <div class="quizzes">
        <div class="quizz">
            <div class="edit">
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon onclick="apagar(this)" name="trash-outline"></ion-icon>
            </div>
            <img src="Rectangle 34.png">
            <div class="titulo">Acerte os personagens corretos dos Simpsons e prove seu amor!</div>
        </div>
        <div class="quizz">
        <div class="edit">
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon onclick="apagar(this)" name="trash-outline"></ion-icon>
            </div>
            <img src="Rectangle 34.png">
            <div class="titulo">Acerte os personagens corretos dos Simpsons e prove seu amor!</div>
        </div>
        <div class="quizz">
        <div class="edit">
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon onclick="apagar(this)" name="trash-outline"></ion-icon>
            </div>
            <img src="Rectangle 34.png">
            <div class="titulo">Acerte os personagens corretos dos Simpsons e prove seu amor!</div>
        </div>
        <div class="quizz">
        <div class="edit">
            <ion-icon name="create-outline"></ion-icon>
            <ion-icon onclick="apagar(this)" name="trash-outline"></ion-icon>
            </div>
            <img src="Rectangle 34.png">
            <div class="titulo">Acerte os personagens corretos dos Simpsons e prove seu amor!</div>
        </div>
    </div>
    `;
    meuQuizz.style= 'border: 0px;'+
    'background: white;'+
    'margin: 0 auto;'+
    'margin-bottom:60px;'+
    'height:100%;'+
    'align-items:unset';
}

//LUCAS DUAN
let info;//ira armazenar as informaçoes do quiz
let acertos;
let respondidas;
//pede o quiz escolhido da api
function começar(){
    const apaga = document.querySelector('.corpoquiz');
    apaga.innerHTML = `<ul>
    </ul>`;
    const iniciar = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1');
    iniciar.then(renderizarquiz);
}
//LUCAS DUAN
let listQuizzes=[];

//carrega os quizzes
function carregarQuizzes(resposta) {
    listQuizzes = resposta.data;
    renderizarQuizzes(listQuizzes);
    
}
  
//mostra o erro no console
function tratarErro(erro) {
    console.log(erro.response);
}

const quizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
quizzes.then(carregarQuizzes);
quizzes.catch(tratarErro);

//renderiza todos os quizzes da lista
function renderizarQuizzes(Quizzes) {
    let meuQuizz = document.querySelector(".todosQuizz .quizzes");
    meuQuizz.innerHTML = "";
  
    for (let i = 0; i < Quizzes.length; i++) {
        const Quizz = Quizzes[i];
        meuQuizz.innerHTML += QuizzDiv(Quizz);
    }
}

//monta a div do quizz
function QuizzDiv(Quizz) {
    return `
    <div class="quizz">
        <img src="${Quizz.image}">
        <div class="titulo">${Quizz.title}</div>
    </div>
    `;
}

const apagar = (seletor) =>{
    seletor = seletor.parentNode;
    seletor.parentNode.remove();
}
//LUCAS DUAN
//imprime o quiz na tela
function renderizarquiz(resposta) {
    info = resposta.data;//atribui as infomaçoes da api a variavel info
    acertos = 0;
    respondidas = 0;
    //seleciona a div banner
    const banner = document.querySelector('.banner');

    //cria o banner
    banner.innerHTML = '';
    banner.style.backgroundImage = `url(${info.image})`;
    banner.innerHTML += `<p>${info.title}</p>`;

    //seleciona a tag ul
    const quiz = document.querySelector('ul');
    quiz.innerHTML = '';

    //cria as caixas das perguntas
    for (let i = 0; i < info.questions.length; i++) {
        const perguntas = info.questions[i];
        //cria as caixas e escreve as perguntas
        quiz.innerHTML += ` <li class="caixapergunta">
            <div id = "cor${i}"class="pergunta">
                <h2>${perguntas.title}</h2>
            </div>
            <div id="${i}" class="opçoes">
        </div>
        </li>`

        //muda a cor da pergunta
        document.getElementById('cor' + i).style.backgroundColor = perguntas.color;
        const opçoes = document.getElementById(i);
        let aleatorio = perguntas.answers;
        randomiza(aleatorio);
        
        //cria as respostas
        for (let a = 0; a < perguntas.answers.length; a++) {
            const respostas = aleatorio[a];
            switch (respostas.isCorrectAnswer) {
                case true:
                    opçoes.innerHTML +=
                    `<div class = "certa caixa${i}" onclick="mudacor(this,${i});verifica(${respostas.isCorrectAnswer})">
                        <input type ="image" src="${respostas.image}"/>
                        <label>${respostas.text}</label>
                    </div>`
                    break;
            
                default:
                    opçoes.innerHTML +=
                    `<div class = "caixa${i}" onclick="mudacor(this,${i});verifica(${respostas.isCorrectAnswer})">
                        <input type ="image" src="${respostas.image}"/>
                        <label>${respostas.text}</label>
                    </div>`
                    break;
            }
        }
    }
} 
function randomiza(array) {
    for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]];
 }
}
function mudacor(clique, classe) {
    let mudar = document.querySelectorAll(".caixa"+ classe);
    mudar.forEach(outras => {
        let mude = outras.classList;
        mude.add("naoescolhida");
        outras.style.color = "#FF4B4B";
        outras.removeAttribute("onclick");
        if (outras.classList.contains("certa")) {
            outras.style.color = "#009C22";
        }
    });
    let escolhida = clique.classList;
    escolhida.remove("naoescolhida");
    let next = classe + 1;
    
    setTimeout(() => {
        document.querySelector("#cor" + next).scrollIntoView();
    }, 2000);
}
function verifica(escolha) {
    respondidas++;
    if (escolha === true) {
        acertos++;
    }
    if (respondidas === info.questions.length) {
        resultado();
        setTimeout(() => {
            document.querySelector("section").scrollIntoView();
        }, 2000);
    }
}
function resultado() {
    const pontuaçao = Math.round((acertos/respondidas)*100);
    const result = document.querySelector('.corpoquiz');
    let nivel = [];
    for (let i = 0; i < info.levels.length - 1; i++) {
        nivel = info.levels[i];
        const proximo = info.levels[i+1].minValue;
        if (pontuaçao < proximo) {
            break;
        }
        nivel = info.levels[i + 1];
    }
    result.innerHTML += ` 
    <section>
        <div class="nivel">
            <h2>${pontuaçao}% de acerto: ${nivel.title}</h2>
        </div>
        <div class="mensagemnivel">
            <img src="${nivel.image}"/>
            <p>${nivel.text}</p>
        </div>
    </section>
    <button class="reiniciar" onclick="começar()">Reiniciar quiz</button>
    <button class="home" onclick="voltar()">Voltar pra home</button>`
}
function voltar() {
    const pagina = document.querySelector('#respondequiz');
    pagina.classList.add('esconde');
}
começar();
//LUCAS DUAN
