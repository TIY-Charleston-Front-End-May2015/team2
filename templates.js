
var templates = {};

templates.message = [
  "<div class='textWrap'>",
  "<div class='profImage'><img src='https://octodex.github.com/images/daftpunktocat-guy.gif'>",
  "<div></div>",
  "</div>",
  "<div class='textBox'>",
  "<article class='message' data-id='<%= _id %>'>",
  "<p><%= message %></p>",
  "<a href='' class='delete deleteButton'>delete</a> | <a href='' class='editMessage'>edit</a>",
  "<div class='editing'>",
  "<input type='text' class='editMessage' value='<%= message %>'>",
  "<div class='submitEdit deleteButton'>Update</div>",
  "</div>",
  "</article>",
  "</div>",
  "</div>"
].join("");
