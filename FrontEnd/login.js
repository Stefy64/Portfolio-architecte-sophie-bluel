const button = document.querySelector("#button");
button.addEventListener("click", loginClick);
function loginClick(event) {
  event.preventDefault();
  

  const loginClick = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  const response = fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/JSON" },
    body: JSON.stringify(loginClick),
  });

  const result = response.json();
  const token = result.token;
  console.log(result)

  if (response.status == "200") {
    window.localStorage.setItem("token", token);
    window.location.href = "index.html";
  } else if (response.status == "404") {
    console.log("error 404");
    return alert("l'identifiant et/ou le mot de passe ne correspondent pas");
  }
}
