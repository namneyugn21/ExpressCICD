# ExpressCICD

A small todo app built with Express and TypeScript. It is a practice project for learning how to set up continuous integration and deployment with GitHub Actions and Render.

## Running locally

Requires Node.js 23.6 or newer, which can run TypeScript files directly.

```bash
npm ci
npm start
```

Open http://localhost:3000. The server uses the `PORT` environment variable if it is set.

To run the tests and the type check:

```bash
npm test
npx tsc --noEmit
```

## API

| Method | Path             | Description                                   |
| ------ | ---------------- | --------------------------------------------- |
| GET    | `/api/todos`     | List all todos                                |
| POST   | `/api/todos`     | Add a todo. Body: `{ "title": "..." }`        |
| DELETE | `/api/todos/:id` | Remove a todo. Returns 404 if it does not exist |

Todos are kept in memory, so they are cleared whenever the server restarts.

## CI/CD

The workflow in `.github/workflows/ci.yml` has two jobs:

- **build-and-test** runs on every pull request and every push to `main`. It installs dependencies, type-checks the code and runs the tests.
- **deploy** runs only on pushes to `main`, and only after build-and-test passes. It calls a Render deploy hook stored in the `RENDER_DEPLOY_HOOK` repository secret.

The `main` branch is protected, so changes go in through pull requests that pass CI before they can be merged.

## Project structure

```
index.ts            Express server and API routes
src/todos.ts        Todo logic
src/todos.test.ts   Tests (Vitest)
public/index.html   Frontend
```
