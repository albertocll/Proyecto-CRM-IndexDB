📇 NeoCRM – Gestión de Clientes

Aplicación web para administrar clientes con operaciones de alta, edición y eliminación, utilizando IndexedDB como base de datos local en el navegador.

📋 Descripción

Proyecto desarrollado como práctica personal para reforzar JavaScript moderno e IndexedDB.
Esta aplicación permite a los usuarios crear, editar y eliminar registros de clientes, mostrando la información en una interfaz responsive y persistiendo los datos en la base local del navegador.

🚀 Características

✅ Alta de nuevos clientes con validación de datos
✅ Edición de clientes existentes manteniendo fecha de registro
✅ Eliminación de clientes con confirmación y notificación visual
✅ Persistencia en IndexedDB (datos no se pierden al recargar)
✅ Interfaz responsive con Tailwind CSS
✅ Notificaciones visuales de éxito/error (toasts)

🛠️ Tecnologías Utilizadas

HTML5 – Estructura del proyecto

Tailwind CSS – Estilos responsive

JavaScript (ES6+) – Lógica de la aplicación

IndexedDB – Almacenamiento local en navegador

📁 Estructura del Proyecto
Proyecto-CRMIndexedDB/
│
├── css/
│ ├── tailwind.min.css # Framework CSS
│ └── custom.css # Estilos personalizados
├── js/
│ ├── app.js # Lógica principal (listado y eliminación)
│ ├── funciones.js # Conexión DB y alertas
│ ├── nuevocliente.js # Alta de clientes
│ └── editar-cliente.js # Edición de clientes
├── index.html # Listado de clientes
├── nuevo-cliente.html # Formulario de alta
├── editar-cliente.html # Formulario de edición
└── README.md # Documentación del proyecto

🎯 Conceptos de JavaScript Aplicados

IndexedDB API (open, transaction, objectStore, cursor)

Validación de formularios

Manipulación dinámica del DOM

Event Listeners

Uso de fechas en registros

Funciones modulares reutilizables

🌐 Demo en Vivo

🔗 https://neocrm-indexeddb.netlify.app/

🚀 Instalación y Uso

Opción 1: Ejecutar Localmente

Clona el repositorio

git clone https://github.com/albertocll/Proyecto-CRMIndexedDB.git
cd Proyecto-CRMIndexedDB


Abre index.html en tu navegador
(o usa la extensión Live Server en VS Code)

💡 Cómo Usar la Aplicación

Desde la vista principal (index.html) consulta la lista de clientes.

Usa el menú lateral para crear un Nuevo Cliente.

Edita clientes existentes desde la acción ✏️.

Elimina clientes desde la acción 🗑️.

Los datos persisten en IndexedDB incluso tras recargar el navegador.

🎓 Objetivos de Aprendizaje

Comprender y aplicar IndexedDB para persistencia local

Crear un CRUD completo en JavaScript moderno

Integrar Tailwind CSS en un proyecto práctico

Manejar eventos y validaciones de usuario

Implementar notificaciones visuales para UX

📄 Licencia

Este proyecto es de uso personal y educativo.

👤 Autor

Alberto Claros López - https://github.com/albertocll

⭐ ¡Dale una estrella al proyecto si te gustó! ⭐

<img width="1837" height="498" alt="image" src="https://github.com/user-attachments/assets/e862efe8-1da2-48c8-b8bf-769beaaf62d5" />

<img width="1667" height="794" alt="image" src="https://github.com/user-attachments/assets/5ccba588-9cbd-4de6-992a-bc58764fd17f" />
