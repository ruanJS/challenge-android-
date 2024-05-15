const oracledb = require('oracledb');

async function initialize() {
  await oracledb.createPool({
    user: 'rm551096',
    password: '180504',
    connectString: 'localhost:1521/orcl'
  });
}

module.exports.initialize = initialize;
