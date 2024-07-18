document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
    }

    const response = await fetch('/api/notes', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const notes = await response.json();

    const notesDiv = document.getElementById('notes');

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.textContent = note.content;
        notesDiv.appendChild(noteElement);
    });
});

document.getElementById('note-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const content = document.getElementById('content').value;

    const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
    });

    const note = await response.json();

    const notesDiv = document.getElementById('notes');
    const noteElement = document.createElement('div');
    noteElement.textContent = note.content;
    notesDiv.appendChild(noteElement);

    document.getElementById('content').value = '';
});
