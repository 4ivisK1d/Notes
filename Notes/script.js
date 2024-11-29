const inputNotes = document.getElementById("inputNotesContent");
const btnCreateNotes = document.getElementById("btnCreate");
const ulResult = document.getElementById("ulResultContent");
const btnContentComleted = document.getElementsByClassName("btnCompleted");
const btnDelete = document.getElementById("btnDelete");

const notes = [
  {
    title: "Посмотреть видео про объекты",
    completed: false,
  },
  {
    title: "Внедрить объекты в код",
    completed: true,
  },
];

function render() {
  ulResult.innerHTML = "";
  for (let i = 0; i < notes.length; i++) {
    ulResult.insertAdjacentHTML("beforeend", getNoteInUl(notes[i], i));
  }
  // ulResult.insertAdjacentHTML("beforeend", getNoteInUl(notes[0]));
  // ulResult.insertAdjacentHTML("beforeend", getNoteInUl(notes[1]));
  if(notes.length === 0){
    ulResult.innerHTML = '<p>Заметок нет</p>'
  }
}

btnCreateNotes.onclick = function () {
  // Если input пустой, то новый <li> создаваться не будет
  if (inputNotes.value.length === 0) {
    alert("Содержимое заметки не может быть пустым!");
    return undefined;
  }

  const newNote = {
    title: inputNotes.value,
    completed: false,
  };

  // Добавление <li>
  notes.push(newNote);
  render();
  // Очищение input
  inputNotes.value = "";
};

render();

ulResult.onclick = function (event) {
  if (event.target.dataset.index){
    const i = Number(event.target.dataset.index)
    const type = event.target.dataset.type

    if (type==='toggle'){
      notes[i].completed = !notes[i].completed
    } else if(type==='remove'){
      notes.splice(i, 1)
    }

    render()
  }
};

//
function getNoteInUl(notes, index) {
  return `
            <li>
                <div id="spanFullContent">
                    <div id="spanContent">
                          <span id="content" class = "${
                            notes.completed
                              ? "text-decoration-line-through"
                              : ""
                          }">${notes.title}</span> 
                    </div>
                    <div id="spanBtn">
                          <span><button class="btnComleted" id = '${
                            notes.completed ? "btnCompletedActive" : ""
                          }'data-index='${index}' data-type='toggle'>✓</button></span>
                          <span><button id="btnDelete" data-index='${index}' data-type='remove'>x</button></span>
                    </div>
                </div>
            </li>
          `;
}
