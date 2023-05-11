console.log('checking js');

function createCardElement(product){
    let card = document.createElement('div');
    card.classList.add('card') //class=card
    let h2 = document.createElement('h2')
    h2.textContent = product.name;
    let img = document.createElement('img')
    img.src = product.image;
    img.classList.add('prodImage')//class=prodImage
    let p = document.createElement('p')
    p.textContent =`${product.price} price`
    
    card.append(h2,img,p)
    document.getElementById("product-collection").appendChild(card)

}
document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/products").then(res=>res.json()).then(products=> products.forEach(product=>createCardElement(product)))
})
//console.log( fetch("http://localhost:3000/products").then(res=>res.json())).then(data=>console.log(data))
    