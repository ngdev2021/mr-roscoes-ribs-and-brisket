const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    const sortedMenuItems = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    res.json(sortedMenuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
