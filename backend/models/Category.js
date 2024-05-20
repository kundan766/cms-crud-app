
const db = require('../config/database');

const createCategoryTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

  db.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating categories table:', err);
    } else {
      console.log('Categories table created or already exists.');
    }
  });
};

module.exports = {
  createCategoryTable,
};
