const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');
const database = require('./database');
console.log(database)

router.get('/', (request, response) => {
  response.status(200).send("Acessado o servidor");
})

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const connection = await database.getConnection();
    const result = await connection.execute(
      `INSERT INTO users (email, password) VALUES (:email, :password)`,
      [email, hashedPassword]
    );
    
    await connection.close();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const connection = await database.getConnection();
    const result = await connection.execute(
      `SELECT * FROM users WHERE email = :email`,
      [email]
    );
    const user = result.rows[0];
    await connection.close();

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const connection = await database.getConnection();
    const result = await connection.execute(
      `UPDATE users SET password = :password WHERE email = :email`,
      [hashedPassword, email]
    );
    await connection.close();

    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
