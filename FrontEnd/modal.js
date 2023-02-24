let modal = null


const openModal = async function (e){
    e.preventDefault()
    const target = e.target.getAttribute("href");
    if (target.startsWith("#")){
        modal = document.querySelector(target)
    } else {
        modal = await loadModal(target)
    }
    modal.style.display = null;
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}
console.log(openModal, "modal")

const closeModal = function (e){
    if (modal === nul) return
    e.preventDefault();
    window.setTimeout(function () {
        modal.style.display = "none";    
    }, 500)
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
}
console.log(closeModal,"closeModal")

const stopPropagation = function (e){
    e.stopPropagation()
}
const loadModal = async function (url){
    const target = "#" + url.split("#")[1]
  const html = await fetch(login.html).then(response => response.text())
  console.log(html, target)
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
});
