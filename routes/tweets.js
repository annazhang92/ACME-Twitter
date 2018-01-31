const app =require('express').Router();
const db =require('../db');
module.exports =app;

// db.sync((err) =>{
//     if(err) return console.log(err);
//     db.getUsers((err,users)=>{
//         if(err) return console.log(err);
//         console.log(`there are ${users.length} users`);
//         db.seed((err)=>{
//             if(err) return console.log(err);
//             db.getUsers((err,users)=>{
//                 if(err) return console.log(err);
//                 console.log(`there are ${users.length} users`);
//             });
//         });
//     });
// });


app.get('/',(req,res,next)=>{
    db.getPeople((err,result)=>{
        if(err) return next(err)
        res.render('tweets', {title: 'Tweets', people: result });
    });

});

app.get('/:id',(req,res,next)=>{
    db.getTweet(req.params.id,(err,result)=>{
        if(err) return next(err)
        res.render('tweet', {title: 'Tweet', tweetcontent: result });
    });
});



// app.get('/',(req,res,next)=>{
//     res.render('tweets', {title: 'Tweets', people: db.getPeople() });
// });

// app.get('/:id',(req,res,next)=>{
//     const person=db.getPerson(req.params.id);
//     res.render('tweet', {title: 'Tweet',person});
// });