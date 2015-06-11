
var messages = [

  {
    title: "Tiffany",
    date: "Today"

  },
  {
    username: "Trevor",
    date: "Today"
  },

]


var templates = {};

templates.message = [

"<div class='textContainer'>",
"<div class='title'>The chat block <span class='search'><i class='fa fa-search'></i></span></div>",
"<div class='textBox'>",
"<div class='userDetails'>",
"<span class='userName'><%= username %></span>",
"<div class='date'><%= date %></div>",
"</div>",
"<div class='vote'>",
"<span>vote up down?</span>",
"</div>",
"</div>",
"</div>"

].join("");
