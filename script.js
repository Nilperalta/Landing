
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

const imagenes = [
    'images/image_p1.png',
    'images/image_p2.png',
    'images/image_p3.png',
]

const lightbox = document.getElementById('lightbox');
const boxCounter= document.querySelector('.lightbox__counter');
const boxImage= document.querySelector('.lightbox__img');
const principalImage = document.getElementById('img-principal');
const btnNext = document.querySelector('.lightbox__next');
const btnPrev = document.querySelector('.lightbox__prev');
const btnClose = document.querySelector('.lightbox__close');

let indice = 0

principalImage.addEventListener('click', ()=>{
    lightbox.classList.toggle('lightbox--visible');
    boxImage.src = imagenes[0];
    boxCounter.textContent = (indice + 1) + "/" + imagenes.length;
})

btnNext.addEventListener('click', ()=>{
    indice = (indice + 1) % imagenes.length;
    boxImage.src = imagenes[indice];
    boxCounter.textContent = (indice + 1) + "/" + imagenes.length;
})

btnPrev.addEventListener('click', ()=>{
    indice = (indice - 1 + imagenes.length) % imagenes.length;
    boxImage.src = imagenes[indice];
    boxCounter.textContent = (indice + 1) + "/" + imagenes.length;
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
    } else {
        footer.classList.remove('product-footer--hidden')
    }
})


/*btn +/- y display */
const btnMinus = document.querySelector('.counter__btn--minus')
const counterDisplay = document.querySelector('.counter__display')
const btnPlus = document.querySelector('.counter__btn--plus')

let counter = 0;

if (counter<=9) {
    counterDisplay.textContent = `0${counter}`;
} else {
    counterDisplay.textContent = counter;
}


btnMinus.addEventListener('click', ()=>{

    if (counter <= 0) {
        btnMinus.disabled = true;

    } else {
        counter--;
        btnMinus.disabled = false;

        if (counter <= 9) {
            counterDisplay.textContent = `0${counter}`;
        } else {
            counterDisplay.textContent = counter;
        }
    }
})


btnPlus.addEventListener('click', ()=>{
    counter++
    counterDisplay.textContent = counter;

    if (counter <= 9) {
        counterDisplay.textContent = `0${counter}`;
    } else {
        counterDisplay.textContent = counter;
    }
})

/*Seleccionar color */

const btnColor = document.querySelectorAll('.color-item__circle')


btnColor.forEach(color => {
    color.addEventListener('click', () => {
        btnColor.forEach(c => c.classList.remove('color-item__circle--selected'))
        color.classList.add('color-item__circle--selected')
    })
})


/*Seleccionar talla */

const btnTalla = document.querySelectorAll('.tallas .talla--disponible')

btnTalla.forEach(talla => {
    talla.addEventListener('click', ()=>{
        btnTalla.forEach(t=> t.classList.remove('talla--selected'))
        talla.classList.add('talla--selected')
    })
});