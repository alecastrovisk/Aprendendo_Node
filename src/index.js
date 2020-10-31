const { response } = require('express');
const express = require('express');

const app = express();

app.use(express.json());

//Query params: paginação e filtro
//Route params: identificar recursos(atualizar/deletar)
//Request body: Conteúdo na hora de criar ou editar um recurso(JSON)


app.get('/projects', (request, response) => {
    
    const {title, owner} = request.query;
    console.log(title);
    console.log(owner);

    return response.json([
        'projeto 1',
        'projeto 2',
    ]); 
});

app.post('/projects', (request,response) =>{
    const body = request.body;
    console.log(body);

    return response.json([
        'projeto 1',
        'projeto 2',
        'projeto 3',
    ]);
} );

app.put('/projects/:id', (request,response) =>{
    const params = request.params;
    console.log(params);

    return response.json([
        'projeto alterado',
        'prjeto 2',
        'projeto 3',
    ]);
} );

app.delete('/projects/:id', (request,response) =>{
    return response.json([
        'prjeto 2',
        'projeto 3',
    ]);
} );

app.listen(3333, () => {
    console.log("⚡back-end statrted!")
});

