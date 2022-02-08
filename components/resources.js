
document.head.insertAdjacentHTML('beforeend', '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">" rel="stylesheet">')

console.log(window.location.pathname)



Promise.all([
    import('./search-box.js'),  import('./bootstrap.bundle.min.js'),

]).then(() => {


    if (!document.querySelector('search-box')) {
        document.body.insertAdjacentHTML('afterbegin', `<search-box></search-box>`)
    }
    if (document.getElementById('collection')) {
        Promise.all([import('./collection-component.js'), import('./product-component.js'),import('./product-navigation.js')]).then(function () {
            document.getElementById('collection').insertAdjacentHTML('afterbegin', `<product-navigation class="col-3"></product-navigation><collection-component class="col-9"></collection-component>`)
        })
    }
   
})




