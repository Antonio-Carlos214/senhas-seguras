const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';

const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

// Corrigido: adicionado 'let' para evitar escopo global acidental
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha() {
    let alfabeto = '';
    if (checkbox[0].checked) alfabeto += letrasMaiusculas;
    if (checkbox[1].checked) alfabeto += letrasMinusculas;
    if (checkbox[2].checked) alfabeto += numeros;
    if (checkbox[3].checked) alfabeto += simbolos;

    // Proteção: se o alfabeto estiver vazio, limpa o campo e para a execução
    if (alfabeto.length === 0) {
        campoSenha.value = "Selecione uma opção";
        forcaSenha.classList.remove('fraca', 'media', 'forte');
        document.querySelector('.entropia').textContent = "";
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }
    
    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    
    forcaSenha.classList.remove('fraca', 'media', 'forte');
    
    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia >= 36) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }
    
    const valorEntropia = document.querySelector('.entropia');
    let dias = Math.floor(2**entropia / (100e6 * 60 * 60 * 24));
    
    if (dias < 1) {
        valorEntropia.textContent = "Um computador pode descobrir essa senha em poucos minutos ou horas.";
    } else {
        valorEntropia.textContent = "Um computador pode levar até " + dias + " dias para descobrir essa senha.";
    }
}