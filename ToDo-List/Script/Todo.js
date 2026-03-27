let A = document.querySelector('.js-input');
let B = document.querySelector('.js-date');
let todoList = '';
let todol = JSON.parse(localStorage.getItem('List')) || [];
if (!Array.isArray(todol)) {
    todol = [];
}
renderTodoList();

function add() {
    
    let todoItem = {name: A.value,Date: B.value}; 
    console.log(todoItem);
    if (A.value === ''){
        document.querySelector('.error').innerHTML = `<p style="color:Red"> Can't add with empty Name </p>`;
        return;
    }
    else if (B.value === ''){
        document.querySelector('.error').innerHTML = `<p style="color:Red"> Can't add with empty Date </p>`;
        return;
    }
    else{
        document.querySelector('.error').innerHTML = '';   
    }
    todol.push(todoItem);
    localStorage.setItem('List',JSON.stringify(todol));

    renderTodoList();
    A.value = '';
    B.value = '';
}

function renderTodoList() {
    let todoListHTML = '';
    todol.forEach((todoObject, index) => {
        const {name,Date} = todoObject;
        todoListHTML += `
        <div class="one">${name}</div>
        <div class="two">${Date}</div>
        <button class="js-delete" 
        ">Delete</button>
        `;
    });
    document.querySelector('.display1').innerHTML = todoListHTML;
    
    document.querySelectorAll('.js-delete').forEach((deleteButton,index) =>{
        deleteButton.addEventListener('click',() =>{
            todol.splice(index,1);
            console.log(index);
            localStorage.setItem('List',JSON.stringify(todol));
            renderTodoList();
        });
    });
    
}

document.querySelector('.js-add').addEventListener('click',() => {
    renderTodoList();
    add();
});

function clearAll() {
    todol = [];
    localStorage.removeItem('List');
    renderTodoList();
}