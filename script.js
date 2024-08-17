console.log('teste')

const menu = document.getElementById('menu')

const cartBtn = document.getElementById('cart-btn')

const cartModal = document.getElementById('cart-modal')

const cartItemsContainer = document.getElementById('cart-items')

const cartTotal = document.getElementById('cart-total')

const checkoutBtn = document.getElementById('checkout-btn')

const closeModalBtn = document.getElementById('close-modal-btn')

const cartCounter = document.getElementById('cart-count')

const addresInput = document.getElementById('addres')

const addressWarn = document.getElementById('address-warn')

//abrir modal carrinho
cartBtn.addEventListener('click', () =>{
  cartModal.style.display = 'flex';
})

//fechar modal
cartModal.addEventListener('click', (event) =>{
  if(event.target == cartModal){
    cartModal.style.display = 'none';
  }
})

closeModalBtn.addEventListener('click', () =>{
  cartModal.style.display = 'none';
})








console.log(menu)