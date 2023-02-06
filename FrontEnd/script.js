//Gallery

async function getWorks(){
    fetch('http://localhost:5678/api/works').then(function(response) {
      return response.json();
  }).then(function(works) {
    console.log("photos", works);

    works.forEach(elt => {

      const div = document.createElement("div");
      const img = document.createElement("img");
      const sectionPortfolio = document.getElementById("portfolio");
      sectionPortfolio.appendChild(div);
      img.crossOrigin = "anonymous";
      div.innerHTML = elt.title;
      div.appendChild(img);
      img.src = elt.imageUrl;
});

const objects = works.filter(function (objects){
  return objects.categoryId >= 3;
});
console.log ("HR", objects);


const objects2 = works.filter(function (objects2){
  return objects2.categoryId <= 1;
});
console.log ("objects", objects2);

const objects3 = works.filter(function (objects3){
  return objects3.categoryId > 1 ;
});
console.log ("apparts", objects3);


const filter = document.querySelectorAll(".filter");
    filter.forEach(function (gallery) {
    button.addEventListener("click", (e) => {
      gallery.innerHTML = "";
      dataGallery
        .filter((categoryId) => categoryId.category.number === e.target.number)
        .forEach((categoryId) => {
          const div = document.createElement("div");
          div.classList.add("gallery__gategoryId");
          div.innerHTML = `
                              <figure>
                                <img crossorigin="" src=${categoryId.imageUrl} alt=${categoryId.title}>
                                <figcaption>${categoryId.title}</figcaption>
                            </figure>
                        `;
          gallery.appendChild(div);
        });
    });
  });
  console.log ("filter", filter)

  


  }).catch(function(err) {  
    console.log("Une erreur se produit");
    console.log(err);
  });
}
getWorks();

//Category

async function getCategories(){
  fetch('http://localhost:5678/api/categories').then(function(response) {
    return response.json();
}).then(function(categories) {
  console.log("categories", categories);

  
    
  const categoriesElt = document.getElementsByClassName("filters")[0];
  const button = document.createElement("button");
  document.getElementsByClassName("filters");
  button.innerHTML = "Tous";
  const test = categories.map((category) => {
  return `<button data-id="${category.id}">${category.name}</button>`
});
  categoriesElt.innerHTML = test.join('');
  categoriesElt.appendChild(button).setAttribute ("data-id", 0);
    
    
    

  

}).catch(function(err) {  
  console.log("Une erreur se produit");
  console.log(err);
});

}
getCategories();

//Category filter

