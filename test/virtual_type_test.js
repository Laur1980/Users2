const assert = require('assert');
const User = require('../src/user');

describe('Virtual types',() => {

    it('postCount returns number of posts', (done) => {
        var joe = new User({
            name:'Vasile',
            posts:[{title:'Title 1', body:'bla bla bla bla bla'}]
        });

        joe.save()
            .then(User.findOne({name:'Vasile'}))
            .then((user) => {
                assert(user.postCount === 1);
                done();
            });

    });

});