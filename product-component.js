customElements.define('product-component', class extends HTMLElement{
    constructor(){
        super()
    }

    async connectedCallback(){
    
        const cloudinaryUrl =`https://res.cloudinary.com/codergihub/image/fetch/w_250/co_rgb:FFFFFF,l_text:Verdana_15_underline_letter_spacing_0:www.defacto.com.tr/fl_layer_apply,g_south,y_0.0/`
        const imageUrl =this.getAttribute('imageUrl')
        const priceBasket =this.getAttribute('priceBasket')
        const priceNew =this.getAttribute('priceNew')
        const priceOld= this.getAttribute('priceOld')
        const title =this.getAttribute('title')
        const link =this.getAttribute('link')

        this.innerHTML=`<img src="/defacto.ph.svg" class="card-img-top" alt="d" data-src="${cloudinaryUrl+imageUrl}">`
        window.obz.observe(this.querySelector('img'))
    }

    size(){
        if(window.innerWidth<=375){
          return '150'
        } else{

            return '250'
        }
    }


})