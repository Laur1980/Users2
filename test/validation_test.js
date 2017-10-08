const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    
    it('requires a user name', (done) => {
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        var message = validationResult.errors.name.message;
        console.log(validationResult);
        
        assert(message === 'Name is required!');
        done();
    });
    
    it('requires a user name to be longer than 2 characters', (done) => {
        
        var user = new User({name: 'Va'});
        var validationResult = user.validateSync();
        var message = validationResult.errors.name.message;
        
        assert(message === 'Name must be longer than 2 characters!');
        done();
    });
    
    it('disallows invalid records from being saved', (done) => {
        
        const user = new User({name: 'Al'});
        user.save()
            .catch((validationResult) => {
                const message = validationResult.errors.name.message;
                assert(message === 'Name must be longer than 2 characters!');
                done();
            });
        
    });
    
});