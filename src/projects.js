const projects = document.querySelector(".projects");
const content = document.querySelector(".content");
import { addToDo } from "./applogic";
import { addProject } from "./applogic";
import { allProjects } from "./index";
import { deleteProject } from "./applogic";
import { deleteToDo } from "./applogic";
export function loadProjects(allProjects){
    while (projects.firstChild){
        projects.removeChild(projects.firstChild)
    }
    for (let key in allProjects){
        // create project div
        let projectDiv = document.createElement("div");
        projectDiv.classList.add("projectDiv");
        // create project
        let project = document.createElement("div");
        project.textContent = key;
        project.classList.add("project");
        // add project title to project div
        projectDiv.appendChild(project);
        // create project button to add a ToDo
        let span = document.createElement("span");
        span.textContent = "+";
        span.addEventListener("click", (e)=>{
            let thelist = e.target.previousSibling.innerHTML;
            createToDo(thelist)
        })
        // create project button to delete a project
        let deleteSpan = document.createElement("span");
        deleteSpan.textContent = "-";
        deleteSpan.addEventListener("click", (e)=>{
            deleteProject(allProjects, key);
            projectDiv.remove();
        })
        // create project button to rename a project
        let editSpan = document.createElement("span");
        editSpan.textContent = " : ";
        editSpan.addEventListener("click", (e)=>{
            renameProject(key)
        })

        projectDiv.appendChild(span);
        projectDiv.appendChild(deleteSpan);
        projectDiv.appendChild(editSpan)

        project.addEventListener("click", (e)=>{
            while (content.firstChild){
                content.removeChild(content.firstChild)
            }
            if ((allProjects[key]).length == 0){
                return;
            }

            for (let todo of (allProjects[e.target.textContent])){
                // create container div to contain every todo of the selected project
                let container = document.createElement("div");
                container.classList.add("todoitem");

                let todotitle = document.createElement("div");
                todotitle.textContent = todo.title;
                todotitle.classList.add("todoitem");
                // check if todo is completed to add line throw as checked
                if (todo.complete == "yes"){
                    todotitle.classList.add("completed")
                }else{
                    todotitle.classList.remove("completed");
                }
                container.appendChild(todotitle);
                // create a delete button to delete todo
                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "delete";
                function checkIndex(obj) {
                    return obj == todo;
                  }
                deleteBtn.addEventListener("click", ()=>{
                    let index = allProjects[e.target.textContent].findIndex(checkIndex);
                    deleteToDo(allProjects, index, e.target.textContent)
                    container.remove()
                })
                container.appendChild(deleteBtn)
                // create an edit button to edit a todo
                let editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.addEventListener("click", function(){
                    let index =  allProjects[key].findIndex(checkIndex);
                    editToDo(todo, index, key)
                })
                container.appendChild(editBtn)
                // create a button to toggle a todo if completed
                let completedBtn = document.createElement("button");
                completedBtn.textContent = "Complete!";
                completedBtn.addEventListener("click", ()=>{
                    if (todo.complete == "no"){
                        let index = allProjects[e.target.textContent].findIndex(checkIndex);
                        todo.complete = "yes"
                        localStorage.setItem("listData10", JSON.stringify(allProjects))
                    }else{
                        let index = allProjects[e.target.textContent].findIndex(checkIndex);
                        todo.complete = "no"
                        localStorage.setItem("listData10", JSON.stringify(allProjects))
                    }
                    if (todo.complete == "yes"){
                        todotitle.classList.add("completed")
                    }else{
                        todotitle.classList.remove("completed");
                    }
                })
                container.appendChild(completedBtn)
                // add the todo container to content space
                content.appendChild(container);

                todotitle.addEventListener("click", ()=>{
                    console.log(todo)
                })
            }
        })
        projects.appendChild(projectDiv);
    }
}



function createToDo(list){
    while (content.firstChild){
        content.removeChild(content.firstChild)
    }
    // create the formof ToDo
    let form = document.createElement("div");
    form.classList.add("form");
    content.appendChild(form);

    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    form.appendChild(titleLabel)
    let title = document.createElement("input");
    title.setAttribute("placeholder", "Title");
    form.appendChild(title);

    let descriptionLabel = document.createElement("label");
    form.appendChild(descriptionLabel)
    let description = document.createElement("textarea");
    form.appendChild(description);

    let dateLabel = document.createElement("label");
    dateLabel.textContent = "Date Due";
    form.appendChild(dateLabel)
    let date = document.createElement("input");
    date.setAttribute("type", "date");
    form.appendChild(date);    

    let priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority";
    form.appendChild(priorityLabel)
    let priority = document.createElement("select");
    priority.setAttribute("class", "selected");
    form.appendChild(priority);

    let option1 = document.createElement("option");
    option1.textContent = "High";
    option1.setAttribute("value", "high");
    priority.appendChild(option1)
    let option2 = document.createElement("option");
    option2.textContent = "Meduim";
    option2.setAttribute("value", "meduim");
    priority.appendChild(option2)
    let option3 = document.createElement("option");
    option3.textContent = "Low";
    option3.setAttribute("value", "low");
    priority.appendChild(option3)

    let submit = document.createElement("button");
    submit.textContent = "Add";
    submit.addEventListener("click", function(){
        addToDo(title, description, priority, list, date);
    }) 
    form.appendChild(submit);
}




function editToDoForm(todo, list, index){
    while (content.firstChild){
        content.removeChild(content.firstChild)
    }
    let form = document.createElement("div");
    form.classList.add("form");
    content.appendChild(form);

    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    form.appendChild(titleLabel)
    let title = document.createElement("input");
    title.value = todo.title;
    form.appendChild(title);

    let descriptionLabel = document.createElement("label");
    form.appendChild(descriptionLabel)
    let description = document.createElement("textarea");
    description.value = todo.description;
    form.appendChild(description);

    let dateLabel = document.createElement("label");
    dateLabel.textContent = "Date Due";
    form.appendChild(dateLabel)
    let date = document.createElement("input");
    date.setAttribute("type", "date");
    let dd = todo.dateDue.replaceAll("/", "-").split("-").reverse().join("-")
    date.setAttribute("value", dd)
    form.appendChild(date);    

    let priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority";
    form.appendChild(priorityLabel)
    let priority = document.createElement("select");
    priority.setAttribute("class", "selected");
    // priority.value = todo.priority;
    form.appendChild(priority);

    

    let option1 = document.createElement("option");
    option1.textContent = "High";
    option1.setAttribute("value", "high");
    priority.appendChild(option1)
    let option2 = document.createElement("option");
    option2.textContent = "Meduim";
    option2.setAttribute("value", "meduim");
    priority.appendChild(option2)
    let option3 = document.createElement("option");
    option3.textContent = "Low";
    option3.setAttribute("value", "low");
    priority.appendChild(option3)

    switch (todo.priority){
        case ("high"):
            option1.setAttribute('selected', "selected")
            break
        case ("meduim"):
            option2.setAttribute('selected', 'selected')
            break
        case ("low"):
            option3.setAttribute('selected', "selected")
            break
        
    }

    let submit = document.createElement("button");
    submit.textContent = "Add";
    submit.addEventListener("click", function(){
        deleteToDo(allProjects, index, list);
        addToDo(title, description, priority, list, date);
    }) 
    form.appendChild(submit);

}

export function createProject(){
    while (content.firstChild){
        content.removeChild(content.firstChild)
    }
    let form = document.createElement("div");
    form.classList.add("form");
    content.appendChild(form);

    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    form.appendChild(titleLabel)
    let title = document.createElement("input");
    title.setAttribute("placeholder", "Title");
    form.appendChild(title);

    let submit = document.createElement("button");
    submit.textContent = "Add";
    submit.addEventListener("click", function(){
        addProject(title);
    }) 
    form.appendChild(submit);
}

function renameProject(oldname){
    while (content.firstChild){
        content.removeChild(content.firstChild)
    }
    let form = document.createElement("div");
    form.classList.add("form");
    content.appendChild(form);

    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    form.appendChild(titleLabel)
    let title = document.createElement("input");
    title.value = oldname;
    form.appendChild(title);

    let submit = document.createElement("button");
    submit.textContent = "Add";
    submit.addEventListener("click", function(){
        changeName(title, oldname);
    }) 
    form.appendChild(submit);

}

function changeName(title, oldname){
            changeProjectName(title, oldname);
            loadProjects()

}


function editToDo(todo, index, key){
    editToDoForm(todo, key, index)
}






