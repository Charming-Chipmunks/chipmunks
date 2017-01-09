// route-data.js

module.exports = {

  likes: function (body) {
    var likes = [
      `Liked the ${body.jobTitle} position at ${body.company},`,
      `Good choice, you're interested in working at ${body.company}`,
      `You favored the ${body.jobTitle} role at ${body.company}`,
      `Liking the ${body.jobTitle} positon at ${body.company} is the first step!` 
    ];
      
    return likes[Math.floor(Math.random() * likes.length)];
  },

  study: function(body) {
    var study = [
      `Reading up on what ${body.company} does is a great way to decide if you would like working there.`,
      `Gee, I wonder what this company does,  better check out their website.`,
      `You'll never know if this is the company for you unless you learn about them`,
      `Maybe LinkedIn or CrunchBase has some good info on ${body.company}.`,
      `Go ahead, Google ${body.company}`,
      `Glassdoor is a great place to go for info.`
    ];

    return study[Math.floor(Math.random() * study.length)];
  },

  connections: function(body) {
    var connections = [
      `Check out LinkedIn and Facebook and see if you know anyone at ${body.company}.`,
      `Its scientifically proven that the best way to get a job is through your persoal connections!`,
      `You may have a connection with someone who works at ${body.company}, find out on LinkedIn and Facebook.`,
      `A personal connection at ${body.company} could help you get hired and them get a referral bonus.`,
      `Career coaches all agree, personal connections are the best way to get a job.`,
      `Friends from school are a great way to get a referral into a company.`
    ];

    return connections[Math.floor(Math.random() * connections.length)];
  },

  apply: function(body) {
    var apply = [
      `Did you send in that application?`,
      `Studies have shown that if you dont apply within a week of locating that job,  you most likely aren't interested`,
      `Send in that application, this could be your job!`
    ];

    return apply[Math.floor(Math.random() * apply.length)];
  },

  followup: function() {
    var follow = [
      `You should give them 7 days before you follow up.`,
      `Following up shows you are interested in the job.`,
      `Just be patient for a few days, then follow up.`
    ];
    return follow[Math.floor(Math.random() * follow.length)];
  },


  types: [
    'like', 
    'learn', 
    'connections', 
    'apply', 
    'follow up',     
    'interview',
    'schedule', 
    'email', 
    'phone', 
    'offer', 
    'meetup', 
    'resume'
  ],
  
  daysForLearning: 2,

  daysForApplication: 2

};