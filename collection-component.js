customElements.define('collection-component', class extends HTMLElement{
    constructor(){
        super()
    }

    async connectedCallback(){

  
        if(window.IntersectionObserver){
            let observer = new IntersectionObserver((entries, observer) => { 
                entries.forEach(entry => {
                if(entry.isIntersecting){
                    console.log(entry);
                    entry.target.src = entry.target.dataset.src;
                    observer.unobserve(entry.target);
                }
                });
            }, {threshold:0.1});
            window.obz=observer
        }
        

        this.innerHTML=`<div class="container-fluid"><div id="container" class="container"></div></div>`
        const response = await fetch('https://res.cloudinary.com/codergihub/raw/upload/collection2022.json',{cache:'reload'})
        const data = await response.json()
        const collection = data.filter((d,i)=> i)
     
        collection.forEach((col,i)=>{
            const {imageUrl,priceBasket,priceNew,priceOld,title,link}=col
     
            document.getElementById('container').insertAdjacentHTML('beforeend',`
           <product-component id="pc-${i}"  class="p-component" imageUrl="${imageUrl}" priceBasket="${priceBasket}" priceNew="${priceNew}" priceOld="${priceOld}"
           title ="${title}" link="${link}"
           ></product-component>
            `)
        })
    
    }
})


