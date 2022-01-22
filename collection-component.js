customElements.define('collection-component', class extends HTMLElement{
    constructor(){
        super()
    }

    async connectedCallback(){
        this.innerHTML=`<div id="container"></div>`
        const response = await fetch('https://res.cloudinary.com/codergihub/raw/upload/collection2022.json',{cache:'reload'})
        const data = await response.json()
        const collection = data.filter((d,i)=> i<5)
        const cloudinaryUrl ='https://res.cloudinary.com/codergihub/image/fetch/h_200/'
        collection.forEach(col=>{
            const {imageUrl,priceBasket,priceNew,priceOld,title,link}=col
         debugger;
            document.getElementById('container').insertAdjacentHTML('beforeend',`
           <product-component imageUrl="${imageUrl}" priceBasket="${priceBasket}" priceNew="${priceNew}" priceOld="${priceOld}"
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
        const cloudinaryUrl ='https://res.cloudinary.com/codergihub/image/fetch/h_200/co_rgb:FFFFFF,l_text:Verdana_15_underline_letter_spacing_3:DeFacto/fl_layer_apply,g_south,y_0.05/'
        const imageUrl =this.getAttribute('imageUrl')
        const priceBasket =this.getAttribute('priceBasket')
        const priceNew =this.getAttribute('priceNew')
        const priceOld= this.getAttribute('priceOld')
        const title =this.getAttribute('title')
        const link =this.getAttribute('link')

        this.innerHTML=`<div>
        <a href="${link}">
        <img src="${cloudinaryUrl+imageUrl}"/>
        <div>${title}</div>
     
        </a>
        <div>priceBasket:${priceBasket}</div>
        <div>priceNew:${priceNew}</div>
        <div>priceOld:${priceOld}</div>
      
        </div>`

    }
})