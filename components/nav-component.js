
customElements.define('nav-component', class extends HTMLElement {
    constructor() {
        super()
    }
    connectedCallback() {
        const location = window.location.pathname
        const fullpath = window.location.pathname.split('/')
        const breadcrumb = fullpath.filter(function (f, i) {
            return i !== 0 && i !== fullpath.length - 1
        })[0]

        fetch('/kadin/' + breadcrumb + '.json').then(function (response) {

            return response.json()
        }).then(function (data) {
            debugger;
            document.querySelector('search-box').insertAdjacentHTML('afterend', '<div id="nav-container" class="nav-root"></div>')
            data.forEach(function (d) {
              //  document.getElementById('nav-container').insertAdjacentHTML('beforeend', '<div></div>')
                const { name: katName, url: katUrl } = d['kategory']
                const subcategories = d['subcategory']
                debugger;
                document.getElementById('nav-container').insertAdjacentHTML('beforeend', `<div id=${katName}><a href="${katUrl}">${katName}</a></div>`)
                subcategories.forEach(function (s) {
                    const { name, url } = s
                    debugger;
                    document.getElementById(katName).insertAdjacentHTML('beforeend', `<div id=${name}><a href="${url}">${name}</a></div>`)

                })
                debugger;
            })
         
        }).catch(function (err) {
            console.log(err)
        })
    }
})

//if (!document.querySelector('nav-component')) {

//}