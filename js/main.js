const checkbox = document.querySelectorAll('.input__checkbox');
const passwordField = document.querySelector('#input__inserir-senha');
const strengthPassword = document.querySelector('.div__barra');
const textEntropia = document.querySelector('.p__entropia');
const imgRestart = document.querySelector('.img__restart');
let uppercaseLetters, lowcaseLetters, numberLetters, symbolLetters;

// ? Re-generar senha
imgRestart.onclick = randomPassword;

// ? Número de caracteres
const buttons = document.querySelectorAll('.button__caracteres');
const buttonCharacter = document.querySelector('.p__caracteres');
let buttonValue = parseInt(buttonCharacter.textContent);

buttons[0].onclick = diminuir;
buttons[1].onclick = aumentar;

function diminuir() {
    if (buttonValue <= 1) return;
    buttonValue--;
    buttonCharacter.textContent = buttonValue;
    randomPassword();
}

function aumentar() {
    if (buttonValue >= 20) return;
    buttonValue++;
    buttonCharacter.textContent = buttonValue;
    randomPassword();
}

// ? Características da senha
checkbox.forEach((box) => box.onclick = randomPassword);

function verifyCheckbox() {
    uppercaseLetters = '', lowcaseLetters = '', numberLetters = '', symbolLetters = '';

    console.log(checkbox)
    if (checkbox[0].checked) uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (checkbox[1].checked) lowcaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    if (checkbox[2].checked) numberLetters = '0123456789';
    if (checkbox[3].checked) symbolLetters = '!@#$%&*?.';
}
// ? Força da senha
function verifyStrength(stringLength) {
    let entropia = buttonValue * Math.log2(stringLength);

    removeAllStrength();
    if (entropia > 57) strengthPassword.classList.add('div__forte');
    else if (entropia > 35) strengthPassword.classList.add('div__media');
    else strengthPassword.classList.add('div__fraca');

    const milenios = Math.floor((2**entropia) / (100e6*60*60*24*30*12*10*100));
    const decadas = Math.floor((2**entropia) / (100e6*60*60*24*30*12*10));
    const anos = Math.floor((2**entropia) / (100e6*60*60*24*30*12));
    const meses = Math.floor((2**entropia) / (100e6*60*60*24*30));
    const dias = Math.floor((2**entropia) / (100e6*60*60*24));
    const horas = Math.floor((2**entropia) / (100e6*60*60));
    const minutos = Math.floor((2**entropia) / (100e6*60));
    const segundos = Math.floor((2**entropia) / (100e6));

    let text;
    if (milenios > 0) text = `${milenios} milênio${milenios === 1 ? '' : 's'}`;
    else if (decadas > 0) text = `${decadas} década${decadas === 1 ? '' : 's'}`;
    else if (anos > 0) text = `${anos} ano${anos === 1 ? '' : 's'}`;
    else if (meses > 0) text = `${meses} m${meses === 1 ? 'ês' : 'eses'}`;
    else if (dias > 0) text = `${dias} dia${dias === 1 ? '' : 's'}`;
    else if (horas > 0) text = `${horas} hora${horas === 1 ? '' : 's'}`;
    else if (minutos > 0) text = `${minutos} minuto${minutos === 1 ? '' : 's'}`;
    else text = `${segundos} segundo${segundos === 1 ? '' : 's'}`;
    textEntropia.innerHTML = '* Um computador pode levar até <span class="number">' + text + '</span> para descobrir essa senha'
}

function removeAllStrength() {
    strengthPassword.classList.remove('div__fraca', 'div__media', 'div__forte');
}

// * Resultado final
// Cria a nova senha
randomPassword();
function randomPassword() {
    let randomText = '';
    let string = completeString();

    if (!string) {
        textEntropia.textContent = '';
        return passwordField.value = '';
    }

    for (let countX = 0; countX < buttonValue; countX++) {
        const randomIndex = Math.floor(Math.random() * string.length);
        randomText += string[randomIndex];
    }

    verifyStrength(string.length);
    return passwordField.value = randomText;
}

// Cria uma string com todas 
function completeString() {
    verifyCheckbox();
    return `${uppercaseLetters + lowcaseLetters + numberLetters + symbolLetters}`;
}