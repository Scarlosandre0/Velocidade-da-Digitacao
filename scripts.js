const texto = document.querySelector("#texto");
const entrada = document.querySelector("#entrada");
const reiniciar = document.querySelector("#reiniciar");
const resultado = document.querySelector("#resultado");
const historico = document.querySelector("#historico");
const alternarTemaBtn = document.querySelector("#alternarTema");

const textos = [
  "Exemplo de texto para digitar",
  "Digite isso",
  "A provação vem, não só para testar o nosso valor, mas para aumentá-lo; o carvalho não é apenas testado, mas enrijecido pelas tempestades",
  "Sempre antes de realizar um sonho, a Alma do Mundo resolve testar tudo aquilo que foi aprendido na caminhada",
  "Se você quer testar sua memória, tente se lembrar hoje sobre o que você estava preocupado há um ano atrás",
  "Se não estabelecermos prioridades, alguém fará isso por nós.",
  "Quando realmente temos clareza de propósito, conseguimos ter sucesso nas iniciativas.",
];

function novoTexto() {
  const index = Math.floor(Math.random() * textos.length);
  texto.textContent = textos[index];
}

function atualizarTeste() {
  iniciar();

  if (entrada.value === texto.textContent) {
    verificar()
  }
}

function iniciar() {
  const statusDoTeste = JSON.parse(localStorage.getItem("testeEmAndamento"));

  if(!statusDoTeste) {
    localStorage.setItem("tempoInicial", new Date().getTime());
    localStorage.setItem("testeEmAndamento", true);
  }
}

function verificar() {
  const tempoFinal = new Date().getTime();
  const tempoInicial = parseInt(localStorage.getItem("tempoInicial"));
  const tempoGasto = (tempoFinal - tempoInicial) / 1000;

  resultado.textContent = `Parabens! Você levou ${tempoGasto} Segundos.`

  adicionarAoHistorico(texto.textContent, tempoGasto);

  localStorage.setItem("testeEmAndamento", false);
  entrada.value = "";
  novoTexto();
}

function adicionarAoHistorico(textoDigitado, tempoGasto) {
  const itemHistorico = document.createElement("p");

  itemHistorico.textContent = `Texto "${textoDigitado}" - Tempo: ${tempoGasto}`;

  historico.appendChild(itemHistorico);
}

function reiniciarTeste() {

  entrada.value = ""
  resultado.textContent = ""
  novoTexto()
  localStorage.setItem("testeEmAndamento", false)
  historico.innerHTML = ""
}

function alterarTema() {
  const body = document.body;

  body.classList.toggle("light");
  body.classList.toggle("dark");
 
}

entrada.addEventListener("keyup", atualizarTeste);
reiniciar.addEventListener("click",reiniciarTeste);

alternarTemaBtn.addEventListener("click", alterarTema);

novoTexto();