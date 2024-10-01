/*permita a un usuario escribir parte del titulo de un libro, 
y mostrar una lista de todos los libros que coincidan con ese nombre, 

hacer una página Web que le permita a un usuario escribir parte del nombre o el apellido de un autor, 
y mostrar una lista de todos los autores que coincidan con ese nombre

con la fecha de nacimiento y muerte del autor (si es que ambos datos están disponibles).
Una vez mostrada la lista; al hacer clic en uno de los autores, deberemos mostrar la lista de obras de ese autor.
*/

function mostrar(){
    document.getElementById('membresia').style.display = 'block';
} 


//ej js asincrónico : buscar libros según titulo o palabra ingresada 
//mostar una lista con esos titulos
//Una vez mostrada la lista; al hacer clic en uno de los libros, deberemos mostrar la lista de obras de ese autor,
// y entre paréntesis el año de publicación de cada obra.

function buscarLibros(){

    let titulo = document.querySelector('#buscarLibros').value;

    if (titulo.length == 0){
        return;
    }
    muestraInformacionEspera();

    // Realizamos el fetch, que *retorna una promesa*, que se cumple cuando
    // *comienza* a llegar la respuesta (encabezados). Esta segunda promesa
    // retorna también una promesa, que se cumple con los datos de los autores,
    // con los que invocamos a la función muestraLibros

    fetch("https://openlibrary.org/search.json?title="+ titulo)
    .then(Response => Response.json())
    .then(datos =>{muestraLibros(datos, titulo); })
    .catch(error => { console.log("ERROR"); console.log(error)});
}

function muestraInformacionEspera(){

    // Deshabilitamos el botón para que no se realicen búsquedas simultáneas:
    document.querySelector('#boton-buscar').disabled = true;
    
    // Ponemos un mensaje para indicar que estamos esperando la respuesta:
    document.querySelector('#respuesta p').innerHTML = "Buscando titulos...";
}

function muestraLibros(datos, titulo){
    document.querySelector('#respuesta').innerHTML =
    '<p>Los títulos encontrados de ' + titulo +': <span id="cantidad"></span> </p>';

    let lista = document.createElement('ul');
    let item;

    datos.docs.forEach( unDato => {
        item = document.createElement('li');
        item.innerHTML = unDato.title;
        lista.appendChild(item);
    });

    document.querySelector('#respuesta').appendChild(lista);
    document.querySelector('#cantidad').innerHTML = datos.numFound;
    document.querySelector('#cantidad').innerHTML += "(mostrando "+ document.querySelectorAll('#respuesta ul li').length + ")";

     // Volvemos a activar el botón de búsqueda:
     document.querySelector('#boton-buscar').disabled = false;
}







