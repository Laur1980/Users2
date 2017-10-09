const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
	name: {
        type: String,
        validate: {
            validator: (name) => name.length>2,
            message: 'Name must be longer than 2 characters!'
        },
        required:[true,'Name is required!']
    }, 
    date: Date,
    posts:[PostSchema],
    likes:Number,
    blogPosts:[{
                    type:Schema.Types.ObjectId,
                    ref:'blogPost'
                }]
});

//using a getter function to "update" the postCount virtual atribute
UserSchema.virtual('postCount').get(function() {
    console.log('Salut');
    return this.posts.length;
});

const User = mongoose.model('user', UserSchema);
//exporting the User model 
module.exports = User;