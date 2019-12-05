// target classes
const alert = document.querySelector('.alert'); // flash alert
const add = document.querySelector('.add'); // take in data
const list = document.querySelector('.todos'); // append data

// function which takes the added task and adds it to the page
const addTaskToPg = todo => {
  const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i> 
      </li>
        `;
  list.innerHTML += html;
};

// event listener which receives the new task
add.addEventListener('submit', e => {
  e.preventDefault();
  let todo = add.add.value.trim();
  // obatin current date and time
  let date = Date();
  date = date.slice(0, 24);
  date = date.toString();
  todo += ' - (' + date + ')';
  // conditional logic to store new task in local storage
  // so that your tasks will appear when you revisit
  if (todo.length) {
    if (localStorage.getItem('todos')) {
      const todos = localStorage.getItem('todos').split(',');
      todos.push(todo);
      localStorage.setItem('todos', todos.join(','));
    } else {
      localStorage.setItem('todos', todo);
    }
    addTaskToPg(todo); // call the function to add the task to the page
    add.reset(); // reset form so new task can be entered
  }
  // flash msg
  alert.innerHTML = `Task have been added`;
  alert.style.opacity = '.9';
  setTimeout(function() {
    alert.style.opacity = '0';
  }, 7000);
});

// event listener which removes a task
list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    const removeTodo = e.target.parentElement.textContent.trim();
    e.target.parentElement.remove();
    const todos = localStorage.getItem('todos').split(',');
    const newTodos = todos.filter(todo => todo !== removeTodo); // new list without removed task
    localStorage.removeItem('todos'); // deletes the previous data
    localStorage.setItem('todos', newTodos); // add the proper one
  }
  // flash msg
  alert.innerHTML = `Task have been removed`;
  alert.style.opacity = '.9';
  setTimeout(function() {
    alert.style.opacity = '0';
  }, 7000);
});

// checks whether the local storage contains todos
if (localStorage.getItem('todos')) {
  // if found then they will be displayed to the page
  const todos = localStorage.getItem('todos').split(',');
  todos.forEach(todo => {
    if (todo.length > 0) {
      addTaskToPg(todo);
    }
  });
} else {
  // if there's no todos found, display these premade ones
  const html = `
  <li class="list-group-item d-flex justify-content-between align-items-center">
  <span>Open code editor - (Wed Dec 04 2019 20:42:14)
  </span>
  <i class="far fa-trash-alt delete"></i>
</li>
<li class="list-group-item d-flex justify-content-between align-items-center">
<span>Code awesome app - (Wed Dec 04 2019 20:42:15)
</span>
<i class="far fa-trash-alt delete"></i>
</li>
<li class="list-group-item d-flex justify-content-between align-items-center">
<span>Submit app :) - (Wed Dec 04 2019 20:42:16)
</span>
<i class="far fa-trash-alt delete"></i>
</li>
  `;
  list.innerHTML += html;
}
