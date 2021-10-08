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
    let project = document.createElement("div");
    project.className = "project";
    project.style.cssText =
      "display: flex; color: rgb(47, 0, 255); background-color: black; width: 220px; height: 35px; margin: 0.5rem; border: 1px solid rgb(47, 0, 255);";
    let projectEnter = document.createElement("button");
    projectEnter.className = "project-enter-button";
    projectEnter.style.cssText =
      "width: 100px; background-color: black; color: rgb(47, 0, 255);";
    projectEnter.textContent = item.title;
    let projectEdit = document.createElement("button");
    projectEdit.className = "project-edit-button";
    projectEdit.style.cssText =
      "flex-grow: 1; background-color: black; color: rgb(47, 0, 255);";
    projectEdit.textContent = "Edit";
    let projectDelete = document.createElement("button");
    projectDelete.className = "project-edit-button";
    projectDelete.style.cssText =
      "flex-grow: 1; background-color: black; color: rgb(47, 0, 255);";
    projectDelete.textContent = "Delete";

    projectEnter.addEventListener("click", (e) => {
      if (optionPressed) {
        document.querySelector(".project-interface").remove();
        optionPressed = false;
      }
      displayProjectInterface(item.title);
      displayToDoInProject(item);
      optionPressed = true;
    });
    project.appendChild(projectEnter);
    project.appendChild(projectEdit);
    project.appendChild(projectDelete);
    document.querySelector(".menu").appendChild(project);
  });
}

function displayProjectInterface(title) {
  let projectInterface = document.createElement("div");
  projectInterface.className = "project-interface";
  projectInterface.style.cssText =
    "width: 100%; height: 100%; color:rgb(47, 0, 255); background-color: lightgreen; display: flex; flex-direction: column; align-items: center;";

  let projectInterfaceHeader = document.createElement("div");
  projectInterfaceHeader.className = "project-interface-header";
  projectInterfaceHeader.style.cssText =
    "width: 100%; height: 35px; background-color: black; color: rgb(47, 0, 255); display: flex;";

  let projectInterfaceHeaderTitleCont = document.createElement("div");
  projectInterfaceHeaderTitleCont.className =
    "project-interface-header-title-cont;";
  projectInterfaceHeaderTitleCont.style.cssText =
    "background-color: black; color: rgb(47, 0, 255); width: 80%; display: flex; justify-content: center; align-items: center;";

  let projectInterfaceHeaderTitle = document.createElement("div");
  projectInterfaceHeaderTitle.className = "project-interface-header-title";
  projectInterfaceHeaderTitle.style.cssText = "font-size: 1rem;";
  projectInterfaceHeaderTitle.textContent = title;
  projectInterfaceHeaderTitleCont.appendChild(projectInterfaceHeaderTitle);

  let projectInterfaceAddToDoButton = document.createElement("button");
  projectInterfaceAddToDoButton.className =
    "project-interface-add-to-do-button";
  projectInterfaceAddToDoButton.textContent = "+ Add to-do";
  projectInterfaceAddToDoButton.style.cssText =
    "background-color: black; color: rgb(47, 0, 255); width: 20%;";
  projectInterfaceAddToDoButton.addEventListener("click", (e) => {
    addToDoFormContainer.style.cssText = "display: flex;";
  });

  projectInterfaceHeader.appendChild(projectInterfaceHeaderTitleCont);
  projectInterfaceHeader.appendChild(projectInterfaceAddToDoButton);

  projectInterface.appendChild(projectInterfaceHeader);
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
  displayMenuProjects();
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
  document.querySelectorAll(".to-do-item").forEach((item) => {
    item.remove();
  });
  displayToDoInProject(
    projectsArray[
      projectsArray.findIndex(
        (x) => x.title == projectInterfaceHeader.textContent
      )
    ]
  );
}

function displayToDoInProject(item1) {
  item1.todoList.forEach((toDo) => {
    let toDoItem = document.createElement("button");
    toDoItem.className = "to-do-item";
    toDoItem.style.cssText = "background-color: black; color: rgb(47, 0, 255);";
    toDoItem.textContent = toDo.title;
    document.querySelector(".project-interface").appendChild(toDoItem);
  });
}
