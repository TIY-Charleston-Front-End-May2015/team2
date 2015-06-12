
var templates = {};

templates.message = [
 "<% if(_id === '557b32324ef0f403000002a7') { console.log('usernames');%>",
 "<% } else { %>",
 "<div class='textWrap'>",
 "<div class='profImageWrap'>",
 "<div class='profImage'><img src=' <%=image%> ' alt='...'></div>",
 "<div class='theUserName'>  <%=user%> </div>",
 "</div>",
 "<div class='textBox'>",
 "<article class='message' data-id='<%= _id %>'>",
 "<h3><%= message %></h3>",
 "<a href='' class='delete deleteButton'>delete</a> | <a href='' class='editMessage'>edit</a>",
 "<div class='editing'>",
 "<input type='text' class='editMessage' value='<%= message %>'>",
 "<div class='submitEdit deleteButton'>Update</div>",
 "</div>",
 "</article>",
 "</div>",
 "</div>",
 "<% } %>"
].join("");



templates.messageOriginal = [
 "<% if(_id === '5579f02d998fae0300000185') { console.log('usernames');%>",
 "<% } else { %>",
 "<div class='textWrap'>",
 "<div class='profImage'><img src='https://octodex.github.com/images/daftpunktocat-guy.gif' alt='...' class='img-circle'></div>",
 "<div class='textBox'>",
 "<article class='message' data-id='<%= _id %>'>",
 "<h3><%= message %></h3>",
 "<a href='' class='delete deleteButton'>delete</a> | <a href='' class='editMessage'>edit</a>",
 "<div class='editing'>",
 "<input type='text' class='editMessage' value='<%= message %>'>",
 "<div class='submitEdit deleteButton'>Update</div>",
 "</div>",
 "</article>",
 "</div>",
 "</div>",
 "<% } %>"
].join("");
