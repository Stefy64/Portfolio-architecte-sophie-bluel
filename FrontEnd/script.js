//Gallery

async function getWorks() {
  fetch("http://localhost:5678/api/works")
    .then(function (response) {
      return response.json();
    })
    .then(function (works) {
      console.log("photos", works);

      works.forEach((elt) => {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const sectionPortfolio = document.getElementById("portfolio");
        sectionPortfolio.appendChild(div);
        div.innerHTML = `
        <figure>
          <img crossorigin="" src=${elt.imageUrl} alt=${elt.title}>
          <figcaption>${elt.title}</figcaption>
      </figure>
  `;
        div.appendChild(img);
      });
console.log("works", works)

      const button = document.getElementsByClassName("button")
      console.log("button",button)
      button.forEach(function (button) {
        button.addEventListener("click", (e) => {
          console.log(e.target)
          gallery.innerHTML = "";
          works
            .filter((item) => item.categoryId === e.target.value)
            .forEach((item) => {
              const div = document.createElement("div");
              div.classList.add("gallery__item");
              div.innerHTML = `
                              <figure>
                                <img crossorigin="" src=${item.imageUrl} alt=${item.title}>
                                <figcaption>${item.title}</figcaption>
                            </figure>
                        `;
              gallery.appendChild(div);
            });
        });
      });
      console.log("filter", button);
    })
    .catch(function (err) {
      console.log("Une erreur se produit");
      console.log(err);
    });
}
getWorks();

//Category

async function getCategories() {
  fetch("http://localhost:5678/api/categories")
    .then(function (response) {
      return response.json();
    })
    .then(function (categories) {
      console.log("categories", categories);

      const categoriesElt = document.getElementsByClassName("filters")[0];
      const button = document.createElement("button");
      button.innerHTML = "Tous";
      document.getElementsByClassName("button");
      button.setAttribute("data-id", 0);
      const test = categories.map((category) => {
        return `<button class="button" value="${category.id}" data-id="${category.id}">${category.name}</button>`;
      });
      categoriesElt.innerHTML = test.join("");
      categoriesElt.appendChild(button);
    })
    .catch(function (err) {
      console.log("Une erreur se produit");
      console.log(err);
    });
}
getCategories();
