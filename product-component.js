customElements.define('product-component', class extends HTMLElement {
    constructor() {
        super()
    }

    async connectedCallback() {

       
        const imageUrl = this.getAttribute('imageUrl')
        const priceBasket = this.getAttribute('priceBasket').replace('TL','').trim()
        const priceNew = this.getAttribute('priceNew').replace('TL','').trim()
        const priceOld = this.getAttribute('priceOld').replace('TL','').trim()
        const basketDiscount = this.getAttribute('basketDiscount').replace('TL','').trim()
        const title = this.getAttribute('title')
        const link = this.getAttribute('link')
        const aTag =document.createElement('a')
        aTag.href=link
        const host =aTag.hostname
        const cloudinaryUrl = `https://res.cloudinary.com/codergihub/image/fetch/w_250/co_rgb:FFFFFF,l_text:Verdana_15_underline_letter_spacing_0:${host}/fl_layer_apply,g_south,y_0.0/`
        debugger;
        const imgPlaceholder =this.getAttribute('plcHolder') 
        const timestamp =parseInt( this.getAttribute('timestamp'))
        
        debugger;
        this.innerHTML = `<div class="product-item">
        
        <img src="${imgPlaceholder}" class="card-img-top" alt="d" data-src="${cloudinaryUrl + imageUrl}">
        <div class="p-detail">
        <div class="p-title">
        ${title}
        </div>
        <div class="price">
        <div class="price-old">${priceOld !=='null'? '₺'+ priceOld:''}</div>
        <div class="price-new">${'₺'+priceNew}</div>
        </div>
        <div class="price-basket"> ${(basketDiscount !=='undefined' && basketDiscount !=='null' ) ? `<span style="font-size:10px;">Sepette % ${basketDiscount} indirim </span>`+ `<span style="font-weight:700;">₺${priceBasket}</span>`:'' }</div>
        <div class="timestamp">${timestamp}</div>
        </div>
        <div>`
        window.obz.observe(this.querySelector('img'))
    }




})