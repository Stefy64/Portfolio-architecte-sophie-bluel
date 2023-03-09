let gallery = document.getElementsByClassName("portfolio")[0];
function resetDOM(element) {
  element.replaceChildren();
}

async function getWorks() {
  await fetch("http://localhost:5678/api/works")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      works = value;
      return works;
    })
    .catch(function (err) {
      console.log("Une erreur sur la récupération des travaux est survenue");
      console.log(err);
    });
}

function addAllWorks(works, element) {
  works.forEach((work) => {
    addWork(work, element, work.title);
  });
}

function addWork(works, element, title) {
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  let figcaption = document.createElement("figcaption");

  element
    .appendChild(figure)
    .appendChild(img)
    .setAttribute("src", works.imageUrl);

  img.setAttribute("alt", works.title);
  img.setAttribute("crossorigin", "anonymous");
  figure.appendChild(figcaption).innerHTML = title;
  return figure;
}

async function getCategories() {
  const categories = [];
  await fetch("http://localhost:5678/api/categories")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      value.forEach((category) => {
        categories.push(category);
      });
    })
    .catch(function (err) {
      console.log(err);
    });
  return categories;
}

function addCategories(categories) {
  let button = document.createElement("button");
  let categoryElt = document.getElementsByClassName("filters")[0];
  document
    .getElementsByClassName("filters")[0]
    .appendChild(button)
    .setAttribute("data-id", 0);
  button.innerHTML = "Tous";

  for (let i = 0; i < categories.length; i++) {
    let button = document.createElement("button");
    categoryElt.appendChild(button).setAttribute("data-id", categories[i].id);
    button.innerHTML = categories[i].name;
  }
}

function addEventToCategories(works, element) {
  document.querySelectorAll(".filters button").forEach((filter) => {
    filter.addEventListener("click", function (value) {
      let categoryId = value.target.dataset.id;
      categoryId = parseInt(categoryId);

      filtersCategories(works, categoryId, element);
    });
  });
}

function filtersCategories(works, categoryId, element) {
  resetDOM(gallery);

  if (categoryId == 0) {
    addAllWorks(works, element);
  } else {
    works.forEach((work) => {
      if (work["categoryId"] == categoryId) {
        addWork(work, element, work.title);
      }
    });
  }
}

const promiseWorks = getWorks()
  .then(function () {
    addAllWorks(works, gallery);
    return works;
  })
  .then(function (works) {
    getCategories().then(function (categories) {
      addCategories(categories);
      addEventToCategories(works, gallery);
    });
    return works;
  })
  .catch(function (err) {
    console.log(err);
  });
