let projectsArray;

if (JSON.parse(localStorage.getItem("projects"))) {
  projectsArray = JSON.parse(localStorage.getItem("projects"));
} else {
  localStorage.setItem("projects", JSON.stringify([]));
  projectsArray = JSON.parse(localStorage.getItem("projects"));
  alert("here");
}

displayMenuProjects();

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
  document.querySelector(".add-project-form-cont__form__project-title").value =
    "";
  addProjectFormContainer.style.cssText = "diplay: none;";
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
      "width: 60%; background-color: black; color: rgb(47, 0, 255);";
    projectEnter.textContent = item.title;

    let projectEdit = document.createElement("button");
    projectEdit.className = "project-edit-button";
    projectEdit.style.cssText =
      "width: 20%; background-color: black; color: rgb(47, 0, 255);";
    projectEdit.textContent = "Edit";

    let projectDelete = document.createElement("button");
    projectDelete.className = "project-edit-button";
    projectDelete.style.cssText =
      "width: 20%; background-color: black; color: rgb(47, 0, 255);";
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

    projectEdit.addEventListener("click", (edit) => {
      editProjectFormContainer.style.cssText = "display: flex;";
      let butt = edit.target.parentElement.firstChild.textContent;
      document.querySelector(
        ".edit-project-form-cont__form__project-title"
      ).value = butt;
      //copyOfOld = createCopyOfOld(butt);

      editProjectFormSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();
        projectsArray[projectsArray.findIndex((x) => x.title == butt)].title =
          document.querySelector(
            ".edit-project-form-cont__form__project-title"
          ).value;
        localStorage.setItem("projects", JSON.stringify(projectsArray));
        projectEnter.textContent =
          projectsArray[
            projectsArray.findIndex(
              (x) =>
                x.title ==
                document.querySelector(
                  ".edit-project-form-cont__form__project-title"
                ).value
            )
          ].title;
      });
    });

    projectDelete.addEventListener("click", (e) => {
      project.remove();
      projectsArray.splice(projectsList.indexOf(item), 1);
      localStorage.setItem("projects", JSON.stringify(projectsArray));
    });

    project.appendChild(projectEnter);
    project.appendChild(projectEdit);
    project.appendChild(projectDelete);
    document.querySelector(".menu").appendChild(project);
  });
}

let editProjectFormContainer = document.querySelector(
  ".edit-project-form-cont"
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

function displayProjectInterface(title) {
  let projectInterface = document.createElement("div");
  projectInterface.className = "project-interface";
  projectInterface.style.cssText =
    "width: 100%; height: 100%; color:rgb(47, 0, 255); background-color: black; display: flex; flex-direction: column; align-items: center;";

  let projectInterfaceHeader = document.createElement("div");
  projectInterfaceHeader.className = "project-interface-header";
  projectInterfaceHeader.style.cssText =
    "width: 100%; height: 35px; background-color: black; color: rgb(47, 0, 255); display: flex; border-bottom: 1px solid rgb(47, 0, 255);";

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
  document.querySelector(".display").appendChild(projectInterface);
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
  document.querySelector(".add-to-do-form-cont__form__to-do-title").value = "";
  document.querySelector(".add-to-do-form-cont__form__to-do-date").value = "";
  addToDoFormContainer.style.cssText = "diplay: none;";
});

class CreateToDo {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
}

function addToDoToProjectsArrayMenuProjects() {
  let toDoTitle = document.querySelector(
    ".add-to-do-form-cont__form__to-do-title"
  ).value;
  let toDoDate = document.querySelector(
    ".add-to-do-form-cont__form__to-do-date"
  ).value;
  let toDo = new CreateToDo(toDoTitle, toDoDate);
  let projectInterfaceHeaderTitle = document.querySelector(
    ".project-interface-header-title"
  );
  projectsArray[
    projectsArray.findIndex(
      (x) => x.title == projectInterfaceHeaderTitle.textContent
    )
  ].todoList.push(toDo);
  localStorage.setItem("projects", JSON.stringify(projectsArray));
  document.querySelectorAll(".to-do-item").forEach((item) => {
    item.remove();
  });
  displayToDoInProject(
    projectsArray[
      projectsArray.findIndex(
        (x) => x.title == projectInterfaceHeaderTitle.textContent
      )
    ]
  );
}

function displayToDoInProject(item1) {
  item1.todoList.forEach((toDo) => {
    let toDoItem = document.createElement("div");
    toDoItem.className = "to-do-item";
    toDoItem.style.cssText =
      "background-color: black; color: rgb(47, 0, 255); width: 100%; height: 30px; border-bottom: 1px solid rgb(47, 0, 255); display: flex;";

    let toDoItemTitle = document.createElement("div");
    toDoItemTitle.className = "to-do-item-title";
    toDoItemTitle.style.cssText =
      "width: 50%; display: flex; justify-content: center; align-items: center;";
    let toDoItemTitleText = document.createElement("div");
    toDoItemTitleText.textContent = toDo.title;
    toDoItemTitle.appendChild(toDoItemTitleText);

    let toDoItemDate = document.createElement("div");
    toDoItemDate.className = "to-do-item-date;";
    toDoItemDate.style.cssText =
      "width: 30%; display: flex; justify-content: center; align-items: center;";
    let toDoItemDateText = document.createElement("div");
    toDoItemDateText.textContent = toDo.date;
    toDoItemDateText.style.cssText = "color: rgb(47, 0, 255);";
    toDoItemDate.appendChild(toDoItemDateText);

    let toDoItemEdit = document.createElement("button");
    toDoItemEdit.className = "to-do-item-edit";
    toDoItemEdit.style.cssText =
      "width: 10%; color: rgb(47, 0, 255); background-color: black;";
    toDoItemEdit.textContent = "Edit";

    let toDoItemDelete = document.createElement("button");
    toDoItemDelete.className = "to-do-item-delete";
    toDoItemDelete.style.cssText =
      "width: 10%; color: rgb(47, 0, 255); background-color: black;";
    toDoItemDelete.textContent = "Delete";

    toDoItemEdit.addEventListener("click", (e) => {
      editToDoFormContainer.style.cssText = "display: flex;";
      document.querySelector(".edit-to-do-form-cont__form__to-do-title").value =
        toDo.title;
      document.querySelector(".edit-to-do-form-cont__form__to-do-date").value =
        toDo.date;

      editToDoFormSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();
        projectsArray[
          projectsArray.findIndex((x) => x.title == item1.title)
        ].todoList[
          projectsArray[
            projectsArray.findIndex((x) => x.title == item1.title)
          ].todoList.findIndex((x) => x.title == toDo.title)
        ].title = document.querySelector(
          ".edit-to-do-form-cont__form__to-do-title"
        ).value;
        projectsArray[
          projectsArray.findIndex((x) => x.title == item1.title)
        ].todoList[
          projectsArray[
            projectsArray.findIndex((x) => x.title == item1.title)
          ].todoList.findIndex((x) => x.date == toDo.date)
        ].date = document.querySelector(
          ".edit-to-do-form-cont__form__to-do-date"
        ).value;
        localStorage.setItem("projects", JSON.stringify(projectsArray));
        toDoItemTitleText.textContent = document.querySelector(
          ".edit-to-do-form-cont__form__to-do-title"
        ).value;
        toDoItemDateText.textContent = document.querySelector(
          ".edit-to-do-form-cont__form__to-do-date"
        ).value;
      });
    });

    toDoItemDelete.addEventListener("click", (e) => {
      let butt1 = e.target.parentElement.firstChild.textContent;
      let projectInterfaceHeaderTitle = document.querySelector(
        ".project-interface-header-title"
      );
      projectsArray[
        projectsArray.findIndex(
          (x) => x.title == projectInterfaceHeaderTitle.textContent
        )
      ].todoList.splice(
        projectsArray[
          projectsArray.findIndex(
            (x) => x.title == projectInterfaceHeaderTitle.textContent
          )
        ].todoList.findIndex((x) => x.title == butt1),
        1
      );

      localStorage.setItem("projects", JSON.stringify(projectsArray));
      toDoItem.remove();
    });

    toDoItem.appendChild(toDoItemTitle);
    toDoItem.appendChild(toDoItemDate);
    toDoItem.appendChild(toDoItemEdit);
    toDoItem.appendChild(toDoItemDelete);

    document.querySelector(".project-interface").appendChild(toDoItem);
  });
}
let editToDoFormContainer = document.querySelector(".edit-to-do-form-cont");
let editToDoFormExitButton = document.querySelector(
  ".edit-to-do-form-cont__exit-cont__exit-button"
);
editToDoFormExitButton.addEventListener("click", (e) => {
  editToDoFormContainer.style.cssText = "display: none;";
});
let editToDoFormSubmitButton = document.querySelector(
  ".edit-to-do-form-cont__form__submit-button"
);
