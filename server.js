const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Habilitar CORS para permitir requisições do frontend React Native
app.use(cors());
app.use(express.json()); // Para lidar com JSON no corpo da requisição

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost', // Endereço do banco
  user: 'root',      // Usuário MySQL
  password: '',      // Senha do MySQL
  database: 'barbearia', // Nome do banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o banco de dados: ', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida!');
});

// Endpoint para criar um agendamento
app.post('/agendamentos', (req, res) => {
  const { name, service, provider, time } = req.body;
  const query = 'INSERT INTO agendamentos (name, service, provider, time) VALUES (?, ?, ?, ?)';
  db.query(query, [name, service, provider, time], (err, result) => {
    if (err) {
      console.error('Erro ao salvar agendamento: ', err);
      res.status(500).send('Erro ao salvar agendamento');
      return;
    }
    res.status(200).send('Agendamento realizado com sucesso!');
  });
});

// Endpoint para listar agendamentos
app.get('/agendamentos', (req, res) => {
  const query = 'SELECT * FROM agendamentos';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao listar agendamentos: ', err);
      res.status(500).send('Erro ao listar agendamentos');
      return;
    }
    res.status(200).json(results);
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
