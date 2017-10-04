const mongoose = require('mongoose'); 
 
mongoose.Promise = global.Promise;//ES6 promise implementation

before((done) => {

	var uri = 'mongodb://localhost/users_test';

    var promise = mongoose.connect(uri, {
      useMongoClient: true
    });
    promise.once('open', () => {
    			console.log('Good to go!');
    			done();
    		})
           .on('error', (error) => {

                console.warn('Warning',error);

            }); 

});

 beforeEach((done) =>{

 	mongoose.connection.collections.users.drop(() => {
 		done();
 	});

 });