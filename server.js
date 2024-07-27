// carregamento de bibliotecas
const express = require('express');
const fs = require('fs');
const mysql = require('mysql2')

// configuração de bibliotecas
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ale',
    password: 'Senha@1234',
    database: 'estudos_schema'
});
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados como id' + connection.threadId);
});
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
app.get('/times', (req, res) => {
    const query = "SELECT * FROM estudos_schema.times";
    connection.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar dados do banco de dados');
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(results));
    })
})
app.post('/times', (req, res) => {
    const { id, nome_time, titulos } = req.body;
    if (!id || !nome_time || !titulos) {
        return res.status(400).send('Id, nome_time e titulos são obrigatórios');
    }
    const query = 'INSERT INTO estudos_schema.times (id, nome_time, titulos) VALUES (?, ?, ?)';
    connection.query(query, [id, nome_time, titulos], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao inserir o time no banco de dados' + err.message);
        }
        res.status(201).send('Time inserido com sucesso');
    })
})
app.delete('/times/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM estudos_schema.times WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao deletar o time no banco de dados' + err.message);
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Time não encontrado');
        }
        res.send('Time deletado com sucesso');
    })
})
app.put('/times/:id', (req, res) => {
    const { id } = req.params;
    const { nome_time, titulos } = req.body;

    if (!nome_time || !titulos) {
        return res.status(400).send("Nome e titulos são obrigatórios");
    }

    const query = 'UPDATE estudos_schema.times SET nome_time = ?, titulos = ? WHERE id = ?';
    connection.query(query, [nome_time, titulos, id], (err, results) => {
        if (err) {
            return res.status(500).send('Erro ao atualizar o time no banco de dados');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('Time não encontrado');
        }
        res.send('Time atualizado com sucesso');
    })
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
