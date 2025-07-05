// Seleciona o elemento que exibe o número de caracteres da senha
const numeroSenha = document.querySelector('.parametro-senha__texto');
// Define o tamanho inicial da senha como 12 caracteres
let tamanhoSenha = 12;
// Atualiza o texto exibido para o tamanho inicial
numeroSenha.textContent = tamanhoSenha;

// Conjuntos de caracteres disponíveis para gerar a senha
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const conterAsLetrasXAtéZ = 'xyz'; 

// Seleciona os botões de incremento/decremento, campo de senha, checkboxes e barra de força
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

// Associa as funções de incremento/decremento aos botões
botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

// Função para diminuir o tamanho da senha (mínimo: 1 caractere)
function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha(); // Regera a senha com o novo tamanho
}

// Função para aumentar o tamanho da senha (máximo: 20 caracteres)
function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha(); // Regera a senha com o novo tamanho
}

// Adiciona um event listener para cada checkbox, regenerando a senha quando alterados
for (i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

// Gera a senha inicial ao carregar a página
geraSenha();

// Função principal para gerar a senha aleatória
function geraSenha() {
    let alfabeto = '';
    // Concatena os conjuntos de caracteres selecionados nos checkboxes
    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;
    if (checkbox[4].checked) alfabeto += conterAsLetrasXAtéZ;

    let senha = '';
    // Gera cada caractere da senha aleatoriamente a partir do alfabeto definido
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha; // Exibe a senha no campo
    classificaSenha(alfabeto.length); // Classifica a força da senha
}

// Função para classificar a força da senha com base na entropia
function classificaSenha(tamanhoAlfabeto) {
    // Calcula a entropia (medida de segurança): tamanhoSenha * log2(tamanhoAlfabeto)
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia); // Debug: exibe no console

    // Remove classes anteriores de força para evitar conflitos
    forcaSenha.classList.remove('muito-fraca', 'fraca', 'media', 'forte', 'muito-forte');

    // Adiciona a classe correspondente à força calculada
    if (entropia > 80) {
        forcaSenha.classList.add('muito-forte');
    } else if (entropia > 50) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 20) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 5) {
        forcaSenha.classList.add('muito-fraca');
    } else {
        forcaSenha.classList.add('fraca');
    }

    // Exibe o tempo estimado para quebrar a senha (baseado em entropia)
    const valorEntropia = document.querySelector('.entropia');
    let segundos = Math.pow(2, entropia) / 100e6; // Calcula segundos teóricos

    // Formata a mensagem conforme o tempo calculado
    if (segundos > 60 * 60 * 24 * 365 * 1000000) {
        valorEntropia.textContent = "Um computador pode demorar mais que a idade do universo para encontrar sua senha.";
    } else if (segundos > 60 * 60 * 24 * 365) {
        valorEntropia.textContent = "Um computador pode demorar " + Math.floor(segundos / (60 * 60 * 24 * 365)) + " anos para encontrar sua senha.";
    } else if (segundos > 60 * 60 * 24) {
        valorEntropia.textContent = "Um computador pode demorar " + Math.floor(segundos / (60 * 60 * 24)) + " dias para encontrar sua senha.";
    } else if (segundos > 60 * 60) {
        valorEntropia.textContent = "Um computador pode demorar " + Math.floor(segundos / (60 * 60)) + " horas para encontrar sua senha.";
    } else if (segundos > 60) {
        valorEntropia.textContent = "Um computador pode demorar " + Math.floor(segundos / 60) + " minutos para encontrar sua senha.";
    } else {
        valorEntropia.textContent = "Um computador pode demorar " + Math.floor(segundos) + " segundos para encontrar sua senha.";
    }
}