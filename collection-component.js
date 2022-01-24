customElements.define('collection-component', class extends HTMLElement{
    constructor(){
        super()
    }

    async connectedCallback(){
        this.innerHTML=`<div class="container-fluid"><div id="container" class="container"></div></div>`
        const response = await fetch('https://res.cloudinary.com/codergihub/raw/upload/collection2022.json',{cache:'reload'})
        const data = await response.json()
        const collection = data.filter((d,i)=> i<15)
        const cloudinaryUrl ='https://res.cloudinary.com/codergihub/image/fetch/w_200/'
        collection.forEach(col=>{
            const {imageUrl,priceBasket,priceNew,priceOld,title,link}=col
     
            document.getElementById('container').insertAdjacentHTML('beforeend',`
           <product-component class="item" imageUrl="${imageUrl}" priceBasket="${priceBasket}" priceNew="${priceNew}" priceOld="${priceOld}"
           title ="${title}" link="${link}"
           ></product-component>
            `)
        })
    
    }
})


customElements.define('product-component', class extends HTMLElement{
    constructor(){
        super()
    }

    async connectedCallback(){
      
        const cloudinaryUrl =`https://res.cloudinary.com/codergihub/image/fetch/w_${this.size()}/co_rgb:FFFFFF,l_text:Verdana_15_underline_letter_spacing_0:www.defacto.com.tr/fl_layer_apply,g_south,y_0.0/`
        const imageUrl =this.getAttribute('imageUrl')
        const priceBasket =this.getAttribute('priceBasket')
        const priceNew =this.getAttribute('priceNew')
        const priceOld= this.getAttribute('priceOld')
        const title =this.getAttribute('title')
        const link =this.getAttribute('link')

        this.innerHTML=`
    
  
      
  <img src="${cloudinaryUrl+imageUrl}" class="card-img-top" alt="d">


        `

    }

    size(){
        if(window.innerWidth<=375){
          return '150'
        } else{

            return '250'
        }
    }


})