
var templates = {};

templates.message = [
 "<% if(_id === '557b32324ef0f403000002a7') { console.log('usernames');%>",
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
