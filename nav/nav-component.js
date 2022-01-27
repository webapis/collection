customElements.define('nav-component', class extends HTMLElement{
    constructor(){
        super()
    }
    connectedCallback(){
        this.innerHTML='ddd'
    }
})