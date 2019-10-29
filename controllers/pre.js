var mongoose = require('mongoose'),
    Price    = mongoose.model('Price'),
    Group    = mongoose.model('Group');

/*
 * Previous layer orders number of price on group.
 * 
 * @api    {PUT}       -> api/pre?id=example
 * @param  {String} id -> The _id of price 
 * @return {Bolean}    -> True of false
 */
exports.pre = async function(req, res, next) {
    try {
        var price = await Price.findById(req.query.id);
        var prePrice = await Price.findOne({ group: price.group, layer: price.layer - 1 });
        
        if (price && prePrice) {
            price.layer = prePrice.layer;
            prePrice.layer = price.layer + 1;

            price.save();
            prePrice.save();

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