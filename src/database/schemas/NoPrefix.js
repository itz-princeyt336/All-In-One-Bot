const mongoose = require('mongoose');

const UserNoPrefixSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  noPrefixEnabled: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('UserNoPrefix', UserNoPrefixSchema);