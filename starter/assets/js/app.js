/**
 * In this file app.js you will find all CRUD functions name.
 * 
 */

var tasksToDo       = document.getElementById("to-do-tasks");
var tasksInProgress = document.getElementById("in-progress-tasks");
var tasksDone       = document.getElementById("done-tasks");
var countToDo       = document.getElementById("to-do-tasks-count");
var countInProgress = document.getElementById("in-progress-tasks-count");
var countDone       = document.getElementById("done-tasks-count");
var title           = document.getElementById("title");
var typeFeature     = document.querySelector('#Feature')
var typeBug         = document.querySelector('#Bug')
var priority        = document.getElementById("priority");
var statusTasks     = document.getElementById("status");
var date            = document.getElementById("date");
var description     = document.getElementById("description");


createTask();

function createTask() {
    // Obtenir les élements
    for (var i = 0; i < tasks.length; i++) {
        c = i + 1;
        if (tasks[i].status === "To Do") {

            document.getElementById("to-do-tasks").innerHTML += ` 
            <button draggable="true" data-id="${i}" class="items btnToDo d-flex button w-100 border p-1" id="btnTodo" onclick="editTask(this)">
                <div class="col-1">
                    <i class="bi bi-question-circle text-danger"></i> 
                </div>
                <div class="col-11 text-start">
                    <div class="fw-bold" id="buttonTitle">${tasks[i].title}</div>
                    <div class="float-container">
                        <div class="text-muted d-flex">#${c} created in <div style="margin-left : 5px" id="buttonDate">${tasks[i].date}</div></div>
                        <div class="description" id="buttonDescription">${tasks[i].description}...</div>
                    </div>
                    <div class="">
                        <span class="col-2 btn btn-primary btn-sm rounded-pill p-0" id="buttonPriority">${tasks[i].priority}</span>
                        <span class=" col-2 btn btn-sm rounded-pill text-white p-0 btn-gray-400" id="buttonType">${tasks[i].type}</span>
                    </div>
                </div>
                <p id="buttonStatus" hidden>To Do</p>
            </button>
            `;
            // Incrementer le nombre de tasks en todo card
            document.getElementById("to-do-tasks-count").innerHTML = parseInt(document.getElementById("to-do-tasks-count").innerHTML) + 1;
        } else if (tasks[i].status === "In Progress") {
            document.getElementById("in-progress-tasks").innerHTML += `
            <button draggable="true" data-id="${i}" class="items d-flex button w-100 border p-1" id="btnProgress" onclick="editTask(this)">
                <div class="col-1">
                    <i class="spinner-border spinner-border-sm text-warning"></i> 
                </div>
                <div class="col-11 text-start">
                    <div class="fw-bold" id="buttonTitle">${tasks[i].title}</div>
                    <div class="">
                        <div class="text-muted d-flex" >#${c} created in <div style="margin-left:5px" id="buttonDate">${tasks[i].date}</div></div>
                        <div class="description" id="buttonDescription">${tasks[i].description}</div>
                    </div>
                    <div class="">
                        <span class="col-2 btn btn-primary btn-sm rounded-pill p-0" id="buttonPriority">${tasks[i].priority}</span>
                        <span class=" col-2 btn btn-sm rounded-pill text-white p-0 btn-gray-400" id="buttonType">${tasks[i].type}</span>
                    </div>
                </div>
                <p id="buttonStatus" hidden>In Progress</p>
            </button>`;
            // Incrementer le nombre de tasks en in in-progress card
            document.getElementById("in-progress-tasks-count").innerHTML = parseInt(document.getElementById("in-progress-tasks-count").innerHTML) + 1;
        } else if (tasks[i].status === "Done") {
            document.getElementById("done-tasks").innerHTML += `
            <button draggable="true" data-id="${i}" class="items d-flex button w-100 border p-1" id="btnDone" onclick="editTask(this)">
                <div class="col-1">
                    <i class="bi bi-check-circle text-green"></i> 
                </div>
                <div class="col-11 text-start">
                    <div class="fw-bold" id="buttonTitle">${tasks[i].title}</div>
                    <div class="">
                        <div class="text-muted d-flex" >#${c} created in <div style="margin-left:5px" id="buttonDate">${tasks[i].date}</div></div>
                        <div class="description" id="buttonDescription">${tasks[i].description}</div>
                    </div>
                    <div class="">
                        <span class="col-2 btn btn-primary btn-sm rounded-pill p-0" id="buttonPriority">${tasks[i].priority}</span>
                        <span class=" col-2 btn btn-sm rounded-pill text-white p-0 btn-gray-400" id="buttonType" >${tasks[i].type}</span>
                    </div>
                </div>
                <p id="buttonStatus" hidden>Done</p>
            </button>`;
            //Incrementer le nombre de tasks en done card
            document.getElementById("done-tasks-count").innerHTML = parseInt(document.getElementById("done-tasks-count").innerHTML) + 1;
        }


    }
    dragButton();

}


function saveTask() {
    // Recuperer task attributes a partir les champs input

    var type = document.querySelector('input[type="radio"]:checked')

    // Créez task object
  

    if (title.value == "" || priority.value == "" || statusTasks.value=="" || date.value=="" || description.value=="")
    {
        const template = `
        <div id="errorAlert" class="">
        <div class="alert alert-danger d-flex"  role="alert!">
                <i class="bi bi-exclamation-triangle-fill"></i>
            <div style="margin-left: 5px;">
                Error, Please entre all the values of the form!
            </div> 
        </div>
    </div>`
        document.getElementById('parentErrorAlert').innerHTML = ''
        document.getElementById('parentErrorAlert').insertAdjacentHTML('beforeend',template)
        
    }
    else {
    
        var add = {
            title       : title.value,
            type        : type.value,
            priority    : priority.value,
            status      : statusTasks.value,
            date        : date.value,
            description : description.value,
        }
        console.log(add)

        // Ajoutez object au Array
        tasks[tasks.length] = add;

        // refresh tasks
        tasksToDo.innerHTML = '';
        tasksInProgress.innerHTML = '';
        tasksDone.innerHTML = '';

        // refresh count
        countToDo.innerHTML = '0';
        countInProgress.innerHTML = '0';
        countDone.innerHTML = '0';
        createTask();
        

        // Fermer modal
        $("#exampleModal").modal('hide');

        // Ajouter modal success
        function modalSuccess(){
            Swal.fire({
                title               : "Add Successfully",
                confirmButtonColor  : "#0d6efd",
                icon                : "success",
                iconColor           : "#0d6efd"  
            })
        }
        document.getElementById("saveButton").addEventListener('click', modalSuccess())
    }

}


function editTask(element) {
    // Initialisez task form
    let buttonInfo = {
        title       : element.querySelector("#buttonTitle").innerText,
        type        : element.querySelector("#buttonType").innerHTML,
        priority    : element.querySelector("#buttonPriority").innerText,
        status      : element.querySelector("#buttonStatus").innerText,
        date        : element.querySelector("#buttonDate").innerText,
        description : element.querySelector("#buttonDescription").innerText,
    }

    console.log(buttonInfo)

    // Ouvrir Modal form
    $("#exampleModal").modal("show");


    // Affichez updates
    title.value         = buttonInfo.title
        //Choisir le type pour vérifier
    if (buttonInfo.type === 'Bug'){
        typeBug.checked = true;
    }
    
    else  {
        typeFeature.checked = true;
    }
    priority.value      = buttonInfo.priority
    statusTasks.value   = buttonInfo.status
    date.value          = buttonInfo.date
    description.value   = buttonInfo.description

    //Masquer Alert error
    if (document.getElementById("errorAlert")!=null) {
    document.getElementById("errorAlert").innerHTML="";
    }

    // Update Button
    document.getElementById("buttonsModal").innerHTML = `<button id="buttonUpdate" class="btn btn-dark text-white col-3 col-sm-3 col-md-2" type="button" onclick="updateTask(this)" data-id="${element.getAttribute('data-id')}">Update</button>
    `

    // Delete Button
    document.getElementById("buttonsModal").innerHTML += `<button  class = "btn btn-danger col-3 col-sm-3 col-md-2" type = "button" onclick="deleteTask(this)" data-id="${element.getAttribute('data-id')}">Delete</button>`

    

}


function getDataFromForm() {
    return {
        title       : document.querySelector("#title").value,
        type        : document.querySelector('input[type="radio"]:checked').value,
        priority    : document.querySelector("#priority").value,
        status      : document.querySelector("#status").value,
        date        : document.querySelector("#date").value,
        description : document.querySelector("#description").value,
    }
}


function updateTask(element) {
    // GET TASK ATTRIBUTES FROM INPUTS
    var formInfo    = getDataFromForm();
    var taskId      = element.getAttribute('data-id');
    // var elementTask = document.querySelector('button[data-id="' + taskId + '"]')


    // console.log('elementTask: ', elementTask);
    // console.log('formInfo : ', formInfo);

    // Remplacer ancienne task par nouvelle task
    // elementTask.querySelector('#buttonTitle').innerText         = formInfo.title
    // elementTask.querySelector("#buttonType").innerHTML          = formInfo.type
    // elementTask.querySelector("#buttonPriority").innerHTML      = formInfo.priority
    // elementTask.querySelector("#buttonStatus").innerHTML        = formInfo.status
    // elementTask.querySelector("#buttonDate").innerHTML          = formInfo.date
    // elementTask.querySelector("#buttonDescription").innerHTML   = formInfo.description

    console.log(formInfo, "update")
    // Ajoutez object au Array
    tasks[taskId] = formInfo;
    console.log(taskId);

    // refresh tasks
    tasksToDo.innerHTML = '';
    tasksInProgress.innerHTML = '';
    tasksDone.innerHTML = '';
    template="";

    // refresh count
    countToDo.innerHTML = '0';
    countInProgress.innerHTML = '0';
    countDone.innerHTML = '0';
    createTask();

    console.log(tasks)

    // Fermer Modal form
    $("#exampleModal").modal('hide');

    //Modal Update successfully
    function updateSuccess(){
        Swal.fire({
            title               : "Update Successfully",
            confirmButtonColor  : "#0d6efd",
            icon                : "success",
            iconColor           : "#0d6efd",
            
        })
    }
    document.getElementById("buttonUpdate").addEventListener('click', updateSuccess())
}


function deleteTask(element) {
    // Get index of task in the array
    var taskId = element.getAttribute('data-id');
    var elementTask = document.querySelector('button[data-id="' + taskId + '"]')
    console.log(elementTask)

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            tasks.splice(taskId, 1);
            Swal.fire({
                title               : "Delete successfully",
                confirmButtonColor  : "#0d6efd",
                icon                : "success",
                iconColor           : "#0d6efd",
            })
            // refresh tasks
            tasksToDo.innerHTML = '';
            tasksInProgress.innerHTML = '';
            tasksDone.innerHTML = '';

            // refresh count
            countToDo.innerHTML = '0';
            countInProgress.innerHTML = '0';
            countDone.innerHTML = '0';
            createTask();



            console.log(tasks)

            // close modal form
            $("#exampleModal").modal('hide');
        }
        else{
            Swal.fire({
                title               : "You cancelled!",
                confirmButtonColor  : "#d33",
            })
            $("#exampleModal").modal('hide');
        }
      })
    
        // Remove task from array by index splice function
        
    
    

}

function initTaskForm() {
    // Clear task form from data
    title.value = '';
    priority.value = '';
    typeFeature.checked = false;
    typeBug.checked = false;
    statusTasks.value = '';
    date.value = '';
    description.value = '';

    // Masquer Alert error
   if( document.getElementById("errorAlert")) document.getElementById("errorAlert").innerHTML=""

    // Hide all action buttons
    document.getElementById("buttonsModal").innerHTML = `
    <button class="btn btn-secondary col-3 col-sm-3 col-md-2" type="button" data-bs-dismiss="modal">Cancel</button>`
    document.getElementById("buttonsModal").innerHTML += `
    <button class = "add btn btn-primary  col-3 col-sm-3 col-md-2" id="saveButton" type = "button" onclick = "saveTask()"> Save </button>`



}


function reloadTasks() {
    // Remove tasks elements

    // Set Task count
}



var drag = null;

function dragButton(){
    var items = document.querySelectorAll('.items');
    var lists = document.querySelectorAll('.list');
    
    items.forEach(item=>{
        item.addEventListener('dragstart', function(){
            console.log('drag start')
            drag = item;
            item.style.opacity='0.5'
        })

        item.addEventListener('dragend', function(e){
            console.log('drag end');
            console.log('e', e.target.parentElement);
            let element = e.target;
            let tolist = element.parentElement;
            let toListName = tolist.getAttribute('data-status');
            let listId = element.getAttribute('data-id');
            item.style.opacity='1'

            tasks[listId].status = toListName;

            tasksToDo.innerHTML = '';
            tasksInProgress.innerHTML = '';
            tasksDone.innerHTML = '';
            template="";

            // refresh count
            countToDo.innerHTML = '0';
            countInProgress.innerHTML = '0';
            countDone.innerHTML = '0';
            createTask();

        })

        lists.forEach(list=>{
            // var cardHeader = document.querySelectorAll('.card-header');
            list.addEventListener('dragover', function(e){
                e.preventDefault()
                this.parentElement.style.backgroundColor = '#0d6efd'
            })
        

            list.addEventListener('dragleave', function(){
                this.parentElement.style.backgroundColor = '#fff'
            })

            list.addEventListener('drop', function(e){
                list.append(drag)
                this.parentElement.style.backgroundColor = '#fff'
            })

        })

    })
}