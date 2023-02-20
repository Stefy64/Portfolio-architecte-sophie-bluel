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

      fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => {
          const objets = document.getElementById("Objets");
          const appartements = document.getElementById("Appartements");
          const hotels = document.getElementById("Hotels");
          const tous = document.getElementById("Tous");
          const sectionPortfolio = document.getElementById("portfolio");

          objets.addEventListener("click", function () {
            console.log("click");
            const projetsFiltres = data
              .filter(function (data) {
                return data.categoryId == 1;
              })
              .map(
                (elt) => `<figure>
            <img crossorigin="" src=${elt.imageUrl} alt=${elt.title}>
            <figcaption>${elt.title}</figcaption>
        </figure>`
              );
          console.log(projetsFiltres, "projetsfiltres");
          sectionPortfolio.innerHTML = projetsFiltres;
          });
          appartements.addEventListener("click", function () {
            const projetsFiltres = data
              .filter(function (data) {
                return data.categoryId == 2;
              })
              .map(
                (elt) => `<figure>
            <img crossorigin="" src=${elt.imageUrl} alt=${elt.title}>
            <figcaption>${elt.title}</figcaption>
        </figure>`
              );
            sectionPortfolio.innerHTML = projetsFiltres;

            console.log(projetsFiltres);
          });
          hotels.addEventListener("click", function () {
            const projetsFiltres = data
              .filter(function (data) {
                return data.categoryId == 3;
              })
              .map(
                (elt) => `<figure>
            <img class=category crossorigin="" src=${elt.imageUrl} alt=${elt.title}>
            <figcaption>${elt.title}</figcaption>
        </figure>`
              );
            sectionPortfolio.innerHTML = projetsFiltres;

            console.log(projetsFiltres);
          });
          tous.addEventListener("click", function () {
            const projetsFiltres = data
              .filter(function (data) {
                return data.categoryId == 1, 2, 3;
              })
              .map(
                (elt) => `<figure>
            <img crossorigin="" src=${elt.imageUrl} alt=${elt.title}>
            <figcaption>${elt.title}</figcaption>
        </figure>`
              );

            console.log(projetsFiltres, "projetsfiltres");

            sectionPortfolio.innerHTML = projetsFiltres;
          });
        });
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
      button.className = "button";
      document.getElementsByClassName("button");

      const test = categories.map((category) => {
        return `<button class="button" id=${category.name} value="${category.id}">${category.name}</button>`;
      });
      categoriesElt.innerHTML = test.join("");
      categoriesElt.appendChild(button);
      button.setAttribute("value", 0);
    })
    .catch(function (err) {
      console.log("Une erreur se produit");
      console.log(err);
    });
}
getCategories();
