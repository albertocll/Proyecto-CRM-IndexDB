(function(){
    let DB;
    const listadoClientes = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if(window.indexedDB.open('crm', 2)) {
            obtenerClientes();
        }

        listadoClientes.addEventListener('click', eliminarRegistro);
    });

    // ====== UTILIDAD PARA MENSAJES ======
    function mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');
        div.classList.add('p-2', 'mt-3', 'text-center', 'rounded-md', 'font-bold', 'text-white');

        if(tipo === 'success') {
            div.classList.add('bg-green-500');
        } else {
            div.classList.add('bg-red-500');
        }

        div.textContent = mensaje;

        document.querySelector('main').insertBefore(div, listadoClientes.parentElement);

        setTimeout(() => div.remove(), 2000);
    }

    // ====== ELIMINAR CLIENTE ======
    function eliminarRegistro(e) {
        if(e.target.classList.contains('eliminar')) {
            const idEliminar = Number(e.target.dataset.cliente);

            if(confirm('¿Deseas eliminar este cliente?')){
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.oncomplete = function () {
                    e.target.parentElement.parentElement.remove();
                    mostrarMensaje('Cliente eliminado ✔', 'success');
                };

                transaction.onerror = function () {
                    mostrarMensaje('Error al eliminar ❌', 'error');
                }
            }
        }
    }

    // ====== CREAR BASE DE DATOS ======
    function crearDB() {
        const crearDB = window.indexedDB.open('crm', 2); // Versión 2 para incluir fecha

        crearDB.onerror = function() {
            console.log('Hubo un error a la hora de crear la DB');
        }

        crearDB.onsuccess = function() {
            DB = crearDB.result;
        }

        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('fecha', 'fecha', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });

            console.log('DB creada y lista');
        }
    }

    // ====== OBTENER Y MOSTRAR CLIENTES ======
    function obtenerClientes() {
        const abrirConexion = window.indexedDB.open('crm', 2);

        abrirConexion.onerror = function () {
            console.log ('Hubo un error');
        };

        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            objectStore.openCursor().onsuccess = function (e) {
                const cursor = e.target.result;

                if(cursor) {
                    const { nombre, empresa, email, telefono, fecha, id } = cursor.value; 

                    listadoClientes.innerHTML += ` 
                        <tr>
                            <td class="px-6 py-4 border-b border-gray-200">
                                <p class="font-bold text-gray-800">${nombre}</p>
                                <p class="text-sm text-gray-600">${email}</p>
                            </td>
                            <td class="px-6 py-4 border-b border-gray-200">
                                <p class="text-gray-700">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 border-b border-gray-200">
                                <p class="text-gray-600">${empresa}</p>
                                <p class="text-xs text-gray-400">Alta: ${fecha || '—'}</p>
                            </td>
                            <td class="px-6 py-4 border-b border-gray-200 text-sm">
                                <a href="editar-cliente.html?id=${id}" class="text-blue-600 hover:text-blue-900 mr-4">✏️</a>
                                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">🗑️</a>
                            </td>
                        </tr>
                    `;
                    cursor.continue();
                }
            }
        }
    }
})();
