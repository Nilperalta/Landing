
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