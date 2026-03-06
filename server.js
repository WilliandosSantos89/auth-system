require('dotenv').config(); // carrega variáveis de ambiente
const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const db      = require('./database');

const app    = express();
const SECRET = process.env.JWT_SECRET || 'segredo_dev_local';

app.use(express.json());
app.use(express.static('public'));

// ─────────────────────────────────────────
// ROTA — Cadastro
// ─────────────────────────────────────────
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validação básica
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' });
  }

  // Verifica se email já existe
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(409).json({ error: 'Este email já está cadastrado.' });
  }

  // Gera o hash da senha (10 = custo do hash, quanto maior mais seguro e mais lento)
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insere no banco
  const result = db.prepare(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
  ).run(name, email, hashedPassword);

  res.status(201).json({ message: 'Usuário criado com sucesso!', userId: result.lastInsertRowid });
});

// ─────────────────────────────────────────
// ROTA — Login
// ─────────────────────────────────────────
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  // Busca o usuário no banco
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) {
    return res.status(401).json({ error: 'Email ou senha incorretos.' });
  }

  // Compara a senha com o hash salvo
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ error: 'Email ou senha incorretos.' });
  }

  // Gera o token JWT — expira em 2 horas
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    SECRET,
    { expiresIn: '2h' }
  );

  res.json({ message: 'Login realizado!', token, name: user.name });
});

// ─────────────────────────────────────────
// MIDDLEWARE — verifica se o token é válido
// ─────────────────────────────────────────
function autenticar(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // formato: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // disponibiliza os dados do usuário na requisição
    next();             // passa pra próxima função
  } catch {
    return res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
}

// ─────────────────────────────────────────
// ROTA PROTEGIDA — só abre com token válido
// ─────────────────────────────────────────
app.get('/me', autenticar, (req, res) => {
  res.json({
    message: 'Você está autenticado!',
    user: req.user
  });
});

app.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000');
});
