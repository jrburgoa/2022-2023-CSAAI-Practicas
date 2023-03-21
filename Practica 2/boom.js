//Practica Boom Johann Burgoa


//-- Clase cronómetro
class Crono {
  constructor(display) {
    this.display = display;
    this.cent = 0,
      this.seg = 0,
      this.min = 0,
      this.timer = 0;
  }

  tic() {
    this.cent += 1;

    if (this.cent == 100) {
      this.seg += 1;
      this.cent = 0;
    }

    if (this.seg == 60) {
      this.min = 1;
      this.seg = 0;
    }

    this.display.innerHTML = this.min + ":" + this.seg + ":" + this.cent
  }

  start() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.tic();
      }, 10);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  reset() {
    this.cent = 0;
    this.seg = 0;
    this.min = 0;

    this.display.innerHTML = "0:0:0";
    
    this.secretkey = [];
    for (let i = 0; i < 4; i++) {
      let rnum = getRandomInt(10);
      this.secretkey.push(rnum);
    }

    const line0Buttons = document.querySelectorAll('.line0 .cdigito');

    line0Buttons.forEach((button, index) => {
      button.value = this.secretkey[index];
      button.textContent = '*';
    });
    
    this.start(); // reiniciar el cronómetro
  }
}

const gui = {
  display: document.getElementById("display"),
  start: document.getElementById("start"),
  stop: document.getElementById("stop"),
  reset: document.getElementById("reset")
}

console.log("Ejecuitando JS...");

const crono = new Crono(gui.display);

const startCrono = () => {
  console.log("Start!!");
  crono.start();
}

gui.start.onclick = startCrono;

const lineButtons = document.querySelectorAll('.line1 button, .line2 button, .line3 button, .line4 button');

lineButtons.forEach((button) => {
  button.addEventListener('click', startCrono);
});

gui.stop.onclick = () => {
  console.log("Stop!");
  crono.stop();
}

gui.reset.onclick = () => {
  console.log("Reset!");
  crono.reset();
}

// Generar 4 números aleatorios de 0 a 9
const secretkey = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

for (let i = 0; i < 4; i++) {
  let rnum = getRandomInt(10);
  secretkey.push(rnum);
}

const line0Buttons = document.querySelectorAll('.line0 .cdigito');

line0Buttons.forEach((button, index) => {
  button.value = secretkey[index];
  button.textContent = '*';
});

// Función para comprobar si se ha descubierto el código secreto
function checkCode() {
  const displayDigits = document.querySelectorAll('.line0 .cdigito');
  let code = '';
  displayDigits.forEach((displayDigit) => {
    code += displayDigit.textContent;
  });
  if (code === secretkey.join('')) {
    crono.stop();
  }
}

// Agregar controladores de eventos para cada botón
lineButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const digit = parseInt(button.value);
    const displayDigits = document.querySelectorAll('.line0 .cdigito');
    displayDigits.forEach((displayDigit) => {
      if (displayDigit.textContent === '*') {
        const displayValue = parseInt(displayDigit.value);
        if (digit === displayValue) {
          displayDigit.textContent = digit;
          checkCode(); // Comprobar si se ha descubierto el código secreto
        }
      }
    });
  });
});

function acertarDigito(digito) {
  const displayDigits = document.querySelectorAll('.line0 .cdigito');
  displayDigits.forEach((displayDigit) => {
    if (displayDigit.textContent === '*') {
      const displayValue = parseInt(displayDigit.value);
      if (digito === displayValue) {
        displayDigit.textContent = digito;
        displayDigit.classList.add('correcto'); // Agregar clase 'correcto'
        checkCode(); // Comprobar si se ha descubierto el código secreto
      }
    }
  });
}

