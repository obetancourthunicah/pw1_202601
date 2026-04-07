let formulario = null;
let nombreCompletoInput = null;
let correoElectronico = null;
let submitButton = null;

// Regex

// Encontrar un patrón de texto,
// Reemplazar un patrón de texto


// match
// replace
// test

// Expresion buscar cadenas de texto vacias

const regexIsEmpty = /^\s*$/;  // \d \w \W
const regexIsEmail = /^[\w.-]+@[\w.-]+\.\w{2,}$/;

document.addEventListener("DOMContentLoaded", () => {
    formulario = document.getElementById("contactForm");
    nombreCompletoInput = document.getElementById("txtNombre");
    correoElectronico = document.getElementById("txtCorreoElectronico");
    submitButton = document.getElementById("btnEnviar");
    submitButton.addEventListener("click", (e)=>{
        e.preventDefault();
        e.stopPropagation();
        let objErrores = {};
        let formularioValido = true;
        if (!validarEspacioVacio(nombreCompletoInput.value)) {
            objErrores['txtNombreDiv'] = {
                "error": "Nombre Completo no puede estar vacío.",
                "input": nombreCompletoInput
            }
            formularioValido = false;
        }
        if (!validarCorreoElectronico(correoElectronico.value)) {
            objErrores['txtCorreoDiv'] = {
                "error": "Correo electrónico no está en el formato correcto.",
                "input": correoElectronico
            }
            formularioValido = false;
        }

        if (formularioValido) {
            formulario.submit();
        } else {
            Object.entries(objErrores).forEach(err => {
                let [key, obj] = err;
                obj.input.classList.add('error');
                let container = document.getElementById(key);
                let errorSpan = document.createElement("DIV");
                errorSpan.innerText = obj.error;
                errorSpan.classList.add('error-text');
                container.appendChild(errorSpan);
            });
        }

    });
});

function validarEspacioVacio(valor) {
   return !regexIsEmpty.test(valor);
}
function validarCorreoElectronico(valor) {
    return regexIsEmail.test(valor);
}
