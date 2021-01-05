class Todo {
    constructor(params) {
        this.selector = params.selector;
        this.DOM = null;
        this.taskList = [];


    }
    init() {
        // validacija
        if (!this.isValidSelector()) {
            return false;
        }
        this.updateStyle();
        // render
        // add events
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
    addTask(task) {
        this.taskList.push(task);
        this.renderList();
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
    updateTask() {

    }
    // CRUD: delete
    deleteTask(taskIndex) {
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
                this.initTodoItemEditing(i);
            })
            removeBtn.addEventListener('click', () => {
                this.deleteTask(i);
            })   
        }
    }
    initTodoItemEditing(taskIndex) {
        const task = this.taskList[taskIndex];
        console.log(task);
        const lightbox = document.querySelector('.lightbox');
        const formUpdate = lightbox.querySelector('form.update');
        const textarea = formUpdate.querySelector('textarea');
        const buttonCancel = formUpdate.querySelector('button.cancel');
        const buttonUpdate = formUpdate.querySelector('button.update');
        lightbox.dataset.form = 'update';
        textarea.value = task.text;
        lightbox.classList.add('show');
        buttonCancel.addEventListener('click', e => {
            e.preventDefault();
            lightbox.classList.remove('show');
        })
        buttonUpdate.addEventListener('click', e => {
            e.preventDefault();
            this.taskList[taskIndex].text = textarea.value;
            lightbox.classList.remove('show');
            this.renderList();
        })
    }
}

export { Todo }