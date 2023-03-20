//Practica Boom Johann Burgoa


//-- Clase cronómetro
class Crono {

    //-- Constructor. Hay que indicar el 
    //-- display donde mostrar el cronómetro
    constructor(display) {
        this.display = display;

        //-- Tiempo
        this.cent = 0, //-- Centésimas
        this.seg = 0,  //-- Segundos
        this.min = 0,  //-- Minutos
        this.timer = 0;  //-- Temporizador asociado
    }

    //-- Método que se ejecuta cada centésima
    tic() {
        //-- Incrementar en una centesima
        this.cent += 1;

        //-- 100 centésimas hacen 1 segundo
        if (this.cent == 100) {
        this.seg += 1;
        this.cent = 0;
        }

        //-- 60 segundos hacen un minuto
        if (this.seg == 60) {
        this.min = 1;
        this.seg = 0;
        }

        //-- Mostrar el valor actual
        this.display.innerHTML = this.min + ":" + this.seg + ":" + this.cent
    }

    //-- Arrancar el cronómetro
    start() {
       if (!this.timer) {
          //-- Lanzar el temporizador para que llame 
          //-- al método tic cada 10ms (una centésima)
          this.timer = setInterval( () => {
              this.tic();
          }, 10);
        }
    }

    //-- Parar el cronómetro
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    //-- Reset del cronómetro
    reset() {
        this.cent = 0;
        this.seg = 0;
        this.min = 0;

        this.display.innerHTML = "0:0:0";
    }
}

//-- Elementos de la gui
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset")
}

console.log("Ejecuitando JS...");

//-- Definir un objeto cronómetro
const crono = new Crono(gui.display);

//---- Configurar las funciones de retrollamada

//-- Arranque del cronometro
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}
  
//-- Detener el cronómetro
gui.stop.onclick = () => {
    console.log("Stop!");
    crono.stop();
}

//-- Reset del cronómetro
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


// Obtener botones de línea
const lineButtons = document.querySelectorAll('.line1 button, .line2 button, .line3 button, .line4 button');

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
        }
      }
    });
  });
});
