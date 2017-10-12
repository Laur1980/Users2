const assert = require('assert');
const User = require('../src/user');

describe ('Select operations on User collection', () => {
 	
	var vasile, maria, alex;
 
	//before each it we create a user named joe
	beforeEach((done) => {

		vasile = new User({name:'Vasile'});
        maria = new User({name:'Maria'});
        alex = new User({name:'Alex'});
		Promise.all([vasile.save(), maria.save(), alex.save(), vasile.save()])
                .then(() => done());
			
	})


	it('finds all users with the name of Vasile', (done) => {

 		User.find({ name:'Vasile' })
 			.then((users) => {
 				console.log(users.toString());
 				console.log(users[0]._id);
 				console.log(vasile._id);
 				//assert(users[0]._id.toString() === vasile._id.toString());
 				assert(users[0]._id.toString() === vasile._id.toString());
 				done();
 			});

	});

	it('find a user named vasile',(done) => {

		User.findOne({_id: vasile._id})
			.then((user) => {
				console.log(user);
				assert(user.name === 'Vasile');
				done();
			});

	});
    
    it.only('it can skip and limit the result set',(done) => {
        
        User.find({}).sort({name:1}) //sorting an ascending fashion, using -1 makes it descending
                    .skip(1).limit(2) // with only this the order of users in the collection is not quaranteed
                    .then((users) =>{
                    
                    assert(users.length === 2);
                    assert(users[0].name === 'Maria' || users[0].name === 'Alex');
                    assert(users[1].name === 'Maria' || users[1].name === 'Alex');
                    done();
            
            });
        
    });

});
