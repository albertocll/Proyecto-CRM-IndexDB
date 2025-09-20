function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm', 2); // usamos versión 2 (con campo fecha)

    abrirConexion.onerror = function() {
        console.log('Hubo un error al conectar con la DB');
    };

    abrirConexion.onsuccess = function () {
        DB = abrirConexion.result;
    };
}

function imprimirAlerta(mensaje, tipo) {
    const alerta = document.querySelector('.alerta');

    if (!alerta) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add(
            'px-4',
            'py-2',
            'rounded-md',
            'max-w-lg',
            'mx-auto',
            'mt-4',
            'text-center',
            'font-bold',
            'text-white',
            'alerta'
        );

        if (tipo === 'error') {
            divMensaje.classList.add('bg-red-500');
        } else {
            divMensaje.classList.add('bg-green-500');
        }

        divMensaje.textContent = mensaje;

        // Insertamos la alerta justo antes del formulario si existe,
        // o dentro del main como fallback
        if (typeof formulario !== 'undefined' && formulario) {
            formulario.parentElement.insertBefore(divMensaje, formulario);
        } else {
            document.querySelector('main').prepend(divMensaje);
        }

        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
    }
}
