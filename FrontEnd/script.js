//Gallery

async function getWorks(){
    fetch('http://localhost:5678/api/works').then(function(response) {
      return response.json();
  }).then(function(works) {
    console.log("photos", works);

    works.forEach(elt => {

      
      let img = document.createElement("img");
      let div = document.createElement("div");
      
      img.src = elt.imageUrl;
      div.innerHTML = elt.title;
      
      img.crossOrigin = "anonymous";
      div.appendChild(img);

      const sectionPortfolio = document.getElementById("portfolio");
      sectionPortfolio.appendChild(div);

    });
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

    const button = document.createElement("button");
    const categoriesElt = document.getElementsByClassName("filters")[0];
    button.innerHTML = "Tous";

    const test = categories.map((category) => {
    return `<button data-id="${category.id}">${category.name}</button>`
    });
    categoriesElt.innerHTML = test.join('');
 




}).catch(function(err) {  
  console.log("Une erreur se produit");
  console.log(err);
});
}
getCategories();
