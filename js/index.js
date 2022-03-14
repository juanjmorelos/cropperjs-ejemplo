let cropper = null;

$('#input-file').on('change', (e) => {
    // variables necesarios
    let image = document.getElementById('img-cropper') // Donde se va a poner la imagen a cortar
    let seleccionArchivos = document.getElementById('input-file') // el input:file
    const archivos = seleccionArchivos.files; // obtenemos los archivos que se seleccionaron del input:file

    let extension = seleccionArchivos.value.substring(seleccionArchivos.value.lastIndexOf('.'), seleccionArchivos.value.length) // obtenemos la extenciones aceptadas del input:file

    if (!archivos || !archivos.length) {

        // verificamos que se seleccionó un archivo
        image.src = ""
        $('#input-file').val('')

    } else if (seleccionArchivos.getAttribute('accept').split(',').indexOf(extension) < 0) {

        // si seleccionó algo verificamos que sea una imagen si no es una imagen le mandamos la siguiente alerta
        alert('Sólo puedes seleccionar imágenes')
        $('#input-file').val('')

    } else {

        // si es imagen obtenemos el archivo y lo convertimos a una URL
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);

        image.src = objectURL // Le mandamos la url creada a la imagen

        // inicializamos cropper y damos unas opciones
        cropper = new Cropper(image, {
            aspectRatio: 1, // es como queremos que recorte
            preview: '.img-sample', // contenedor donde se va a ir viendo en tiempo real la imagen cortada
            zoomable: false, //Para que no haga zoom 
            viewMode: 1, //Para que no estire la imagen al contenedor
            responsive: false, //Para que no reacomode con zoom la imagen al contenedor
            dragMode: 'none', //Para que al arrastrar no haga nada
            ready(){ // metodo cuando cropper ya este activo, le ponemos el alto y el ancho del contenedor de cropper al 100%
                document.querySelector('.cropper-container').style.width = '100%'
                document.querySelector('.cropper-container').style.height = '100%'
            }
        })

        
        // activamos el modal
        $('.modal').addClass('active')
        $('.modal-content').addClass('active')

        $('.modal').removeClass('remove')
        $('.modal-content').removeClass('remove')
    }
})

$('#close').on('click', (e) => {
    let image = document.getElementById('img-cropper');

    $('.modal').removeClass('active')
    $('.modal-content').removeClass('active')

    $('.modal').addClass('remove')
    $('.modal-content').addClass('remove')

    $('#input-file').val('')
    image.src = "";

    cropper.destroy()

})

$('#cut').on('click', (e) => {

    let canvas = cropper.getCroppedCanvas()

    canvas.toBlob(function(blob){

        let crop_image = document.getElementById('crop-image')
        let url_cut = URL.createObjectURL(blob)

        crop_image.src = url_cut

        $('.modal').removeClass('active')
        $('.modal-content').removeClass('active')

        $('.modal').addClass('remove')
        $('.modal-content').addClass('remove')
        $('#input-file').val('')

        cropper.destroy()
    })
})
