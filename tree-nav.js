customElements.define('tree-nav', class extends HTMLElement {
    constructor() {
        super()
    }

  async  connectedCallback() {
      const response =await fetch('/nav.html')
      const html =await response.text()
        this.innerHTML = html

        var toggler = document.getElementsByClassName("caret");
        var i;

        for (i = 0; i < toggler.length; i++) {
            toggler[i].addEventListener("click", function () {
                this.parentElement.querySelector(".nested").classList.toggle("active");
                this.classList.toggle("caret-down");
            });
        }
    }
})