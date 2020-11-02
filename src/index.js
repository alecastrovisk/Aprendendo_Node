const { response } = require('express');
const express = require('express');

const {  uuid, isUuid } = require('uuidv4')

const app = express();

app.use(express.json());

//Query params: paginação e filtro
//Route params: identificar recursos(atualizar/deletar)
//Request body: Conteúdo na hora de criar ou editar um recurso(JSON)
//Middleware: Interromper totalmente a requisição  ou alterar dados da requisição



const projects = [];

function logRequest(request, response, next) {
    const { method, url} = request;

    const logLabel = `[${method.toUpperCase()} ${url}]`;
    console.log(logLabel);

    return next();
}

function validateProjectId(request, response, next ) {
    const { id } = request.params;

    if(!isUuid(id)) {
        return response.status(400).json({error: 'Invalid project id.'});
    }
    
    return next();
}

app.use(logRequest);




app.get('/projects', (request, response) => {
    const { title } = request.query;

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;
    
    /* const {title, owner} = request.query;
    console.log(title);
    console.log(owner); */

    return response.json(results); 
});

app.post('/projects', (request,response) =>{
    const { title, owner} = request.body;

    const project = { id: uuid(), title, owner};

    projects.push(project);

    return response.json(project);
} );

app.put('/projects/:id', (request,response) =>{
    const { id } = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json( { error: 'project not found.' } )
    }

    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);


});

app.delete('/projects/:id',validateProjectId, (request,response) =>{
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0) {
        return response.status(400).json({ error: 'id not found.' })
    }

    projects.splice(projectIndex, 1);

    return response.status(204).json();
} );

app.listen(3333, () => {
    console.log("⚡back-end statrted!")
});

