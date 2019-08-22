var mongoose = require('mongoose'),
    Group = mongoose.model('Group');

exports.view = function (req, res, next) {
    var limit  = String(req.body.limit)  || 20; // Why String()? Because case req.body.limit = 0 is Number
    var offset = String(req.body.offset) || 0;
    var query  = req.body.query          || {};
    var sort   = req.body.sort           || {createdAt: 'desc'};
    var select = req.body.select         || '';

    var results = Group.find(query)
        .select(select)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sort)
        .exec();

    Promise.all([results]).then(results => {
        var groups = results[0]
        return res.json({
            groups: groups
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.new = function (req, res, next) {
    var group = new Group(req.body.group);

    group.save().then(result => {
        return res.json({
            groups: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.details = function (req, res, next) {
    Group.findById(req.params.id).then(result => {
        if (!result) throw new Error('Group not found');

        return res.json({
            groups: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};

exports.update = function (req, res, next) {
    Group.findById(req.params.id).then(group => {
        if (!group) throw Error('Group not found');

        if (typeof req.body.group.name !== 'undefined') {
            group.name = req.body.group.name;
        }

        if (typeof req.body.group.description !== 'undefined') {
            group.description = req.body.group.description;
        }

        if (typeof req.body.group.catalog !== 'undefined') {
            group.catalog = req.body.group.catalog;
        }

        if (typeof req.body.group.active !== 'undefined') {
            group.active = req.body.group.active;
        }

        group.save().then(group => {
            return res.json({
                groups: group
            });

        }).catch( err => res.json({ errors: err.message }) );

    }).catch( err => res.json({ errors: err.message }) );
};

exports.delete = function (req, res, next) {
    Group.findByIdAndRemove(req.params.id).then(result => {
        if (!result) throw new Error('Group not found');

        return res.json({
            groups: result
        });

    }).catch( err => res.json({ errors: err.message }) );
};
