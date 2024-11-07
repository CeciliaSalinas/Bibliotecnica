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
    