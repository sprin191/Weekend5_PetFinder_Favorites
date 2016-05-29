var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FavSchema = new Schema({
  petID: { type: String },
  name: { type: String},
  image: { type: String},
  description: { type: String}
});

var Favorite = mongoose.model('Favorite', FavSchema);

module.exports = Favorite;
