var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

 var UserSchema = new Schema(
   {
   username: { type: String, required: true, unique: true},
   password: { type: String, required: true },
   stream_key: {type: String},
   msgs: 
    {
    content: {type: String},
    date: {type: Date},
    sender : {type: String}
    }
  },
  {collection: 'users'}
);

UserSchema.methods.comparePassword = function (enteredPassword, callback) {
  if(enteredPassword == this.password)
    callback(null, true);
  else
    callback(null, false);
}

// module.exports = UserSchema;
module.exports = mongoose.model('User', UserSchema);