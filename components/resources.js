
document.head.insertAdjacentHTML('beforeend', '<link href="/components/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">" rel="stylesheet">')
document.body.insertAdjacentHTML('afterbegin',`  <div class="container-fluid">
<div class="row">

  <div id="navigation" class="col-lg-3"></div>
  <div id="collection" class="row col-lg-9"></div>
</div>

</div>
`)
console.log(window.location.pathname)



Promise.all([
    import('./search-box.js'),  import('./bootstrap.bundle.min.js'),

]).then(() => {


    if (!document.querySelector('search-box')) {
        document.body.insertAdjacentHTML('afterbegin', `<search-box></search-box>`)
    }
  //  if (document.getElementById('collection')) {
        Promise.all([import('./collection-component.js'), import('./product-component.js'),import('./product-navigation.js')]).then(function () {
            document.getElementById('collection').insertAdjacentHTML('afterbegin', `<collection-component></collection-component>`)
            document.getElementById('navigation').insertAdjacentHTML('afterbegin', `<product-navigation></product-navigation>`)
        })
  //  }
   
})




