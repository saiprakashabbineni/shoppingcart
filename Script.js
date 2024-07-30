let IconCart = document.querySelector('.icon-cart')
let ShowCartItems = document.querySelector('.showCart')
let CloseCart = document.querySelector('.close')

IconCart.addEventListener('click', () => {
    ShowCartItems .classList.toggle('showCart');
})

CloseCart.addEventListener('click',() => {
    ShowCartItems .classList.toggle('showCart');
})


let listProductHTML  = document.querySelector('.listProduct')

let listCartHTML = document.querySelector('.listCart')
let iconCartSpan = document.querySelector('.icon-cart span')

let listProducts = []
let carts = []


const  AddDataToHtml = () => {
   
    listProductHTML.innerHTML ='';
    if(listProducts.length> 0) {
        listProducts.forEach(product => {

            let newProduct = document.createElement('div')
            newProduct.classList.add('item')
            newProduct.dataset.id = product.id;
            newProduct.innerHTML=`
            <img src="${product.image}" alt="" />
            <h2>${product.name}</h2>
            <div class="price">${product.price}</div>
            <button class="addcart">Add to cart</button>`;

listProductHTML.appendChild(newProduct)
        })
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addcart')) {
        let productId = positionClick.parentElement.dataset.id;
        addToCart(productId);  
    }
});

const addToCart = (productId) => {
    
    let PositionthisProductInCart = carts.findIndex((value) => value.productid === productId);

    if (PositionthisProductInCart < 0) {
       
        carts.push({
            productid: productId,
            quantity: 1,
      
        });
    } else {
        
        carts[PositionthisProductInCart].quantity++;
    }
AddCarttoHTML()
AddCartToMemory()
}

const AddCarttoHTML = () =>{
    let totalQuantity = 0
    listCartHTML.innerHTML = '';
    if (carts.length >0 ){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity
            const newCart = document.createElement('div')
            newCart.classList.add('item')
            newCart.dataset.id = cart.productid
           let positionProduct = listProducts.findIndex((value) => value.id == cart.productid);
           let info = listProducts[positionProduct]
            newCart.innerHTML =`
            <div class="image">
            <img src="${info.image}" alt="" />
          </div>
          <div class="name">
            <h1>${info.name}</h1>
          </div>
          <div class="Price">${info.price}</div>
          <div class="quantity">
            <span class="minus"><</span>
            <span>${cart.quantity}</span>
            <span class="plus">></span>
          </div>
          <div class="delete">
          <p >DELETE</p>
      </div>
            `

          listCartHTML.appendChild(newCart)

        })

    }
iconCartSpan.innerHTML = totalQuantity
}


listCartHTML.addEventListener("click", (event) => {
    let clickedElement = event.target.parentElement;
    if (clickedElement.classList.contains('delete')) {
        let nameID = clickedElement.parentElement.dataset.id;
        console.log("Product ID:", nameID); // Log the product ID

        let positionItemInCart = carts.findIndex((value) => value.productid === nameID);
        console.log("Position in Cart:", positionItemInCart); // Log the position in the cart

        if (positionItemInCart >= 0) {
            carts.splice(positionItemInCart, 1);
            console.log("Cart After Deletion:", carts); // Log the updated cart
            AddCartToMemory();
            AddCarttoHTML();
        }
    }
});

// listCartHTML.addEventListener("click", (event) => {
//     let clickedElement = event.target.parentElement;
//     console.log(clickedElement);
//     if (clickedElement.classList.contains('delete')) {
        
//         let productId = clickedElement.parentElement.dataset.id;
//         console.log("Product ID:", productId); // Log the product ID

//         let positionItemInCart = carts.findIndex((value) => value.productid === productId);
//         console.log("Position in Cart:", positionItemInCart); // Log the position in the cart

//         if (positionItemInCart >= 0) {
//             carts.splice(positionItemInCart, 1);
//             console.log("Cart After Deletion:", carts); // Log the updated cart
//             AddCartToMemory();
//             AddCarttoHTML();
//         }
//     }
// });

listCartHTML.addEventListener("click",(event) => {
    let positionclick = event.target
    if (positionclick.classList.contains('minus') ||  positionclick.classList.contains('plus')){
        let productId = positionclick.parentElement.parentElement.dataset.id
       
    
    let type ="minus";
    if (positionclick.classList.contains('plus')){
     type = "plus"
    }
    changeQuantity(productId,type)
 }
    
})
const changeQuantity = (productId, type) => {
    let positionItemInCart = carts.findIndex((value) => value.productid === productId);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity++;
                break;
            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    AddCartToMemory();
    AddCarttoHTML();
};

const AddCartToMemory  = () => {
    localStorage.setItem('cart', JSON.stringify(carts))
}


const App = () => {
    fetch('Products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data
        console.log(listProducts)
        AddDataToHtml()
        if (localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'))
        }
        AddCarttoHTML()
    })
   
}

App();