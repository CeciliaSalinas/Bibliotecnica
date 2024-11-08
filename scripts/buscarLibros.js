 function buscar_libros()
{
    mostrar_cartel_espera();

    let autor = document.querySelector('#buscar').value;

    // Realizamos el fetch, que *retorna una promesa*, que se cumple cuando
    // *comienza* a llegar la respuesta (encabezados). Esta segunda promesa
    // retorna también una promesa, que se cumple con los datos de los libros,
    // con los que invocamos a la función mostrar_libros
    fetch("https://openlibrary.org/search.json?title=" + autor)
        .then(respuesta => respuesta.json())
        .then(datos => { mostrar_libros(datos, autor); })
        .catch(error => {console.log("ERROR");console.log(error)});
    // Esta última línea, el método .catch, se invoca cuando hubo algún error,
    // en cualquiera de las promesas de la cadena.
}

function mostrar_cartel_espera()
{
    // Deshabilitamos el botón para que no se realicen búsquedas simultáneas:
    document.querySelector('#boton-buscar').disabled = true;
    // Ponemos un mensaje para indicar que estamos esperando la respuesta:
    document.querySelector('#respuesta p').innerHTML = "Buscando libros...";
}

    function mostrar_libros(datos, autor) {
        document.querySelector('#respuesta').innerHTML =
            '<p>Libros encontrados de ' + autor + ': <span id="cantidad"></span></p>';
        
        // Creamos una lista <ul> en memoria:
        let lista = document.createElement('ul');
    
        let item;
    
        datos.docs.forEach(unDato => {
            // Creamos un elemento <li> y le asignamos el título del libro
            item = document.createElement('li');
            item.innerHTML = unDato.title;
    
            // Hacemos que el elemento <li> sea clickeable
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => mostrarDetalleLibro(unDato));
    
            // Agregamos el item a la lista
            lista.appendChild(item);
        });
    
        // Agregamos la lista completa al <div id="respuesta">
        document.querySelector('#respuesta').appendChild(lista);
    
        // Actualizamos la cantidad de libros encontrados y mostrados
        document.querySelector('#cantidad').innerHTML = datos.numFound;
        document.querySelector('#cantidad').innerHTML +=
             " (mostrando " + document.querySelectorAll('#respuesta ul li').length + ")";
    
        // Reactivamos el botón de búsqueda
        document.querySelector('#boton-buscar').disabled = false;
    }
    
    // Función para mostrar detalles del libro
    function mostrarDetalleLibro(libro) {
        alert("Detalles del libro:\nTítulo: " + libro.title + "\nAutor: " + (libro.author_name || 'Desconocido'));
    } 
    
       /*  function mostrar_libros(datos, autor) {
            document.querySelector('#respuesta').innerHTML =
                '<p>Libros encontrados de ' + autor + ': <span id="cantidad"></span></p>';
        
            // Creamos una tabla en lugar de una lista
            let tabla = document.createElement('table');
            tabla.style.width = '100%';
            tabla.setAttribute('border', '1');
        
            // Creamos el encabezado de la tabla
            let encabezado = tabla.createTHead();
            let filaEncabezado = encabezado.insertRow();
            
            let thTitulo = document.createElement('th');
            thTitulo.textContent = 'Título';
            filaEncabezado.appendChild(thTitulo);
            
            let thAutor = document.createElement('th');
            thAutor.textContent = 'Autor';
            filaEncabezado.appendChild(thAutor);
        
            let cuerpoTabla = tabla.createTBody();
        
            datos.docs.forEach(unDato => {
                // Creamos una fila para cada libro
                let fila = cuerpoTabla.insertRow();
        
                // Columna del título
                let celdaTitulo = fila.insertCell();
                celdaTitulo.textContent = unDato.title;
                celdaTitulo.style.cursor = 'pointer';
                celdaTitulo.addEventListener('click', () => mostrarDetalleLibro(unDato));
        
                // Columna del autor
                let celdaAutor = fila.insertCell();
                celdaAutor.textContent = unDato.author_name ? unDato.author_name.join(', ') : 'Desconocido';
        
                // Añadimos la fila a la tabla
                cuerpoTabla.appendChild(fila);
            });
        
            // Agregamos la tabla completa al <div id="respuesta">
            document.querySelector('#respuesta').appendChild(tabla);
        
            // Actualizamos la cantidad de libros encontrados y mostrados
            document.querySelector('#cantidad').innerHTML = datos.numFound;
            document.querySelector('#cantidad').innerHTML +=
                 " (mostrando " + document.querySelectorAll('#respuesta table tr').length + " libros)";
        
            // Reactivamos el botón de búsqueda
            document.querySelector('#boton-buscar').disabled = false;
        }
         */
        function mostrar_libros(datos, autor) {
            document.querySelector('#respuesta').innerHTML =
                '<p>Libros encontrados de ' + autor + ': <span id="cantidad"></span></p>';
        
            let lista = document.createElement('ul');
        
            datos.docs.forEach(unDato => {
                let item = document.createElement('li');
                item.innerHTML = unDato.title;
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => mostrarDetalleLibro(unDato));
                lista.appendChild(item);
            });
        
            document.querySelector('#respuesta').appendChild(lista);
            document.querySelector('#cantidad').innerHTML = datos.numFound;
            document.querySelector('#cantidad').innerHTML +=
                " (mostrando " + document.querySelectorAll('#respuesta ul li').length + ")";
        
            document.querySelector('#boton-buscar').disabled = false;
        }
        
        function mostrarDetalleLibro(libro) {
            // Pregunta al usuario si desea agregar el libro a la tabla
            if (confirm("¿Deseas agregar este libro a tu lista?\nTítulo: " + libro.title + "\nAutor: " + (libro.author_name || 'Desconocido'))) {
                agregarLibroATabla(libro);
            }
        }
        
        function agregarLibroATabla(libro) {
            // Selecciona el cuerpo de la tabla donde se agregarán los libros seleccionados
            let tbody = document.querySelector('.cargaLibros tbody');
        
            // Crea una nueva fila
            let fila = document.createElement('tr');
        
            // Celda del título
            let celdaTitulo = document.createElement('td');
            celdaTitulo.textContent = libro.title;
            fila.appendChild(celdaTitulo);
        
            // Celda del autor
            let celdaAutor = document.createElement('td');
            celdaAutor.textContent = libro.author_name ? libro.author_name.join(', ') : 'Desconocido';
            fila.appendChild(celdaAutor);
        
            // Celda para la materia con el select
            let celdaMateria = document.createElement('td');
            let selectMateria = document.createElement('select');
            selectMateria.innerHTML = `
                <option value="">Seleccionar</option>
                <option value="Programación">Programación</option>
                <option value="Ingeniería de software">Ingeniería de software</option>
                <option value="Base de datos">Base de datos</option>
                <option value="Tecnología de la información">Tecnología de la información</option>
            `;
            celdaMateria.appendChild(selectMateria);
            fila.appendChild(celdaMateria);
       // Botón "Agregar"
let celdaAgregar = document.createElement('td');
let botonAgregar = document.createElement('button');
botonAgregar.textContent = 'Agregar';
botonAgregar.classList.add('btn-grilla-a');

// Evento click para redirigir a otra página
botonAgregar.addEventListener('click', () => {
    // Aquí puedes definir la lógica de redirección según la materia seleccionada
    let materiaSeleccionada = selectMateria.value;

    // Redirigir a la página según la opción seleccionada
    switch (materiaSeleccionada) {
        case 'Programación':
            window.location.href = 'programacionAdmin.html';
            break;
        case 'Ingeniería de software':
            window.location.href = 'ingSoftwareAdmin.html';
            break;
        case 'Base de datos':
            window.location.href = 'baseDatosAdmin.html';
            break;
        case 'Tecnología de la información':
            window.location.href = 'tecInformacionAdmin.html';
            break;
        default:
            alert('Por favor, selecciona una materia válida.');
    }
});

celdaAgregar.appendChild(botonAgregar);
fila.appendChild(celdaAgregar);

        
            // Botón "Cancelar"
            let celdaCancelar = document.createElement('td');
            let botonCancelar = document.createElement('button');
            botonCancelar.textContent = 'Cancelar';
            botonCancelar.classList.add('btn-grilla');
            botonCancelar.addEventListener('click', () => {
                tbody.removeChild(fila); // Elimina la fila si se hace clic en "Cancelar"
            });
            celdaCancelar.appendChild(botonCancelar);
            fila.appendChild(celdaCancelar);
        
            // Agrega la fila completa al tbody de la tabla
            tbody.appendChild(fila);
        }
        