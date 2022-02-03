customElements.define('collection-component', class extends HTMLElement {
    constructor() {
        super()
    }

    async connectedCallback() {


        if (window.IntersectionObserver) {
            let observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log(entry);
                        entry.target.src = entry.target.dataset.src;
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            window.obz = observer
        }


        this.innerHTML = `
      
        <div id="container" class="row">
     
        </div>`
        const dataurl = localStorage.getItem('data-url')
        //  const url ="https://res.cloudinary.com/codergihub/raw/upload/"+dataurl+".json"
        const url = "http://localhost:8888/.netlify/functions/atlas"
        const response = await fetch(url, { cache: 'default' })
        debugger;
        const { data } = await response.json()
        debugger;
        const collection = data.filter((d, i) => i)
        debugger;
        collection.forEach((col, i) => {
            const { imageUrl, priceBasket, priceNew, priceOld, title, link, basketDiscount, plcHolder, timestamp, discPerc } = col

            document.getElementById('container').insertAdjacentHTML('beforeend', `
           <product-component id="pc-${i}" timestamp="${timestamp}"  class="p-component col" discPerc="${discPerc}" plcHolder="${plcHolder}" basketDiscount="${basketDiscount}" imageUrl="${imageUrl}" priceBasket="${priceBasket}" priceNew="${priceNew}" priceOld="${priceOld}"
           title ="${title}" link="${link}"
           ></product-component>
            `)
        })

    }
})


