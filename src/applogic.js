import { allProjects } from "./index";
import { loadProjects } from "./dom"
import { format } from "date-fns";

function createToDoItem(title, description, priority, date){
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dateDue = date;
    this.complete = "no"
}

export function addToDo(title, desc, priority, list, date){
    let thedate = format(date.value, "dd/MM/yyyy")
    let todo = new createToDoItem(title.value, desc.value, priority.value, thedate);
    let project = allProjects[list];
    project[project.length] = todo;
    localStorage.setItem("listData10", JSON.stringify(allProjects))
}

export function addProject(title){
    let newOne = title.value
    allProjects[newOne] = [];
    localStorage.setItem("listData10", JSON.stringify(allProjects))
    loadProjects(allProjects)
}

export function deleteProject(allProjects, key){
    delete allProjects[key];
    localStorage.setItem("listData10", JSON.stringify(allProjects))
}

export function deleteToDo(allProjects, index, key){
    allProjects[key].splice(index, 1)
     localStorage.setItem("listData10", JSON.stringify(allProjects))
}

export function changeProjectName(title, oldname){
    Object.assign(allProjects, { [title.value]: allProjects[oldname] });
            delete allProjects[oldname];
            localStorage.setItem("listData10", JSON.stringify(allProjects))
}

export function setToDoState(todo, state){
    todo.complete = state
    localStorage.setItem("listData10", JSON.stringify(allProjects))
}
export function changeName(title, oldname){
    changeProjectName(title, oldname);      
    loadProjects(allProjects)
}