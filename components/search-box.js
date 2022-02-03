customElements.define('search-box', class extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `<input placeholder="Arama..."/>sssss`
    }

    connectedCallback() {
        const location = window.location.pathname


        this.innerHTML = `

        <div class="container">
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb pt-3">
        <li class="breadcrumb-item active" aria-current="page">Anasayfa</li>
        </ol>
        </nav>
        <div class="row">
       <search-input class="col pt-2"></search-input>
       <search-tabs class="col-12 py-2"></search-tabs>
       </div>
       </div>
       `

        document.querySelectorAll('.search-navs a').forEach(el => {
            el.addEventListener('click', function (e) {
                const { id } = e.target
                const location = window.location.pathname
                if (location.includes(id)) {
                    e.preventDefault()
                }
            })
        })

        const fullpath = window.location.pathname.split('/')
const breadcrumb = fullpath.filter(function (f, i) {
    return i !== 0 && i !== fullpath.length - 1
})
breadcrumb.forEach(function (b) {
    document.querySelector('.breadcrumb').insertAdjacentHTML('beforeend', `<li class="breadcrumb-item active" aria-current="page">${b}</li>`)
})
    }
})


customElements.define('search-input', class extends HTMLElement {
    constructor() {
        super()
        this.innerHTML = `<div class="input-group">
        <input type="text" class="form-control" placeholder="Arama yapın" aria-label="Arama yapın">
        
        <button class="btn btn-outline-secondary" type="button">Bul</button>
      </div>`
    }
})

customElements.define('search-tabs', class extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        const seatchTab =localStorage.getItem('searchTab')
        this.innerHTML = `<ul class="nav nav-tabs justify-content-center">
   
        <li class="nav-item">
        <a class="nav-link ${seatchTab==='kadin' && 'active'} search-tab" href="#" id="kadin">KADIN</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${seatchTab==='erkek' && 'active'} search-tab" href="#" id="erkek">ERKEK</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${seatchTab==='cocuk' && 'active'} search-tab" href="#" id="cocuk">ÇOCUK</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${seatchTab==='bebek' && 'active'} search-tab" href="#"  id="bebek">BEBEK</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${seatchTab==='ayakkabi' && 'active'} search-tab" href="#"  id="ayakkabi">AYAKKABI</a>
        </li>
        <li class="nav-item">
            <a class="nav-link ${seatchTab==='aksesuar' && 'active'} search-tab" href="#"  id="aksesuar">AKSESUAR</a>
        </li>
      </ul>`
      document.querySelectorAll('.search-tab').forEach(function(element){
          element.addEventListener('click',function(e){
              const {id}=e.target
              localStorage.setItem('searchTab',id)
              window.location.replace('/'+id+'/index.html')
          })
      })
    }
})