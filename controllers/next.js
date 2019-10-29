var mongoose = require('mongoose'),
    Price    = mongoose.model('Price'),
    Group    = mongoose.model('Group');

/*
 * Next layer orders number of price on group.
 * 
 * @api    {PUT}       -> api/next?id=example
 * @param  {String} id -> The _id of price 
 * @return {Bolean}    -> True of false
 */
exports.next = async function(req, res, next) {
    try {
        var price = await Price.findById(req.query.id);
        var nextPrice = await Price.findOne({ group: price.group, layer: price.layer + 1 });
        
        if (price && nextPrice) {
            price.layer = nextPrice.layer;
            nextPrice.layer = price.layer - 1;

            price.save();
            nextPrice.save();

            return res.json({ result: true });
        }
        else {
            return res.json({ result: false });
        }
    }
    catch {
        return res.json({ result: false });
    }
}