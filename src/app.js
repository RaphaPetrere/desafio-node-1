const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  // let repos = fetch('https://api.github.com/users/RaphaPetrere/repos');
  // return repos;
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  let newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(newRepo);
  return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const { id } = request.params;

  let repoIndex = repositories.findIndex(repository => repository.id == id);
  
  if(repoIndex < 0)
    return response.status(400).json({ error: 'Repository not found'});

  repositories[repoIndex].title = title;
  repositories[repoIndex].url = url;
  repositories[repoIndex].techs = techs;

  return response.json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  
  let repoIndex = repositories.findIndex(repository => repository.id == id);

  if(repoIndex < 0)
    return response.status(400).json({ error: 'Repository not found'});

  repositories.splice(repoIndex, 1);

  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  
  let repoIndex = repositories.findIndex(repository => repository.id == id);

  if(repoIndex < 0)
    return response.status(400).json({ error: 'Repository not found'});

  repositories[repoIndex].likes+= 1;

  return response.json(repositories[repoIndex]);
});

module.exports = app;
