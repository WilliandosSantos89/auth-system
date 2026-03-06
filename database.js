const Database = require('better-sqlite3');

// Cria ou abre o arquivo do banco de dados
const db = new Database('auth.db');

// Cria a tabela de usuários, se não existir
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, NOT NULL,
        email TEXT, NOT NULL UNIQUE,
        password TEXT, NOT NULL
        created_at TEXT DEFAULT (datetime('now')
    )
`);

console.log('✅ Banco de dados pronto');

module.exports = db;