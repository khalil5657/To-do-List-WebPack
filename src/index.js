import "./style.css";
import { format } from "date-fns";
import { loadProjects } from "./dom"
import {createProject } from "./dom"
import icon from "./assets/task-management-svgrepo-com.svg"
const projects = document.querySelector(".projects");
const all = document.querySelector(".all");
const content = document.querySelector(".content");
const add = document.querySelector("h1 span");
let allProjects = {}


if (localStorage.getItem("listData10") != null){
    allProjects = JSON.parse(localStorage.getItem("listData10"))
}else{
    allProjects = {MyTasks: [{title: "go to gym", description: "you must go to gym and train", priority: "high", dateDue: "24/10/2003", complete: "no"}]}
}
export { allProjects }
loadProjects(allProjects);

add.addEventListener("click", function(){
    createProject();
})
// const mtimg = new Image();
// mtimg.src = icon
// content.appendChild(mtimg)


















