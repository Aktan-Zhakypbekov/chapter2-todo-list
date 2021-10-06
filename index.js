let projectsArray = [];

//display option interfaces

let optionPressed = false;
let defaultOptionsList = document.querySelectorAll(".option");
defaultOptionsList.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (optionPressed) {
      document.querySelector(".option-interface").remove();
      optionPressed = false;
    }
    displayInterface(option.id);
  });
});

function displayInterface(optionId) {
  let optionInterface = document.createElement("div");
  optionInterface.className = "option-interface";
  optionInterface.style.cssText =
    "background-color: lightgreen; height: 100%; width: 100%;";

  let interfaceHeader = document.createElement("div");
  interfaceHeader.className = "interface-header";
  interfaceHeader.textContent = optionId;
  interfaceHeader.style.cssText = "height: 30px; background-color: orange;";
  optionInterface.appendChild(interfaceHeader);

  document.querySelector("#display").appendChild(optionInterface);
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
  let projectTitle = document.querySelector("#project-title").value;
  let project = new CreateProjects(projectTitle);
  projectsArray.push(project);
  addProjectFormCont.style.cssText = "display: none;";
});
console.log(projectsArray);
