const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'estoque'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

// Rota para cadastrar equipamento
app.post('/equipamentos', (req, res) => {
    const { nome, descricao, quantidade } = req.body;
    const sql = 'INSERT INTO equipamentos (nome, descricao, quantidade) VALUES (?, ?, ?)';
    db.query(sql, [nome, descricao, quantidade], (err, result) => {
        if (err) throw err;
        res.status(200).send('Equipamento cadastrado!');
    });
});

// Rota para registrar atividade
app.post('/atividades', (req, res) => {
    const { equipamentoId, atividade } = req.body;
    const sql = 'INSERT INTO atividades (equipamento_id, descricao) VALUES (?, ?)';
    db.query(sql, [equipamentoId, atividade], (err, result) => {
        if (err) throw err;
        res.status(200).send('Atividade registrada!');
    });
});

// Rota para listar equipamentos
app.get('/equipamentos', (req, res) => {
    const sql = 'SELECT * FROM equipamentos';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!');
});
