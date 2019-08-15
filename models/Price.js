var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var PriceSchema = new mongoose.Schema({
    name       : { type: String },
    description: { type: String },
    regexp     : { type: String, trim: true },
    group      : { type: mongoose.Schema.Types.ObjectId },
    layer      : { type: Number},
    active     : { type: Number, min: 0, max: 1, default: 1}

}, { timestamps: true } );

PriceSchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('Price', PriceSchema);