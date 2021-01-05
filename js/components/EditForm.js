class EditForm {
    constructor(params) {
        this.selector = params.selector;
        this.todoObject = params.todoObject;
        this.DOM = null;
        this.lightbox = null;
        this.textarea = null;
        this.cancelBtn = null;
        this.updateBtn = null;
        this.lastEditedItemIndex = null;
    }
    init() {
        if (!this.isValidSelector()) {
            return false;
        }
        this.findInnerElements();
        this.addEvents();
    }
    isValidSelector() {
        const DOM = document.querySelector(this.selector);
        if (!DOM) {
            return false;
        }
        this.DOM = DOM;
        return true;
    }
    findInnerElements() {
        this.lightbox = this.DOM.closest('.lightbox');
        this.textarea = this.DOM.querySelector('textarea');
        this.cancelBtn = this.DOM.querySelector('button.cancel');
        this.updateBtn = this.DOM.querySelector('button.update');
    }
    show(itemIndex) {
        this.lastEditedItemIndex = itemIndex;
        this.lightbox.dataset.form='update';
        this.lightbox.classList.add('show');
        this.textarea.value = this.todoObject.taskList[itemIndex].text;
    }
    hide() {
        this.lightbox.classList.remove('show');
    }
    addEvents() {
        this.cancelBtn.addEventListener('click', e => {
            e.preventDefault();
            this.hide();
        })
        this.updateBtn.addEventListener('click', e => {
            e.preventDefault();
            this.hide();
            this.todoObject.updateTask(this.lastEditedItemIndex, this.textarea.value);
        })
    }
}

export { EditForm }