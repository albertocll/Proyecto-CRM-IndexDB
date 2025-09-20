(function(){
    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    });

    // ====== CONECTAR A LA DB ======
    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 2);

        abrirConexion.onerror = function () {
            console.log('Hubo un error al conectar con la DB');
        };

        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;
        };
    }

    // ====== VALIDAR CLIENTE ======
    function validarCliente(e) {
        e.preventDefault();

        // Leer todos los inputs
        const nombre = document.querySelector('#nombre').value.trim();
        const email = document.querySelector('#email').value.trim();
        const telefono = document.querySelector('#telefono').value.trim();
        const empresa = document.querySelector('#empresa').value.trim();

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        // Validar email básico
        if (!/\S+@\S+\.\S+/.test(email)) {
            imprimirAlerta('El email no es válido', 'error');
            return;
        }

        // Crear objeto cliente con fecha de alta
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            fecha: new Date().toLocaleDateString(), // nueva propiedad
            id: Date.now()
        };

        crearNuevoCliente(cliente);
    }

    // ====== CREAR NUEVO CLIENTE ======
    function crearNuevoCliente(cliente){
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function () {
            imprimirAlerta('Ya existe un cliente con ese email', 'error');
        };

        transaction.oncomplete = function () {
            imprimirAlerta('Cliente agregado correctamente', 'success');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        };
    }

    // ====== ALERTAS / TOASTS ======
    function imprimirAlerta(mensaje, tipo) {
        const alerta = document.createElement('div');
        alerta.classList.add(
            'p-2',
            'mt-3',
            'text-center',
            'rounded-md',
            'font-bold',
            'text-white'
        );

        if (tipo === 'error') {
            alerta.classList.add('bg-red-500');
        } else {
            alerta.classList.add('bg-green-500');
        }

        alerta.textContent = mensaje;

        formulario.parentElement.insertBefore(alerta, formulario);

        setTimeout(() => {
            alerta.remove();
        }, 2000);
    }
})();
