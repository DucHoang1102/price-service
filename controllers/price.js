var mongoose = require('mongoose'),
    Price = mongoose.model('Price');

exports.index = function (req, res, next) {
    return res.json({
        status: 'Price Service Api',
        message: 'Welcome'
    });
};

exports.view = function (req, res, next) {
};

exports.new = function (req, res, next) {
    var price = new Price(req.body.price);

    return price.save().then(result => {
        res.json({
            prices: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.details = function (req, res, next) {
    Price.findById('5d51bcf46716902cd408a873').then(result => {
        var re = new RegExp(result.regexp, 'i');

        var datas = [
            {
                should: 'True',
                str   : 'A-34445jhdddd343-CT1-S-2'
            },
            {
                should: 'False',
                str   : 'B-34445jhdddd343-CT1'
            },
            {
                should: 'False', 
                str   : 'B-A34445jhdddd343-CT2'
            },
            {
                should: 'False',
                str   : 'B-34445jhdddd343-'
            },
            {
                should: 'True',
                str   : 'A-efdeef1dfe-CT1-XL-2'
            },
            {
                should: 'True',
                str   : 'A-123123ddd-CT1-XXXXL-2'
            },
        ]

        for (let data of datas)
        {
            console.log(data.should + '----' + re.test(data.str));
        }

        return res.json({});
    }).catch( err => res.json({ errors: err.message }) );
};

exports.update = function (req, res, next) {
    return res.json({
        message: 'Ok thank you'
    });
};

exports.delete = function (req, res, next) {
    return res.json({
        message: 'Ok thank you'
    });
};
