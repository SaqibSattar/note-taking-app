// script.js
const addBtn = document.querySelector('#addBtn');
const main = document.querySelector('#main');

addBtn.addEventListener("click", addNote);

function addNote() {
    const note = createNote();
    setupNoteEvents(note);
    main.appendChild(note);
}

function createNote() {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="tool">
            <i class="download fas fa-download"></i>
            <i class="save fas fa-save"></i>
            <i class="trash fas fa-trash"></i>
        </div>
        <textarea></textarea>
    `;
    return note;
}

function setupNoteEvents(note) {
    const trashIcon = note.querySelector(".trash");
    const saveIcon = note.querySelector(".save");
    const downloadIcon = note.querySelector(".download");
    const textarea = note.querySelector("textarea");

    trashIcon.addEventListener("click", () => {
        note.remove();
        saveNote("delete");
    });

    saveIcon.addEventListener("click", () => saveNote("insert"));
    downloadIcon.addEventListener("click", () => saveNote("download"));
    // textarea.addEventListener("input", () => saveNote("insert"));
}

function saveNote(action) {
    const notes = document.querySelectorAll(".note textarea");
    const data = Array.from(notes).map(note => note.value.trim()).filter(note => note !== "");
    console.log("Data : ", data)
    console.log("notes : ", notes)
    if (action === "insert" && data.length === 0) {
        alert("Error: Please enter some text before saving.");
        return;
    }

    localStorage.setItem("notes", JSON.stringify(data));

    if (action === "download") {
        downloadTextFile(data.join("\n"), "notes.txt");
    }
}

function downloadTextFile(text, filename) {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


function loadNotes() {
    const lsNotes = JSON.parse(localStorage.getItem("notes"));

    if (lsNotes !== null && lsNotes.length > 0) {
        lsNotes.forEach(noteText => {
            addNote();
            const notes = document.querySelectorAll(".note textarea");
            console.log("notes :", notes, notes.length)
            const lastNote = notes[notes.length - 1];
            console.log("lastNote :", lastNote)

            lastNote.value = noteText;
        });
    } else {
        addNote();
    }
}



loadNotes();
