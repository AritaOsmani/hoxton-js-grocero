
const state = {
    availableProducts: [
        {
            id: '001',
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


}
const listElementContainer = document.querySelector('.item-list.cart--item-list');
const listContainer = document.querySelector('.item-list.store--item-list');

function addItemToBasket(product) {
    if (product.quantity === 0) {
        return;
    }
    const item = {
        id: product.id,
        name: product.name,
        quantity: 1
    }

    const index = state.basket.findIndex(function (name) {
        return (name.name === product.name);
    });
    if (index === -1) {
        state.basket.push(item);
    } else {
        increaseQuantity(state.basket[index])

    }
    decreaseQuantity(product);


}
function removeItemFromBasket(product) {
    state.basket = state.basket.filter(function (item) {
        return item.id != product.id;
    })
}

function increaseQuantity(item) {
    item.quantity++;
}
function decreaseQuantity(item) {
    item.quantity--;
}
function calculateTotal(price) {
    state.currentTotal += price;
}

// function calculateTotal(product){
//     const price = product.quantity * product.price;
//     state.currentTotal += price;
// }
function render() {
    renderStoreItems();
    renderCartItems();
    renderTotal();
}
function renderStoreItems() {
    listContainer.innerHTML = '';
    for (const product of state.availableProducts) {
        createStoreItems(product);
    }
}


function renderCartItems() {
    listElementContainer.innerHTML = '';
    for (const product of state.basket) {

        const listItem = createCartItems(product);
        listElementContainer.append(listItem);
    }
}
function renderTotal() {

    const spanEl = document.querySelector('.total-number');
    // spanEl.innerHTML = '';
    spanEl.textContent = '£' + getTotal().toFixed(2);
}
function createStoreItems(product) {


    const listItem = document.createElement('li');

    const container = document.createElement('div');
    container.setAttribute('class', 'store--item-icon');

    const imageEl = document.createElement('img');
    imageEl.setAttribute('src', `assets/icons/${product.id}-${product.name}.svg`);
    imageEl.setAttribute('alt', product.name);

    const buttonEl = document.createElement('button');
    buttonEl.textContent = 'Add to cart';

    addButtonListener(buttonEl, product);

    container.append(imageEl, buttonEl);

    listItem.append(container);
    listContainer.append(listItem);
}
function createCartItems(product) {
    const listItem = document.createElement('li');

    const imageEl = document.createElement('img');
    imageEl.setAttribute('class', 'cart--item-icon');
    imageEl.setAttribute('src', `assets/icons/${product.id}-${product.name}.svg`);
    imageEl.setAttribute('alt', product.name);

    const itemName = document.createElement('p');
    itemName.textContent = product.name;

    const removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'quantity-btn.remove-btn center');
    removeButton.textContent = '-';

    removeButton.addEventListener('click', function () {
        decreaseQuantity(product);

        if (product.quantity === 0) {
            removeItemFromBasket(product);

        }
        render()
    })

    const spanEl = document.createElement('span');
    spanEl.setAttribute('class', 'quantity-text.center');
    spanEl.textContent = product.quantity;

    const addButton = document.createElement('button');
    addButton.setAttribute('class', 'quantity-btn.add-btn.center');
    addButton.textContent = '+';

    addButton.addEventListener('click', function () {
        const storeItem = state.availableProducts.find(function (storeItem) {
            return storeItem.id === product.id;
        })
        addItemToBasket(storeItem);

        // increaseQuantity(product);
        // renderCartItems();
        // renderTotal();
        render();
    })

    listItem.append(imageEl, itemName, removeButton, spanEl, addButton);
    return listItem;

}

function addButtonListener(button, product) {
    button.addEventListener('click', function () {
        if (product.quantity === 0) {
            renderCartItems();
        } else {
            addItemToBasket(product);
            // renderCartItems();
            // renderTotal();
            render();
        }


    })
}
function getTotal() {
    let total = 0;
    for (const item of state.basket) {
        const product = state.availableProducts.find(function (product) {
            return product.id === item.id;
        })
        total += product.price * item.quantity;
    }
    return total;
}


render();

