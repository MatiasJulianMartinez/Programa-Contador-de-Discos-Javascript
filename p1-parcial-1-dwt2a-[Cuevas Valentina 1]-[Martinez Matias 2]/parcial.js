'use strict';

let discos = []; // array para guardar los discos

const codigoDuplicado = (codigo) => {
    for (const disco of discos) {
        if (disco.codigo_disco === codigo) {
            return true;
        }
    }
    return false;
};

const pedirMinutos = (error) => {
    let duracion_disco_min;
    do {
        duracion_disco_min = prompt("Ingrese los minutos de su canción");
        if (duracion_disco_min === null) {
            return null; // Salir de la función si el usuario cancela
        }
        duracion_disco_min = duracion_disco_min.trim();
        if (duracion_disco_min === '') {
            error.mostrarError("No puede quedar en blanco.");
        } else if (isNaN(duracion_disco_min)) {
            error.mostrarError("Debe ingresar un número.");
        } else if (duracion_disco_min < 0 || duracion_disco_min > 120) {
            error.mostrarError("La duración de la canción debe estar entre 0 y 120 minutos.");
        }
    } while (duracion_disco_min === '' || isNaN(duracion_disco_min) || duracion_disco_min < 0 || duracion_disco_min > 120);
    return parseInt(duracion_disco_min);
};

const pedirSegundos = (error) => {
    let duracion_disco_seg;
    do {
        duracion_disco_seg = prompt("Ingrese los segundos de su canción");
        if (duracion_disco_seg === null) {
            return null; // Salir de la función si el usuario cancela
        }
        duracion_disco_seg = duracion_disco_seg.trim();
        if (duracion_disco_seg === '') {
            error.mostrarError("No puede quedar en blanco.");
        } else if (isNaN(duracion_disco_seg)) {
            error.mostrarError("Debe ingresar un número.");
        } else if (duracion_disco_seg < 0 || duracion_disco_seg > 59) {
            error.mostrarError("Los segundos deben estar entre 0 y 59.");
        }
    } while (duracion_disco_seg === '' || isNaN(duracion_disco_seg) || duracion_disco_seg < 0 || duracion_disco_seg > 59);
    return parseInt(duracion_disco_seg);
};

const Cargar = () => {
    let error = {
        mostrarError: function (mensaje) {
            alert(mensaje);
        }
    };
    // Variables que almacenan el nombre, el autor y el codigo del disco y el array pistas_disco que va a contener cancion y duracion.
    let nombre_disco;
    let autor_disco;
    let codigo_disco;

    let pistas_disco = [];

    do {
        nombre_disco = prompt('Ingrese el Nombre del Disco');
        if (nombre_disco === null) return; // Salir de la función si el usuario cancela
        nombre_disco = nombre_disco.trim();
        if (!nombre_disco) {
            error.mostrarError('No se puede quedar vacío este campo.');
        } else {
            var contieneSoloNumeros = true;
            for (let i = 0; i < nombre_disco.length; i++) {
                if (isNaN(parseInt(nombre_disco[i]))) {
                    contieneSoloNumeros = false;
                    break;
                }
            }
            if (contieneSoloNumeros) {
                error.mostrarError('No puede ingresar solo números como nombre del disco.');
            }
        }
    } while (!nombre_disco || contieneSoloNumeros);

    do {
        autor_disco = prompt('Ingrese el autor del disco');
        if (autor_disco === null) return; // Salir de la función si el usuario cancela
        autor_disco = autor_disco.trim();
        if (!autor_disco) {
            error.mostrarError('No se puede quedar vacío este campo.');
        } else {
            var contieneSoloNumeros = true;
            for (let i = 0; i < autor_disco.length; i++) {
                if (isNaN(parseInt(autor_disco[i]))) {
                    contieneSoloNumeros = false;
                    break;
                }
            }
            if (contieneSoloNumeros) {
                error.mostrarError('No puede ingresar solo números como autor del disco.');
            }
        }
    } while (!autor_disco || contieneSoloNumeros);

    do {
        codigo_disco = prompt('Ingrese el código del disco');
        if (codigo_disco === null) return; // Salir de la función si el usuario cancela
        codigo_disco = codigo_disco.trim();
        if (!codigo_disco) {
            error.mostrarError('No se puede quedar vacío este campo.');
        } else if (isNaN(codigo_disco)) {
            error.mostrarError('El código del disco debe contener solo números.');
        } else if (isNaN(codigo_disco) || codigo_disco < 1 || codigo_disco > 999) {
            error.mostrarError('El código del disco debe estar entre 1 y 999.');
        } else if (codigoDuplicado(codigo_disco)) {
            error.mostrarError('Incorrecto. Ingrese un código que no haya sido ingresado anteriormente.');
        }
    } while (isNaN(codigo_disco) || codigo_disco < 1 || codigo_disco > 999 || codigoDuplicado(codigo_disco));

    // Variables del nombre de la cancion, su duracion en segundos y minutos que luego seran pusheados al array pistas_discos.
    do {
        let cancion_disco;
        let duracion_disco_seg;
        let duracion_disco_min;

        do {
            cancion_disco = prompt('Ingrese el nombre de la canción');
            if (cancion_disco === null) return; // Salir de la función si el usuario cancela
            cancion_disco = cancion_disco.trim();
            if (!cancion_disco) {
                error.mostrarError('No se puede quedar vacío este campo.');
            } else {
                let contieneSoloNumeros = true;
                for (let i = 0; i < cancion_disco.length; i++) {
                    if (isNaN(parseInt(cancion_disco[i]))) {
                        contieneSoloNumeros = false;
                        break;
                    }
                }
                if (contieneSoloNumeros) {
                    error.mostrarError('No puede ingresar solo números como nombre de la canción.');
                }
            }
        } while (!cancion_disco || contieneSoloNumeros);

        duracion_disco_min = pedirMinutos(error);
        duracion_disco_seg = pedirSegundos(error);

        // Calcula la duración total en segundos
        let duracionTotalSegundos = (duracion_disco_min * 60) + duracion_disco_seg;

        pistas_disco.push({
            cancion: cancion_disco,
            duracion: duracionTotalSegundos,
        });
    } while (confirm('¿Quiere ingresar otra canción?'));
    //Array disco que contiene el nombre del disco, el autor, el codigo y pistas_disco.
    let disco = {
        nombre_disco: nombre_disco,
        autor_disco: autor_disco,
        codigo_disco: codigo_disco,
        pistas_disco: pistas_disco,
    };

    console.log(disco);
    discos.push(disco);
    //El objeto disco es pusheado al array principal discos.
};

const Mostrar = () => {
    let html = '';
    let maxDuracionTotal = 0;
    let indiceDiscoMaxDuracion = -1;

    // Primero, calcula la duración total de cada disco y determina la mayor
    for (let index = 0; index < discos.length; index++) {
        const disco = discos[index];
        let duracionTotal = 0;
        for (let pistaIndex = 0; pistaIndex < disco.pistas_disco.length; pistaIndex++) {
            duracionTotal += disco.pistas_disco[pistaIndex].duracion;
        }
        disco.duracionTotal = duracionTotal;
        if (duracionTotal > maxDuracionTotal) {
            maxDuracionTotal = duracionTotal;
            indiceDiscoMaxDuracion = index;
        }
    }

    // Ahora, muestra la información de cada disco y destaca el de mayor duración total
    for (let index = 0; index < discos.length; index++) {
        const disco = discos[index];
        const claseDestacar = (index === indiceDiscoMaxDuracion) ? 'destacar-total' : '';
        let pistaMasLarga = {};

        html += `<h2 class="${claseDestacar}">Disco ${index + 1}</h2>`;
        html += `<p><strong>Nombre del Disco:</strong> ${disco.nombre_disco}</p>`;
        html += `<p><strong>Autor del Disco:</strong> ${disco.autor_disco}</p>`;
        html += `<p><strong>Código del Disco:</strong> ${disco.codigo_disco}</p>`;
        html += '<p><strong>Canciones:</strong></p>';
        html += '<ul class="info-canciones">';

        for (let pistaIndex = 0; pistaIndex < disco.pistas_disco.length; pistaIndex++) {
            const pista = disco.pistas_disco[pistaIndex];
            const duracion = pista.duracion;
            const claseDestacarPista = duracion > 180 ? 'destacar-rojo' : '';

            if (duracion > (pistaMasLarga.duracion || 0)) {
                pistaMasLarga = {
                    cancion: pista.cancion,
                    duracion: duracion
                };
            }

            html += `<li class="${claseDestacarPista}"><strong class="canciones">Canción ${pistaIndex + 1}:</strong> ${pista.cancion}, <strong>Duración:</strong> ${duracion} segundos</li> <hr>`;
        }

        const promedioDuracion = disco.duracionTotal / disco.pistas_disco.length;

        html += `<h3><strong>La cantidad de pistas que tiene este disco son: ${disco.pistas_disco.length}</strong></h3>`;
        html += `<h3><strong>Duración Total del Disco: ${disco.duracionTotal} segundos</strong></h3>`;
        html += `<h3><strong>Promedio de Duración del Disco: ${promedioDuracion.toFixed(2)} segundos</strong></h3>`;
        html += `<h3><strong>Pista con Mayor Duración: ${pistaMasLarga.cancion}, ${pistaMasLarga.duracion} segundos</strong></h3>`;
        html += '</ul>';
    }

    html += `<h3><strong>La cantidad de Discos que fueron cargados son: ${discos.length}</strong></h3>`;

    document.getElementById('info').innerHTML = html;
};

const MostrarDiscoPorCodigo = (codigo) => {
    const discoEncontrado = discos.find(disco => disco.codigo_disco === codigo);

    if (discoEncontrado) {
        let html = '';
        let duracionTotal = 0;
        let pistaMasLarga = {};

        html += `<h2>Disco ${discoEncontrado.codigo_disco}</h2>`;
        html += `<p><strong>Nombre del Disco:</strong> ${discoEncontrado.nombre_disco}</p>`;
        html += `<p><strong>Autor del Disco:</strong> ${discoEncontrado.autor_disco}</p>`;
        html += '<p><strong>Canciones:</strong></p>';
        html += '<ul class="info-canciones">';

        for (let pistaIndex = 0; pistaIndex < discoEncontrado.pistas_disco.length; pistaIndex++) {
            const pista = discoEncontrado.pistas_disco[pistaIndex];
            const duracion = pista.duracion;
            const claseDestacar = duracion > 180 ? 'destacar-rojo' : '';

            duracionTotal += duracion;

            if (duracion > (pistaMasLarga.duracion || 0)) {
                pistaMasLarga = {
                    cancion: pista.cancion,
                    duracion: duracion
                };
            }

            html += `<li class="${claseDestacar}"><strong class="canciones">Canción ${pistaIndex + 1}:</strong> ${pista.cancion}, <strong>Duración:</strong> ${duracion} segundos</li> <hr>`;
        }

        const promedioDuracion = duracionTotal / discoEncontrado.pistas_disco.length;

        html += `<h3><strong>La cantidad de pistas que tiene este disco son: ${discoEncontrado.pistas_disco.length}</strong></h3>`;
        html += `<h3><strong>Duración Total del Disco: ${duracionTotal} segundos</strong></h3>`;
        html += `<h3><strong>Promedio de Duración del Disco: ${promedioDuracion.toFixed(2)} segundos</strong></h3>`;
        html += `<h3><strong>Pista con Mayor Duración: ${pistaMasLarga.cancion}, ${pistaMasLarga.duracion} segundos</strong></h3>`;
        html += '</ul>';

        document.getElementById('info').innerHTML = html;
    } else {
        alert("El disco con el código especificado no fue encontrado.");
    }
};


