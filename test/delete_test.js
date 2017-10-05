const assert = require('assert');
const User = require('../src/user');


describe('delete user record', () => {

	let joe;

	beforeEach((done) => {
		
		joe = new User({name: 'Gogu'});
		joe.save()
		   .then(() => done());
		  // console.log(joe);

	});

	it('model instance remove', (done) => {

		joe.remove()
			.then(() => User.findOne({name:'Gogu'}))
			.then((user) => {
				console.log('user after \'instance.remove\': '+user);
				assert(user === null);
				done();
			});


	});

	it('class method remove', (done) => {

		User.remove({name:'Gogu'})
			.then(() => User.findOne({name: 'Gogu'}))
			.then((user) => {
				console.log('user after User.remove: '+user);
				assert(user === null);
				done();
			});
		
	});

	it('class method findAndRemove', (done) => {

		User.findOneAndRemove({ name:'Gogu'})
			.then(() => User.findOne({ name: 'Gogu'}))
			.then((user) => {
				console.log('user after User.remove: '+user);
				assert(user === null);
				done();
			});
		
	});

	it('class method findByIdAndRemove', (done) => {

		User.findByIdAndRemove({_id:joe._id})
			.then(() => User.findOne({_id:joe._id}))
			.then((user) => {

				assert(user === null);
				done();

			});
		
	});

});