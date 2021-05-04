var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

 var UserSchema = new Schema({
   username: { type: String, required: true},
   userMdp: { type: String, required: true },
   msgs: {
    content: {type: String},
    date: {type: Date},
    sender : {type: String}
   }
 });

UserSchema.methods.comparePassword = function (enteredPassword, callback) {
  if(enteredPassword == this.mdp)
    callback(null, true);
  else
    callback(null, false);
}

module.exports = mongoose.model('Users', UserSchema);