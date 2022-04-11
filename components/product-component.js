customElements.define('product-component', class extends HTMLElement {
    constructor() {
        super()
    }

    async connectedCallback() {


        const imageUrl = this.getAttribute('imageUrl')
        const priceBasket = this.getAttribute('priceBasket')
        const priceNew = this.getAttribute('priceNew')
        const priceOld = this.getAttribute('priceOld')
        const basketDiscount = this.getAttribute('basketDiscount')
        const discPerc = this.getAttribute('discPerc')
        const title = this.getAttribute('title')
        const link = this.getAttribute('link')
        const aTag = document.createElement('a')
        aTag.href = link
        const host = aTag.hostname
        const cloudinaryUrl = `https://res.cloudinary.com/codergihub/image/fetch/w_250,h_350/`
        
        const imgPlaceholder = this.getAttribute('plcHolder') 
        const date2 = parseInt(this.getAttribute('timestamp'))
        const date1 = Date.now()
        const hour = Math.floor(Math.abs(date1 - date2) / 36e5);
        const minutesdiff = Math.abs(new Date(date1) - new Date(date2));
        var minutes = Math.floor((minutesdiff / 1000) / 60);
        var days = Math.floor(minutesdiff / (1000 * 60 * 60 * 24));
        var month = Math.round(minutesdiff / (2e3 * 3600 * 365.25));
        
        this.innerHTML = `<div class="row">
        
        <img src="${imgPlaceholder}" class="col-12 p-1" alt="d" data-src="${cloudinaryUrl + imageUrl}" >
        <div class="col mx-1  m-name fw-lighter text-center bg-secondary text-light">${host}</div>
        
        <div class="col-12 p-title fs-6 fw-lighter">${title}</div>
        <div class="col-12 row p-0 m-0">
        <div class="col-6">
        <div class="col text-decoration-line-through fs-6">${priceOld !== 'null' ? '₺' + priceOld : ''}</div>
        <div class="col fs-6">${'₺' + priceNew}</div>
        </div>
 
        ${discPerc !== 'null' ? `<div class="col"><span class="col badge bg-primary text-wrap">${discPerc}% Indirim<span></div>` : ''}
        </div>
        
        
       
        </div>
        </div>
        ${(priceBasket !== 'undefined' && priceBasket !== 'null') ? `<div class="col price-basket"> <span style="font-size:10px;">Sepette % ${basketDiscount} indirim </span>` + `<span style="font-weight:700;">₺${priceBasket}</span></div>` : ''}

        <div class="timestamp col text-end" style="font-size:8px">${minutes <= 59 ? minutes + ' dakika önce' : hour <= 24 ? hour + ' saat önce' : days <= 31 ? days + 'gün önce' : month + 'ay önce'}</div>
        `
        window.obz.observe(this.querySelector('img'))
    }




})