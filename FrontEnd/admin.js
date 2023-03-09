
const token = sessionStorage.getItem("token");
console.log(token);


function changeInnerHtml(element, newInnerHtml) {
    element.innerHTML = newInnerHtml;
}

function logOut(element) {
    element.setAttribute('href', 'index.html');
    element.addEventListener('click', function() {
        sessionStorage.clear();
    })   
}
function addHeaderBlack(element) {
    let button = document.createElement('button');
    let icon = document.createElement('i');
    let span = document.createElement('span');

    element.classList.add('header-black');

    element.appendChild(span)
    addIconWord(span, icon, 'Mode édition');

    element.appendChild(button).innerHTML = "publier les changements";
}
function addEditButtons() {
    let elements = document.querySelectorAll('.js-edit');

    elements.forEach(a => {
        let icon = document.createElement('i');
        addIconWord(a, icon, 'modifier');
    });
}

function addIconWord(element, icon, string) {
    element.appendChild(icon)
    .classList.add('fa-solid', 'fa-pen-to-square');
    icon.style.margin = "8px 8px 8px 0";
    icon.insertAdjacentHTML('afterend', string);
}

if (token != null) {
    let login = document.querySelector("nav ul li a[href='login.html']");
    let headerBlackElt = document.getElementById('header-black');

    changeInnerHtml(login, "logout");
    logOut(login);
    addHeaderBlack(headerBlackElt);
    addEditButtons();
};
