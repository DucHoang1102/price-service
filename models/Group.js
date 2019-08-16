var mongoose        = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var GroupSchema = new mongoose.Schema({
    name       : { type: String, trim: true },
    description: { type: String }

}, { timestamps: true } );

GroupSchema.plugin(uniqueValidator, 'is already exist.');

mongoose.model('Group', GroupSchema);