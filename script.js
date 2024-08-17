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
    cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')

    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-medium">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p class="font-bold mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>

        <div>
          <button>
            Remover
          </button>
        </div>
      </div>
    `

    total += item.price * item.quantity

    cartItemsContainer.appendChild(cartItemElement)
  })

  cartTotal.textContent = total.toLocaleString('pt-BR', {
    style: "currency",
    currency:'BRL'
  });

  cartCounter.innerHTML = cart.length
}