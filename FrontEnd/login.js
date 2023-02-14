const button = document.querySelector("#button");
console.log("button", button);
button.addEventListener("click", async function (event) {
  event.preventDefault();
  
  

  const loginClick = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "content-type": "application/JSON" },
    body: JSON.stringify(loginClick),
  });

  let result = await response.json();
  let token = result.token;
  console.log(result);

  if (response.status == "200") {
    window.localStorage.setItem("token", token);
    window.location.href = "index.html";
  } else if (response.status == "404") {
    console.log("error 404");
    return alert("l'identifiant et/ou le mot de passe ne correspondent pas");
  }
});
