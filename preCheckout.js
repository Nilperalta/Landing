
/*Local Storage*/
const total = localStorage.getItem('totalCarrito')
document.querySelector('.total-price').textContent = total


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

