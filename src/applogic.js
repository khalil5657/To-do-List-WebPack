import { allProjects } from "./index";
import { loadProjects } from "./dom"
import { format } from "date-fns";

function createToDoItem(title, description, priority, date){
    // create a todo object
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dateDue = date;
    this.complete = "no"
}

export function addToDo(title, desc, priority, list, date){

    let thedate = format(date.value, "dd/MM/yyyy")
    let todo = new createToDoItem(title.value, desc.value, priority.value, thedate);
    // add todo to project list
    let project = allProjects[list];
    project[project.length] = todo;
    localStorage.setItem("listData10", JSON.stringify(allProjects))
}

export function addProject(title){
    // create a new empty project list
    let newOne = title.value
    allProjects[newOne] = [];
    localStorage.setItem("listData10", JSON.stringify(allProjects))
    loadProjects(allProjects)
}

export function deleteProject(allProjects, key){
    // delete a project
    delete allProjects[key];
    localStorage.setItem("listData10", JSON.stringify(allProjects))
}

export function deleteToDo(allProjects, index, key){
    // delete a todo from a project
    allProjects[key].splice(index, 1)
     localStorage.setItem("listData10", JSON.stringify(allProjects))
}

export function changeProjectName(title, oldname){
    // change project name
    Object.assign(allProjects, { [title.value]: allProjects[oldname] });
            delete allProjects[oldname];
            localStorage.setItem("listData10", JSON.stringify(allProjects))
}

export function setToDoState(todo, state){
    // change todo state if complete or not
    todo.complete = state
    localStorage.setItem("listData10", JSON.stringify(allProjects))
}
export function changeName(title, oldname){
    // change project name
    changeProjectName(title, oldname);      
    loadProjects(allProjects)
}