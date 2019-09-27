var mongoose = require('mongoose'),
    Price    = mongoose.model('Price'),
    Group    = mongoose.model('Group');

exports.check = async function(req, res, next) {
    var value = null;
    var prices = [];

    // Case 1: Match price in a group of prices
    if (req.body.price.idGroup) {
        prices = await Price.find({group: req.body.price.idGroup, active: 1}).sort({'layer': 'desc'}).exec();
    }
    // Case 2: Match with all prices
    else {
        prices = await Price.find({active: 1}).sort({'layer': 'desc'}).exec();
    }

    for (let price of prices) {
        let regexp = new RegExp(price.regexp, 'i');

        if (price.regexp !== undefined && regexp.test(req.body.price.match)) {
            value = price.value;
            break;
        }
    }

    return res.json({
        price: value
    });
}