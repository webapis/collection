



customElements.define('product-navigation', class extends HTMLElement {

    constructor(){
        super()
    }

  async  connectedCallback(){
    this.innerHTML='loading...'
        const gender = localStorage.getItem('gender')
        const category =localStorage.getItem('category')
        const subcategory =localStorage.getItem('subcategory')
        
        const respose = await fetch(`/categorynav?gender=${gender}`)
        const {data} = await respose.json()
        console.log('data',data)
        this.innerHTML=`<div class="accordion" id="accordion-container"></div>`
        
        data.forEach(function(d,i){
            const {_id,subcategories,total}=d
         
            
            document.getElementById('accordion-container').insertAdjacentHTML('beforeend',`<div class="accordion-item">
            <h2 class="accordion-header" id="heading-${i}">
              <button  id="btn-${i}" data-category="${_id}" class="accordion-button collapsed collapser text-capitalize" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}" aria-expanded="false" aria-controls="collapse-${i}">
               ${_id}
              </button>
            </h2>
            <div id="collapse-${i}" class="accordion-collapse ${category !==_id && 'collapse'}" aria-labelledby="heading-${i}" data-bs-parent="#accordion-container">
              <div class="accordion-body" id="accordion-body-${i}">
              <div class="d-flex justify-content-between mb-1">
              <a class="fw-lighter text-decoration-none text-capitalize" href="/${gender}/${_id}/index.html">Tümü</a><span class="badge bg-secondary rounded-pill fw-lighter">${total}</span></div>
              </div>
            </div>
            </div>
          </div>`)

          subcategories.forEach(function(s){
              const {subtotal,subName}=s
            //   if(subcategory===subName){
            //     document.getElementById('container').insertAdjacentHTML('afterbegin',`<div>${subName.toUpperCase()}</div></div>Ürün Sayısı${subtotal}</div>`)
            // }
              
              document.getElementById(`accordion-body-${i}`).insertAdjacentHTML('beforeend',`<div class="d-flex justify-content-between mb-1  "><a class="fw-lighter subcategory text-decoration-none text-capitalize ${subcategory===subName && 'text-decoration-underline fw-normal'}" href="/${gender}/${subName}/index.html" id="${subName}">${subName}</a><span class="badge bg-secondary rounded-pill fw-lighter">${subtotal}</span></div>`)

          })
        })

        document.querySelectorAll('.subcategory').forEach(function (element) {
            element.addEventListener('click', function (e) {
                e.preventDefault()
                const { id } = e.target
                localStorage.setItem('subcategory', id)
                
                window.location.replace(e.target.href)
            })
        })

        document.querySelectorAll('.collapser').forEach(function(element){
            element.addEventListener('click',function(e){
                const { dataset:{category} } = e.target
                
                localStorage.setItem('category', category)
            })
        })
        
    }
})



customElements.define('accordion-item', class extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        this.innerHTML=`<div class></div>`
    }
})