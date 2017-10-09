const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations',() => {
    
    var joe, blogPost, comment;
    
    beforeEach((done) => {
        
        joe = new User({name:'Vasile'});
        blogPost = new BlogPost({title:'Title 1', content: 'bla bla bla iada iada iada'});
        comment = new Comment({content:'Congrats on a great post'});
        
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;
        
        //ES api promise function that combines more promises into one!
        Promise.all([joe.save(),blogPost.save(),comment.save()])
               .then(() => done());
             
    });
    
    //it.only is used to run only one test
    it('saves a relation between user and a blogpost', (done) => {
        
        User.findOne({name:'Vasile'})
            .populate('blogPosts') //using the populate lets us see, instead of ObjecIds, the objects themselfs
            .then((user) => {
                                console.log(user);
                                assert(user.blogPosts[0].title === 'Title 1');
                                done();
                            });
        
    });
    
    
    it.only('saves a full relation graph', () => {
        User.findOne({name:'Vasile'})
            .populate({
                        path: 'blogPosts',
                        populate: {
                                    path:'comments', 
                                    model:'comment',
                                    populate: {
                                        path:'user',
                                        model: 'user'
                                    }
                                  }
                      })
            .then((user) => {
                
                assert(user.blogPosts[0].comments[0].content !== 'Congrats on a great post');
                done();
            
            });
    });
    
});