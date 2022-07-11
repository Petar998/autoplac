const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String },
        password: { type: String },
        role:{type:String},
    }
);

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  userSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
module.exports = mongoose.model('User', userSchema)