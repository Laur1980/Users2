const assert = require('assert');
const User = require('../src/user');

describe ('Select operations on User collection', () => {
 	
	let joe;
 
	//before each it we create a user named joe
	beforeEach((done) => {

		joe = new User({name:'Joe'});
		joe.save()
			.then(() => done())

	})


	it('finds all users with the name of joe', (done) => {

 		User.find({ name:'Joe' })
 			.then((users) => {
 				console.log(users.toString());
 				console.log(users[0]._id);
 				console.log(joe._id);
 				//assert(users[0]._id.toString() === joe._id.toString());
 				assert(users[0]._id.toString() === joe._id.toString());
 				done();
 			});

	});

	it('find a user named joe',(done) => {

		User.findOne({_id: joe._id})
			.then((user) => {
				console.log(user);
				assert(user.name === 'Joe');
				done();
			});

	});

});
