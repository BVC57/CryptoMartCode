const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  description: String,
  priceCrypto: String, // price in smallest unit or human readable (frontend+contract must agree)
  currency: { type: String, default: 'ETH' },
  createdAt: { type: Date, default: Date.now },
  sold: { type: Boolean, default: false }
});

module.exports = mongoose.model('Item', itemSchema);
