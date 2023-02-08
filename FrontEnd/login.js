const login = document.querySelector("#submit");


login.addEventListener("submit", async function (e) {
  e.preventDefault();

  const userInput = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  let response = fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInput),
  });
  let result = response.json();
  let token = result.token;
  if (response.status == "200") {
    window.localStorage.setItem("token", token);
    window.location.href = "index.html";
  } else if (response.status == "404") {
    console.log("error 404");
    return alert("l'identifiant et/ou le mot de passe ne correspondent pas");
  }
});
