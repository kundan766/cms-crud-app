
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/database');
const entityRoutes = require('./routes/entities');
const categoryRoutes = require('./routes/categories');
const { createCategoryTable } = require('./models/Category');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let entities = [];

app.post('/api/entities', (req, res) => {
  const newEntity = req.body;
  entities.push(newEntity);
  res.status(201).send(newEntity);
});

app.get('/api/entities', (req, res) => {
  res.status(200).send(entities);
});

app.delete('/api/entities/:id', (req, res) => {
  const { id } = req.params;
  const entityIndex = entities.findIndex(entity => entity.id === id);

  if (entityIndex !== -1) {
    entities.splice(entityIndex, 1);
    res.status(200).send({ message: 'Entity deleted successfully' });
  } else {
    res.status(404).send({ message: 'Entity not found' });
  }
});

app.use('/api/entities', entityRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  createCategoryTable(); 
});
