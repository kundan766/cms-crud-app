// routes/entities.js
const express = require('express');
const { createTable, insertEntity, getEntities, updateEntity, deleteEntity } = require('../models/Entity');
const router = express.Router();

router.post('/create', (req, res) => {
  const { entityName, attributes } = req.body;
  createTable(entityName, attributes);
  res.send('Entity created.');
});

router.post('/:entityName', (req, res) => {
  const { entityName } = req.params;
  const data = req.body;
  insertEntity(entityName, data, (err, results) => {
    if (err) {
      res.status(500).send('Error inserting entity.');
      return;
    }
    res.send('Entity inserted.');
  });
});

router.get('/:entityName', (req, res) => {
  const { entityName } = req.params;
  getEntities(entityName, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching entities.');
      return;
    }
    res.json(results);
  });
});

router.put('/:entityName/:id', (req, res) => {
  const { entityName, id } = req.params;
  const data = req.body;
  updateEntity(entityName, id, data, (err, results) => {
    if (err) {
      res.status(500).send('Error updating entity.');
      return;
    }
    res.send('Entity updated.');
  });
});

router.delete('/:entityName/:id', (req, res) => {
  const { entityName, id } = req.params;
  deleteEntity(entityName, id, (err, results) => {
    if (err) {
      res.status(500).send('Error deleting entity.');
      return;
    }
    res.send('Entity deleted.');
  });
});

module.exports = router;
