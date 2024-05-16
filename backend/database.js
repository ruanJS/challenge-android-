const oracledb = require('oracledb');

async function initialize() {
  try {
    await oracledb.createPool({
      user: 'rm552536',
      password: '180504',
      connectString: 'oracle.fiap.com.br:1521/ORCL'
    });
    console.log("Pool de conexão criado com sucesso");
  } catch (error) {
    console.error('Erro ao inicializar o pool de conexão:', error);
    throw error;
  }
}

async function getConnection() {
  try {
    const pool = await oracledb.getPool();
    if (!pool) {
      throw new Error("Pool de conexão não inicializado.");
    }
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('Erro ao obter conexão:', error);
    throw error;
  }
}

async function query(sql, binds = [], options = {}) {
  let connection;
  let result;
  options.outFormat = oracledb.OUT_FORMAT_OBJECT;
  options.autoCommit = true;

  try {
    connection = await getConnection();
    result = await connection.execute(sql, binds, options);
    return result.rows;
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Erro ao fechar a conexão:', error);
      }
    }
  }
}

module.exports = {
  initialize,
  getConnection,
  query
};
