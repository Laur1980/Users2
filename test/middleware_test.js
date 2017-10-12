const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware',() => {
    
    var joe, blogPost;
    
    beforeEach((done) => {
        joe = new User({name:'Vasile'});
        blogPost = new BlogPost({title:'Title 1', content: 'bla bla bla iada iada iada'});
        
        joe.blogPosts.push(blogPost);
        
        //ES api promise function that combines more promises into one!
        Promise.all([joe.save(),blogPost.save()])
               .then(() => done());
    });
    
    it.only('users clean up blogposts on delete',(done) => {
        
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
        
    });
    
});