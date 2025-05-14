let editando = false; // Corregido error tipográfico
let listaproductos = [];

const objproducto = {
    id: '',
    nombre: '',
    referencia: ''
};

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const referenciaInput = document.querySelector('#referencia');
const btnAgregar = document.querySelector('#btnAgregar');

btnAgregar.addEventListener('click', function(e) {
    console.log("Botón Agregar clickeado");
    e.preventDefault();
    validarFormulario(e);
});

function validarFormulario(e) {
    console.log("validarFormulario llamado");
    e.preventDefault();

    console.log("Validando formulario...");

    if (nombreInput.value === '' || referenciaInput.value === '') {
        alert('Todos los campos son obligatorios');
        return;
    }

    if (editando) {
        editarProducto();
        editando = false;
    } else {
        objproducto.id = Date.now();
        objproducto.nombre = nombreInput.value;
        objproducto.referencia = referenciaInput.value;

        agregarProducto();
    }
}

function agregarProducto() {
    listaproductos.push({ ...objproducto });
    nombreInput.value = '';
    referenciaInput.value = '';

    mostrarProductos();

    formulario.reset();

    limpiarObjeto();
}

function limpiarObjeto(){
    objproducto.id = '';
    objproducto.nombre = '';
    objproducto.referencia = '';
}

function mostrarProductos() {
    const divProductos = document.querySelector('.div-producto');
    divProductos.innerHTML = '';

    listaproductos.forEach(producto => {
        const { id, nombre, referencia } = producto;

        console.log("Producto:", id, nombre, referencia);

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${referencia}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        editarBoton.onclick = () => cargarProducto(producto);
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        eliminarBoton.onclick = () => eliminarProducto(id);
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divProductos.appendChild(parrafo);
        divProductos.appendChild(hr);
    });
}

function limpiarHTML() {
    const divProductos = document.querySelector('.div-producto');
    while(divProductos.firstChild){
        divProductos.removeChild(divProductos.firstChild);
    }
}

function cargarProducto(producto) {
    const { id, nombre, referencia } = producto;
    nombreInput.value = nombre;
    referenciaInput.value = referencia;
    objproducto.id = id;
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

function editarProducto() {
    objproducto.nombre = nombreInput.value;
    objproducto.referencia = referenciaInput.value;

    listaproductos.forEach(producto => {
        if (producto.id === objproducto.id) {
            producto.id = objproducto.id;
            producto.nombre = objproducto.nombre;
            producto.referencia = objproducto.referencia;
        }
    });

    limpiarHTML();
    mostrarProductos();

    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = "Agregar";
    editando = false;
}

function eliminarProducto(id) {
    listaproductos = listaproductos.filter(producto => producto.id !== id);
    limpiarHTML();
    mostrarProductos();
}

const busquedaInput = document.querySelector('#busqueda');
const btnBuscar = document.querySelector('#btnBuscar');

btnBuscar.addEventListener('click', function(e) {
    e.preventDefault();
    buscarProducto();
});

function buscarProducto(){
    const termino = busquedaInput.value.toLowerCase().trim();
    const resultadosDiv = document.querySelector('#resultados');
    resultadosDiv.innerHTML = '';

    if(termino === ''){
        resultadosDiv.textContent = 'Ingrese un término para buscar';
        return;
    }
    
    const productosFiltrados = listaproductos.filter(producto => 
        producto.nombre.toLowerCase().includes(termino) ||
        producto.referencia.toLowerCase().includes(termino)
    );
    
    if(productosFiltrados.length === 0){
        resultadosDiv.textContent = 'No se encontraron productos';
    } else {
        productosFiltrados.forEach(producto => {
            const { id, nombre, referencia } = producto;
            const parrafo = document.createElement('p');
            parrafo.textContent = `${id} - ${nombre} - ${referencia}`;
            parrafo.dataset.id = id;
            const hr = document.createElement('hr');
            resultadosDiv.appendChild(parrafo);
            resultadosDiv.appendChild(hr);
        });
    }
}