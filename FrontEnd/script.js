async function getAndDisplayWorks(){
    fetch('http://localhost:5678/api/works').then(function(response) {
      return response.json();
  }).then(function(works) {
    console.log(works);
    works.forEach(elt => {

        console.log(elt.imageUrl);
      let div = document.createElement("div");
      div.innerHTML = elt.title;

      let img = document.createElement("img");
      img.src = elt.imageUrl;
      img.crossOrigin = "anonymous";
      div.appendChild(img);

      const sectionPortfolio = document.getElementById("portfolio");
      sectionPortfolio.appendChild(div);

    });
  }).catch(function(err) {  
     
  });
}
getAndDisplayWorks();
