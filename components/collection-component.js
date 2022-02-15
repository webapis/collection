customElements.define('collection-component', class extends HTMLElement {
    constructor() {
        super()
    }

    async connectedCallback() {
        const dataurl = localStorage.getItem('data-url')
        localStorage.setItem('page', 1)
        this.bottomReached = false
        //  const url ="https://res.cloudinary.com/codergihub/raw/upload/"+dataurl+".json"


        if (window.IntersectionObserver) {
            let observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        //  console.log(entry);
                        entry.target.src = entry.target.dataset.src;
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            window.obz = observer
        }


        this.innerHTML = `
        <div id="collection-container" class="row" style="height:100vh; overflow: scroll;">
     
        </div>`
        await this.fetchData(0)

        const scroller = document.getElementById('collection-container')
        scroller.onscroll = async (ev) => {

            const scrollHeight = scroller.scrollHeight
            const scrollTop = scroller.scrollTop
            const clientHeight = scroller.clientHeight
            if (scrollHeight === (scrollTop + clientHeight) && !this.bottomReached) {
                this.bottomReached = true
                let prevPage = parseInt(localStorage.getItem('page'))
                let nextPage = ++prevPage
                localStorage.setItem('page', nextPage)
                document.getElementById('collection-container').insertAdjacentHTML('beforeend', `<div id="spinner" class="d-flex justify-content-center align-items-center"><div  class="spinner-border text-info" style="width: 5rem; height: 5rem;" role="status">
                <span class="visually-hidden">Loading...</span>
              </div></div>`)
                await this.fetchData(nextPage * 70)
                 window.history.replaceState(null, null, `?page=${nextPage}`);
                var spinnerElem = document.getElementById('spinner');
                spinnerElem.parentNode.removeChild(spinnerElem);
                this.bottomReached = false
                // console.log('scrollHeight...', document.getElementById('collection-container').scrollHeight)
                // console.log('scrollTop...', document.getElementById('collection-container').scrollTop)
                // console.log('clientHeight...', document.getElementById('collection-container').clientHeight)
                //console.log('botton reached')
            }


        };
    }

    async fetchData(page) {
        const gender = localStorage.getItem('gender')
        const subcategory = localStorage.getItem('subcategory')
        const category=  localStorage.getItem('category')
        const url = `/atlas?gender=${gender}&category=${category}&subcategory=${subcategory}&page=${page}`
        debugger;
        const response = await fetch(url, { cache: 'default' })

        const { data } = await response.json()

        const collection = data.filter((d, i) => i)

        collection.forEach((col, i) => {
            const { imageUrl, priceBasket, priceNew, priceOld, title, link, basketDiscount, plcHolder, timestamp, discPerc } = col

            document.getElementById('collection-container').insertAdjacentHTML('beforeend', `
       <product-component id="pc-${i}" timestamp="${timestamp}"  class="p-component col-xl-2 col-lg-3 col-6 col-md-4" discPerc="${discPerc}" plcHolder="${plcHolder}" basketDiscount="${basketDiscount}" imageUrl="${imageUrl}" priceBasket="${priceBasket}" priceNew="${priceNew}" priceOld="${priceOld}"
       title ="${title}" link="${link}"
       ></product-component>
        `)
        })
    }
})


