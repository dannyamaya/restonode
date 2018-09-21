var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({

    origin: {type: String, required: true},
    destination: {type: String, required: true},
    distance: {type: String, required: true},
    duration_in_traffic: {type: String, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    order: {type: String, required: true},
    price: {type: String, required: true},
    order_id: {type: String, required: true, unique:true },
    created: {type: Date, default: Date.now},

}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});




module.exports = mongoose.model('Order', OrderSchema);
