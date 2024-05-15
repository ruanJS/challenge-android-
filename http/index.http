const express = require('express');
const database = require('./database');
const serverRoutes = require('./server');

const app = express();

app.use(express.json());

database.initialize();

app.use('/server', serverRoutes);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
