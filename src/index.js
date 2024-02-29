import "./style.css";
import { format } from "date-fns";
const projects = document.querySelector(".projects");
const content = document.querySelector(".content");
const add = document.querySelector("h1 span");
let allProjects = {MyTasks: [{title: "go to gym", description: "you must go to gym and train", priority: "high", dateDue: "24/10/2003"}]}
function createToDoItem(title, description, priority, date){
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dateDue = date;
}
loadProjects()
function loadProjects(){
    while (projects.firstChild){
        projects.removeChild(projects.firstChild)
    }
    for (let key in allProjects){
        let projectDiv = document.createElement("div");
        projectDiv.classList.add("projectDiv");
        let project = document.createElement("div");
        project.textContent = key;
        project.classList.add("project");
        projectDiv.appendChild(project);
        let span = document.createElement("span");
        span.textContent = "+";
        span.addEventListener("click", (e)=>{
            let thelist = e.target.previousSibling.innerHTML;
            createToDo(thelist)
        })
        let deleteSpan = document.createElement("span");
        deleteSpan.textContent = "-";
        deleteSpan.addEventListener("click", (e)=>{
            delete allProjects[key];
            projectDiv.remove();
        })
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
                let container = document.createElement("div");
                container.classList.add("todoitem");

                let todotitle = document.createElement("div");
                todotitle.textContent = todo.title;
                todotitle.classList.add("todoitem");
                container.appendChild(todotitle);
                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "delete";
                function checkIndex(obj) {
                    return obj == todo;
                  }
                deleteBtn.addEventListener("click", ()=>{
                    let index = allProjects[e.target.textContent].findIndex(checkIndex);
                    allProjects[e.target.textContent].splice(index, 1)
                    container.remove()
                })
                container.appendChild(deleteBtn)
                let editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.addEventListener("click", function(){
                    let index =  allProjects[key].findIndex(checkIndex);
                    editToDo(todo, index, key)
                })
                container.appendChild(editBtn)
                content.appendChild(container);
                todotitle.addEventListener("click", ()=>{
                    console.log(todo)
                })
            }
        })
        projects.appendChild(projectDiv);
    }
}
function addToDo(title, desc, priority, list, date){
    let thedate = format(date.value, "dd/MM/yyyy")
    let todo = new createToDoItem(title.value, desc.value, priority.value, thedate);
    let project = allProjects[list];
    project[project.length] = todo;
}

add.addEventListener("click", function(){
    createProject();
})
function createToDo(list){
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

function createProject(){
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
function addProject(title){
    allProjects[title.value] = [];
    loadProjects()
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
    Object.assign(allProjects, { [title.value]: allProjects[oldname] });
            delete allProjects[oldname];
            loadProjects()
}

function editToDo(todo, index, key){
    editToDoForm(todo, key, index)
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
            allProjects[list].splice(index, 1);
            addToDo(title, description, priority, list, date);
        }) 
        form.appendChild(submit);
    
}
