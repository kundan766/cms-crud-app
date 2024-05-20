// routes/categories.js
const express = require('express');
const { Category } = require('../models');

const router = express.Router();

// Create Category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Category
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCategory = await Category.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedCategory);
    } else {
      throw new Error('Category not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Category
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      throw new Error('Category not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
