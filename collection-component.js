customElements.define('collection-component', class extends HTMLElement{
    constructor(){
        super()
    }

    async connectedCallback(){
        this.innerHTML=`<div id="container"></div>`
        const response = await fetch('https://res.cloudinary.com/codergihub/raw/upload/v1642825989/defacto_prods.json')
        const data = await response.json()
        const collection = data.filter((d,i)=> i<25)
        const cloudinaryUrl ='https://res.cloudinary.com/codergihub/image/fetch/h_200/'
        collection.forEach(col=>{
            const {imageUrl}=col
            debugger;
            document.getElementById('container').insertAdjacentHTML('beforeend',`
            <img src="${cloudinaryUrl+imageUrl}"/>
            `)
        })
      
        debugger;
    }
})