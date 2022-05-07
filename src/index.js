const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { body } = request;

  const repository = repositories.find((repository) => repository.id === id);

  if (!repository)
    return response.status(404).json({ error: "Repository not found" });

  const repositoryIndex = repositories.indexOf(
    (repository) => repository.id === id
  );

  repository.title = body.title ? body.title : repository.title;
  repository.url = body.url ? body.url : repository.url;
  repository.techs = body.techs ? body.techs : repository.techs;

  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find((repository) => repository.id === id);

  if (!repository)
    return response.status(404).json({ error: "Repository not found" });

  const repositoryIndex = repositories.indexOf(
    (repository) => repository.id === id
  );

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;


    const repository = repositories.find((repository) => repository.id === id);

    if (!repository)
      return response.status(404).json({ error: "Repository not found" });

    const repositoryIndex = repositories.indexOf(
      (repository) => repository.id === id
    );

  repository.likes++
  repositories[repositoryIndex]=repositories

  return response.json(repository);
});

module.exports = app;
