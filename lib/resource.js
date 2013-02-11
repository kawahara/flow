var mongoose = require('mongoose')
    , schema = require('./schema')
    , Router = require('express/lib/router');

// connection
mongoose.connect('localhost', 'flow');

// model
var Authorization = mongoose.model('Authorization', schema.Authorization);
var User   = mongoose.model('User', schema.User);
var Recepe = mongoose.model('Recepe', schema.Recepe);
var Card   = mongoose.model('Card', schema.Card);



// router
var router = new Router();
router.route('get', '/user/:id', function(params, route, callback) {
    var id = route.params.id;
    User.findById(id, function(err, doc) {
        callback(err, doc);
    });
});
router.route('post', '/user', function(params, route, callback) {
    if (!(params instanceof User)) {
        var u = new User(params);
    }
    u.save(function (err) {
        if (err) return callback(err, null);

        callback(null, u);
    });
});
router.route('update', '/user/:id', function(params, route, callback) {
    if (!(params instanceof User)) {

        return;
    }

    if (params._id == callback.params.id) {
        params.save(function(err) {
            if (err) return callback(err, null);

            callback(params);
        });

        return;
    }

    callback('err', null);
});
router.route('delete', '/user/:id', function(params, route, callback) {
});

// resource
var Resource = function() {
};

var _dispatch = function(method, uri, params, callback) {
    var result = null;

    route = router.match(method, uri);
    if (route) {
        route.callbacks[0](params, route, callback);
        return;
    }

    callback(result);
}
Resource.prototype.get = function(uri, params, callback) {
    _dispatch('get', uri, params, callback);
};
Resource.prototype.post = function(uri, params, callback) {
    _dispatch('post', uri, params, callback);
};
Resource.prototype.delete = function(uri, params, callback) {
    _dispatch('delete', uri, params, callback);
}
Resource.prototype.update = function(uri, params, callback) {
    _dispatch('update', uri, params, callback);
};

var r = new Resource();

module.exports = r;