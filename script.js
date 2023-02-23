let taskList = new TaskList('#to-do-list', 'to-do-list-gn')
let inputText = ''
let taskInput = document.querySelector('#input-new-task')
const btnAddTask = document.querySelector('#btn-new-task')

taskInput.addEventListener('input', event => {
  inputText = event.target.value
})

btnAddTask.addEventListener('click', () => taskList.add(inputText))
