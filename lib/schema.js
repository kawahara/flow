var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var Authorization = mongoose.Schema({
    type: String,
    infomation: Schema.Types.Mixed,
});

exports.Authorization = Authorization;

var User = mongoose.Schema({
    name: String,
    authorization: [Authorization]
});

exports.User = User;

var Card = mongoose.Schema({
    subject: String,
    body: String,
    command: String
});

exports.Card = Card;

var Recepe = mongoose.Schema({
    user_id: {type: Schema.Types.ObjectId, ref: User},
    subject: String,
    detail: String,
    cards: [Card]
});

exports.Recepe = Recepe;
