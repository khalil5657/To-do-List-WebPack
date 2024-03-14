const projects = document.querySelector(".projects");
const content = document.querySelector(".content");
import { addToDo } from "./applogic";
import { addProject } from "./applogic";
import { allProjects } from "./index";
import { deleteProject } from "./applogic";
import { deleteToDo } from "./applogic";
import { setToDoState} from "./applogic";
import { changeProjectName } from "./applogic";
import { changeName } from "./applogic";
import icon from "./assets/file-2-svgrepo-com.svg"
import dateicon from "./assets/date-range-svgrepo-com.svg"
import deleteicon from "./assets/delete-svgrepo-com.svg"
import editicon from "./assets/edit-svgrepo-com.svg"
import homeicon from "./assets/pngegg.png"
import addicon from "./assets/add-to-queue-svgrepo-com.svg"
export function loadProjects(allProjects){
    while (projects.firstChild){
        projects.removeChild(projects.firstChild)
    }
    for (let key in allProjects){
        // create project div
        let projectDiv = document.createElement("div");
        projectDiv.classList.add("projectDiv");
        // create project
        let projectContainer = document.createElement("div");
        let project = document.createElement("div");
        project.textContent = key;
        project.classList.add("projectTitle")
        let img = document.createElement("img");
        img.src = icon;
        img.style.width = "15px"
        img.style.height = "15px"

        projectContainer.style.display = "flex";
        projectContainer.style.justifyContent = "left";
        projectContainer.style.alignItems = "center"
        projectContainer.style.gap = "8px"
        projectContainer.style.paddingLeft = "10px"

        projectContainer.appendChild(img)
        projectContainer.appendChild(project)
        projectContainer.classList.add("project");
        // add project title to project div
        projectDiv.appendChild(projectContainer);
        // create project button to add a ToDo
        let span = document.createElement("span");
        span.style.flex = "1"
        span.classList.add("addSpan");
        let addImg = document.createElement("img");
        addImg.src = addicon;
        span.appendChild(addImg)
        span.addEventListener("click", (e)=>{
            let thelist = key;
            createToDo(thelist)
        })
        // create project button to delete a project
        let deleteSpan = document.createElement("span");
        deleteSpan.style.flex = "1"
        deleteSpan.classList.add("deleteSpan");
        let deleteImg = document.createElement("img");
        deleteImg.src = deleteicon;
        deleteSpan.appendChild(deleteImg)
        deleteSpan.addEventListener("click", (e)=>{
            deleteProject(allProjects, key);
            projectDiv.remove();
        })
        // create project button to rename a project
        let editSpan = document.createElement("span");
        editSpan.style.flex = "1"
        editSpan.classList.add("editSpan");
        let editImg = document.createElement("img");
        editImg.src = editicon;
        editSpan.appendChild(editImg)
        editSpan.addEventListener("click", (e)=>{
            renameProject(key)
        })

        projectDiv.appendChild(span);
        projectDiv.appendChild(deleteSpan);
        projectDiv.appendChild(editSpan)

        projectContainer.addEventListener("click", (e)=>{
            while (content.firstChild){
                content.removeChild(content.firstChild)
            }
            let listname = document.createElement("h1")
            listname.classList.add("listname")
            listname.textContent = key;
            content.appendChild(listname)
            if ((allProjects[key]).length == 0){
                return;
            }
            
            for (let todo of (allProjects[key])){
                // create container div to contain every todo of the selected project
                let container = document.createElement("div");
                container.classList.add("todoitem2");
                let firstDiv = document.createElement("div");
                container.appendChild(firstDiv)
                let secondDiv = document.createElement("div");
                container.appendChild(secondDiv);

                let todotitle = document.createElement("div");
                todotitle.textContent = todo.title;
                todotitle.classList.add("todoitem");
                // check if todo is completed to add line-through as checked
                if (todo.complete == "yes"){
                    todotitle.classList.add("completed")
                }else{
                    todotitle.classList.remove("completed");
                }
                firstDiv.appendChild(todotitle);
                // create a delete button to delete todo
                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "delete";
                deleteBtn.classList.add("deleteBtn")
                function checkIndex(obj) {
                    return obj == todo;
                  }
                deleteBtn.addEventListener("click", ()=>{
                    let index = allProjects[key].findIndex(checkIndex);
                    deleteToDo(allProjects, index, key)
                    container.remove()
                })
                secondDiv.appendChild(deleteBtn)
                // create an edit button to edit a todo
                let editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.classList.add("editBtn")
                editBtn.addEventListener("click", function(){
                    let index =  allProjects[key].findIndex(checkIndex);
                    editToDo(todo, index, key)
                })
                secondDiv.appendChild(editBtn)
                // add a toggle button to set if todo is complete
                let completedBtn = document.createElement("label");
                completedBtn.classList.add("toggle");
                let aninput = document.createElement("input");
                aninput.setAttribute("type", "checkbox");
                let anspan = document.createElement("span");
                anspan.classList.add("slider");
                completedBtn.appendChild(aninput);
                completedBtn.appendChild(anspan);
                secondDiv.appendChild(completedBtn)
                // set toggle button state to same as todo state
                if (todo.complete == "yes"){
                    aninput.checked = true
                }else{
                    aninput.checked = false
                }
                aninput.addEventListener('click', ()=>{
                    // changing todo state as button clicked 
                    if (aninput.checked == true){
                        setToDoState(todo, "yes")

                    }else{
                        setToDoState(todo, "no")

                    }
                    // adding line-through if todo is complete
                    if (todo.complete == "yes"){
                        todotitle.classList.add("completed")
                    }else{
                        todotitle.classList.remove("completed");
                    }
                })

                

                // add the todo container to content space
                content.appendChild(container);

                todotitle.addEventListener("click", function(){
                    showToDo(todo)
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
    let formFunction = document.createElement("div")
    formFunction.classList.add("formFunction");
    formFunction.textContent = "Create a task" 
    content.appendChild(formFunction)
    // create the form of ToDo
    let form = document.createElement("div");
    form.classList.add("form");
    form.style.marginTop = "0px"

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
        // when submitted call addToDo function
        addToDo(title, description, priority, list, date);
    }) 
    form.appendChild(submit);
}




function editToDoForm(todo, list, index){
    // create edit todo form
    while (content.firstChild){
        content.removeChild(content.firstChild)
    }
    let formFunction = document.createElement("div")
    formFunction.classList.add("formFunction");
    formFunction.textContent = "Edit a task" 
    content.appendChild(formFunction)

    let form = document.createElement("div");
    form.classList.add("form");
    form.style.marginTop = "0px"

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
    date.setAttribute("required", "required")
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
    // create a new project form
    while (content.firstChild){
        content.removeChild(content.firstChild)
    }
    let formFunction = document.createElement("div")
    formFunction.classList.add("formFunction");
    formFunction.textContent = "Create a Project" 
    content.appendChild(formFunction)
    let form = document.createElement("div");
    form.classList.add("form");
    form.style.marginTop = "0px"

    content.appendChild(form);

    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    form.appendChild(titleLabel)
    let title = document.createElement("input");
    title.setAttribute("placeholder", "Title");
    title.setAttribute("maxlength", "9");

    form.appendChild(title);

    let submit = document.createElement("button");
    submit.textContent = "Add";
    submit.addEventListener("click", function(){
        addProject(title);
    }) 
    form.appendChild(submit);
}

function renameProject(oldname){
    // create rename a project form
    while (content.firstChild){
        content.removeChild(content.firstChild)
    }
    let formFunction = document.createElement("div")
    formFunction.classList.add("formFunction");
    formFunction.textContent = "Rename a Project" 
    formFunction.style.marginBottom = "40px"
    content.appendChild(formFunction)
    let form = document.createElement("div");
    form.classList.add("form");
    content.appendChild(form);

    let titleLabel = document.createElement("label");
    titleLabel.textContent = "Title";
    form.appendChild(titleLabel)
    let title = document.createElement("input");
    title.value = oldname;
    title.setAttribute("maxlength", "9");
    form.appendChild(title);

    let submit = document.createElement("button");
    submit.textContent = "Add";
    submit.addEventListener("click", function(){
        changeName(title, oldname);
    }) 
    form.appendChild(submit);

}




function editToDo(todo, index, key){
    editToDoForm(todo, key, index)
}


function showToDo(todo){
    // show a todo item data
    while (content.firstChild){
        content.removeChild(content.firstChild)
    }
    let main = document.createElement("div")
    main.classList.add('main');
    content.appendChild(main);

    let theTitle = document.createElement("div");
    theTitle.classList.add("theTitle");
    theTitle.textContent = todo.title
    main.appendChild(theTitle);

    let desc = document.createElement("div");
    desc.classList.add("desc");
    desc.textContent = todo.description;
    main.appendChild(desc);
    
    let info = document.createElement("div");
    info.classList.add("info")

    let thePriority = document.createElement("div");
    thePriority.classList.add("thePriority")
    info.appendChild(thePriority);
    let thePriorityDiv = document.createElement("div");
    thePriorityDiv.classList.add("thePriorityDiv");
    thePriorityDiv.textContent = todo.priority;

    switch (todo.priority){
        case "high":
            thePriorityDiv.style.color = "red"
            thePriorityDiv.style.borderColor = "red";
            break;
        case "meduim":
            thePriorityDiv.style.color = "yellow"
            thePriorityDiv.style.borderColor = "yellow";
            break;
        case "low":
            thePriorityDiv.style.color = "green"
            thePriorityDiv.style.borderColor = "green";
            break;
        
    }

    thePriority.appendChild(thePriorityDiv)


    let theDate = document.createElement("div");
    theDate.classList.add("theDate");
    info.appendChild(theDate);
    let theDateImg = document.createElement("img");
    theDateImg.src = dateicon;
    theDateImg.style.width = "25px"
    theDateImg.style.height = "25px"

    theDate.appendChild(theDateImg)
    let theDateText = document.createElement("div");
    theDateText.textContent = todo.dateDue;
    theDate.appendChild(theDateText)

    main.appendChild(info)
}

export function homePage(){
    while (content.firstChild){
        content.removeChild(content.firstChild)
    }
    let main = document.createElement("div");
    main.classList.add("homeMain");

    let first = document.createElement("div");
    first.classList.add("first");
    let firstImg = document.createElement("img");
    firstImg.src = homeicon;
    first.appendChild(firstImg)
    main.appendChild(first)

    let second = document.createElement("div");
    second.classList.add("second");
    second.textContent = "Create a new list by clicking the + button or select an existing one to start adding your tasks."
    main.appendChild(second)
    content.appendChild(main)
}

