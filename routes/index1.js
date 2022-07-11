// 'use strict';

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// const songsdb= require("../models/songsdb");
// const socket = require('../socketio');
// bring in model
const slugify = require('slugify');
// const slug = require('mongoose-slug-updater');


const postdb = require("../models/programmes");
const tvProgram = require("../models/tvPrograms");
const comments = require("../models/comments");
const reporter = require("../models/reporters");
const commentsDB = require("../models/comments");


// group unwind and arrange the data for use on the index page
router.get('/', function (req, res) {

    postdb.aggregate([
        {
            $unwind: "$subcategory"
        },
        {
            $match: {
                "subcategory.name": "YouNews"
            }
        },
        {
            $group: {
                _id: {
                    category: "$category",
                    commentCounts: "$commentCounts",
                    clicks: "$clickCounts",
                    subcategory: "$subcategory.name",
                    slug: "$subcategory.slug",
                    postId: "$_id",
                    viewCounts: "$viewCounts",
                    topic: "$subcategory.topic",
                    photo: "$subcategory.photo",
                    author: "$subcategory.author",
                    news: "$subcategory.news",
                    date: {
                        $substr: ["$subcategory.date", 0, 10]
                    },
                    time: {
                        $substr: ["$subcategory.date", 11, 9]
                    },
                    duration: "$subcategory.duration",
                    postlink: "$subcategory.postlink",
                    counter: "$subcategory.count"
                }
            }
        },
        // photo:"$_id.photo",
        {
            $project: {
                _id: 0,
                category: "$_id.category",
                commentCounts: "$_id.commentCounts",
                clicks: "$_id.clicks",
                subcategory: "$_id.subcategory",
                viewCounts: "$_id.viewCounts",
                slug: "$_id.slug",
                topic: "$_id.topic",
                author: "$_id.author",
                news: "$_id.news",
                postId: "$_id.postId",
                duration: "$_id.duration",
                photo: {
                    $arrayElemAt: ["$_id.photo", 0]
                },
                postlink: "$_id.postlink",
                date: "$_id.date",
                time: "$_id.time",
                counter: "$_id.counter"
            }
        }, {
            $sort: {
                "date": -1,
                "time": -1
            }
        }
    ], function (err, news) {
        if (err) {
            console.log(err);
        } else {
            postdb.aggregate([
                {
                    $unwind: "$subcategory"
                },
                {
                    $match: {
                        "subcategory.name": "YouMovies"
                    }
                },
                {
                    $group: {
                        _id: {
                            category: "$category",
                            commentCounts: "$commentCounts",
                            clicks: "$clickCounts",
                            subcategory: "$subcategory.name",
                            slug: "$subcategory.slug",
                            postId: "$_id",
                            viewCounts: "$viewCounts",
                            topic: "$subcategory.topic",

                            photo: "$subcategory.photo",
                            author: "$subcategory.author",
                            news: "$subcategory.news",
                            date: {
                                $substr: ["$subcategory.date", 0, 10]
                            },
                            time: {
                                $substr: ["$subcategory.date", 11, 9]
                            },
                            duration: "$subcategory.duration",
                            postlink: "$subcategory.postlink",
                            counter: "$subcategory.count"
                        }
                    }
                },
                // photo:"$_id.photo",
                {
                    $project: {
                        _id: 0,
                        category: "$_id.category",
                        commentCounts: "$_id.commentCounts",
                        clicks: "$_id.clicks",
                        subcategory: "$_id.subcategory",
                        viewCounts: "$_id.viewCounts",
                        slug: "$_id.slug",
                        topic: "$_id.topic",
                        author: "$_id.author",
                        news: "$_id.news",
                        postId: "$_id.postId",
                        duration: "$_id.duration",
                        photo: {
                            $arrayElemAt: ["$_id.photo", 0]
                        },
                        postlink: "$_id.postlink",
                        date: "$_id.date",
                        time: "$_id.time",
                        counter: "$_id.counter"
                    }
                }, {
                    $sort: {
                        "date": -1,
                        "time": -1
                    }
                },// {
                   // $limit: 1
//}
            ], function (err, movies) {
                if (err) {
                    console.log(err);
                } else {
                    postdb.aggregate([
                        {
                            $unwind: "$subcategory"
                        },
                        {
                            $match: {
                                "subcategory.name": "TheArtistTimeline"
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    category: "$category",
                                    commentCounts: "$commentCounts",
                                    clicks: "$clickCounts",
                                    subcategory: "$subcategory.name",
                                    slug: "$subcategory.slug",
                                    postId: "$_id",
                                    viewCounts: "$viewCounts",
                                    topic: "$subcategory.topic",

                                    photo: "$subcategory.photo",
                                    author: "$subcategory.author",
                                    news: "$subcategory.news",
                                    date: {
                                        $substr: ["$subcategory.date", 0, 10]
                                    },
                                    time: {
                                        $substr: ["$subcategory.date", 11, 9]
                                    },
                                    duration: "$subcategory.duration",
                                    postlink: "$subcategory.postlink",
                                    counter: "$subcategory.count"
                                }
                            }
                        },
                        // photo:"$_id.photo",
                        {
                            $project: {
                                _id: 0,
                                category: "$_id.category",
                                commentCounts: "$_id.commentCounts",
                                clicks: "$_id.clicks",
                                subcategory: "$_id.subcategory",
                                viewCounts: "$_id.viewCounts",
                                slug: "$_id.slug",
                                topic: "$_id.topic",
                                author: "$_id.author",
                                news: "$_id.news",
                                postId: "$_id.postId",
                                duration: "$_id.duration",
                                photo: {
                                    $arrayElemAt: ["$_id.photo", 0]
                                },
                                postlink: "$_id.postlink",
                                date: "$_id.date",
                                time: "$_id.time",
                                counter: "$_id.counter"
                            }
                        }, {
                            $sort: {
                                "date": -1,
                                "time": -1
                            }
                        }, {
                            $limit: 1
                        }
                    ], function (err, artiste) {
                        if (err) {
                            console.log(err);
                        } else {
                            postdb.aggregate([
                                {
                                    $unwind: "$subcategory"
                                }, {
                                    $group: {
                                        _id: {
                                            category: "$category",
                                            commentCounts: "$commentCounts",
                                            clicks: "$clickCounts",
                                            subcategory: "$subcategory.name",
                                            slug: "$subcategory.slug",
                                            postId: "$_id",
                                            viewCounts: "$viewCounts",
                                            topic: "$subcategory.topic",

                                            photo: "$subcategory.photo",
                                            author: "$subcategory.author",
                                            news: "$subcategory.news",
                                            date: {
                                                $substr: ["$subcategory.date", 0, 10]
                                            },
                                            time: {
                                                $substr: ["$subcategory.date", 11, 9]
                                            },
                                            duration: "$subcategory.duration",
                                            postlink: "$subcategory.postlink",
                                            counter: "$subcategory.count"
                                        }
                                    }
                                },
                                // photo:"$_id.photo",
                                {
                                    $project: {
                                        _id: 0,
                                        category: "$_id.category",
                                        commentCounts: "$_id.commentCounts",
                                        clicks: "$_id.clicks",
                                        subcategory: "$_id.subcategory",
                                        viewCounts: "$_id.viewCounts",
                                        slug: "$_id.slug",
                                        topic: "$_id.topic",
                                        author: "$_id.author",
                                        news: "$_id.news",
                                        postId: "$_id.postId",
                                        duration: "$_id.duration",
                                        photo: {
                                            $arrayElemAt: ["$_id.photo", 0]
                                        },
                                        postlink: "$_id.postlink",
                                        date: "$_id.date",
                                        time: "$_id.time",
                                        counter: "$_id.counter"
                                    }
                                }, {
                                    $sort: {
                                        "date": -1,
                                        "time": -1
                                    }
                                }

                            ], function (err, docs) {

                                if (err) { 
                                    console.log(err);
                                } else{

                                    postdb.aggregate([
                                        {
                                            $unwind: "$subcategory"
                                        },
                                        {
                                            $match: {
                                                "subcategory.name": "YouMusic"
                                            }
                                        },
                                        {
                                            $group: {
                                                _id: {
                                                    category: "$category",
                                                    commentCounts: "$commentCounts",
                                                    clicks: "$clickCounts",
                                                    subcategory: "$subcategory.name",
                                                    slug: "$subcategory.slug",
                                                    postId: "$_id",
                                                    viewCounts: "$viewCounts",
                                                    topic: "$subcategory.topic",
        
                                                    photo: "$subcategory.photo",
                                                    author: "$subcategory.author",
                                                    news: "$subcategory.news",
                                                    date: {
                                                        $substr: ["$subcategory.date", 0, 10]
                                                    },
                                                    time: {
                                                        $substr: ["$subcategory.date", 11, 9]
                                                    },
                                                    duration: "$subcategory.duration",
                                                    postlink: "$subcategory.postlink",
                                                    counter: "$subcategory.count"
                                                }
                                            }
                                        },
                                        // photo:"$_id.photo",
                                        {
                                            $project: {
                                                _id: 0,
                                                category: "$_id.category",
                                                commentCounts: "$_id.commentCounts",
                                                clicks: "$_id.clicks",
                                                subcategory: "$_id.subcategory",
                                                viewCounts: "$_id.viewCounts",
                                                slug: "$_id.slug",
                                                topic: "$_id.topic",
                                                author: "$_id.author",
                                                news: "$_id.news",
                                                postId: "$_id.postId",
                                                duration: "$_id.duration",
                                                photo: {
                                                    $arrayElemAt: ["$_id.photo", 0]
                                                },
                                                postlink: "$_id.postlink",
                                                date: "$_id.date",
                                                time: "$_id.time",
                                                counter: "$_id.counter"
                                            }
                                        }, {
                                            $sort: {
                                                "date": -1,
                                                "time": -1
                                            }
                                        }
        
                                    ], function (err, music) {
        
                                        if (err) { 
                                            console.log(err);
                                        } else {

                                            // console.log(artiste);
                                            // res.json( {news: news, movies:movies});
        
                                            res.render('index', {
                                                news: news,
                                                movies: movies,
                                                artiste: artiste,
                                                docs: docs,
                                                music:music
                                            });
                                            // console.log(comments +"docs" +"counterdetails");
                                        }
                                    });
                                }
                            
                               
                            });


                        }

                    }); 
                }
            });
        }
    });
});

router.get('/delete', (req, res) => {
    res.render('topicList');
});

router.post('/delete', (req, res) => {
    postdb.findOneAndDelete({_id: req.params.id}
    // 'subcategory.topic':getName},
    /*{ $set:{'subcategory.$.news':splitNews}}, (err)=>{
if(err){
console.log(err + query);
return;
}else{
req.flash('message', 'article edited');
re*/
    );
    console.log(req.params.id);
    req.flash('message', 'news deleted');
    res.redirect('/edit/topicList');

    // });
    // res.render('delete');
});
router.get('/aboutUs', (req, res) => {
    res.render('aboutUs');
});
router.post('/exit', (req, res) => {
    res.redirect('/');
    console.log("clicked");
});

router.get('/theValues', (req, res) => {
    res.render('posts');
});

router.get('/test', (req, res) => {
    res.render('test');
});
router.get('/counts', (req, res) => {
    res.render('counts');
});


router.get('/site', (req, res) => {
    res.render('site');
});


router.get('/reporters', (req, res) => {

    res.render('reporters');
});
// post reporters details
router.post('/reporters', (req, res) => {

    let newReporter = new reporter({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        date: new Date(Date.now()),
        surname: req.body.surname,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        phone: req.body.phone,
        email: req.body.email,
        profile: req.body.profile
    });

    reporter.createPost(newReporter, (err, newReporter) => {
        if (err) {
            console.log(err)
            req.flash('danger', err.toString());
            res.redirect('reporters');

        } else {
            req.flash('success', 'Data saved');


            res.redirect('reporters');
        }

    });


});

router.get('/likeCount', (req, res) => {
    test.find({}, (err, test) => {
        if (err) 
            return console.log(err);
        


        // {

        res.send(test);
        // res.redirect('counts', {test:test});
        console.log(test.length + "here");
        // }
    });

});


/*router.get('/afroMusic', (req, res)=>{

res.render('afroMusic');
});*/


router.post('/clicked', (req, res) => {

    let newTest = new test({likeCount: 1, date: new Date()});

    test.addLikes(newTest, (err, test) => {
        if (err) {
            res.json({success: false, msg: 'failed to create product, duplicate product'});
            console.log(err + "here" + req.body.response + "the count" + lCount + "error here");
        } else {
            res.json({success: true, msg: 'like added'});
            // res.send({test: test.likeCount});
            console.log(test.likeCount);
        }
    });

});

/*router.post('/test', (req, res)=>{
/*var newImage = new images();
newImage.img.data = fs.readFileSync(req.files.image.path)
newImage.img.contentType = 'image/png', 'image/jpeg', 'image/jpg';
newImage.save();*/

// res.send('test');
/*  upload(req, res, (err) =>{
if(err){
res.render('test',{
msg:err
});
}else{
if(req.file == undefined){
res.render('test',{
msg: 'Error: No file selected'
});
}else{
res.render('test', {
msg: 'File uploaded',
file: `uploads/${req.file.filename}`
});

}
}
});
//  console.log(file);

});*/


// get related post data

// get the data to display in comments section and other sections
router.get('/news/:slug', (req, res) => {
    postdb.update({
        'subcategory.slug': {
            $eq: req.params.slug
        }
    }, {
        $inc: {
            viewCounts: 1
        }
    },

    // postdb.findOneAndUpdate({ '_id': { $in: [mongoose.Types.ObjectId(req.params.id)] } }, { $inc: { viewCounts: 1 } },

        {
        new: true
    }, function (err, data) {
        if (err) {

            console.log(err);
        } else { //    console.log(req.params.id + req.params.slug);
            postdb.aggregate([


                {
                    $unwind: "$subcategory"
                },

                {
                    $match: {
                        'subcategory.slug': {
                            $eq: req.params.slug
                        }
                    }
                },

                {
                    $group: {
                        _id: {
                            category: "$category",
                            commentCounts: "$commentCounts",
                            clicks: "$clickCounts",
                            subcategory: "$subcategory.name",
                            slug: "$subcategory.slug",
                            postId: "$_id",
                            viewCounts: "$viewCounts",
                            topic: "$subcategory.topic",
                            photo: "$subcategory.photo",
                            author: "$subcategory.author",
                            news: "$subcategory.news",
                            date: {
                                $substr: ["$subcategory.date", 0, 10]
                            },
                            time: {
                                $substr: ["$subcategory.date", 11, 9]
                            },
                            duration: "$subcategory.duration",
                            postlink: "$subcategory.postlink",
                            counter: "$subcategory.count"
                        }
                    }
                },


                {
                    $project: {
                        _id: 0,
                        category: "$_id.category",
                        commentCounts: "$_id.commentCounts",
                        clicks: "$_id.clicks",
                        subcategory: "$_id.subcategory",
                        viewCounts: "$_id.viewCounts",
                        slug: "$_id.slug",
                        topic: "$_id.topic",
                        author: "$_id.author",
                        news: "$_id.news",
                        // "$_id.news",
                        postId: "$_id.postId",
                        duration: "$_id.duration",
                        photo: {
                            $arrayElemAt: ["$_id.photo", 0]
                        },
                        photo1: {
                            $arrayElemAt: ["$_id.photo", 1]
                        },
                        photo2: {
                            $arrayElemAt: ["$_id.photo", 2]
                        },

                      //  photo:"$_id.photo",
                        postlink: "$_id.postlink",
                        date: "$_id.date",
                        time: "$_id.time",
                        counter: "$_id.counter"
                    }
                }, {
                    $sort: {
                        "date": 1
                    }
                }
            ], function (err, docs) {
                // console.log(req.params.slug + "here");
                // res.json({docs:docs})
                if (err) {
                    console.log(err);
                } else {

                    commentsDB.aggregate([
                        {
                            $match: {
                                'postId': {
                                    $in: [mongoose.Types.ObjectId(req.params.id)]
                                }
                            }
                        },
                        {
                            $unwind: "$comments"
                        },

                        // {$match: {"comments.body"}}

                        {
                            $group: {
                                _id: {
                                    postId: "$postId",
                                    comment: "$comments.body",
                                    name: "$comments.name",
                                    slug: "$slug",
                                    time: {
                                        $substr: ["$comments.date", 11, 9]
                                    },
                                    date: {
                                        $substr: ["$comments.date", 0, 10]
                                    },
                                    count: "$counter"
                                }
                            }
                        },


                        {
                            $project: {
                                _id: 0,
                                postId: "$_id.postId",
                                comment: "$_id.comment",
                                name: "$_id.name",
                                date: "$_id.date",
                                slug: "$_id.slug",
                                time: "$_id.time",
                                count: "$_id.count"
                            }
                        }, {
                            $sort: {
                                "date": 1
                            }
                        }
                    ], function (err, comments) {
                        if (err) {
                            console.log(err);
                        } else { // for related posts that have nothing to do with id verification
                            postdb.aggregate([
                                {
                                    $unwind: "$subcategory"
                                },
                                {
                                    $group: {
                                        _id: {
                                            category: "$category",
                                            subcategory: "$subcategory.name",
                                            postId: "$_id",
                                            commentCounts: "$commentCounts",
                                            clicks: "$clickCounts",
                                            slug: "$subcategory.slug",
                                            viewCounts: "$viewCounts",
                                            topic: "$subcategory.topic",
                                            // photo: {
                                            //    $arrayElemAt: ["$subcategory.photo", 0]
                                            // },
                                            photo: "$subcategory.photo",
                                            author: "$subcategory.author",
                                            news: "$subcategory.news",
                                            date: {
                                                $substr: ["$subcategory.date", 0, 10]
                                            },
                                            time: {
                                                $substr: ["$subcategory.date", 11, 9]
                                            },
                                            duration: "$subcategory.duration",
                                            postlink: "$subcategory.postlink",
                                            counter: "$subcategory.count"
                                        }
                                    }
                                },
                                {
                                    $project: {
                                        _id: 0,
                                        category: "$_id.category",
                                        subcategory: "$_id.subcategory",
                                        commentCounts: "$_id.commentCounts",
                                        clicks: "$_id.clicks",
                                        viewCounts: "$_id.viewCounts",
                                        topic: "$_id.topic",
                                        author: "$_id.author",
                                        news: "$_id.news",
                                        slug: "$_id.slug",
                                        postId: "$_id.postId",
                                        duration: "$_id.duration",
                                        photo: {
                                            $arrayElemAt: ["$_id.photo", 0]
                                        },
                                        postlink: "$_id.postlink",
                                        date: "$_id.date",
                                        time: "$_id.time",
                                        counter: "$_id.counter"
                                    }
                                },
                                {
                                    $sort: {
                                        "date": 1
                                    }
                                }, {
                                    $limit: 4
                                }
                            ], function (err, counterDetails) {
                                if (err) {
                                    console.log(err);
                                } else {

                                    postdb.aggregate([
                                        {
                                            $unwind: "$subcategory"
                                        },
                                        {
                                            $match: {
                                                'subcategory.name': "YouNews"
                                            }
                                        },
                                        {
                                            $group: {
                                                _id: {
                                                    category: "$category",
                                                    subcategory: "$subcategory.name",
                                                    postId: "$_id",
                                                    commentCounts: "$commentCounts",
                                                    clicks: "$clickCounts",
                                                    slug: "$subcategory.slug",
                                                    viewCounts: "$viewCounts",
                                                    topic: "$subcategory.topic",
                                                    // photo: {
                                                    //     $arrayElemAt: ["$subcategoy.photo", 0]
                                                    // },
                                                    photo: "$subcategory.photo",
                                                    news: "$subcategory.news"

                                                }
                                            }
                                        },

                                        {
                                            $project: {
                                                _id: 0,
                                                category: "$_id.category",
                                                subcategory: "$_id.subcategory",
                                                commentCounts: "$_id.commentCounts",
                                                clicks: "$_id.clicks",
                                                viewCounts: "$_id.viewCounts",
                                                topic: "$_id.topic",
                                                news: "$_id.news",
                                                slug: "$_id.slug",
                                                postId: "$_id.postId",
                                                photo: {
                                                    $arrayElemAt: ["$_id.photo", 0]
                                                }

                                            }
                                        }, {
                                            $limit: 1
                                        }
                                    ], function (err, relatedNews) {
                                        if (err) {
                                            console.log(err);

                                        } else {

                                            postdb.aggregate([
                                                {
                                                    $unwind: "$subcategory"
                                                },
                                                {
                                                    $match: {
                                                        'subcategory.name': "YouSports"
                                                    }
                                                },
                                                {
                                                    $group: {
                                                        _id: {
                                                            category: "$category",
                                                            subcategory: "$subcategory.name",
                                                            postId: "$_id",
                                                            commentCounts: "$commentCounts",
                                                            clicks: "$clickCounts",
                                                            slug: "$subcategory.slug",
                                                            viewCounts: "$viewCounts",
                                                            topic: "$subcategory.topic",
                                                            // photo: {
                                                            //    $arrayElemAt: ["$subcategory.photo", 0]
                                                            // },
                                                            photo: "$subcategory.photo",
                                                            news: "$subcategory.news"

                                                        }
                                                    }
                                                },

                                                {
                                                    $project: {
                                                        _id: 0,
                                                        category: "$_id.category",
                                                        subcategory: "$_id.subcategory",
                                                        commentCounts: "$_id.commentCounts",
                                                        clicks: "$_id.clicks",
                                                        viewCounts: "$_id.viewCounts",
                                                        topic: "$_id.topic",
                                                        news: "$_id.news",
                                                        slug: "$_id.slug",
                                                        postId: "$_id.postId",
                                                        photo: {
                                                            $arrayElemAt: ["$_id.photo", 0]
                                                        }

                                                    }
                                                }, {
                                                    $limit: 1
                                                }
                                            ], function (err, relatedSports) {
                                                if (err) {
                                                    console.log(err);

                                                } else {
                                                    console.log(relatedSports)
                                                    postdb.aggregate([
                                                        {
                                                            $unwind: "$subcategory"
                                                        }, {
                                                            $match: {
                                                                'subcategory.name': "YouMusic"
                                                            }
                                                        }, {
                                                            $group: {
                                                                _id: {
                                                                    category: "$category",
                                                                    subcategory: "$subcategory.name",
                                                                    postId: "$_id",
                                                                    commentCounts: "$commentCounts",
                                                                    clicks: "$clickCounts",
                                                                    slug: "$subcategory.slug",
                                                                    viewCounts: "$viewCounts",
                                                                    topic: "$subcategory.topic",
                                                                    photo: {
                                                                        $arrayElemAt: ["$subcategory.photo", 0]
                                                                    },
                                                                    // photo: "$subcategory.photo",
                                                                    news: "$subcategory.news"

                                                                }
                                                            }
                                                        }, {
                                                            $limit: 1
                                                        }
                                                    ], // ,{$limit:4}

                                                            function (err, relatedMusic) {
                                                        if (err) {
                                                            console.log(err);

                                                        } else {
                                                            console.log(relatedMusic);
                                                            res.render('news', {
                                                                docs: docs,
                                                                comments: comments,
                                                                count: data,
                                                                details: counterDetails,
                                                                postId: req.params.id,
                                                                relatedNews: relatedNews,
                                                                relatedSports: relatedSports,
                                                                relatedMusic: relatedMusic
                                                            });
                                                            // res.json({docs:docs});
                                                            // console.log(comments +"docs" +"counterdetails");
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });

        }

        // });


    });


});


module.exports = router;
