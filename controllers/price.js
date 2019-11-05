var mongoose = require('mongoose'),
    Price = mongoose.model('Price');

exports.index = function (req, res, next) {
    return res.json({
        status: 'Price Service Api',
        message: 'Welcome'
    });
};

exports.view = function (req, res, next) {
    var limit  = String(req.body.limit)  || 20; // Why String()? Because case req.body.limit = 0 is Number
    var offset = String(req.body.offset) || 0;
    var query  = req.body.query          || {};
    var sort   = req.body.sort           || {createdAt: 'desc'};
    var select = req.body.select         || '';

    var results = Price.find(query)
        .select(select)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort)
        .exec();

    Promise.all([results]).then(results => {
        var prices = results[0]
        return res.json({
            prices: prices
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.new = function (req, res, next) {
    var price = new Price(req.body.price);
    
    Price.countDocuments({ group: req.body.price.group }).then(count => {
        price.layer = count + 1;
    
        price.save().then(result => {
            return res.json({
                prices: result
            });

        }).catch( err => res.json({ errors: err.message }) );
        
    }).catch( err => res.json({ errors: err.message }) );
};

exports.details = function (req, res, next) {
    Price.findById(req.params.id).then(result => {
        if (!result) throw new Error('Price not found');

        return res.json({
            prices: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.update = function (req, res, next) {
    Price.findById(req.params.id).then(price => {
        if (!price) throw Error('Price not found');

        if (typeof req.body.price.name !== 'undefined') {
            price.name = req.body.price.name;
        }

        if (typeof req.body.price.description !== 'undefined') {
            price.description = req.body.price.description;
        }

        if (typeof req.body.price.regexp !== 'undefined') {
            price.regexp = req.body.price.regexp;
        }

        if (typeof req.body.price.value !== 'undefined') {
            price.value = req.body.price.value;
        }

        if (typeof req.body.price.active !== 'undefined') {
            price.active = req.body.price.active;
        }

        price.save().then(price => {
            return res.json({
                prices: price
            });

        }).catch( err => res.json({ errors: err.message }) );

    }).catch( err => res.json({ errors: err.message }) );
};

exports.delete = function (req, res, next) {
    Price.findByIdAndRemove(req.params.id).then(price => {
        if (!price) throw new Error('Price not found');

        // Reset layer
        Price.find({group: price.group}).sort('layer').then(remainingPrices => {
            for (let i = 0; i < remainingPrices.length; i++) {
                remainingPrices[i].layer = i + 1;
                remainingPrices[i].save();
            }

            return res.json({
                prices: price
            });
        });

    }).catch( err => res.json({ errors: err.message }) );
};
