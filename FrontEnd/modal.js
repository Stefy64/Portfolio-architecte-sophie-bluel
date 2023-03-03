const modalWrapper = document.getElementsByClassName("modal-wrapper")[0];
let modal = null;

if (token != null) {
  const openModal = async function (e) {
    e.preventDefault();
    const target = e.target.getAttribute("href");
    if (target.startsWith("#")) {
      modal = document.querySelector(target);
    } else {
      modal = await loadModal(target);
    }
    modal.style.display = null;
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.addEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-close")
      .addEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-stop")
      .addEventListener("click", stopPropagation);
  };
  console.log(openModal, "modal");

  const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    window.setTimeout(function () {
      modal.style.display = "none";
      modal = null;
    }, 500);
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-close")
      .removeEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-stop")
      .removeEventListener("click", stopPropagation);
    modal = null;
  };
  console.log(closeModal, "closeModal");

  const stopPropagation = function (e) {
    e.stopPropagation();
  };
  function eventModal() {
    document.querySelector(".js-modal").addEventListener("click", openModal);
  }

  const loadModal = async function (url) {
    const target = "#" + url.split("#")[1];
    const html = await fetch(url).then((response) => response.text());
    console.log(html, target);
  };

  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
  });
  var htmlGalleryModal = `<h2 id="title-modal"></h2>
        <div id="gallery-modal" class="gallery-modal"></div>
        <hr>
        <button id="add-img-btn" class="btn-primary">Ajouter une photo</button>
        <a class="delete-link" href="#">Supprimer la gallerie</a>`;

  var htmlAddWork = `<button id="back-btn"><i class="fa-solid fa-arrow-left"></i></button>
        <h2 id="title-modal"></h2>
        <form id="add-work-form" class="form-full" method="post" enctype="multipart/form-data">
            <div id="add-img">
                <img alt="Ajouter une image">
                <label for="image-file" class="btn-light">
                    <input type="file" id="image-file" name="image-file" class="none" accept="image/png, image/jpeg" required>
                    + Ajouter une photo
                </label>
                <small>jpg, png : 4mo max</small>
            </div>
            <label for="title">Titre</label>
            <input id="title" class="input-field" name="title" type="text" maxlength="45" required>
            <label for="category">Catégorie</label>
            <div class="dropdown">
                <button class="input-field dropbtn" data-id="1" type="button" id="category" name="category" required>
                    Objets
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
                <ul id="js-dropdown" class="dropdown-content" style="display: none;">
                </ul>
            </div>
            <hr>
            <button type="submit" name="submit-btn" id="submit-work" class="btn-primary btn-disable" disabled>Valider</button>
        </form>`;

  function addTemplateModal(title) {
    let closeButton = document.createElement("button");
    let iconClose = document.createElement("i");
    let titleModal = document.getElementById("title-modal");

    modalWrapper.insertBefore(closeButton, titleModal).id = "close-modal";
    closeButton.appendChild(iconClose).classList.add("fa-solid", "fa-xmark");
    titleModal.innerHTML = title;
  }

  function addGalleryContent() {
    modalWrapper.innerHTML = htmlGalleryModal;
    addTemplateModal("Galerie photo");

    const btnAddImg = document.getElementById("add-img-btn");
    const galleryModal = document.getElementsByClassName("gallery-modal")[0];
    eventModal();

    var addWork = fetch("http://localhost:5678/api/works")
      .then(function (response) {
        return response.json();
      })
      .then(function (works) {
        console.log("photos", works);
        const gallerymodal = document.getElementById("gallery-modal");
        works.forEach((elt) => {
          console.log(elt.title);

          const div = document.createElement("div");
          const img = document.createElement("img");
          gallerymodal.appendChild(div);

          div.innerHTML = `
          <figure>
            <img crossorigin="anonymous" src=${elt.imageUrl}>
          </figure>
        `;

          div.appendChild(img);
        });
      });

    function addWork() {
      const figure = addWork(elt, galleryModal, "éditer");
      const iconButton = addDeleteIcons(figure, elt);
      iconButton.addEventListener("click", deleteWorkAndRefresh);
    }
    console.log(addWork);
    btnAddImg.addEventListener("click", addWorkModal);
  }

  const closeDropDown = function (e) {
    let dropDownMenu = document.getElementById("js-dropdown");
    if (dropDownMenu.style.display === "none") return;
    e.preventDefault();
    dropDownMenu.style.display = "none";

    document
      .querySelector(".js-modal-stop")
      .removeEventListener("click", closeDropDown);
  };


  function dropDownCategories(dropDownMenu) {
    let categories = getCategories();
    categories.then(function (value) {
      console.log(value)
      value?.forEach((category) => {
        let listElement = document.createElement("li");
        dropDownMenu.appendChild(listElement);
        listElement.dataset.id = category.id;
        listElement.innerHTML = category.name;
        listElement.addEventListener("click", closeDropDown);
      });
    
      //setCategory(dropDownMenu);
    });
  }

  const addWorkModal = function (e) {
    resetDOM(modalWrapper);
    modalWrapper.innerHTML = htmlAddWork;
    addTemplateModal("Ajout photo");
    let dropDownMenu = document.getElementById("js-dropdown");
    dropDownMenu.style.display = "none";
    dropDownCategories(dropDownMenu);
    document
      .getElementById("close-modal")
      .addEventListener("click", closeModal);
  };

  addGalleryContent();
}
