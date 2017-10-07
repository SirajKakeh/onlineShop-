var mongoose=require('mongoose');
var Schema = mongoose.Schema;

var mongoDB= 'mongodb://sm:1234@ds013405.mlab.com:13405/shopping';

mongoose.connect(mongoDB, { useMongoClient: true });

var userSchema = new Schema({
	username: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
  products: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

var productSchema = new Schema({
  imagePath: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true}
});

var db = mongoose.connection;
db.on('error',console.error.bind(console,' mongoDB connection error'));
db.once('open', function() {
  console.log('mongoDB connection open')
});

var User = mongoose.model('User',userSchema);
var Product = mongoose.model('Product',productSchema);

module.exports.User = User;
module.exports.Product = Product;

