(function() {
    let DB;
    let idCliente;

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        abrirDB();

        formulario.addEventListener('submit', actualizarCliente);

        // Obtener el ID de la URL
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');

        if(idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);
        }
    });

    // ====== CONEXIÓN A LA DB ======
    function abrirDB() {
        const abrirConexion = window.indexedDB.open('crm', 2); // usamos versión 2

        abrirConexion.onerror = function() {
            console.log('Error al conectar con DB');
        };

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;
        };
    }

    // ====== ACTUALIZAR CLIENTE ======
    function actualizarCliente(e) {
        e.preventDefault();

        if(
            nombreInput.value.trim() === '' ||
            emailInput.value.trim() === '' ||
            telefonoInput.value.trim() === '' ||
            empresaInput.value.trim() === ''
        ) {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(emailInput.value.trim())) {
            imprimirAlerta('El email no es válido', 'error');
            return;
        }

        // Recuperamos el cliente original para no perder la fecha de alta
        const transaction = DB.transaction(['crm'], 'readonly');
        const objectStore = transaction.objectStore('crm');
        const request = objectStore.get(Number(idCliente));

        request.onsuccess = function() {
            if (request.result) {
                const clienteActualizado = {
                    nombre: nombreInput.value.trim(),
                    email: emailInput.value.trim(),
                    telefono: telefonoInput.value.trim(),
                    empresa: empresaInput.value.trim(),
                    fecha: request.result.fecha || new Date().toLocaleDateString(),
                    id: Number(idCliente)
                };

                const txUpdate = DB.transaction(['crm'], 'readwrite');
                const storeUpdate = txUpdate.objectStore('crm');
                storeUpdate.put(clienteActualizado);

                txUpdate.oncomplete = function() {
                    imprimirAlerta('Cliente editado correctamente', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                };

                txUpdate.onerror = function() {
                    imprimirAlerta('Hubo un error al actualizar el cliente', 'error');
                };
            } else {
                imprimirAlerta('Cliente no encontrado', 'error');
            }
        };
    }

    // ====== OBTENER CLIENTE ======
    function obtenerCliente(id) {
        const transaction = DB.transaction(['crm'], 'readonly');
        const objectStore = transaction.objectStore('crm');

        const clienteRequest = objectStore.get(Number(id));
        clienteRequest.onsuccess = function() {
            if(clienteRequest.result) {
                llenarFormulario(clienteRequest.result);
            } else {
                imprimirAlerta('Cliente no encontrado', 'error');
            }
        };
    }

    // ====== LLENAR FORMULARIO ======
    function llenarFormulario(cliente) {
        const { nombre, email, telefono, empresa } = cliente;

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }

    // ====== ALERTAS / TOASTS ======
    function imprimirAlerta(mensaje, tipo) {
        const alertaExistente = formulario.querySelector('.alerta');

        if(!alertaExistente) {
            const divMensaje = document.createElement('div');
            divMensaje.classList.add(
                'alerta',
                'p-2',
                'mt-3',
                'text-center',
                'rounded-md',
                'font-bold',
                'text-white'
            );

            if(tipo === 'error') {
                divMensaje.classList.add('bg-red-500');
            } else {
                divMensaje.classList.add('bg-green-500');
            }

            divMensaje.textContent = mensaje;
            formulario.parentElement.insertBefore(divMensaje, formulario);

            setTimeout(() => {
                divMensaje.remove();
            }, 2000);
        }
    }

})();
