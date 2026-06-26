
/*Local Storage*/
const total = localStorage.getItem('totalCarrito')
const carrito = JSON.parse(localStorage.getItem('carritoData'))
const imagen = localStorage.getItem('imagenProducto')
const imagenesData = JSON.parse(localStorage.getItem('imagenesData'))


document.querySelector('.total-price').textContent = total


if (carrito && carrito.length > 0) {
    const contenedor = document.querySelector('.checkout-resumen__detalle')
    contenedor.innerHTML = ''

    carrito.forEach(item => {
        const fila = document.createElement('div')
        fila.classList.add('checkout-resumen__item')
        fila.innerHTML = `
            <img src="${imagenesData[item.color][0]}" alt="${item.color}">
            <div class="checkout-resumen__info">
                <p>Camisa <br> Bootcut</p>
                <div class="checkout-resumen__atributos">
                    <span>Color: <span>${item.color}</span></span>
                    <span>Talla: <span>${item.talla}</span></span>
                    <span>Cantidad: <span>${item.cantidad}</span></span>
                </div>
            </div>
        `
        contenedor.appendChild(fila)
    })
}

 
/*Btn desplegable*/
const btnDesplegableResumen = document.querySelector('.checkout-resumen__header')
const detalleResumen = document.querySelector('.checkout-resumen__detalle')
const btnDesplegableEntrega = document.querySelector('.checkout-entrega__header')
const detalleEntrega = document.querySelector('.checkout-entrega__content')

btnDesplegableResumen.addEventListener('click', ()=>{
    detalleResumen.classList.toggle('checkout-resumen__detalle--visible')
})

btnDesplegableEntrega.addEventListener('click', ()=>{
    detalleEntrega.classList.toggle('checkout-entrega__content--visible')
})


/*Boton flotante */
const checkoutFooter = document.querySelector('.checkout-footer')

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        checkoutFooter.classList.add('checkout-footer--hidden')
    } else {
        checkoutFooter.classList.remove('checkout-footer--hidden')
    }
})

/* validación de datos*/

//inputs
const inputNombre = document.getElementById('input-nombre')
const inputCelular = document.getElementById('input-celular')
const inputMail = document.getElementById('input-mail')
const inputDepartamento = document.getElementById('input-departamento')
const inputDistrito = document.getElementById('input-distrito')
const inputDireccion = document.getElementById('input-direccion')
const alertFooter = document.querySelector('.checkout-footer__alert')
const btnPagar = document.getElementById('btn-pagar')
const celularWrapper = document.querySelector('.input-celular-wrapper')

//Mensajes de error
const errorNombre = document.getElementById('error-nombre')
const errorCelular = document.getElementById('error-celular')
const errorMail = document.getElementById('error-mail')

//iconos
const iconoNombre = document.querySelector('#input-nombre + .input-icon-error')
const iconoMail = document.querySelector('#input-mail + .input-icon-error')
const iconoCelular = document.querySelector('#input-celular').closest('.input-wrapper').querySelector('.input-icon-error')


btnPagar.addEventListener('click', ()=>{
    if (inputNombre.value === "" || inputCelular.value === "" || inputMail.value === "" || inputDepartamento.value === "" || inputDistrito.value === "" || inputDireccion.value === "") {
        alertFooter.classList.add('checkout-footer__alert--visible')
    } else {
        alertFooter.classList.remove('checkout-footer__alert--visible')
    }
})

function validarFormulario() {
    if (inputNombre.value && inputCelular.value && inputMail.value && inputDepartamento.value && inputDistrito.value && inputDireccion.value) {
        btnPagar.style.background = "black";
        alertFooter.classList.remove('checkout-footer__alert--visible')
    } else {
        btnPagar.style.background = "#616161";
    }
}

inputNombre.addEventListener('input', () => {
    validarFormulario();

    if (/\d/.test(inputNombre.value)) {
        inputNombre.classList.add('input--error')
        errorNombre.textContent = 'El nombre no puede tener números'
        iconoNombre.classList.add('input-icon-error--visible')

    } else {
        inputNombre.classList.remove('input--error')
        errorNombre.textContent = ''
        iconoNombre.classList.remove('input-icon-error--visible')
    }

})

inputCelular.addEventListener('input', () => {
    validarFormulario();

    if (!/^\d*$/.test(inputCelular.value)) {

        celularWrapper.classList.add('input--error')
        errorCelular.textContent = 'Solo números'
        iconoCelular.classList.add('input-icon-error--visible')

    } else if (inputCelular.value.length > 0 && inputCelular.value.length < 9) {

        celularWrapper.classList.add('input--error')
        errorCelular.textContent = 'Debe tener 9 dígitos'
        iconoCelular.classList.add('input-icon-error--visible')

    } else {

        celularWrapper.classList.remove('input--error')
        errorCelular.textContent = ''
        iconoCelular.classList.remove('input-icon-error--visible')
    }

})

inputMail.addEventListener('input', () => {
    validarFormulario();

    if (inputMail.value.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputMail.value)) {
        inputMail.classList.add('input--error')
        errorMail.textContent = 'Correo inválido'
        iconoMail.classList.add('input-icon-error--visible')
    } else {
        inputMail.classList.remove('input--error')
        errorMail.textContent = ''
        iconoMail.classList.remove('input-icon-error--visible')
    }

})


inputDepartamento.addEventListener('change', () => {
    validarFormulario();
});

inputDistrito.addEventListener('input', () => {
    validarFormulario();
});

inputDireccion.addEventListener('input', () => {
    validarFormulario();
});


