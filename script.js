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
          <button class="remove-from-cart-btn" data-name="${item.name}" >
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

// função para remover 
cartItemsContainer.addEventListener('click', function(event){
  if(event.target.classList.contains('remove-from-cart-btn')){
    const name = event.target.getAttribute('data-name');

    removeItemCart(name);
  }
})

function removeItemCart(name){
  const index = cart.findIndex(item => item.name === name);

  if(index !== -1){
    const item = cart[index];

    if(item.quantity > 1){
      item.quantity -= 1
      updateCartModal() 
      return;
    }

    cart.splice(index, 1);
    updateCartModal() 

  }
}

addresInput.addEventListener('input', (event)=> {
  let inputValue = event.target.value;

  if(inputValue !== ""){
    addresInput.classList.remove('border-red-500')
    addresInput.classList.add('hidden')
  }
})

checkoutBtn.addEventListener('click', function(){
  const isOpen = checkRestaurantOpen()
  if(!isOpen){
    alert('Restaurante fechado')
    return;
  }
  if(cart.length === 0) return;
  if(addresInput.value === ""){
    addressWarn.classList.remove("hidden")
    addresInput.classList.add('border-red-500')
    return;
  }

  // enviar pedido para whats
  const cartItems = cart.map((item) => {
    return ( 
      `${item.name} Quantidade: (${item.quantity} Preço: R$ ${item.price} |)`
    )
  }).join("")

  const message = encodeURIComponent(cartItems)
  const phone = "85 994145479"

  window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`,  "_blank")
})

// verificar a hora e manipular o card horario
function checkRestaurantOpen(){
  const data = new Date()
  const hora = data.getHours()
  return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen()

if (isOpen) {
  spanItem.classList.remove("bg-red-500")
  spanItem.classList.add("bg-green-600")
} else {
  spanItem.classList.remove("bg-green-600")
  spanItem.classList.add("bg-red-500")
}