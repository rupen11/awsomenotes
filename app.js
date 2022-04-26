var texttitle = document.getElementsByClassName("texttitle")[0];
var textnote = document.getElementsByClassName("textnote")[0];
let updateBtn = document.getElementById('updateBtn');
let addBtn = document.getElementById('addBtn');
updateBtn.style.display = "none";
addBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    if (texttitle.value == "" || texttitle.value == null) {
        texttitle.classList.add("is-invalid");
    }
    else if (textnote.value == "" || textnote.value == null) {
        textnote.classList.add("is-invalid");
    }
    else {
        texttitle.classList.remove("is-invalid");
        textnote.classList.remove("is-invalid");
        let addTxt = document.getElementById('addTxt');
        let addTxtTitle = document.getElementById('addtextTitle');
        let notes = localStorage.getItem('notes');
        if (notes == null) {
            noteObj = [];
        }
        else {
            noteObj = JSON.parse(notes);
        }
        let Obj = {
            title: addTxtTitle.value,
            text: addTxt.value
        }
        noteObj.push(Obj);
        localStorage.setItem("notes", JSON.stringify(noteObj));
        addTxt.value = "";
        addTxtTitle.value = "";
        showNote();
    }
});
function showNote() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let html = "";
    noteObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-3 mx-4 card" style="width: 18rem;">
        <div class="card-body bg-ligth text-dark">
        <div class="header">Note ${index + 1}</div><hr>
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text"> ${element.text}</p>
        <button id="${index}" onclick="deleteBox(this.id)" class="btn btn-sm btn-outline-danger">Delete Note</button>
        <button id="${index}" onclick="updateBox(this.id)" class="btn btn-sm btn-outline-danger">Edit</button>
        </div>
        </div>`
    });
    let noteElement = document.getElementById('notes');
    if (noteObj.length != 0) {
        noteElement.innerHTML = html;
    }
    else {
        noteElement.innerHTML = `<div class="alert alert-danger" role="alert">
        Warning: You don't have any notes, go to Add Note section and write someting and press Add Note
        </div>`;
    }
}
function updateBox(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    texttitle.value = noteObj[index].title;
    textnote.value = noteObj[index].text;
    updateBtn.style.display = "block";
    addBtn.style.display = "none";
    updateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        noteObj[index].title = texttitle.value;
        noteObj[index].text = textnote.value;
        localStorage.setItem("notes", JSON.stringify(noteObj));
        texttitle.value = "";
        textnote.value = "";
        updateBtn.style.display = "none";
        addBtn.style.display = "block";
        showNote();
    });
}
function deleteBox(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let ready = confirm(`Are you sure you want to delete note?`);
    if (ready) {
        noteObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(noteObj));
        showNote();
    }
}
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let notecards = document.getElementsByClassName('noteCard');
    Array.from(notecards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
let clearNote = document.getElementById('clearlist');
clearNote.addEventListener('click', function () {
    let clearconfirm = confirm('Are you sure you want to delete your all notes?');
    if (clearconfirm == true) {
        localStorage.clear();
    }
    showNote();
})
window.onload = showNote();