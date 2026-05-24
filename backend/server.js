import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Rută simplă de test pentru primul commit
app.get('/api/status', (req, res) => {
  res.json({ message: "Backend-ul funcționează!" });
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
