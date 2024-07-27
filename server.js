const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/data', (req, res) => {
    fs.readFile('./copa_do_brasil_2023.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Erro ao ler o arquivo JSON');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);

    });
});

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
