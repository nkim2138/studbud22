
// ------------------------drag and drop ----------------------------------------
//getting the class from .html
const toDoTasks = document.querySelectorAll(".taskAssigned");
const taskColumns = document.querySelectorAll(".columnInfo");
// at the beginning we don't know what item will be draggable
let draggableTasks = null;

// localStorage.setItem("input", "task");

// looping through other to do tasks
toDoTasks.forEach((taskAssigned) => {
  taskAssigned.addEventListener("dragstart", dragStart);
  taskAssigned.addEventListener("dragend", dragEnd);
})

// creating a function called dragStart
function dragStart() {
  
  draggableTasks = this;
  // when the task is dragged it will print dragStart in the console
  console.log("dragStart");
}

function dragEnd() {
  // when it ends it is null
  draggableTasks = null;
  // when you leave the task dragEnd prints
  console.log("dragEnd");
}

//drop targets are the columns with the grey bg colour
taskColumns.forEach((columnInfo) => {
  columnInfo.addEventListener("dragover", dragOver);
  columnInfo.addEventListener("dragenter", dragEnter);
  columnInfo.addEventListener("dragleave", dragLeave);
  columnInfo.addEventListener("drop", dragDrop);
})

function dragOver(e) {
  // by default dropping over an element is disabled, adding this would enable it to be draggable and dropped
  e.preventDefault();
  //only counts if it is dragged around the drop targets
  console.log("dragOver");
}

function dragEnter() {
  // When it enters the drop target
  console.log("dragEnter");
}

function dragLeave() {
  console.log("dragLeave");
  
}
function dragDrop() {
  this.appendChild(draggableTasks);
  // only fired when element is dropped on a drop target
  console.log("drop");
  
}

// have the task form popup when clicked on add task
// have task close when clicked on the overlay, cancel or the X button
function togglePopupTask(){
  document.getElementById("taskPopup").classList.toggle("active");
}








// ---------------TASK FORM FILL-----------------------
// creating task functionality


//need variables to keep track of our input elements themselves
//js variables referencing html elements
//get variable from DOM using actual 'document' object
const taskForm = document.getElementById("taskForm"); //get element by ID from HTML

//querySelector() general way to select elements
//allows you to pass in a CSS selector as the input parameter for that function in order to get an element from HTML. these elements are relevant to creating a task
const taskNameInput = document.querySelector("#taskNameInput") //# to get ID
const tasklist = document.getElementById("tasklist");
const taskDescriptionInput = document.getElementById("taskDescriptionInput");
const unitOfStudyInput = document.getElementById("unitOfStudyInput");
const priorityInput = document.getElementById("priorityInput");
const dueDateInput = document.getElementById("dueDateInput");
const columnSelectInput = document.getElementById("columnSelectInput");
const completionTimeInput = document.getElementById("completionTimeInput");
const estimatedTimeInput = document.getElementById("estimatedTimeInput");

// getting the button create
const create = document.querySelectorAll(".create");
const tasksColumn = document.getElementById("tasksColumn");


//parameter 1 - event itself which is the submit
//parameter 2 - what we want to happen when the element is clicked on
taskForm.addEventListener("submit", function(event) { //defining and calling at the same time
  
  //none of the browser functionality will happen automatically when clicked
  event.preventDefault();
  
  //get value from task input of user
  let taskName = taskNameInput.value;
  let taskDescription = taskDescriptionInput.value;

  //array of collections
  //selected index of current element
  let unitOfStudy = unitOfStudyInput.value;
  // let unitOfStudy = unitOfStudyInput.options[unitOfStudyInput.selectedIndex].value;
  let priority = priorityInput.value;
  let dueDate = dueDateInput.value;
  let columnSelect = columnSelectInput.options[columnSelectInput.selectedIndex].value;
  let completionTime = completionTimeInput.value;
  let estimatedTime = estimatedTimeInput.value;
  console.log(taskListArray);
  
  //input bunch of parameters
  addTask(taskName, taskDescription, unitOfStudy, priority, dueDate, columnSelect, completionTime, estimatedTime )
})


// create empty array to store tasks
var taskListArray = [];

//Define a function called addTask for dynamically creating task objects
function addTask(name, description, unitofstudy, priority, dueDate, column, completionTime, estimatedTime ) {

    let d = new Date();
    let dateCreated = d.getFullYear();
  //Create the task object
    let task = {

       id: Date.now(),
   //using input parameters as property names for task object as shortcut
       name,
       description, //strings as our values
       unitofstudy,
       priority,
       dueDate,
       column,
       completionTime,
       estimatedTime,
       taskStarted: false, //by default
       taskCompleted: false, //by default
 };
  
  //Push task object to taskList Array
  taskListArray.push(task);
  console.log(taskListArray);
  renderTask(task); //render task to screen
}


//create render task function
//share task object with the function
function renderTask(task){

  updateEmpty();
  
  //create HTML structure (elements)
  let item = document.createElement("div");
  item.setAttribute("data-id", task.id);

  
  //output of the user's input in the task box
  //use array maybe?  https://stackoverflow.com/questions/52603796/to-do-list-with-array-and-functions
  item.innerHTML =`
     <ul class = "newTaskCreated">
        <li class = "taskDetails" >
            <nav class = "unit-priority">
                 <p class="createdUnitOfStudy">${task.unitofstudy}<p>
                 <p class="createdPriority">${task.priority}<p>
            </nav>
        </li>

        <li class = "taskDetails">
            <p class="createdTaskName">${task.name}<p>
        </li>

        <li class = "taskDetails">
            <p class="createdTaskDescription">${task.description}<p>
        </li>


        <li class = "taskDetails">
            <nav class = "dateAndTime">
                <div class = "due">
                    <p class="createdDueDate">${task.dueDate} | <p>
                    <p class="createdCompletionTime"> ${task.completionTime}<p>
                </div>
                <div class = "estimate">
                    <p class="createdEstimatedTime">${task.estimatedTime}min <p>
                </div>
            </nav>
        </li>

    </ul>
    `;



//   item.innerHTML = "<p>" + task.description + "</p>";
  //shows only 30 characters
  task.description = task.description.substring(0, 30) + "...";

  //append element to get new elements to the DOM
  tasklist.appendChild(item);
  item.classList.add("taskAssigned");
  // task created can be draggable
  item.setAttribute("draggable", "true");

  //item will be placed within the columns
  tasksColumn.appendChild(item);

  // task created by user can be dropped in other columns
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);


  function clickCreatedTask() {
    let createdTask = document.createElement("div");
    createdTask.setAttribute("id", "createdTask")
  }

  
  
  //add user interactions to the elements
  //extra task DOM elements - eg. deleting a task that was created by mistake
  // let delButton = document.createElement("div");
  //text node
  // delButton.innerHTML = '&times;';
  // delButton.setAttribute("class", "deleteTask");

  let delButton = document.createElement("button");
  // //text node
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);

  
  //delete button to appear on screen after a task is created
  item.appendChild(delButton);

  //Event listeners for the DOM elements
  //task will be deleted when 'delete' button is clicked
//   button will always correspond to the item that they are next to
  delButton.addEventListener("click", function(event){
    event.preventDefault();
    // check code to delete from id
    let id = event.target.parentElement.getAttribute("data-id");
    let index = taskListArray.findIndex(task => task.id === Number(id));
    removeItemFromArray(taskListArray, index)
    console.log(taskListArray);
    updateEmpty();
    item.remove(); //delete/remove item from the DOM
  })

 //Once the form is submitted the form is cleared
  taskForm.reset();
}

function removeItemFromArray(arr, index) {
    if(index > -1){
        arr.splice(index, 1)
    }
    return arr;
}

// if a task is created the text ("Start by adding a new task!") will disappear
function updateEmpty(){
    if(taskListArray.length > 0) {
        document.getElementById("emptyTaskList").style.display = "none";
    } else {
        document.getElementById("emptyTaskList").style.display = "block";
    }
}

// taskListArray.addtoLocalStorage(task);
// localStorage.setItem("TaskAssigned");