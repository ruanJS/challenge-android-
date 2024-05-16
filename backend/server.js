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
      `INSERT INTO USERS (email, password) VALUES (:email, :password)`,
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
    
    // Verificar se o email e a senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ error: 'Por favor, forneça um email e uma senha.' });
    }

    // Consultar o banco de dados para encontrar o usuário com o email fornecido
    const connection = await database.getConnection();
    const result = await connection.execute(
      `SELECT * FROM USERS WHERE email = :email`,
      [email]
    );
    await connection.close();

    // Verificar se o usuário com o email fornecido foi encontrado
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Se as credenciais estiverem corretas, retornar uma mensagem de login bem-sucedido
    res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    // Verificar se o email e a nova senha foram fornecidos
    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Por favor, forneça um email e uma nova senha.' });
    }

    // Verificar se o email é válido
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Por favor, forneça um email válido.' });
    }

    // Verificar se a nova senha atende aos requisitos de segurança (por exemplo, comprimento mínimo)
    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'A nova senha deve ter no mínimo 8 caracteres.' });
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar a senha no banco de dados para o usuário com o email fornecido
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

router.get('/users', async (req, res) => {
  try {
    // Consultar o banco de dados para obter todos os usuários
    const users = await database.getAllUsers();

    // Enviar a lista de usuários como resposta
    res.json(users);
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Função para verificar se o email é válido
function isValidEmail(email) {
  // Implemente sua lógica de validação de email aqui, se necessário
  return true; // Exemplo simples de validação, sempre retorna true
}


module.exports = router;
