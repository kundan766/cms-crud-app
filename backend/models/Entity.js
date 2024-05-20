
const connection = require('../config/database');

const createTable = (entityName, attributes) => {
  let query = `CREATE TABLE IF NOT EXISTS ${entityName} (id INT AUTO_INCREMENT PRIMARY KEY`;
  attributes.forEach(attr => {
    query += `, ${attr.name} ${attr.type.toUpperCase()}`;
  });
  query += ');';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
      return;
    }
    console.log(`Table ${entityName} created or already exists.`);
  });
};

const insertEntity = (entityName, data, callback) => {
  const fields = Object.keys(data).join(', ');
  const values = Object.values(data);
  const placeholders = values.map(() => '?').join(', ');

  const query = `INSERT INTO ${entityName} (${fields}) VALUES (${placeholders});`;
  connection.query(query, values, callback);
};

const getEntities = (entityName, callback) => {
  const query = `SELECT * FROM ${entityName};`;
  connection.query(query, callback);
};

const updateEntity = (entityName, id, data, callback) => {
  const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
  const values = [...Object.values(data), id];

  const query = `UPDATE ${entityName} SET ${fields} WHERE id = ?;`;
  connection.query(query, values, callback);
};

const deleteEntity = (entityName, id, callback) => {
  const query = `DELETE FROM ${entityName} WHERE id = ?`;
  connection.query(query, [id], function (err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result.affectedRows); // Return the number of affected rows
  });
};


module.exports = { createTable, insertEntity, getEntities, updateEntity, deleteEntity };

