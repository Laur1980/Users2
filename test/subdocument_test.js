const assert = require('assert');
const User = require('../src/user');

describe('subdocuments', () => {

    it('it can create a subdocument', (done) => {

        const joe = new User({name:'Vasile', 
                              posts: [{title:'Darebee mission', body:'The Darebee Resource is an independent fitness resource run and maintained by a small group of volunteers and fitness professionals. Here we make fitness accessible, make training fun and make a healthy lifestyle easier to start and maintain – on a budget. We believe that fitness is not a privilege, it should be made this accessible for everyone - not just people who can pay for it. '},
                                      {title: 'Darebee mission 2', body:'Each one of the members of the core team has a story and a reason to be here, doing what we do. We are united by our passion for training and an incurable case of principles. We all have extended experience (20+ years average) with bodyweight and circuit training, running and competitive martial arts.'}]});


        joe.save()
            .then(() => User.findOne({name:'Vasile'}))
            .then((user) => {
                assert(!user.isNew);
                assert(user.posts[0].title === 'Darebee mission');
                assert(user.posts[1].title === 'Darebee mission 2');
                console.log('joes posts: '+user.posts);
                done();
            });
    });

    it('Can add subdocuments to an existing record', (done) => {
      
        var joe = new User({name:'Vasile',posts:[]});
        joe.save()
            .then(() => User.findOne({name:'Vasile'}))
            .then((user) => {
                user.posts.push({title:'Darebee mission',
                                 body:'The Darebee Resource is an independent fitness resource run and maintained by a small group of volunteers and fitness professionals. Here we make fitness accessible, make training fun and make a healthy lifestyle easier to start and maintain – on a budget. We believe that fitness is not a privilege, it should be made this accessible for everyone - not just people who can pay for it. '});
                return user.save();
            })
            .then(() => User.findOne({name:'Vasile'}))
            .then((user) => {
               assert(user.posts[0].title === 'Darebee mission');
               done();
            });

    });

    it('removes a subdocument',(done) => {

        var joe = new User({name:'Vasile',
                            posts:[{title:'Title1',body:'Bla bla bla bla bla'}]
                          });
        joe.save()
           .then(() => User.findOne({name:'Vasile'}))
           .then((user) => {
               user.posts[0].remove();
               return user.save();
           })
           .then(() => User.findOne({name:'Vasile'}))
           .then((user) => {
                assert(user.posts.length === 0);
                done();
           });

    });

});