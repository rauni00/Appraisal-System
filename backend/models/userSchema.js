const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['Admin', 'Supervisor', 'Peer', 'Junior'] },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  peers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  juniors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
