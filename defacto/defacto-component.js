customElements.define('defacto-component', class extends HTMLElement{
    constructor(){
        super()
        
    }

    connectedCallback(){
        this.innerHTML=`<div class="nav-menu">
        <a class="" href="#" id="defacto-kadin-yeni-gelenler">Yeni gelenler</a>
        <a class="" href="#" id="koton-kadin-elbise">Koton Kadin Elbise</a>
        </div>`
       this.querySelectorAll('a').forEach(element=>{
           element.addEventListener('click',async e=>{
               e.preventDefault()
               const {id}=e.target
               localStorage.setItem('data-url',id)
               window.location.replace('/index.html')
           })
       })
    }
})


