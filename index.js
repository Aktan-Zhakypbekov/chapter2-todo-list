let projectsArray = [];

//display option interfaces

let optionPressed = false;
let defaultProjectsList = document.querySelectorAll(".project");
defaultProjectsList.forEach((project) => {
  project.addEventListener("click", (e) => {
    if (optionPressed) {
      document.querySelector(".project-interface").remove();
      optionPressed = false;
    }
    displayProjectInterface(project.id);
  });
});

function displayProjectInterface(projectId) {
  let projectInterface = document.createElement("div");
  projectInterface.className = "project-interface";
  projectInterface.style.cssText =
    "background-color: lightgreen; height: 100%; width: 100%;";

  let projectInterfaceHeader = document.createElement("div");
  projectInterfaceHeader.className = "project-interface-header";
  projectInterfaceHeader.textContent = projectId;
  projectInterfaceHeader.style.cssText =
    "height: 30px; background-color: orange;";
  projectInterface.appendChild(projectInterfaceHeader);

  document.querySelector("#display").appendChild(projectInterface);
  optionPressed = true;
}

//add new projects

let addProjectFormCont = document.querySelector("#add-project-form-cont");

let addProjectButton = document.querySelector("#add-project-button");
addProjectButton.addEventListener("click", (e) => {
  addProjectFormCont.style.cssText = "display: flex";
});

let formExitButton = document.querySelector("#form-exit-button");
formExitButton.addEventListener("click", (e) => {
  addProjectFormCont.style.cssText = "display: none;";
});

// projects array

class CreateProjects {
  constructor(title) {
    this.title = title;
  }
}

let submitProjectButton = document.querySelector("#submit-project-button");
submitProjectButton.addEventListener("click", (e) => {
  e.preventDefault();
  addToProjectsArray();
});

function addToProjectsArray() {
  let projectTitle = document.querySelector("#project-title").value;
  let project = new CreateProjects(projectTitle);
  projectsArray.push(project);
  addProjectFormCont.style.cssText = "display: none;";
  addToUserProjectsMenu(projectTitle);
}
function addToUserProjectsMenu(projectTitle) {
  let projectItem = document.createElement("button");
  projectItem.className = "project-item";
  projectItem.style.cssText =
    "width: 50px; height: 20px; background-color: red;";
  projectItem.textContent = projectTitle;
  let userProjectsMenu = document.querySelector(".menu__user-projects");
  userProjectsMenu.appendChild(projectItem);
}
