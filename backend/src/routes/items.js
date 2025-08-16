const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middleware/auth');

// create item
router.post('/', auth, async (req, res, next) => {
  try {
    const { title, description, priceCrypto, currency } = req.body;
    const item = await Item.create({ owner: req.userId, title, description, priceCrypto, currency });
    res.json(item);
  } catch(err){ next(err); }
});

// list items
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.find({ sold: false }).populate('owner', 'username email');
    res.json(items);
  } catch(err){ next(err); }
});

// mark sold (from server after verifying blockchain payment)
router.post('/:id/mark-sold', auth, async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if(!item) return res.status(404).json({error:'not found'});
    if(item.owner.toString() !== req.userId) return res.status(403).json({error:'forbidden'});
    item.sold = true;
    await item.save();
    res.json(item);
  } catch(err){ next(err); }
});

module.exports = router;
