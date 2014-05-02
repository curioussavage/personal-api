/**
 * Created by adam on 5/1/14.
 */

var express = require('express'),
    app = express();
    bodyParser = require('body-parser')

// express middleware

app.use(bodyParser());

// CORS middleware

app.all('*', function(req,res, next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
    next();
});

// name and location

app.get('/name', function(req,res){
    res.json({name: 'adam'});
});

app.get('/location', function(req,res){
    res.json({location: 'SlC'});
});

// hobbies

var hobbies = ['coding', 'climbing', 'motorcycles'];

app.get('/hobbies', function(req,res){
    var hobbiesList = hobbies;

    order = req.query.order;

    if (order === 'asc') {
        hobbiesList.sort();
    } else if (order === 'desc') {
        hobbiesList.sort().reverse();
    }
    res.json({hobbies: hobbiesList});
});

  // jobs

var jobs = ['StoneRiver', 'Zrii'];

app.get('/occupations', function(req,res){
    res.json(jobs);
});
app.get('/occupations/latest', function(req,res){
    res.json({occupation: jobs[jobs.length -1]});
});

// mentions

var mentions = [];

app.get('/mentions', function(req, res){
    res.json(mentions);
});

app.post('/mentions', function(req, res) {
    var newMention = {
        date: req.body.date,
        site: req.body.site
    }
    console.log(newMention)
    mentions.push(newMention);
    res.json(newMention);
});


//  friends handlers
var friends = [];

app.get('/friends', function(req, res){
    res.json(friends);
});

app.post('/friends', function(req, res) {
    var newFriend = {
        name: req.body.name,
        location: req.body.location
    }
    friends.push(newFriend);
    res.json(newFriend);
});

// skills

var skills  = [ {
    id: 1,
    name: adam,
    experience: "1 year"
}];

app.get('/skills', function(req, res){
    res.json(skills);
    console.log(skills);
});

app.get('/skills/:id', function(req, res){
    for (i=0; i < skills.length; i++){
        if (skills[i].id == req.params.id) {
            var selectedSkill = skills[i].id;
        }
    }
    res.json(selectedSkill);
});


app.post('/skills', function(req, res) {
    var newSkill = {
        id: req.body.id,
        name: req.body.name,
        experience: req.body.experience
    }
    skills.push(newSkill);
    res.json(newSkill);
});

app.put('/skills/:id', function(req,res){
    for (var i = 0; i < skills.length; i++){
        if (skills[i].id == req.params.id) {
            skills[i].id = req;

            res.json({Confirm: "Success"})
        }else {
            res.json({error: "this ID does not exist"})
        }
    }

})




app.listen(9000);