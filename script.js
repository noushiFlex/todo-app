const textPlural = document.querySelector('#pluralText');
const sectionTasks = document.querySelector('.section');
const buttons = document.querySelectorAll('.button-filter');

let data = null;

function isTitlePlural(numberOfTask) {
    return numberOfTask === 1 ? `${numberOfTask} Tâche` : `${numberOfTask} Tâches`;
}

function updateTask(taskData, filter = null) {
    if (filter && ((filter === 'tache-a-faire' && taskData['done']) || (filter === 'tache-terminee' && !taskData['done']))) {
        return;
    }

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-section';

    const taskLabel = document.createElement('label');
    taskLabel.textContent = taskData['title'];

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = taskData['done'];

    taskDiv.appendChild(taskLabel);
    taskDiv.appendChild(taskCheckbox);
    sectionTasks.appendChild(taskDiv);
}

function clearTasks() {
    sectionTasks.innerHTML = '';
}

function fetchData(jsonFile) {
    fetch(jsonFile)
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Failed to fetch tasks');
        })
        .then((dataResponse) => {
            data = dataResponse['tasks'];
            textPlural.textContent = isTitlePlural(data.length);
            renderTasks(data, null);
        })
        .catch((error) => console.error(error));
}

function renderTasks(tasks, filter) {
    clearTasks();
    tasks.forEach((task) => updateTask(task, filter));
}
function addTask() {
    const dialogAdd = document.querySelector('.dialog');
    const noDialog = document.querySelector('#no-dialog');
    noDialog.style.filter = "blur(2px)";
    dialogAdd.style.display = "flex";

    const btnAdd = document.querySelector('.button-add');
    btnAdd.addEventListener("click", function () {

        const textAdd = document.querySelector('.value-add').value;
        if (textAdd != '') {
            alert(`${textAdd}`)
        }
    })


}

buttons.forEach((button) =>
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = e.target.id;
        if (filter != '') {
            renderTasks(data, filter);
        } else {
            addTask()
        }
    })
);

// Initial fetch
fetchData('/task.json');
