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
    p.textContent =`${product.price} $`;
    let a = document.createElement('a')
    a.textContent = `rating ${product.rating}/10`;
    a.classList.add('rate');
    let button = document.createElement('button')
    button.classList.add('like-btn')
    button.id = product.id
    button.textContent = 'Add to cart';
    let p1 = document.createElement('p1')
    p1.textContent = '♡';
    p1.classList.add('wishList');
    p1.addEventListener('click',()=>{
        if(p1.innerText==='♡'){
        p1.innerText ='♥'
        p1.classList.add('activatedheart')
        }else{
            p1.innerText ='♡' 
        }

        updateLike(product.id,product.wishlist)
    })
    let p2 = document.createElement('p2')
    p2.textContent = `review: ${product.review}`;
    p2.classList.add('reviw');
    card.append(h2,img,p,a,p2,button,p1)
    document.getElementById("product-collection").appendChild(card)

}
//console.log( fetch("http://localhost:3000/products").then(res=>res.json())).then(data=>console.log(data))
   
//updating like in wishlist
function updateLike(id,newWishlist){
    fetch(`http://localhost:3000/products/${id}`,{
      method :"PATCH",
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "wishlist" : newWishlist
      })
    })
  }
  

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/products").then(res=>res.json()).then(products=> products.forEach(product=>createCardElement(product)))
    const form =document.getElementById('newform')

    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target)) //it have all e.target.productitem.value
        console.log(formData);
        sendPost(formData)
   
    })
})
function sendPost(newProduct){
    fetch('http://localhost:3000/products',{
        method: "POST",
        headers: 
        {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
               ...newProduct, //name= newProduct.name, image = newProduct.image,...
        })
    }).then(res=>res.json()).then(newProduct =>createCardElement(newProduct))
}

/* updating ratings and comment */
const updateForm = document.getElementById('editform')
updateForm.addEventListener('submit',(e)=>{
    console.log("update by changing form submitted")
    e.preventDefault();
    const rating = e.target.rating.value;
    const review = e.target.review.value;
    const id = e.target.id.value
    console.log(rating,review,id);
    updatePost(rating,review,id);
})
function updatePost(upRating,upReview,id){
    fetch(`http://localhost:3000/products/${id}`,{
        method: "PATCH",
        headers: 
        {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
           "rating" : upRating,
           "review" : upReview,
           })
    }).then(res=>res.json()).then(newProduct =>createCardElement(newProduct))
}
/* deleting form (product by getting id) */
const deleteForm = document.getElementById('deleteform')
deleteForm.addEventListener('submit',(e)=>{
    console.log("delete form by id")
    e.preventDefault();
    const id = e.target.id.value
    console.log(id);

    deletePost(id)
}
)
function deletePost(id){
    fetch(`http://localhost:3000/products/${id}`,{
        method: "DELETE",
        headers: 
        {
            "Content-Type" : "application/json",
            
        }
    
}).then(data=>data.json).then(product=>console.log(product))}
