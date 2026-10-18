import path from 'node:path';
import express, { type Express, type Request, type Response } from 'express';
import { addTodo, listTodos, removeTodo } from './src/todos.ts';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, 'public')));

app.get('/api/todos', (req: Request, res: Response) => {
  res.json(listTodos());
});

app.post('/api/todos', (req: Request, res: Response) => {
  const title = req.body?.title;
  if (typeof title !== 'string' || !title.trim()) {
    res.status(400).json({ error: 'title required' });
    return;
  }
  res.status(201).json(addTodo(title.trim()));
});

app.delete('/api/todos/:id', (req: Request, res: Response) => {
  if (!removeTodo(Number(req.params.id))) {
    res.status(404).json({ error: 'todo not found' });
    return;
  }
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
