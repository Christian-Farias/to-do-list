class Storage {
  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey
  }

  set(values) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(values))
  }

  get() {
    return JSON.parse(localStorage.getItem(this.localStorageKey)) || []
  }
}
class TaskList {
  constructor(listSelector, localStorageKey) {
    this.tasks = []
    this.storage = new Storage(localStorageKey)
    this.element = document.querySelector(listSelector)

    this._update()
  }

  _renderItem(description) {
    let li = document.createElement('li')
    let button = document.createElement('button')

    button.className = 'btn-ok'

    button.onclick = () => this.remove(description)

    button.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>'

    li.appendChild(document.createTextNode(description))
    li.appendChild(button)

    this.element.appendChild(li)
  }

  _clearRender() {
    this.element.innerHTML = ''
  }

  _render() {
    this._clearRender()

    this.tasks.forEach(task => {
      this._renderItem(task.name)
    })
  }

  _save() {
    if (!this.tasks) {
      return
    }

    this.storage.set(this.tasks)
  }

  _update() {
    this.tasks = this.storage.get()
    this._render()
  }

  add(task) {
    if (this.find(task)) {
      return
    }
    this.tasks.push({ name: task })

    this._save()
    this._render()
  }

  remove(task) {
    if (!this.find(task)) {
      return
    }

    let index = this.tasks.findIndex(item => item.name == task)

    this.tasks.splice(index, 1)
    this._save()
    this._render()
  }

  find(task) {
    return this.tasks.find(item => item.name == task)
  }
}
