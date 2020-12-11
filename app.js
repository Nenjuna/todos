//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


fetch('./timezone.json', { 
  method: 'GET'
})
.then(function(response) { return response.json(); })
.then(function(json) {
  // console.log(json)
  var tzs = json['TimeZones']
  // console.log(tzs)
  // use the json
});

//Event Listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);

//Functions

function addTodo(event){

    event.preventDefault();

    //Create Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //Create list items
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Create Completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //Create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append the list items
    todoList.appendChild(todoDiv);

    //Clear input value
    todoInput.value = '';

}

function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === 'trash-btn'){
        const parent = item.parentElement;
        parent.classList.toggle('fade');
        parent.addEventListener('transitionend',()=>{
            parent.remove();
        })
       
    }

    if(item.classList[0]==='complete-btn'){
        const parent = item.parentElement;
        parent.classList.toggle('completed');
    }
}

function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function startTime(zone) {
    // let today = new Date();
    let today = convertTZ(new Date, zone);
    // console.log(today)
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let day = days[today.getDay()];
    let date = today.getDate();
    let month = months[today.getMonth()];
    let year = today.getFullYear();

    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    return `<div class='card'><div class='timer'>${h} :  ${m} : ${s}
    </div> <div class='day'>${day} , ${date} ${month}  ${year}</div><div class='after'>${zone}</div>`;
    // document.getElementById('time').innerHTML = `<div class='card'>${h} :  ${m} : ${s}<\div>`;
    // document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
    
    // setTimeout(function() {
    //   startTime(zone)
    // }, 500);
  }
  // startTime('Asia/Kolkata');

  

setInterval(()=>{
  document.getElementById('card1').innerHTML = startTime('Asia/Kolkata');
  document.getElementById('card2').innerHTML = startTime('Europe/London');
  document.getElementById('card3').innerHTML = startTime('Europe/Budapest');
  document.getElementById('card4').innerHTML = startTime('Europe/Luxembourg');
  }, 500); 

