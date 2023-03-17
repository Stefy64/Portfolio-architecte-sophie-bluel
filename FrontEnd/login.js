//Allows you to switch to admin mode
let buttonlogin = document.querySelector("#buttonlogin");
console.log("button", buttonlogin);
buttonlogin.addEventListener("click", async function (event) {
  event.preventDefault();

  let buttonlogin = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  // make a POST request
  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "content-type": "application/JSON" },
    body: JSON.stringify(buttonlogin),
  });

  //Result if ok or not
  let result = await response.json();
  let token = result.token;
  console.log(result);

  if (response.status == "200") {
    window.sessionStorage.setItem("token", token);
    window.location.href = "index.html";
  } else if (response.status == "401") {
    console.log("error 401");
    return alert("l'identifiant et/ou le mot de passe ne correspondent pas");
    
  } else if (response.status == "404") {
    console.log("error 404");
    return alert("l'identifiant et/ou le mot de passe ne correspondent pas");
  }
});



   