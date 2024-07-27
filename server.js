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
app.get('/soma', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send('Parametros inválidos. Certifique-se de que a e b sejam numeros');
    }
    const soma = a + b;
    res.send(`A soma de ${a} e ${b} é ${soma}`)
});
app.get('/multiplica', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).send('Parametros inválidos. Certifique-se de que a e b sejam numeros');
    }
    const multiplica = a * b;
    res.send(`O resultado de ${a} e ${b} é ${multiplica}`)
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
