const assert = require('assert');
const User = require('../src/user');

describe('update records using',() => {

	let joe;

	beforeEach((done) => {

		joe = new User({name:'Gogu'});
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

});

