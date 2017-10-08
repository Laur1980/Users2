const assert = require('assert');
const User = require('../src/user');

describe('update records using',() => {

	let joe;

	beforeEach((done) => {

		joe = new User({name:'Gogu', postCount: 0, date: new Date()});
		joe.save()
			.then(() => done());
	});

	function assertName(operation, done){
		operation
		.then(() => User.find({}))					
		.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Vasile');
				done();
		});
	}

	it('model instance set n save', (done) => {

		console.log(joe);
		joe.set('name','Vasile');
		assertName(joe.save(), done);
		
	});

	it('A model instance can update', (done) => {

		assertName(joe.update({name:'Vasile'}),done);
		
	});

	it('A model class can update', (done) => {

		assertName(User.update({name:'Gogu'},{name:'Vasile'}),done);

	});

	it('A model class can update one record', (done) => {

		assertName(User.findOneAndUpdate({name:'Gogu'},{name:'Vasile'}),done);

	});

	it('A model class can find a record with an ID and update', (done) => {

		assertName(User.findByIdAndUpdate(joe._id,{name:'Vasile'}),done);

	});

	//when it becomes the xit the test is ignored by mocha
	it('a user can have the likes count incremented', (done) => {
		// $inc operator is used in conjuction of update operation to increment or decrement a numeric value o a property
		User.update({name:'Gogu'},{$inc: {likes:10}})
			.then(() => User.findOne({name:'Gogu'}))
			.then((user) => {
				console.log('postCount after update: '+user.likes);
				assert(user.likes === 10);
				console.log(user.likes);
				done();
			});

	});
	
	
});

