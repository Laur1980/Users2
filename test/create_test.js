const assert = require('assert');
const User = require('../src/user');

describe('Create records', () => {

	it('asserts 1 +1 ', () => {

		assert(1+1 === 2);

	});

	it('creates a record for joe',(done) =>{

		const joe = new User({name:'Joe'});
		joe.save()
			.then(() => {
				//isNew flagg is true only if the object is not saved into mongodb
				assert(!joe.isNew);
				done();
			});

	});
	
});