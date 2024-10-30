//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
let arrayPaciente = [];

/*
Creando una funcion para que limpie el formulario
siempre que se cargue la pagina o cuando se presione
el boton limpiar del formulario
*/
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();
};

/*
Función para validar el ingreso del paciente
*/
const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = 
        inputRdMasculino.checked == true
        ? "Hombre"
        : inputRdFemenino.checked == true
        ? "Mujer"
        : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        //Agregando información al arreglo paciente
        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
        );

        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        //Llamando al componente de Bootstrap
        toast.show();

        //Limpiando formulario
        limpiarForm();
    } else {
        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

/*
Función que imprime la ficha de los pacientes registrados
*/
function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
        $fila += `<tr>
            <td scope="row" class="text-center fw-bold">${contador}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td>
                <button id="idBtnEditar${contador}" type="button" class="btn btn-primary" alt="Eliminar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger" alt="Editar">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
        contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width:5%">#</th>
                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                <th scope="col" class="text-center" style="width:10%">País</th>
                <th scope="col" class="text-center" style="width:25%">Dirección</th>
                <th scope="col" class="text-center" style="width:10%">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>`;
    document.getElementById("idTablaPacientes").innerHTML = $table;
};

// Contador global de los option correspondiente al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "País agregado correctamente";
        //Llamando al componente de Bootstrap
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//Ejecutar función al momento de cargar la página HTML
limpiarForm();


// Función para eliminar paciente
function eliminarPaciente(index) {
    arrayPaciente.splice(index, 1); // Elimina el paciente del array
    imprimirPacientes(); // Actualiza la tabla
}

// Función para editar paciente
function editarPaciente(index) {
    const paciente = arrayPaciente[index];
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    inputRdMasculino.checked = paciente[3] === "Hombre";
    inputRdFemenino.checked = paciente[3] === "Mujer";
    cmbPais.value = Array.from(cmbPais.options).find(opt => opt.text === paciente[4]).value;
    inputDireccion.value = paciente[5];

    // Cambiar el botón "Agregar" o "Actualizar"
    buttonAgregarPaciente.innerText = "Actualizar Datos";
    buttonAgregarPaciente.onclick = () => actualizarPaciente(index);
}

// Función para actualizar el paciente en el array y en la tabla
function actualizarPaciente(index) {
    arrayPaciente[index] = [
        inputNombre.value,
        inputApellido.value,
        inputFechaNacimiento.value,
        inputRdMasculino.checked ? "Hombre" : "Mujer",
        cmbPais.options[cmbPais.selectedIndex].text,
        inputDireccion.value
    ];
    imprimirPacientes(); // Actualiza la tabla
    limpiarForm(); // Limpia el formulario

    // Restaurar el botón a "Guardar Datos"
    buttonAgregarPaciente.innerText = "Guardar Datos";
    buttonAgregarPaciente.onclick = addPaciente;
}

function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element, index) => {
        $fila += `<tr>
            <td scope="row" class="text-center fw-bold">${contador}</td>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td>${element[4]}</td>
            <td>${element[5]}</td>
            <td>
                <button type="button" class="btn btn-primary" onclick="editarPaciente(${index})">
                    <i class="bi bi-pencil-square"></i> Editar
                </button>
                <button type="button" class="btn btn-danger" onclick="eliminarPaciente(${index})">
                    <i class="bi bi-trash3-fill"></i> Eliminar
                </button>
            </td>
        </tr>`;
        contador++;
    });
    return $fila;
}

// Expresiones regulares
const carnetRegex = /^[A-Z]{2}[0-9]{3}$/;
const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const duiRegex = /^\d{8}-\d$/;
const nitRegex = /^\d{4}-\d{6}-\d{3}-\d$/;
const fechaRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const edadRegex = /^[0-9]+$/;

// Función de validación
function validarCampo(regex, valor) {
    return regex.test(valor);
}

function validarFormularioEstudiante() {
    const carnet = document.getElementById("idTxtCarnet").value;
    const nombre = document.getElementById("idTxtNombreEstudiante").value;
    const dui = document.getElementById("idTxtDui").value;
    const nit = document.getElementById("idTxtNit").value;
    const fechaNacimiento = document.getElementById("idTxtFechaNacimientoEstudiante").value;
    const correo = document.getElementById("idTxtCorreo").value;
    const edad = document.getElementById("idTxtEdad").value;

    if (!validarCampo(carnetRegex, carnet)) {
        alert("Carnet no valido. Ejemplo válido: AB001");
        return false;
    }
    if (!validarCampo(nombreRegex, nombre)) {
        alert("Nombre no valido. Solo se permiten letras y espacios.");
        return false;
    }
    if (!validarCampo(duiRegex, dui)) {
        alert("DUI no valido. Ejemplo válido: 12345678-9");
        return false;
    }
    if (!validarCampo(nitRegex, nit)) {
        alert("NIT no valido. Ejemplo válido: 1234-567890-123-1");
        return false;
    }
    if (!validarCampo(fechaRegex, fechaNacimiento)) {
        alert("Fecha de nacimiento no valida. Formato DD/MM/YYYY.");
        return false;
    }
    if (!validarCampo(correoRegex, correo)) {
        alert("Correo electrónico no valido.");
        return false;
    }
    if (!validarCampo(edadRegex, edad)) {
        alert("Edad no valida. Solo se permiten números.");
        return false;
    }

    alert("Todos los datos son válidos.");
    return true;
}
