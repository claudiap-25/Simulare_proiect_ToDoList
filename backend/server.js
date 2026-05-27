import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Bază de date temporară în memorie (se va reseta la fiecare repornire a serverului)
let todos = [
  { id: 1, title: "Învață Express.js", completed: false },
  { id: 2, title: "Configurează rutele de backend", completed: true }
];

// 1. Rută de test (deja existentă)
app.get('/api/status', (req, res) => {
  res.json({ message: "Backend-ul funcționează!" });
});

// 2. GET: Returnează toate task-urile din listă
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// 3. POST: Adaugă un task nou în listă
app.post('/api/todos', (req, res) => {
  const { title } = req.body;

  // Validare minimă: dacă lipsește titlul, trimitem o eroare
  if (!title) {
    return res.status(400).json({ error: "Titlul task-ului este obligatoriu!" });
  }

  const newTodo = {
    id: Date.now(), // Generăm un ID unic simplu folosind timestamp-ul curent
    title: title,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo); // Returnăm task-ul nou creat și codul 201 (Created)
});

// 4. DELETE: Șterge un task în funcție de ID-ul trimis în URL
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // Filtrăm lista pentru a elimina task-ul cu ID-ul respectiv
  const initialLength = todos.length;
  todos = todos.filter(todo => todo.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({ error: "Task-ul nu a fost găsit!" });
  }

  res.json({ message: `Task-ul cu ID-ul ${id} a fost șters.` });
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});