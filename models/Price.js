var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var PriceSchema = new mongoose.Schema({
    name       : { type: String },
    description: { type: String },
    regexp     : { type: String, trim: true },
    value      : { type: Number, min: 0, default: 0 },
    layer      : { type: Number, min: 1, default: 1 },
    active     : { type: Number, min: 0, max: 1, default: 1 },
    group      : { type: mongoose.Schema.Types.ObjectId, required: true }

}, { timestamps: true } );

PriceSchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('Price', PriceSchema);