
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



/* contador */