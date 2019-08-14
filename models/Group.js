var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var GroupSchema = new mongoose.Schema({
    name       : { type: String, trim: true },
    description: { type: String },
    catalog    : { type: String },
    active     : { type: Number, min: 0, max: 1, default: 1 }

}, { timestamps: true } );

GroupSchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('Group', GroupSchema);