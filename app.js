//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const search = document.querySelector('#search');
const searchres = document.querySelector('#search-res');
const times = ['Asia/Kolkata'];



const searchTimeZones = async searchText =>{
  const res = await fetch('./timezone.json');
  const zones = await res.json();

  //get matched timezones

  let matches = zones['TimeZones'].filter(zone => {
    const regex = new RegExp(`${searchText}`, 'gi');
    return zone.match(regex)
  })

  if(searchText.length ===0 || matches.length === 0){
    matches = []
    searchres.innerHTML = ""
  }
  
  
  // console.log(matches)

  outputHtml(matches, searchText);
  // console.log(matches);
}

//Event Listeners
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
search.addEventListener('input', () => searchTimeZones(search.value));
// searchres.addEventListener('click',pushtime(e))

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
  
  }
  



 const outputHtml = (matches,searchText) =>{
   if(matches.length>0){
     const tz = matches.map(
       match => `<div class='timezones'>${match}</div>`
     ).join('')
     searchres.innerHTML = tz;

   }else if(searchText.length > 0){
      searchres.innerHTML = `<div class='timezones'>No Timezones Found</div>`
     }
    
 }

 searchres.addEventListener('click', (e)=>{
  let zone = e.target.innerText;
  times.push(zone)
  matches = []
  searchres.innerHTML = ""
 })



 function displaytimes(timezones){
   let tzs = ''

  for(let i = timezones.length -1; i>=0; i--){
    timezone = timezones[i]
    tzs += startTime(timezone)
  }

  document.getElementById('time').innerHTML = tzs;
 }

 setInterval(()=>{

  displaytimes(times);

 },500)