class Todo {
    constructor(params) {
        this.selector = params.selector;
        this.DOM = null;
        this.taskList = [];
        this.lastCreatedID = 0;
        this.editForm = null;
    }
    init() {
        // validacija
        if (!this.isValidSelector()) {
            return false;
        }
        this.updateStyle();
        this.getInfoFromLocalStorage();
        this.renderList();
    }
    isValidSelector() {
        const DOM = document.querySelector(this.selector);
        if (!DOM) {
            return false;
        }
        this.DOM = DOM;
        return true;
    }
    updateStyle() {
        if (!this.DOM.classList.contains('list')) {
            this.DOM.classList.add('list');
        }
    }
    // CRUD: create, 
    addTask(text) {
        const task = {
            id: ++this.lastCreatedID,
            text: text,
            isCompleted: false 
        }
        this.taskList.push(task);
        this.renderList();
        localStorage.setItem(task.id, JSON.stringify(task));
        localStorage.setItem('last-id', this.lastCreatedID);
        return true;
    }
    generateItem(task) {
        return `<div class="item">
                    <p>${task.text}</p>
                    <div class="actions">
                        <div class="btn small edit">Edit</div>
                        <div class="btn small remove">Remove</div>
                    </div>
                </div>`;

    }
    // CRUD: read
    renderList() {
        let HTML = '';
        for (let item of this.taskList) {
            HTML += this.generateItem(item);
        }
        this.DOM.innerHTML = HTML;
        this.addEvents();
    }
    // CRUD: update
    updateTask(itemIndex, newText) {
        this.taskList[itemIndex].text = newText;
        this.renderList();
        const task = this.taskList[itemIndex];
        localStorage.setItem(task.id, JSON.stringify(task));
    }
    // CRUD: delete
    deleteTask(taskIndex) {
        localStorage.removeItem(this.taskList[taskIndex].id);
        this.taskList = this.taskList.filter((item, index) => index !== taskIndex);
        this.renderList();
    }
    addEvents() {
        const items = this.DOM.querySelectorAll('.item');
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const editBtn = item.querySelector('.btn.edit');
            const removeBtn = item.querySelector('.btn.remove');

            editBtn.addEventListener('click', () => {
                this.editForm.show(i);
            })
            removeBtn.addEventListener('click', () => {
                this.deleteTask(i);
            })   
        }
    }
    getInfoFromLocalStorage() {
        const keys = Object.keys(localStorage).sort();
        for (let key of keys) {
            const item = localStorage.getItem(key);
            const obj = JSON.parse(item);

            if (key === 'last-id') {
                this.lastCreatedID = obj;
                continue;
            } else {
                this.taskList.push(obj);
            }
        }
        console.log(this.taskList);
    }
}

export { Todo }