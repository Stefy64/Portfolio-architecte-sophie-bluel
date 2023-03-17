//Manage modal
const modalWrapper = document.getElementsByClassName("modal-wrapper")[0];
let modal = null;
let userImage = false;

//Load and run when connected
if (token != null) {
  const openModal = function (e) {
    e.preventDefault();
    document.getElementById("modal1").dataset.show = "true";
    const target = document.getElementById("modal1");
    target.style.display = null;
    modal = target;
    modal.addEventListener("click", closeModal);
    document
      .getElementById("close-modal")
      .addEventListener("click", closeModal);
    document
      .querySelector(".js-modal-stop")
      .addEventListener("click", stopPropagation);
  };

  const closeModal = function (e) {
    if (modal === null) return;
    e.preventDefault();
    document.getElementById("modal1").dataset.show = "false";
    window.setTimeout(function () {
      modal.style.display = "none";
      modal = null;
      userImage = false;
      getBackModal();
    }, 500);
    modal.removeEventListener("click", closeModal);
    document
      .getElementById("close-modal")
      .removeEventListener("click", closeModal);
    document
      .querySelector(".js-modal-stop")
      .removeEventListener("click", stopPropagation);
  };

  const stopPropagation = function (e) {
    e.stopPropagation();
  };

  function eventModal() {
    document.querySelector(".js-modal").addEventListener("click", openModal);
  }

  var htmlGalleryModal = `<h2 id="title-modal"></h2>
        <div class="gallery-modal"></div>
        <hr>
        <button id="add-img-btn" class="btn-primary">Ajouter une photo</button>
        <a class="delete-link" href="#">Supprimer la gallerie</a>`;

  var htmlAddWork = `<button id="back-btn"><i class="fa-solid fa-arrow-left"></i></button>
  <h2 id="title-modal"></h2>
  <form id="add-work-form" class="form-full" method="post" enctype="multipart/form-data">
      <div id="add-img">
          <img src="assets/icons/picture-svgrepo.svg" alt="Ajouter une image">
          <label for="image-file" class="btn-light">
              <input type="file" id="image-file" name="image-file" style="display: none;" accept="image/png, image/jpeg" required>
              + Ajouter une photo
          </label>
          <small>jpg, png : 4mo max</small>
      </div>
      <label for="title">Titre</label>
      <input id="title" class="input-base" name="title" type="text" maxlength="45" required>
      <label for="category">Catégorie</label>
      <div class="dropdown">
          <button class="input-base dropbtn" data-id="1" type="button" id="category" name="category" required>
              Objets
              <i class="fa-solid fa-chevron-down"></i>
          </button>
          <ul id="js-dropdown" class="dropdown-content" style="display: none;">
          </ul>
      </div>
      <hr>
      <button type="submit" name="submit-btn" id="submit-work" class="btn-primary">Valider</button>
  </form>`;

  //Add close button and title    
  function addTemplateModal(title) {
    let closeButton = document.createElement("button");
    let iconClose = document.createElement("i");
    let titleModal = document.getElementById("title-modal");

    modalWrapper.insertBefore(closeButton, titleModal).id = "close-modal";
    closeButton.appendChild(iconClose).classList.add("fa-solid", "fa-xmark");
    titleModal.innerHTML = title;
  }

  //Add content gallery
  function addGalleryContent() {
    modalWrapper.innerHTML = htmlGalleryModal;
    addTemplateModal("Galerie photo");

    const btnAddImg = document.getElementById("add-img-btn");
    const galleryModal = document.getElementsByClassName("gallery-modal")[0];
    eventModal();

    promiseWorks
      .then(function () {
        works.forEach((work) => {
          let figure = addWork(work, galleryModal, "éditer");
          let iconButton = addDeleteIcons(figure, work);

          iconButton.addEventListener("click", deleteWorkAndRefresh);
        });
      })
      .catch(function (err) {
        console.log(
          "L'erreur suivante sur l'ajout des travaux dans la fenêtre modale est survenue :"
        );
        console.log(err);
      });

    btnAddImg.addEventListener("click", addWorkModal);
  }

  const deleteWorkAndRefresh = async function (e) {
    let id = e.target.dataset.id;
    await fetch("http://localhost:5678/api/works/1" + "/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(function () {
        id = parseInt(id);
        for (let i = 0; i < works.length; i++) {
          if (works[i].id === id) {
            works.splice(i, i);
          }
        }
        e.target.parentNode.style.display = "none";
        resetDOM(gallery);
        addAllWorks(works, gallery);
      })
      .catch(function (err) {
        console.log("Une erreur sur la suppression d'un travail est survenue");
        console.log(err);
      });
  };

  function addDeleteIcons(element, work) {
    let iconButton = document.createElement("button");
    let icon = document.createElement("i");

    element.appendChild(iconButton);
    iconButton.classList.add("delete-icons");
    iconButton.setAttribute("data-id", work.id);

    iconButton.appendChild(icon).classList.add("fa-regular", "fa-trash-can");
    icon.style.pointerEvents = "none";

    return iconButton;
  }

  function openDropdownBtn(dropDownMenu) {
    let dropDownBtn = document.querySelector(".input-base.dropbtn");
    dropDownBtn.addEventListener("click", function (event) {
      dropDownMenu.style.display = "block";
      dropDownMenu.style.boxShadow = "0px 14px 16px rgba(0, 0, 0, 0.09)";

      document
        .querySelector(".js-modal-stop")
        .addEventListener("click", closeDropDown);

      document
        .querySelector(".dropdown")
        .addEventListener("click", stopPropagation);
    });
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

  //Add categories from server
  function dropDownCategories(dropDownMenu) {
    let categories = getCategories();
    categories.then(function (value) {
      value.forEach((category) => {
        let listElement = document.createElement("li");
        dropDownMenu.appendChild(listElement);
        listElement.dataset.id = category.id;
        listElement.innerHTML = category.name;
        listElement.addEventListener("click", closeDropDown);
      });
      setCategory(dropDownMenu);
    });
  }

  function setCategory(dropDownMenu) {
    dropDownMenu.addEventListener("click", function (event) {
      let dropbtn = document.querySelector(".input-base.dropbtn");
      let icon = "<i class='fa-solid fa-chevron-down'></i>";
      dropbtn.innerHTML = event.target.textContent + icon;
      dropbtn.dataset.id = event.target.dataset.id;
    });
  }

  //Get image the user
  function getUserImage() {
    let imageInput = document.getElementById("image-file");
    imageInput.addEventListener("change", function (value) {
      let userInput = imageInput.files[0];
      if (userInput.type === "image/png" || userInput.type === "image/jpeg") {
        let imgElt = document.createElement("img");
        updateImg(imgElt, userInput);
        userImage = true;
      }
    });
  }

  function updateImg(imgElt, userInput) {
    imgElt.classList.add("img-thumbnails");
    imgElt.file = userInput;
    let addImgContener = document.getElementById("add-img");

    for (let child of addImgContener.children) {
      child.style.display = "none";
    }

    addImgContener.appendChild(imgElt);

    const reader = new FileReader();
    reader.onload = (e) => {
      imgElt.src = e.target.result;
    };
    reader.readAsDataURL(userInput);
  }

  function errorMessage() {
    let errorMsg = document.createElement("p");
    errorMsg.classList.add("error-msg", "error-msg-float");
    errorMsg.innerHTML = "Erreur avec le fichier ou le titre";
    modalWrapper.appendChild(errorMsg);
    setTimeout(function () {
      modalWrapper.removeChild(errorMsg);
    }, 2500);
  }

  function sendWork() {
    let addWorkForm = document.getElementById("add-work-form").elements;
    addWorkForm["submit-btn"].addEventListener("click", function (event) {
      event.preventDefault();

      if (
        addWorkForm["title"].value === "" ||
        addWorkForm["category"].dataset.id === "" ||
        !userImage ||
        addWorkForm["title"].value.length > 46
      ) {
        errorMessage();
      } else {
        addWorkForm["submit-btn"].setAttribute("disabled", "");
        let formData = new FormData();

        let userInput = addWorkForm["image-file"].files[0];

        formData.append("title", addWorkForm["title"].value);
        formData.append("category", addWorkForm["category"].dataset.id);
        formData.append("image", userInput);

        fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        })
          .then(function (res) {
            if (res.ok) {
              return res.json();
            } else {
              console.log("Une erreur sur l'envoi d'un ouvrage est survenue.");
              console.log(res);
            }
          })
          .then(function (newWork) {
            works.push(newWork);
            resetDOM(gallery);
            addAllWorks(works, gallery);
          })
          .then(function () {
            document.getElementById("back-btn").click();
          })
          .catch(function (err) {
            console.log(
              "Une erreur sur l'envoi d'un ouvrage est survenue. Erreur : "
            );
            console.log(err);
          });
      }
    });
  }

  function checkValidForm() {
    let form = document.getElementById("add-work-form");
    form.addEventListener("input", function () {
      if (form["title"].value !== "" && form["image-file"].value !== "") {
        form["submit-btn"].disabled = false;
        form["submit-btn"].classList.remove("btn-disable");
      }
    });
  }

  //Button "back"
  const getBackModal = function () {
    resetDOM(modalWrapper);
    addGalleryContent();
    document
      .getElementById("close-modal")
      .addEventListener("click", closeModal);
  };

  const addWorkModal = function (e) {
    resetDOM(modalWrapper);
    modalWrapper.innerHTML = htmlAddWork;
    addTemplateModal("Ajout photo");
    let dropDownMenu = document.getElementById("js-dropdown");
    dropDownMenu.style.display = "none";
    openDropdownBtn(dropDownMenu);
    dropDownCategories(dropDownMenu);
    getUserImage();
    sendWork();
    checkValidForm();
    document
      .getElementById("close-modal")
      .addEventListener("click", closeModal);
    document.getElementById("back-btn").addEventListener("click", getBackModal);
  };

  addGalleryContent();
}
