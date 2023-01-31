//Gallery

async function getWorks(){
    fetch('http://localhost:5678/api/works').then(function(response) {
      return response.json();
  }).then(function(works) {
    console.log("photos", works);

    works.forEach(elt => {

      const div = document.createElement("div");
      const img = document.createElement("img");
      
      img.src = elt.imageUrl;
      
      img.crossOrigin = "anonymous";
      div.innerHTML = elt.title;
      div.appendChild(img);
      
      const sectionPortfolio = document.getElementById("portfolio");
      sectionPortfolio.appendChild(div);
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
  const test = categories.map((category) => {
  return `<button data-id="${category.id}">${category.name}</button>`
});
  categoriesElt.innerHTML = test.join('');

    const button = document.createElement("button")
    categoriesElt.appendChild(button).setAttribute ("data-id", 0);
    document.getElementsByClassName("filters");
    button.innerHTML = "Tous";

    

}).catch(function(err) {  
  console.log("Une erreur se produit");
  console.log(err);
});

}
getCategories();

//Category filter

