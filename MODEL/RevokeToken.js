const mongoose = require('mongoose');

const revokedTokenSchema = new mongoose.Schema({
  token: String,
  revokedAt: { 
    type: Date, 
    default: Date.now
 }
});

const RevokedToken = mongoose.model('RevokedToken', revokedTokenSchema);

module.exports = RevokedToken;