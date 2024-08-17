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

let cart = []

//abrir modal carrinho
cartBtn.addEventListener('click', () =>{
  updateCartModal()
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

menu.addEventListener('click', function(event){
  //console.log(event.target)

  let parentButton = event.target.closest('.add-to-cart-btn')

  if(parentButton){
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))
    // add no carrinho
    addToCart(name, price)
  }
})

// adicionar ao carrinho
function addToCart(name, price){
  const existingItem = cart.find(item => item.name === name)

  if(existingItem){
    existingItem.quantity += 1;
    return;
  } else{ 
    cart.push({
      name, 
      price, 
      quantity:1,
    })
  }

  updateCartModal()
}

//atualiza carrinho
function updateCartModal(){
  cartItemsContainer.innerHTML = ""
  let total = 0

  cart.forEach(item => {
    const cartItemElement = document.createElement("div")

    cartItemElement.innerHTML = `
      <div>
        <div>
          <p>${item.name}</p>
          <p>${item.quantity}</p>
          <p>${item.price}</p>
        </div>

        <div>
          <button>
            Remover
          </button>
        </div>
      </div>
    `

    cartItemsContainer.appendChild(cartItemElement)
  })
}