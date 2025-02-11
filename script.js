let secretPhrase = "Sara mira por la ventana".toLowerCase().split("");
let displayedPhrase = secretPhrase.map(char => (char === " " ? " " : "_"));
let attempts = 6;
let usedLetters = new Set();

// Sonidos
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");
const winSound = new Audio("win.mp3");
const loseSound = new Audio("lose.mp3");

document.getElementById("wordDisplay").innerHTML = formatPhrase(displayedPhrase);
document.getElementById("attempts").innerText = attempts;

// Generar teclado virtual
const keyboardContainer = document.getElementById("keyboard");
const alphabet = "abcdefghijklmnñopqrstuvwxyzáéíóú";
alphabet.split("").forEach(letter => {
    let key = document.createElement("div");
    key.classList.add("key");
    key.innerText = letter;
    key.id = "key-" + letter;
    key.onclick = () => pressKey(letter);
    keyboardContainer.appendChild(key);
});

function pressKey(letter) {
    document.getElementById("guess").value += letter;
}

function checkWord() {
    let guess = document.getElementById("guess").value.toLowerCase();
    let message = document.getElementById("message");

    if (guess.length !== 5) {
        message.innerText = "Debes ingresar una palabra de 5 letras.";
        return;
    }

    let correctLetters = false;

    for (let i = 0; i < secretPhrase.length; i++) {
        if (guess.includes(secretPhrase[i])) {
            displayedPhrase[i] = secretPhrase[i];
            document.getElementById(`letter-${i}`).classList.add("revealed");
            correctLetters = true;
        }
    }

    updateKeyboard(guess);

    document.getElementById("wordDisplay").innerHTML = formatPhrase(displayedPhrase);

    if (!displayedPhrase.includes("_")) {
        message.innerText = "¡Felicidades! Has adivinado la frase.";
        winSound.play();
        disableGame();
        return;
    }

    attempts--;
    document.getElementById("attempts").innerText = attempts;

    if (attempts === 0) {
        message.innerText = "Fin del juego. La frase era: 'Sara mira por la ventana'.";
        loseSound.play();
        disableGame();
    } else {
        message.innerText = correctLetters ? "¡Bien! Algunas letras están en la frase." : "No hay coincidencias.";
        correctLetters ? correctSound.play() : wrongSound.play();
    }

    document.getElementById("guess").value = "";
}

function updateKeyboard(word) {
    word.split("").forEach(letter => {
        if (!usedLetters.has(letter)) {
            usedLetters.add(letter);
            let keyElement = document.getElementById("key-" + letter);
            if (secretPhrase.includes(letter)) {
                keyElement.classList.add("correct");
            } else {
                keyElement.classList.add("incorrect");
            }
        }
    });
}

function formatPhrase(phraseArray) {
    return phraseArray.map((char, index) =>
        char === " " ? '<span class="letter-box" style="border: none;">&nbsp;</span>' :
        `<span id="letter-${index}" class="letter-box">${char !== "_" ? char.toUpperCase() : "_"}</span>`
    ).join("");
}

function disableGame() {
    document.getElementById("guess").disabled = true;
    document.getElementById("submit").disabled = true;
}
