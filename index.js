// Get projectsArray from localStorage if it doesnt exist create a new one
let projectsArray = [];

if (
  JSON.parse(localStorage.getItem("projects")) != null ||
  JSON.parse(localStorage.getItem("projects")) != undefined
) {
  projectsArray = JSON.parse(localStorage.getItem("projects"));
} else {
  localStorage.setItem("projects", JSON.stringify(projectsArray));
  projectsArray = JSON.parse(localStorage.getItem("projects"));
}

//Display menu projects and give them and their to-dos functionality
displayMenuProjects();
giveFunctionalityToMenuProjects();
giveFunctionalityToToDoItems();

//Select add project forms and edit project forms for projects, create functionality for them and give them functionality
let test;
let test1;
let editProjectFormContainer = document.querySelector(
  ".edit-project-form-cont-background"
);
let editProjectFormExitButton = document.querySelector(
  ".edit-project-form-cont__exit-cont__exit-button"
);
editProjectFormExitButton.addEventListener("click", (e) => {
  editProjectFormContainer.style.cssText = "display: none;";
});
let editProjectFormSubmitButton = document.querySelector(
  ".edit-project-form-cont__form__submit-button"
);

let addProjectFormContainer = document.querySelector(
  ".add-project-form-cont-background"
);
let menuAddProjectButton = document.querySelector(".menu__add-project-button");
menuAddProjectButton.addEventListener("click", (e) => {
  addProjectFormContainer.style.cssText = "display: flex;";
});
let addProjectFormExitButton = document.querySelector(
  ".add-project-form-cont__exit-cont__exit-button"
);
addProjectFormExitButton.addEventListener("click", (e) => {
  addProjectFormContainer.style.cssText = "display: none;";
  document.querySelector(".add-project-form-cont__form__project-title").value =
    "";
});
let addProjectFormSubmitButton = document.querySelector(
  ".add-project-form-cont__form__submit-button"
);
addProjectFormSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  addProjectToProjectsArray();
  displayMenuProjects();
  giveFunctionalityToMenuProjects();
  document.querySelector(".add-project-form-cont__form__project-title").value =
    "";
  addProjectFormContainer.style.cssText = "diplay: none;";
});

function CreateProject(title) {
  return {
    title,
    todoList: [],
  };
}

function addProjectToProjectsArray() {
  let project1 = CreateProject(
    document.querySelector(".add-project-form-cont__form__project-title").value
  );
  projectsArray.push(project1);
  localStorage.setItem("projects", JSON.stringify(projectsArray));
}

let optionPressed = false;

function displayMenuProjects() {
  if (document.querySelectorAll(".project")) {
    let menuProjects = document.querySelectorAll(".project");
    menuProjects.forEach((item) => {
      item.remove();
    });
  }

  projectsArray.forEach((item) => {
    let project = document.createElement("div");
    project.className = "project";
    project.style.cssText =
      "display: flex; color: rgb(47, 0, 255); background-color: black; width: 270px; height: 35px; margin: 0.5rem;";

    let projectEnter = document.createElement("button");
    projectEnter.className = "project-enter-button";
    projectEnter.style.cssText =
      "width: 54%; background-color: black; color: rgb(47, 0, 255);";
    projectEnter.textContent = item.title;

    let projectEdit = document.createElement("button");
    projectEdit.className = "project-edit-button";
    projectEdit.style.cssText =
      "width: 23%; background-color: black; color: rgb(47, 0, 255); text-align: center;";
    projectEdit.textContent = "Edit";

    let projectDelete = document.createElement("button");
    projectDelete.className = "project-delete-button";
    projectDelete.style.cssText =
      "width: 23%; background-color: black; color: rgb(47, 0, 255);";
    projectDelete.textContent = "Delete";

    project.appendChild(projectEnter);
    project.appendChild(projectEdit);
    project.appendChild(projectDelete);
    document.querySelector(".menu").appendChild(project);
  });
}
function giveFunctionalityToMenuProjects() {
  let projectEnterButtons = document.querySelectorAll(".project-enter-button");
  projectEnterButtons.forEach((projectEnterButton) => {
    projectEnterButton.addEventListener("click", (e) => {
      if (optionPressed && document.querySelector(".project-interface")) {
        document.querySelector(".project-interface").remove();
        optionPressed = false;
      }
      displayProjectInterface(e.target.textContent);
      displayToDosInProjectInterface(
        projectsArray[
          projectsArray.findIndex((x) => x.title == e.target.textContent)
        ]
      );
      giveFunctionalityToToDoItems();
      optionPressed = true;
    });
  });

  let projectEditButtons = document.querySelectorAll(".project-edit-button");
  projectEditButtons.forEach((projectEditButton) => {
    projectEditButton.addEventListener("click", (e) => {
      editProjectFormContainer.style.cssText = "display: flex;";
      document.querySelector(
        ".edit-project-form-cont__form__project-title"
      ).value = e.target.parentElement.firstChild.textContent;
      test = e.target.parentElement.firstChild.textContent;
      test1 = e.target.parentElement.firstChild;
    });
  });

  let projectDeleteButtons = document.querySelectorAll(
    ".project-delete-button"
  );
  projectDeleteButtons.forEach((projectDeleteButton) => {
    projectDeleteButton.addEventListener("click", (e) => {
      projectsArray.splice(
        projectsArray.findIndex(
          (x) => x.title == e.target.parentElement.firstChild.textContent
        ),
        1
      );
      localStorage.setItem("projects", JSON.stringify(projectsArray));
      e.target.parentElement.remove();
      if (document.querySelector(".project-interface")) {
        document.querySelector(".project-interface").remove();
      }
    });
  });
}
function displayProjectInterface(title) {
  let projectInterface = document.createElement("div");
  projectInterface.className = "project-interface";
  projectInterface.style.cssText =
    "width: 100%; height: 100%; color:rgb(47, 0, 255); background-color: black; display: flex; flex-direction: column; align-items: center;";

  let projectInterfaceHeader = document.createElement("div");
  projectInterfaceHeader.className = "project-interface-header";
  projectInterfaceHeader.style.cssText =
    "width: 100%; height: 44px; background-color: black; color: rgb(47, 0, 255); display: flex; border-bottom: 1px solid rgb(47, 0, 255);";

  let projectInterfaceHeaderTitleCont = document.createElement("div");
  projectInterfaceHeaderTitleCont.className =
    "project-interface-header-title-cont;";
  projectInterfaceHeaderTitleCont.style.cssText =
    "background-color: black; color: rgb(47, 0, 255); width: 82%; display: flex; justify-content: center; align-items: center;";

  let projectInterfaceHeaderTitle = document.createElement("div");
  projectInterfaceHeaderTitle.className = "project-interface-header-title";
  projectInterfaceHeaderTitle.style.cssText = "font-size: 1.5rem;";
  projectInterfaceHeaderTitle.textContent = title;
  projectInterfaceHeaderTitleCont.appendChild(projectInterfaceHeaderTitle);

  let projectInterfaceAddToDoButton = document.createElement("button");
  projectInterfaceAddToDoButton.className =
    "project-interface-add-to-do-button";
  projectInterfaceAddToDoButton.textContent = "+ Add to-do";
  projectInterfaceAddToDoButton.style.cssText =
    "background-color: black; color: rgb(47, 0, 255); width: 18%;";
  projectInterfaceAddToDoButton.addEventListener("click", (e) => {
    addToDoFormContainer.style.cssText = "display: flex;";
  });

  projectInterfaceHeader.appendChild(projectInterfaceHeaderTitleCont);
  projectInterfaceHeader.appendChild(projectInterfaceAddToDoButton);

  projectInterface.appendChild(projectInterfaceHeader);
  document.querySelector(".display").appendChild(projectInterface);
}

editProjectFormSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  giveFunctionalityToEditProjectFormSubmitButton();
  editProjectFormContainer.style.cssText = "display: none;";
});

function giveFunctionalityToEditProjectFormSubmitButton() {
  projectsArray[projectsArray.findIndex((x) => x.title == test)].title =
    document.querySelector(
      ".edit-project-form-cont__form__project-title"
    ).value;
  localStorage.setItem("projects", JSON.stringify(projectsArray));
  test1.textContent =
    projectsArray[
      projectsArray.findIndex(
        (x) =>
          x.title ==
          document.querySelector(".edit-project-form-cont__form__project-title")
            .value
      )
    ].title;
}
///////////////-----------------------------------------------//////////////////////////////////////-------------------------
///////////////-----------------------------------------------//////////////////////////////////////-------------------------

// Select add to-do forms and edit to-do forms create functionality for them and give them functionality

let test2;
let test21;
let test3;
let test31;
let editToDoFormContainer = document.querySelector(
  ".edit-to-do-form-cont-background"
);
let editToDoFormExitButton = document.querySelector(
  ".edit-to-do-form-cont__exit-cont__exit-button"
);
editToDoFormExitButton.addEventListener("click", (e) => {
  editToDoFormContainer.style.cssText = "display: none;";
});
let editToDoFormSubmitButton = document.querySelector(
  ".edit-to-do-form-cont__form__submit-button"
);

let addToDoFormContainer = document.querySelector(
  ".add-to-do-form-cont-background"
);
let addToDoFormExitButton = document.querySelector(
  ".add-to-do-form-cont__exit-cont__exit-button"
);
addToDoFormExitButton.addEventListener("click", (e) => {
  addToDoFormContainer.style.cssText = "display: none;";
  document.querySelector(".add-to-do-form-cont__form__to-do-title").value = "";
  document.querySelector(".add-to-do-form-cont__form__to-do-date").value = "";
});
let addToDoFormSubmitButton = document.querySelector(
  ".add-to-do-form-cont__form__submit-button"
);
addToDoFormSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  addToDoToProjectsInProjectsArray();
  displayToDosInProjectInterface();
  giveFunctionalityToToDoItems();
  document.querySelector(".add-to-do-form-cont__form__to-do-title").value = "";
  document.querySelector(".add-to-do-form-cont__form__to-do-date").value = "";
  addToDoFormContainer.style.cssText = "diplay: none;";
});

function CreateToDo(title, date) {
  return {
    title,
    date,
  };
}

function addToDoToProjectsInProjectsArray() {
  let toDoTitle = document.querySelector(
    ".add-to-do-form-cont__form__to-do-title"
  ).value;
  let toDoDate = document.querySelector(
    ".add-to-do-form-cont__form__to-do-date"
  ).value;
  let toDo = CreateToDo(toDoTitle, toDoDate);
  let projectInterfaceHeaderTitle = document.querySelector(
    ".project-interface-header-title"
  ).textContent;
  projectsArray[
    projectsArray.findIndex((x) => x.title == projectInterfaceHeaderTitle)
  ].todoList.push(toDo);
  localStorage.setItem("projects", JSON.stringify(projectsArray));
}

function displayToDosInProjectInterface() {
  if (document.querySelectorAll(".to-do-item")) {
    let toDoItems = document.querySelectorAll(".to-do-item");
    toDoItems.forEach((item) => {
      item.remove();
    });
  }

  projectsArray[
    projectsArray.findIndex(
      (x) =>
        x.title ==
        document.querySelector(".project-interface-header-title").textContent
    )
  ].todoList.forEach((toDo) => {
    let toDoItem = document.createElement("div");
    toDoItem.className = "to-do-item";
    toDoItem.style.cssText =
      "background-color: black; color: rgb(47, 0, 255); width: 100%; min-height: 34px; border-bottom: 1px solid rgb(47, 0, 255); display: flex; align-items: center;";

    let toDoItemTitle = document.createElement("div");
    toDoItemTitle.className = "to-do-item-title";
    toDoItemTitle.style.cssText =
      "width: 65%; display: flex; justify-content: center; align-items: center; font-size: 1rem;";
    let toDoItemTitleText = document.createElement("div");
    toDoItemTitleText.style.cssText = "text-align: center;";
    toDoItemTitleText.textContent = toDo.title;
    toDoItemTitle.appendChild(toDoItemTitleText);

    let toDoItemDate = document.createElement("div");
    toDoItemDate.className = "to-do-item-date;";
    toDoItemDate.style.cssText =
      "width: 17%; display: flex; justify-content: center; align-items: center; font-size: 1rem;";
    let toDoItemDateText = document.createElement("div");
    toDoItemDateText.textContent = toDo.date;
    toDoItemDateText.style.cssText = "color: rgb(47, 0, 255);";
    toDoItemDate.appendChild(toDoItemDateText);

    let toDoItemEdit = document.createElement("button");
    toDoItemEdit.className = "to-do-item-edit";
    toDoItemEdit.style.cssText =
      "width: 9%; height: 34px; color: rgb(47, 0, 255); background-color: black;";
    toDoItemEdit.textContent = "Edit";

    let toDoItemDelete = document.createElement("button");
    toDoItemDelete.className = "to-do-item-delete";
    toDoItemDelete.style.cssText =
      "width: 9%; height: 34px; color: rgb(47, 0, 255); background-color: black;";
    toDoItemDelete.textContent = "Delete";

    toDoItem.appendChild(toDoItemTitle);
    toDoItem.appendChild(toDoItemDate);
    toDoItem.appendChild(toDoItemEdit);
    toDoItem.appendChild(toDoItemDelete);

    document.querySelector(".project-interface").appendChild(toDoItem);
  });
}

function giveFunctionalityToToDoItems() {
  let toDoItemEditButtons = document.querySelectorAll(".to-do-item-edit");
  toDoItemEditButtons.forEach((toDoItemEditButton) => {
    toDoItemEditButton.addEventListener("click", (e) => {
      editToDoFormContainer.style.cssText = "display: flex;";
      document.querySelector(".edit-to-do-form-cont__form__to-do-title").value =
        e.target.parentElement.firstChild.firstChild.textContent;
      document.querySelector(".edit-to-do-form-cont__form__to-do-date").value =
        e.target.parentElement.childNodes[1].firstChild.textContent;
      test2 = e.target.parentElement.firstChild.firstChild.textContent;
      test21 = e.target.parentElement.firstChild.firstChild;
      test3 = e.target.parentElement.childNodes[1].firstChild.textContent;
      test31 = e.target.parentElement.childNodes[1].firstChild;
    });
  });

  let toDoItemDeleteButtons = document.querySelectorAll(".to-do-item-delete");
  toDoItemDeleteButtons.forEach((toDoItemDeleteButton) => {
    toDoItemDeleteButton.addEventListener("click", (e) => {
      projectsArray[
        projectsArray.findIndex(
          (x) =>
            x.title ==
            document.querySelector(".project-interface-header-title")
              .textContent
        )
      ].todoList.splice(
        projectsArray[
          projectsArray.findIndex(
            (x) =>
              x.title ==
              document.querySelector(".project-interface-header-title")
                .textContent
          )
        ].todoList.findIndex(
          (x) =>
            x.title == e.target.parentElement.firstChild.firstChild.textContent
        ),
        1
      );
      localStorage.setItem("projects", JSON.stringify(projectsArray));
      e.target.parentElement.remove();
    });
  });
}

editToDoFormSubmitButton.addEventListener("click", (e) => {
  e.preventDefault();
  giveFunctionalityToEditToDoFormSubmitButton();
  editToDoFormContainer.style.cssText = "display: none;";
});

function giveFunctionalityToEditToDoFormSubmitButton() {
  projectsArray[
    projectsArray.findIndex(
      (x) =>
        x.title ==
        document.querySelector(".project-interface-header-title").textContent
    )
  ].todoList[
    projectsArray[
      projectsArray.findIndex(
        (x) =>
          x.title ==
          document.querySelector(".project-interface-header-title").textContent
      )
    ].todoList.findIndex((x) => x.title == test2)
  ].title = document.querySelector(
    ".edit-to-do-form-cont__form__to-do-title"
  ).value;

  projectsArray[
    projectsArray.findIndex(
      (x) =>
        x.title ==
        document.querySelector(".project-interface-header-title").textContent
    )
  ].todoList[
    projectsArray[
      projectsArray.findIndex(
        (x) =>
          x.title ==
          document.querySelector(".project-interface-header-title").textContent
      )
    ].todoList.findIndex((x) => x.date == test3)
  ].date = document.querySelector(
    ".edit-to-do-form-cont__form__to-do-date"
  ).value;

  localStorage.setItem("projects", JSON.stringify(projectsArray));

  test21.textContent = document.querySelector(
    ".edit-to-do-form-cont__form__to-do-title"
  ).value;

  test31.textContent = document.querySelector(
    ".edit-to-do-form-cont__form__to-do-date"
  ).value;
}
