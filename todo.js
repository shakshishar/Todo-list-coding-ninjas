
(function(){

//Initialize an empty array to store tasks
let tasks = [];

//Get DOM elements
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const button=document.getElementById('btn');
const completeall=document.getElementById('completed');
const clearall=document.getElementById('clear');
var compTask=0;
var completedTask=document.getElementById('c-count');


//Function of adding a task in the DOM
function addTaskToDom(task)
{
    const li=document.createElement('li');
    li.innerHTML=`
    
    <input type="checkbox" id="${task.id}" ${task.done?'checked':''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="image/327170.png" class="delete" data-id="${task.id}" />
    `;
    tasksList.append(li);
}

//Function of RenderList task
function renderList () 
{
    tasksList.innerHTML='';
    for(let i=0;i<tasks.length;i++)
    {
        addTaskToDom(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
}

//Function of Mark task to complete or toggle the task
function toggleTask(taskId) 
{
    const task=tasks.filter(function(task)
    {
        return task.id===taskId
    });
    if(task.length>0)
    {
        const currentTask=task[0];

        if (currentTask.done) 
        {
            currentTask.done = false;
            compTask--;
        }
        else
        {
            currentTask.done = true;
            compTask++;
        }
        renderList();
        completedTask.innerHTML = compTask ;
        showNotification('Task marked successfully');
    } 
    else
    {
        showNotification('Could not mark the task');

    }
}

//function of Deleting a task
function deleteTask (taskId) 
{
    const newTasks=tasks.filter(function(task)
    {
        return task.id!==taskId
    });
    tasks=newTasks;
    renderList();
    showNotification('task deleted successfully');
    if(compTask>0)
    {
        compTask--;
        completedTask.innerHTML=compTask;
    }
}

//Function of adding a task 
function addTask (task) 
{
    if(task)
    {
        tasks.push(task);
        renderList();
        showNotification('task added successfully');
        return;
    }
    showNotification('task cannot be added');
    
}

//Function of Show notification to the user

function showNotification(text) 
{
    alert(text);
}

//Function to handle keypress and mousedown events on the input
function handleInputKeypress(e)
{
    if(e.key==='Enter'||e.type=='mousedown')
    {
        const text=addTaskInput.value;//use addtaskinput instead of e.target
        
        if(!text)
        {
            showNotification("Task text cannot be empty");
            return;
        }
        const task={
            text,
            id:Date.now().toString(),
            done:false
        }

        addTaskInput.value='';
        addTask(task);
    }

}

//function to handle click event

function handleClickListner(e)
{
    const target=e.target;
    

    if(target.className==='delete')
    {
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if(target.className==='custom-checkbox')
    {
        const taskId=target.id;
        toggleTask(taskId);
        return;
    }

}

//Function of all completed task

function allComplete()
{
    for(let i=0;i<tasks.length;i++)
    {
        tasks[i].done=true;
    }
    renderList();
    showNotification('All task marked as complete');
    completedTask.innerHTML=tasks.length;
}

//function of all clear

function allclear()
{
    const checkboxes=document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(function(checkbox)
    {
        checkbox.checked=false;

    });
    tasks.forEach(function(task)
    {
        task.done=false;
    });
    renderList();
    showNotification('All tasks cleared successully');
    completedTask.innerHTML=0;
}

//Function of Initialize the app
function initializeApp()
{
button.addEventListener('mousedown',handleInputKeypress);
document.addEventListener('click',handleClickListner);
completeall.addEventListener('click',allComplete);
clearall.addEventListener('click',allclear);
}

initializeApp();

//Get filter Links

const allLink=document.getElementById('all');
const remLink=document.getElementById('remaining');
const comLink=document.getElementById('comp');

//add event listeners to  filter links

allLink.addEventListener('click',showAllTasks);
remLink.addEventListener('click',showUncompletedTasks);
comLink.addEventListener('click',showCompletedTasks);

//Function of showing all tasks

function showAllTasks()
{
    allLink.classList.add('active');
    remLink.classList.remove('active');
    comLink.classList.remove('active');

    const tasks=document.querySelectorAll('#list li');
    tasks.forEach(task=>
        {
            task.style.display = 'flex';
            console.log(task);
        });

}

//function of showing uncompleted tasks

function showUncompletedTasks()
{
    allLink.classList.remove('active');
    remLink.classList.add('active');
    comLink.classList.remove('active');
    const tasks = document.querySelectorAll('#list li');
    tasks.forEach(task => {
        const checkbox = task.querySelector('.custom-checkbox');
        if (checkbox.checked) 
        {
            task.style.display = 'none';
        } else 
        {
            task.style.display = 'flex';
        }
    });

}
//function of showing all completed tasks

function showCompletedTasks()
{
    allLink.classList.remove('active');
    remLink.classList.remove('active');
    comLink.classList.add('active');
    const tasks = document.querySelectorAll('#list li');
    tasks.forEach(task => {
        const checkbox = task.querySelector('.custom-checkbox');
        if (checkbox.checked) 
        {
            task.style.display = 'flex';
        } else 
        {
            task.style.display = 'none';
        }
    });
}
})();

