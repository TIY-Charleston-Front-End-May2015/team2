$(document).ready(function () {
  page.init();
});

function search (searchWord) {
  //split up searchWord.toLowerCase
  //if they type shake, and you want to return shakespeare
  //   [s,h,a,k,e] !== [s,h,a,k,e,s,p,e,a,r,e,]
 //   searchLength = search.length;
  //   check only the characters in the database (in messages), up to
  //   searchLength
  //  [s,h,a,k,e] === [s,h,a,k,e,s,p,e,a,r,e,].slice(0,searchLength)
}


var page = {
  url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat",
  yourUserName: "trevor",
  yourImage: "",
  yourPassword: "",

  init: function (arguments) {
    page.initStyling();
    page.initEvents();
  },

  initStyling: function (arguments) {

    page.loadMessages();

  },

  initEvents: function () {

    $('.content').on('click', '.delete', page.deleteMessage);
    $('.clickAway').on('click', page.addMessage);
    $('.enterAway').on('submit', page.addMessage);
    $('.newUser').on('click', page.createLogin);
    $('.returnUser').on('click', page.userLogin);
    $('.userCreate').on('click', page.createAccount);
    $('.userSubmit').on('click', page.loginAccount);


    /// On click edit this post if you are the correct user //

    $('.content').on('click', '.editMessage', function (e) {
      e.preventDefault();

      if (page.yourUserName === "trevor") {
        console.log("make some changes")
      }else{
        console.log("stop")
      };
      // if(globalUserName === $(.textBox).siblings(something).children('.theUserName')) {
            $(this).next().toggleClass('active');
      // }
    });

    $('.content').on('click', '.submitEdit', function (e) {
      e.preventDefault();
      var $thisEditing = $(this).closest('.editing');
      var messageId = $(this).closest('article').data('id');
      var updatedMessage = {
        message: $thisEditing.find('.editMessage').val(),
      };
      console.log("the updated message:",updatedMessage)
      page.updateMessage(updatedMessage, messageId);


    });

},
    userLogin: function(e){
      e.preventDefault();
      console.log("this is an existing user");
      $('.returnUser').removeClass('active');
      $('.newUser').addClass('active');
      $('.verifyPassword').removeClass('active');
      $('.pickImage').removeClass('active');
      $('.userCreate').removeClass('active');
      $('.userSubmit').addClass('active');
    },

    createLogin: function(e){
      e.preventDefault();
      console.log("this is a new user");
      $('.returnUser').addClass('active');
      $('.newUser').removeClass('active');
      $('.verifyPassword').addClass('active');
      $('.pickImage').addClass('active');
      $('.userCreate').addClass('active');
      $('.userSubmit').removeClass('active');
    },

    loginAccount: function(){
    var username= $('.userName').val();
    var password= $('.password').val();
    console.log("username: ", username);
    console.log("password: ", password);
    if(username !== "" && password !== ""){
          $.ajax({
              url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/5579f02d998fae0300000185",
              method: 'GET',
              success: function (data) {
                      console.log("this is the login data: ", data);
                      _.each(data, function(e, i){
                        // console.log("this is event: ", e);
                        // console.log("this is index: ", i);
                        if(i === username){
                          console.log("this username exists in memory: ", i);
                          console.log("this is the data for that username: ", e);
                          var arr= e.split(",");
                          console.log(arr);
                          }
                        });
                },
              error: function (err) {

              }
        });
    }
    else if(username !=="" && password == ""){
      console.log("please enter password");
    }
    else if(username =="" && password !== ""){
      console.log("please enter username");
    }
    else{
      console.log("please enter user name and password");
    }
  },
  createAccount: function(e){
    console.log("decided to create account");
    console.log($('.userName').val());
    console.log($('.image1'));
    var password= $('.password').val();
    var verifyPassword= $('.verifyPassword').val();
    if(password !== verifyPassword){
      console.log("password does not match");
    }
    else{
      console.log(password);
    }

  },
  addOne: function (message) {
    page.loadTemplate("message", message, $('.chat > .content'));
    console.log("one message to the dom:",message);
  },
  addAll: function (messageCollection) {
    _.each(messageCollection, page.addOne);
    console.log("message collection:",messageCollection)
  },

  loadMessages: function () {

    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        console.log("load messages data:",data);
        page.addAll(data);
      },
      error: function (err) {
        console.log("error on load messages:", err);
      }
    });


},
  createMessage: function (newMessage) {

    $.ajax({
      url: page.url,
      method: 'POST',
      data: newMessage,
      success: function (data) {

        page.addOne(data);
        console.log("successful message creation = ", data);
        console.log("user:",page.yourUserName);
        console.log("image:",page.yourImage);
      },
      error: function (err) {
        console.log("error on create message:", err);
      }
    });

  },
  updateMessage: function (editedMessage, messageId) {


    $.ajax({
      url: page.url + '/' + messageId,
      method: 'PUT',
      data: editedMessage,
      success: function (data) {
        $('.content').html('');
        page.loadMessages();

      },
      error: function (err) {}
    });
  },
  deleteMessage: function(e) {
    e.preventDefault();

    $.ajax({
      url: page.url + "/" + $(this).closest('article').data('id'),
      method: 'DELETE',
      success: function (data) {
        console.log("this delete:",this);
        $('.content').html('');
        page.loadMessages();

      }
    });
  },

  addMessage: function (event) {
    event.preventDefault();

    var newMessage = {
      message: $('input[name="message"]').val(),
      user: page.yourUserName,
      image: page.yourImage

    };

    page.createMessage(newMessage);

    $('input, textarea').val("");
  },


  loadTemplate: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTemplate(tmplName));

    $target.append(compiledTmpl(data));
  },


  getTemplate: function (name) {
    return templates[name];
  }

};

/////////////////////////////////////////////////////////////////////////////////
// Used the below code to create the first user account and have a static _id for user accounts
// This user _id to access user account information is "_id": "5579f02d998fae0300000185"
// $.ajax({
//       url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat" ,
//       method: 'POST',
//       data: {trossy: "{true, 'Athena12', 'https://octodex.github.com/images/momtocat.png'}"},
//       success: function (data) {
//         console.log("success!!: ", data);
//       },
//       error: function (err) {
//         console.log("error ", err);
//       }
//     });
///////////////////////////////////////////////////////////////////////////////
