displayMenuProjects();

let projectsArray = JSON.parse(localStorage.getItem("projects"));

let addProjectFormContainer = document.querySelector(".add-project-form-cont");
let menuAddProjectButton = document.querySelector(".menu__add-project-button");
menuAddProjectButton.addEventListener("click", (e) => {
  addProjectFormContainer.style.cssText = "display: flex;";
});

let addProjectFormExitButton = document.querySelector(
  ".add-project-form-cont__exit-cont__exit-button"
);
addProjectFormExitButton.addEventListener("click", (e) => {
  addProjectFormContainer.style.cssText = "display: none;";
});

let addProjectFormSubmitButton = document.querySelector(
  ".add-project-form-cont__form__submit-button"
);
addProjectFormSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  addToProjectsArray();
  displayMenuProjects();
});

class CreateProject {
  constructor(title) {
    this.title = title;
    this.todoList = [];
  }
}

function addToProjectsArray() {
  let projectTitle = document.querySelector(
    ".add-project-form-cont__form__project-title"
  ).value;
  let project = new CreateProject(projectTitle);
  projectsArray.push(project);
  localStorage.setItem("projects", JSON.stringify(projectsArray));
}

let optionPressed = false;

function displayMenuProjects() {
  let menuProjects = document.querySelectorAll(".project");
  menuProjects.forEach((item) => {
    item.remove();
  });

  let projectsList = JSON.parse(localStorage.getItem("projects"));
  projectsList.forEach((item) => {
    let project = document.createElement("button");
    project.className = "project";
    project.style.cssText = "background-color: red;";
    project.textContent = item.title;

    project.addEventListener("click", (e) => {
      if (optionPressed) {
        document.querySelector(".project-interface").remove();
        optionPressed = false;
      }
      displayProjectInterface(item.title);
      optionPressed = true;
    });

    document.querySelector(".menu").appendChild(project);
  });
}

function displayProjectInterface(title) {
  let projectInterface = document.createElement("div");
  projectInterface.className = "project-interface";
  projectInterface.style.cssText =
    "width: 100%; height: 100%; background-color: blue; display: flex; flex-direction: column; align-items: center;";
  let projectInterfaceHeader = document.createElement("div");
  projectInterfaceHeader.textContent = title;
  projectInterfaceHeader.className = "project-interface-header";
  projectInterfaceHeader.style.cssText = "background-color: green;";

  let projectInterfaceAddToDoButton = document.createElement("button");
  projectInterfaceAddToDoButton.className =
    "project-interface-add-to-do-button";
  projectInterfaceAddToDoButton.textContent = "Add to-do";
  projectInterfaceAddToDoButton.style.cssText = "violet";
  projectInterfaceAddToDoButton.addEventListener("click", (e) => {
    addToDoFormContainer.style.cssText = "display: flex;";
  });

  projectInterface.appendChild(projectInterfaceHeader);
  projectInterface.appendChild(projectInterfaceAddToDoButton);
  let display = document.querySelector(".display");
  display.appendChild(projectInterface);
}

let addToDoFormContainer = document.querySelector(".add-to-do-form-cont");
let addToDoFormExitButton = document.querySelector(
  ".add-to-do-form-cont__exit-cont__exit-button"
);
addToDoFormExitButton.addEventListener("click", (e) => {
  addToDoFormContainer.style.cssText = "display: none;";
});

let addToDoFormSubmitButton = document.querySelector(
  ".add-to-do-form-cont__form__submit-button"
);
addToDoFormSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  addToDoToProjectsArrayMenuProjects();
});

class CreateToDo {
  constructor(title) {
    this.title = title;
  }
}

function addToDoToProjectsArrayMenuProjects() {
  let toDoTitle = document.querySelector(
    ".add-to-do-form-cont__form__to-do-title"
  ).value;
  let toDo = new CreateToDo(toDoTitle);
  let projectInterfaceHeader = document.querySelector(
    ".project-interface-header"
  );
  projectsArray[
    projectsArray.findIndex(
      (x) => x.title == projectInterfaceHeader.textContent
    )
  ].todoList.push(toDo);
  localStorage.setItem("projects", JSON.stringify(projectsArray));
}
