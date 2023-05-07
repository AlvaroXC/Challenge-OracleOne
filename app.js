document.addEventListener("DOMContentLoaded", function () {

  const reemplazos = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  const originales = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };


  const inputMensaje = document.querySelector("#mensaje");
  const contenedorInput = document.querySelector(".contenedor-input");
  const textos = document.querySelector("#textos");
  const btnEncriptar = document.querySelector("#encriptar");
  const btnDesencriptar = document.querySelector("#desencriptar");
  const formulario = document.querySelector("#formulario");
  const contenedorMensajes = document.querySelector(".contenedor-textos");

  inputMensaje.addEventListener("input", validar);
  btnEncriptar.addEventListener("click", encriptar);
  btnDesencriptar.addEventListener("click", desencriptar);

function encriptar(e) {
    e.preventDefault();

    if (contenedorMensajes.classList.contains("contenido")) {
      limpiarContenedor();
    }
    const texto = document.querySelector("#mensaje").value;
    let palabraEncriptada = "";

    for (let i = 0; i < texto.length; i++) {
      const letraActual = texto[i];
      const letraEncriptada = reemplazos[letraActual] || letraActual;
      palabraEncriptada += letraEncriptada;
    }

    crearMensaje(palabraEncriptada);
    formulario.reset();
  }



  function desencriptar(e) {
    e.preventDefault();
    limpiarContenedor();
    const palabraEncriptada = document.querySelector("#mensaje").value;
    let palabraOriginal = "";

    let i = 0;
    while (i < palabraEncriptada.length) {
      let letraActual = palabraEncriptada[i];
      if (
        letraActual === "e" &&
        palabraEncriptada.slice(i, i + 5) === "enter"
      ) {
        letraActual = "enter";
        i += 4;
      } else if (
        letraActual === "i" &&
        palabraEncriptada.slice(i, i + 4) === "imes"
      ) {
        letraActual = "imes";
        i += 3;
      } else if (
        letraActual === "a" &&
        palabraEncriptada.slice(i, i + 2) === "ai"
      ) {
        letraActual = "ai";
        i += 1;
      } else if (
        letraActual === "o" &&
        palabraEncriptada.slice(i, i + 4) === "ober"
      ) {
        letraActual = "ober";
        i += 3;
      } else if (
        letraActual === "u" &&
        palabraEncriptada.slice(i, i + 4) === "ufat"
      ) {
        letraActual = "ufat";
        i += 3;
      }
      const letraOriginal = originales[letraActual] || letraActual;
      palabraOriginal += letraOriginal;
      i++;
    }
    crearMensaje(palabraOriginal);
    formulario.reset();
  }


    
function validar(e) {
    limpiarAlerta(e.target.parentElement);

    if (e.target.value.trim() === "") {
      alerta("El campo es obligatorio");
      btnEncriptar.disabled = true;
      btnEncriptar.classList.remove("habilitar");
      btnEncriptar.classList.add("deshabilitar");
      btnDesencriptar.classList.remove("habilitar");
      btnDesencriptar.disabled = true;
      btnDesencriptar.classList.add("deshabilitar");
      return;
    }

    btnEncriptar.classList.add("habilitar");
    btnEncriptar.classList.remove("deshabilitar");
    btnEncriptar.disabled = false;
    btnDesencriptar.classList.add("habilitar");
    btnDesencriptar.classList.remove("deshabilitar");
    btnDesencriptar.disabled = false;
  }
  //



  function alerta(mensaje) {
    const error = document.createElement("p");
    error.textContent = mensaje;
    error.classList.add("alerta");
    contenedorInput.appendChild(error);
  }

  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".alerta");
    if (alerta) {
      alerta.remove();
    }
  }



  function crearMensaje(texto) {
    if (textos) {
      const mensaje = document.createElement("p");
      textos.remove();
      mensaje.textContent = texto;
      mensaje.classList.add("encriptado");
      contenedorMensajes.classList.add("contenido");
      contenedorMensajes.appendChild(mensaje);
    }

    const btnCopiar = document.createElement("button");
    btnCopiar.textContent = "Copiar";
    btnCopiar.classList.add("btn-copiar");
    btnCopiar.classList.add("habilitar");
    contenedorMensajes.appendChild(btnCopiar);
    btnCopiar.addEventListener("click", copiar);
  }


  function limpiarContenedor() {
    contenedorMensajes.innerHTML = "";
  }


  function copiar() {
    const parrafo = document.querySelector(".encriptado").innerText;
    navigator.clipboard.writeText(parrafo);
  }
});
