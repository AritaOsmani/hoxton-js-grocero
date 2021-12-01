/*

This is how an item object should look like

{
  id: 1, // <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 // <- You can come up with your own prices
}

*/
// - A user can view a selection of items in the store
// - From the store, a user can add an item to their cart
// - From the cart, a user can view and adjust the number of items in their cart
// - If an item's quantity equals zero it is removed from the cart
// - A user can view the current total in their cart

const state = {
//     - What products are available for purchase?
//      - What products are in my basket?
//         Current total

    availableProducts: [
        {
            id:'001',
            name: 'beetroot',
            price: 0.35,
            quantity: 3
        },
        {
            id: '002',
            name: 'carrot',
            price: 0.55,
            quantity: 2
        },
        {
            id: '003',
            name: 'apple',
            price: 0.45,
            quantity: 5
        },
        {
            id: '004',
            name: 'apricot',
            price: 0.65,
            quantity: 4
        },
        {
            id: '005',
            name: 'avocado',
            price: 1.1,
            quantity: 6
        },
        {
            id: '006',
            name: 'bananas',
            price: 1.2,
            quantity: 10
        },
        {
            id: '007',
            name: 'bell-pepper',
            price: 0.25,
            quantity: 2
        },
        {
            id: '008',
            name: 'berry',
            price: 0.85,
            quantity: 8
        },
        {
            id: '009',
            name: 'blueberry',
            price: 0.95,
            quantity: 8
        },
        {
            id: '010',
            name: 'eggplant',
            price: 1.2,
            quantity: 5
        }
    ],
    basket: [],

    currentTotal:0
}

function addItemToBasket(product){
    const item = {
        id: product.id,
        name:product.name ,
        quantity:1
    }

    const index = state.basket.findIndex(function (name) {
        return (name.name === product.name);
      });
      if(index ===-1){
        //   console.log('entered')
        state.basket.push(item);
      }else{
          increaseQuantity(state.basket[index])
          
      }
      decreaseQuantity(product);
      calculateTotal(product.price);

}
function removeItemFromBasket(id){
    state.basket = state.basket.filter(function(item){
        return item.id != id;
    })
}

function increaseQuantity(item){
    item.quantity++;
}
function decreaseQuantity(item){
    item.quantity--;
}
function calculateTotal(price){
    state.currentTotal += price;
}

function render(){
    renderStoreItems();
    renderCartItems();
}
function renderStoreItems(){
    for(const product of state.availableProducts){
        createStoreItems(product);
    }
}
const listElementContainer = document.querySelector('.item-list.cart--item-list');

function renderCartItems(){
    listElementContainer.innerHTML='';
    for(const product of state.basket){
       
      const listItem = createCartItems(product);
        listElementContainer.append(listItem);
    }
}

function createStoreItems(product){
    const listContainer = document.querySelector('.item-list.store--item-list');
  
    const listItem = document.createElement('li');

    const container = document.createElement('div');
    container.setAttribute('class','store--item-icon');

    const imageEl = document.createElement('img');
    imageEl.setAttribute('src',`assets/icons/${product.id}-${product.name}.svg`);
    imageEl.setAttribute('alt',product.name);

    const buttonEl = document.createElement('button');
    buttonEl.textContent = 'Add to cart';

    // buttonEl.addEventListener('click',function(){
    //     addItemToBasket(product);
    //     renderCartItems();
       
    // })
    addButtonListener(buttonEl,product);

    container.append(imageEl,buttonEl);

    listItem.append(container);
    listContainer.append(listItem);
}
function createCartItems(product){
    const listItem = document.createElement('li');

    const imageEl = document.createElement('img');
    imageEl.setAttribute('class','cart--item-icon');
    imageEl.setAttribute('src',`assets/icons/${product.id}-${product.name}.svg`);
    imageEl.setAttribute('alt',product.name);

    const itemName = document.createElement('p');
    itemName.textContent = product.name;

    const removeButton = document.createElement('button');
    removeButton.setAttribute('class','quantity-btn.remove-btn center');
    removeButton.textContent = '-';

    removeButton.addEventListener('click',function(){
        decreaseQuantity(product);
        renderCartItems();
    })

    const spanEl = document.createElement('span');
    spanEl.setAttribute('class','quantity-text.center');
    spanEl.textContent = product.quantity;

    const addButton = document.createElement('button');
    addButton.setAttribute('class','quantity-btn.add-btn.center');
    addButton.textContent = '+';

    addButton.addEventListener('click',function(){
        // addItemToBasket(product);
        increaseQuantity(product)
        renderCartItems();
    })
    
    listItem.append(imageEl,itemName,removeButton,spanEl,addButton);
    return listItem;
   
}

function addButtonListener(button,product){
    button.addEventListener('click',function(){
        addItemToBasket(product);
        renderCartItems();
       
    })
}
render();
