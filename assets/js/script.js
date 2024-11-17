
let tareas = [];

document.getElementById('agregar-tarea').addEventListener('click', function() {
    const descripcion = document.getElementById('nueva-tarea').value;
    if (descripcion) {
        const nuevaTarea = {
            id: Date.now(),
            descripcion: descripcion,
            realizada: false
        };
        tareas.push(nuevaTarea);
        document.getElementById('nueva-tarea').value = '';
        actualizarContadores();
        renderizarTareas();
    }
});

function actualizarContadores() {
    const totalTareas = tareas.length;
    const tareasRealizadas = tareas.filter(tarea => tarea.realizada).length;
    document.getElementById('total-tareas').textContent = totalTareas;
    document.getElementById('tareas-realizadas').textContent = tareasRealizadas;
}

function renderizarTareas() {
    const lista = document.getElementById('lista-tareas');
    lista.innerHTML = '';
    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = tarea.realizada ? 'realizado' : '';
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${tarea.realizada ? 'checked' : ''} data-id="${tarea.id}">
            <span>${tarea.descripcion}</span>
            <button class="eliminar" data-id="${tarea.id}">X</button>
        `;
        lista.appendChild(li);
    });

    document.querySelectorAll('.checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const id = Number(this.getAttribute('data-id'));
            const tarea = tareas.find(t => t.id === id);
            tarea.realizada = !tarea.realizada;
            actualizarContadores();
            renderizarTareas();
        });
    });

    document.querySelectorAll('.eliminar').forEach(boton => {
        boton.addEventListener('click', function() {
            const id = Number(this.getAttribute('data-id'));
            tareas = tareas.filter(t => t.id !== id);
            actualizarContadores();
            renderizarTareas();
        });
    });
}

