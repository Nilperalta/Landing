
/*Local Storage*/
const total = localStorage.getItem('totalCarrito')
const carrito = JSON.parse(localStorage.getItem('carritoData'))
const imagen = localStorage.getItem('imagenProducto')
const imagenesData = JSON.parse(localStorage.getItem('imagenesData'))


document.querySelector('.total-price').textContent = total

//suma las unidades reales del carrito
const cantidadDesktopValue = document.querySelector('.cantidad-desktop-value')
if (carrito && carrito.length > 0 && cantidadDesktopValue) {
    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    cantidadDesktopValue.textContent = totalUnidades <= 9 ? `0${totalUnidades} UNIDADES` : `${totalUnidades} UNIDADES`
}

if (carrito && carrito.length > 0) {
    const contenedor = document.querySelector('.checkout-resumen__detalle')
    contenedor.innerHTML = ''

    carrito.forEach((item, index) => {
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
            <i class="fa-solid fa-trash-can resumen-trash ${carrito.length > 1 ? '' : 'resumen-trash--hidden'}"></i>
        `
        contenedor.appendChild(fila)

        const trash = fila.querySelector('.resumen-trash')
        trash.addEventListener('click', () => {
            carrito.splice(index, 1)
            localStorage.setItem('carritoData', JSON.stringify(carrito))
            const totalPrecio = carrito.reduce((acc, item) => acc + item.cantidad * 120, 0)
            localStorage.setItem('totalCarrito', `S/${totalPrecio}.00`)
            location.reload()
        })
    })
}

 
/*Btn desplegable*/
const btnDesplegableResumen = document.querySelector('.checkout-resumen__header')
const detalleResumen = document.querySelector('.checkout-resumen__detalle')
const btnDesplegableEntrega = document.querySelector('.checkout-entrega__header')
const detalleEntrega = document.querySelector('.checkout-entrega__content')
const iconEntrega  = document.querySelector('.checkout-entrega__header i')
const iconResumen = document.querySelector('.checkout-resumen__header i')

btnDesplegableResumen.addEventListener('click', ()=>{
    detalleResumen.classList.toggle('checkout-resumen__detalle--visible')
    btnDesplegableResumen.classList.toggle('checkout-entrega__header--active');
    iconResumen.classList.toggle('fa-chevron-down')
    iconResumen.classList.toggle('fa-chevron-up')
})

btnDesplegableEntrega.addEventListener('click', ()=>{
    detalleEntrega.classList.toggle('checkout-entrega__content--visible')
    btnDesplegableEntrega.classList.toggle('checkout-entrega__header--active');
    iconEntrega.classList.toggle('fa-chevron-down')
    iconEntrega.classList.toggle('fa-chevron-up')
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
const warningDesktop = document.querySelector('.checkout-warning-desktop')
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


function manejarPago() {

    const formularioCompleto =
        inputNombre.value &&
        inputCelular.value &&
        inputMail.value &&
        inputDepartamento.value &&
        inputDistrito.value &&
        inputDireccion.value;

    // ¿El formulario está incompleto?
    if (!formularioCompleto) {

        // Warning mobile
        alertFooter.classList.add('checkout-footer__alert--visible');

        // // ¿Existe el warning de desktop?// Warning desktop
        if (warningDesktop) {
            warningDesktop.classList.add('checkout-warning-desktop--visible');
        }

    } else {

        // Oculta warnings
        alertFooter.classList.remove('checkout-footer__alert--visible');

        if (warningDesktop) {
            warningDesktop.classList.remove('checkout-warning-desktop--visible');
        }

        // Estado de pago
        btnPagar.textContent = "Abriendo pago...";

        if (btnPagarDesktop) {
            btnPagarDesktop.textContent = "Abriendo pago...";
        }
    }
}

btnPagar.addEventListener('click', manejarPago)


function validarFormulario() {

    const formularioCompleto =
        inputNombre.value &&
        inputCelular.value &&
        inputMail.value &&
        inputDepartamento.value &&
        inputDistrito.value &&
        inputDireccion.value;

    if (formularioCompleto) {

        btnPagar.style.background = "black";

        if (btnPagarDesktop) {
            btnPagarDesktop.style.background = "black";
        }

        // Oculta warning móvil
        alertFooter.classList.remove('checkout-footer__alert--visible');

        // Oculta warning desktop
        if (warningDesktop) {
            warningDesktop.classList.remove('checkout-warning-desktop--visible');
        }

    } else {

        btnPagar.style.background = "#616161";

        if (btnPagarDesktop) {
            btnPagarDesktop.style.background = "#616161";
        }

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


const bannerEnvio = document.querySelector('.banner-envio')
const bannerTexto = document.querySelector('.banner-envio span')
const envioTarifas = document.querySelector('.envio-item--tarifas')
const envioGratis = document.querySelector('.envio-item--gratis')
const envioGratisText = document.querySelector('.envio-item--gratis span')


inputDepartamento.addEventListener('change', () => {
    validarFormulario();

    const valor = inputDepartamento.value
    
    if (valor === 'arequipa') {
        bannerTexto.innerHTML = '<span class="banner-envio__destacado">Envío gratis</span> a Arequipa'
        envioTarifas.classList.add("envio-item--hidden");
        envioGratis.classList.remove("envio-item--hidden");
        envioGratisText.textContent='• Envío a Arequipa'
    } else{
        bannerTexto.innerHTML = '<span class="banner-envio__destacado">Envío gratis</span> por compras superiores a S/149'
        envioTarifas.classList.remove("envio-item--hidden");
        envioGratis.classList.add("envio-item--hidden");    
    }
});

inputDistrito.addEventListener('input', () => {
    validarFormulario();
});

inputDireccion.addEventListener('input', () => {
    validarFormulario();
});


const btnVolver = document.querySelector('.checkout-header__volver')
const modalVolver = document.getElementById('modal-volver')
const btnCerrarModal =  document.getElementById('modal-close')
const btnOpcionModificar =  document.getElementById('opcion-modificar')
const btnOpcionContinuar = document.getElementById('opcion-continuar')
const btnOpcionVaciar = document.getElementById('opcion-vaciar')

btnCerrarModal.addEventListener('click', ()=>{
    modalVolver.classList.remove('modal-volver--visible')
})

btnVolver.addEventListener('click', () => {
    if (carrito.length === 1) {
        modalVolver.classList.add('modal-volver--visible')
        localStorage.setItem('vieneDeVolver', 'true') 
    } else {
        window.location.href = 'index.html'
    }
})

btnOpcionModificar.addEventListener('click', ()=>{
    localStorage.setItem('vieneDeVolver', 'true') 
    window.location.href = 'index.html'
})

btnOpcionContinuar.addEventListener('click', ()=>{
    modalVolver.classList.remove('modal-volver--visible')
})

btnOpcionVaciar.addEventListener('click', ()=>{
    localStorage.removeItem('carritoData')
    localStorage.removeItem('totalCarrito')
    window.location.href = 'index.html'
})


/*OPCIONES DE RECOJO*/

/* ============ ENTREGA: Delivery vs Retiro en tienda ============ */

// Radios
const radioDelivery = document.querySelector('input[name="entrega"][value="delivery"]')
const radioRecojo = document.querySelector('input[name="entrega"][value="recojo"]')

// Contenedores de cada flujo
const entregaDelivery = document.getElementById('entrega-delivery')
const entregaRecojo = document.getElementById('entrega-recojo')

// Campos propios de Retiro en tienda
const inputDepartamentoRecojo = document.getElementById('input-departamento-recojo')
const inputFechaRetiro = document.getElementById('input-fecha-retiro')

// Tarjetas de tienda
const tiendaCards = document.querySelectorAll('.tienda-card')

// Estado
let tiendaSeleccionada = null   // guardará el data-tienda de la tarjeta elegida


/* Toggle Delivery / Retiro en tienda */
radioDelivery.addEventListener('change', () => {
    // mostrar entregaDelivery, ocultar entregaRecojo
    entregaDelivery.classList.add('entrega-delivery--visible')
    entregaRecojo.classList.remove('entrega-recojo--visible')
})

radioRecojo.addEventListener('change', () => {
    // mostrar entregaRecojo, ocultar entregaDelivery
    entregaRecojo.classList.add('entrega-recojo--visible')
    entregaDelivery.classList.remove('entrega-delivery--visible')
})

/* Selección de tienda (mismo patrón que colores/tallas) */
tiendaCards.forEach(card => {

    card.addEventListener('click', () => {
        // Paso 1: reset — quitar selección y texto de TODAS las tarjetas
        tiendaCards.forEach(c => {
            c.classList.remove('tienda-card--selected')
            c.querySelector('.tienda-card__btn').textContent = 'Seleccionar'
        })
        
        // Paso 2: seleccionar solo la card clickeada
        card.classList.add('tienda-card--selected')
        card.querySelector('.tienda-card__btn').textContent = 'Seleccionado'

        // Paso 3: guardar el estado
        tiendaSeleccionada = card.dataset.tienda
    })
})



/*RESUMEN DE TOTAL EN DESKTOP */
document.querySelector('.summary-box-producto').textContent = total
document.querySelector('.summary-box-total').textContent = total

const btnPagarDesktop = document.getElementById('btn-pagar-desktop')
btnPagarDesktop.addEventListener('click', manejarPago) 



inputFechaRetiro.addEventListener('change', () => {

    if (inputFechaRetiro.value) {
        inputFechaRetiro.classList.add('has-value');
    } else {
        inputFechaRetiro.classList.remove('has-value');
    }

});