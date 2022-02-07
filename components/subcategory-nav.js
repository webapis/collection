

document.querySelectorAll('.category').forEach(function (element) {
    element.addEventListener('click', function (e) {
        e.preventDefault()
        const { id } = e.target
        localStorage.setItem('subcategory', id)
        debugger;
        window.location.replace(e.target.href)
    })
})


