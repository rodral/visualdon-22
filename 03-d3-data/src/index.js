import { json } from 'd3-fetch'
import * as d3 from 'd3';

let post_filtered;
let maxBodyLength=0;
let userIdMaxBodyLength;
let tab=[];
let i=0;

Promise.all([
    json('https://jsonplaceholder.typicode.com/posts'),
    json('https://jsonplaceholder.typicode.com/users')
])
//    .then(([posts, users]) => {
//    // A loop that creates a tab with number of users as index and number of post as value
//    users.forEach(usr => {
//        post_filtered = posts.filter(post => post.userId === usr.id)
//        d3.select(".container")
//            .append("p")
//            .text(usr.name + " : " + post_filtered.length + " posts");
//    });
//});
.then(([posts, users]) =>  {
    /* A loop that create a tab with number of users as index and number of post as value */
    users.forEach(usr => {
      post_filtered = posts.filter(post=>post.userId === usr.id)
      d3.select(".container").append("p").text(usr.name+" : "+post_filtered.length+" posts");
    })



   /* It's a loop that find the user with the longest post. */
    posts.forEach(post_index => {
    if (post_index.body.length>maxBodyLength) {
      maxBodyLength = post_index.body.length;
      userIdMaxBodyLength = post_index.userId;
    }
      
    })
    d3.select(".container").append("strong").text("Plus long post : "); 
    d3.select(".container").append("p").text(users[userIdMaxBodyLength].name+", avec une publication de "+maxBodyLength+" caractères");

    const WIDTH = 500
    const HEIGHT = 500

    d3.select("body").append("div").attr("class","mon-svg");
    d3.select(".mon-svg").append("svg");
    const myDiv2 = d3.select("svg").attr("width", WIDTH).attr("height", HEIGHT)
  
    /* It's a loop that find the user with the longest post. */
    users.forEach(usr => {
      post_filtered = posts.filter(post=>post.userId === usr.id)
      tab[i]= post_filtered.length;
      i++;
    })

/* It's a loop that create a rectangle with the number of post of each user. */
    const widthRect = 30;
    myDiv2.selectAll("rect")
      .data(tab)
      .enter()
      .append("rect")
      .attr('x', (d,i) => (i*40+50))
      .attr('y', d => 300-d*10)
      .attr('width', widthRect)
      .attr('height', d => d*10)
      .attr('stroke', 'none')
      .attr('fill', 'royalblue');

/* It's a loop that create a text with the number of post of each user. */
      var texts = myDiv2.selectAll("text")
	      .data(tab)
	      .enter()
	      .append("text");

      texts
      .attr('x', (d,i) => (i*40+55))
      .attr('y', d => 300+20)
	    .text(function(d){ return d});

});