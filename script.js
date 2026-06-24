
const btnHeaderColor = document.getElementById('toggle-color');
const colors = document.querySelector('.colors')
const btnHeaderTalla = document.getElementById('toggle-talla');
const talla = document.querySelector('.tallas');
const tallaGuia = document.querySelector('.tallas__guia');
const iconColor = document.querySelector('#toggle-color i');
const iconTalla = document.querySelector('#toggle-talla i');


btnHeaderColor.addEventListener('click', () => {
    colors.classList.toggle('colors--visible')
    iconColor.classList.toggle('fa-plus')
    iconColor.classList.toggle('fa-minus')
})


btnHeaderTalla.addEventListener('click',()=>{
    talla.classList.toggle('tallas--visible')
    tallaGuia.classList.toggle('tallas__guia--visible')
    iconTalla.classList.toggle('fa-plus')
    iconTalla.classList.toggle('fa-minus')
})


/**Descripción */
const btnVerMas = document.querySelector('.product-description__toggle');
const descripcion = document.querySelector('.product-description__extra');

btnVerMas.addEventListener('click', ()=>{
    descripcion.classList.toggle('product-description__extra--visible')
    if(descripcion.classList.contains('product-description__extra--visible')){
        btnVerMas.textContent = "Ver menos"
    } else {
        btnVerMas.textContent = "Ver más"
    }
})


/*lightbox*/

/*const imagenes = [
    'images/image_p1.png',
    'images/image_p2.png',
    'images/image_p3.png',
]*/

const imagenes = {

    celeste: [
        'images/image_p1.png',
        'images/image_p2.png',
        'images/image_p3.png'
    ],
    rosado: [
        'images/image_c2.png'
    ],
    olivo: [
        'images/image_c3.png'
    ],

    negro: [
        'images/image_c4.png'
    ],

    morado: [
        'images/image_c5.png'
    ]
}


const lightbox = document.getElementById('lightbox');
const boxCounter= document.querySelector('.lightbox__counter');
const boxImage= document.querySelector('.lightbox__img');
const principalImage = document.getElementById('img-principal');
const btnNext = document.querySelector('.lightbox__next');
const btnPrev = document.querySelector('.lightbox__prev');
const btnClose = document.querySelector('.lightbox__close');
const progressBar = document.querySelector('.lightbox__progress-bar');

let indice = 0

principalImage.addEventListener('click', ()=>{
    indice = 0;
    lightbox.classList.toggle('lightbox--visible');
    boxImage.src = imagenes[colorActual][0];
    boxCounter.textContent = (indice + 1) + "/" + imagenes[colorActual].length;
    let width = (1 / imagenes[colorActual].length) * 100
    progressBar.style.width = `${width}%`
    progressBar.style.left = `0%`
})

btnNext.addEventListener('click', ()=>{
    indice = (indice + 1) % imagenes[colorActual].length;
    boxImage.src = imagenes[colorActual][indice];
    boxCounter.textContent = (indice + 1) + "/" + imagenes[colorActual].length;

    let left = (indice / imagenes[colorActual].length) * 100
    progressBar.style.left = `${left}%`
})

btnPrev.addEventListener('click', ()=>{
    indice = (indice - 1 + imagenes[colorActual].length) % imagenes[colorActual].length;
    boxImage.src = imagenes[colorActual][indice];
    boxCounter.textContent = (indice + 1) + "/" + imagenes[colorActual].length;
    
    let left = (indice / imagenes[colorActual].length) * 100
    progressBar.style.left = `${left}%`
})


/*btn cerrar */
btnClose.addEventListener('click', ()=>{
    lightbox.classList.toggle('lightbox--visible');
})



/*btn fijo */
const footer = document.querySelector('.product-footer');

window.addEventListener('scroll', ()=>{
    if (window.scrollY>10) {
        footer.classList.add('product-footer--hidden')
        tooltipInfo.classList.add('tooltip-info--arriba')
    } else {
        footer.classList.remove('product-footer--hidden')
        tooltipInfo.classList.remove('tooltip-info--arriba')
    }
})


/*btn +/- y display */
const btnMinus = document.querySelector('.counter__btn--minus')
const counterDisplay = document.querySelector('.counter__display')
const btnPlus = document.querySelector('.counter__btn--plus')

let counter = 1;
btnMinus.classList.add('counter__btn--minus--disabled')

if (counter<=9) {
    counterDisplay.textContent = `0${counter}`;
} else {
    counterDisplay.textContent = counter;
}


btnMinus.addEventListener('click', ()=>{

    if (counter <= 1) {
        btnMinus.disabled = true;
        btnMinus.classList.add('counter__btn--minus--disabled')

    } else {
        counter--;
        btnMinus.disabled = false;
        btnPlus.classList.remove('counter__btn--plus--disabled')
        displayMaxUni.classList.remove('cantidad-max--visible')

        if (counter <= 9) {
            counterDisplay.textContent = `0${counter}`;
        } else {
            counterDisplay.textContent = counter;
        }


    }
})

/*Stock por color*/

const stockPorColor = {
    celeste: 3,
    rosado: 3,
    olivo: 0,
    negro: 3,
    morado: 3
}

const displayMaxUni = document.querySelector('.cantidad-max')


btnPlus.addEventListener('click', ()=>{

    if (counter < stockPorColor[colorActual]) {
        counter++
        btnMinus.classList.remove('counter__btn--minus--disabled')

        if (counter <= 9) {
            counterDisplay.textContent = `0${counter}`;
        } else {
            counterDisplay.textContent = counter;    
        }

        if (counter >= stockPorColor[colorActual]) {
            btnPlus.classList.add('counter__btn--plus--disabled')
            displayMaxUni.classList.add('cantidad-max--visible')
            
            if (stockPorColor[colorActual] <= 9) {
                displayMaxUni.textContent = `Max. 0${stockPorColor[colorActual]} unidades.`
            } else {
                displayMaxUni.textContent = `Max. ${stockPorColor[colorActual]} unidades.`
            }
        }
    }
})

/*Seleccionar color */


const btnColor = document.querySelectorAll('.color-item__circle')
const containerwarning = document.querySelector('.container-warning')
const tallasContainer = document.querySelector('.tallas')
let colorActual = "celeste"


btnColor.forEach(color => {
    color.addEventListener('click', () => {
        btnColor.forEach(c => c.classList.remove('color-item__circle--selected'))
        counter = 1;
        counterDisplay.textContent = `0${counter}`;
        btnPlus.classList.remove('counter__btn--plus--disabled')
        displayMaxUni.classList.remove('cantidad-max--visible')
        color.classList.add('color-item__circle--selected')
        colorActual = color.dataset.color // elemento/seleccionar/data-color= solo tomo el color
        principalImage.src = imagenes[colorActual][0]

        /*Para quitar la selección de la talla*/
        btnTalla.forEach(t => t.classList.remove('talla--selected'))
        tallaSeleccionada = false

        btnAdd.classList.add('btn--secondary--disabled')

        //progress bar dinámico
        let width = (1 / imagenes[colorActual].length) * 100
        progressBar.style.width = `${width}%`
        progressBar.style.left = `0%`

        const nombreColor = color.nextElementSibling // color es cada div.color-item__circle y color.nextElementSibling es el p
        if (stockPorColor[colorActual] === 0) {
            counter = 0
            counterDisplay.textContent = `0${counter}`;
            nombreColor.textContent = "Sin stock"
            containerwarning.classList.add('container-warning--visible')
            containerError.classList.remove('container-error--visible')

            btnAdd.textContent = 'Sin stock'
            btnCTA.textContent ='Sin stock'
            
            tallasContainer.classList.add('tallas--desactivado')
        }else{
            containerwarning.classList.remove('container-warning--visible')
            btnAdd.textContent = 'Añadir'
            btnCTA.textContent ='Seleccionar talla' 
            tallasContainer.classList.remove('tallas--desactivado') 
            containerError.classList.add('container-error--visible')
            textContainerError.textContent = 'Últimas unidades. ¡Compra ya!'
        }
    })
})


/*Seleccionar talla */


const btnTalla = document.querySelectorAll('.tallas .talla--disponible')

btnTalla.forEach(talla => {
    talla.addEventListener('click', ()=>{
        btnTalla.forEach(t => t.classList.remove('talla--selected'))
        talla.classList.add('talla--selected')
        tallaSeleccionada = true
        tallaActual = talla.dataset.talla
        containeractions.classList.add('product-footer__actions--visible')
        containerCtaTalla.classList.add('product-footer__btn--hidden')
        containerTalla.classList.remove('product-options__header--error')
        containerError.classList.remove('container-error--visible')
        btnAdd.classList.remove('btn--secondary--disabled') 
    })
});
/*Errores*/

const btnCTA = document.getElementById('btn-cta')
const containerError = document.querySelector('.container-error')
const containerTalla = document.getElementById('toggle-talla')
const containerCounter = document.querySelector('.product-options__counter')
const textContainerError = document.querySelector('.product-footer__error') // selecciono el texto de la caja de error "p"
const containerResumen = document.querySelector('.container-resumen')


/*captura de precio en resumen info */
const precioElement = document.querySelector('.product-info__price--current')
const precio = parseFloat(precioElement.textContent.replace('S/', '')) //obtiene solo el 120
const resumenCantidad = document.querySelector('.resumen-cantidad')
const resumenTotal = document.querySelector('.resumen-total')

/*captura de los botones */
const containeractions = document.querySelector('.product-footer__actions')
const containerCtaTalla= document.querySelector('.product-footer__btn')
const btnAdd = document.getElementById('btn-add')

let colorSeleccionado = true;   // celeste ya está por defecto
let tallaSeleccionada = false;
let tallaActual = "";  //
let carrito = [];        // array para guardar productos

btnCTA.addEventListener('click', ()=>{

    if(stockPorColor[colorActual] === 0){
        containerError.classList.remove('container-error--visible')
        containerTalla.classList.remove('product-options__header--error')
        containerCounter.classList.remove('product-options__counter--error')

    }else if (tallaSeleccionada===false) {
        containerError.classList.add('container-error--visible')
        containerTalla.classList.add('product-options__header--error')
        containerCounter.classList.remove('product-options__counter--error')
        textContainerError.textContent = "Elige una talla disponible"

    } else if (counter === 0) {
        containerCounter.classList.add('product-options__counter--error')
        containerError.classList.add('container-error--visible') //hago visible la caja error
        containerTalla.classList.remove('product-options__header--error')
        textContainerError.textContent = "Falta seleccionar cantidad" //cambio el texto de la caja visible
    
    
    } else{
        containerCounter.classList.remove('product-options__counter--error')
        containerTalla.classList.remove('product-options__header--error')
        containerError.classList.remove('container-error--visible')
    
    } 
})
     

/*BTN Añadir */

const resumenDetalle = document.querySelector('.resumen-detalle');

btnAdd.addEventListener('click', ()=>{
    
    if (stockPorColor[colorActual] === 0) {
        containerError.classList.remove('container-error--visible')
        return
    }

    if (tallaSeleccionada === false) {
        containerError.classList.add('container-error--visible')
        textContainerError.textContent = 'Falta seleccionar una talla'
        return
    }

    const unidadesEnCarrito = carrito
        .filter(item => item.color === colorActual)
        .reduce((acc, item) => acc + item.cantidad, 0)

    if (unidadesEnCarrito + counter > stockPorColor[colorActual]) {
        return
    }

    containerResumen.classList.add('container-resumen--visible')
    carrito.push({ color: colorActual, talla: tallaActual, cantidad: counter })

    const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const totalPrecio = carrito.reduce((acc, item) => acc + item.cantidad * precio, 0)

    resumenCantidad.textContent = totalUnidades === 1 ? `${totalUnidades} producto` : `${totalUnidades} productos`
    resumenTotal.textContent = `S/${totalPrecio}.00`

    renderCarrito()
})


const renderCarrito = () => {
    const handle = resumenDetalle.querySelector('.resumen-detalle__handle')
    resumenDetalle.innerHTML = ''
    resumenDetalle.appendChild(handle)

    if (carrito.length === 0) {
        const vacio = document.createElement('div')
        vacio.classList.add('resumen-vacio-container')
        vacio.innerHTML = `<p class="resumen-vacio">No hay productos seleccionados</p>`
        resumenDetalle.appendChild(vacio)
        setTimeout(() => {
           resumenDetalle.classList.remove('resumen-detalle--visible')
           containerResumen.classList.remove('container-resumen--visible')
        }, 2000);
        return
    }

    carrito.forEach((item, index) => {
        const fila = document.createElement('div')
        fila.classList.add('resumen-row')
        fila.innerHTML = `
            <div class="resumen-item--color-talla">
                <span>• ${item.color} · ${item.talla} · x${item.cantidad}</span>
            </div>
            <div class="resumen-item--i">
                <i class="fa-solid fa-trash" data-index="${index}"></i>
            </div>
        `
        resumenDetalle.appendChild(fila)
        
        /*guardando el icono de eliminar*/
        const icono = fila.querySelector('i')
        icono.addEventListener('click', () => {
            icono.style.color= '#E57373';
            
            setTimeout(() => {
                stockPorColor[item.color] += item.cantidad
                carrito.splice(index, 1)
                renderCarrito()

                const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0)
                const totalPrecio = carrito.reduce((acc, item) => acc + item.cantidad * precio, 0)

                resumenCantidad.textContent = totalUnidades === 1 ? `${totalUnidades} producto` : `${totalUnidades} productos`
                resumenTotal.textContent = `S/${totalPrecio}.00`
            }, 300)
        })
    })
}

const tooltipInfo = document.querySelector('.tooltip-info')

containerResumen.addEventListener('click', () => {
    resumenDetalle.classList.toggle('resumen-detalle--visible');
    tooltipInfo.classList.toggle('tooltip-info--visible')
});


/* BTN Finalizar compra*/
const btnFinalizar = document.getElementById('btn-finalizar')

btnFinalizar.addEventListener('click', () => {
    if (carrito.length === 0) {
        return
    }
    
    const total = resumenTotal.textContent
    localStorage.setItem('totalCarrito', total)
    window.location.href = 'preCheckout.html'
})