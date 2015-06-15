
var templates = {};

templates.message = [
 "<% if(_id === '557e214b24c7a7030000029b') { console.log('usernames');%>",
 "<% } else { %>",
 "<div class='textWrap'>",
 "<div class='profImageWrap'>",
 "<div class='profImage'><img src=' <%= image %> ' alt='...'></div>",
 "<div class='theUserName'><h6><%= user %></h6> </div>",
 "</div>",
 "<div class='textBox'>",
 "<article class='message' data-id='<%= _id %>'>",
 "<h3><%= message %></h3>",
 "<a href='' name='<%= user %>' class='delete deleteButton'>delete</a> | <a href='' name='<%= user %>' class='editMessage'>edit</a>",
 "<div class='editing'>",
 "<input type='text' class='editMessage' value='<%= message %>'>",
 "<div class='submitEdit deleteButton'>Update</div>",
 "</div>",
 "</article>",
 "</div>",
 "</div>",
 "<% } %>"
].join("");

templates.Online = [
  "<% if(Status === 'true') { %>",
  "<div class= 'person'><img class ='personOnline' src=' <%= image %>' width='35' ><h6 class='WhoIsUser'><%= username %></h6> ",
  "<% } else { %>",
  "<div class= 'person'><img class ='personOffline' src=' <%= image %>' width='30' ><h6 class='WhoIsUser'><%= username %></h6> ",
  "<% } %>"
].join("");
