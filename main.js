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
  yourUsername: "",
  yourImage: "",
  yourPassword: "",
  selectedImage: "",
  exists: true,


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
    $('.pickImage').on('click', 'input[type=radio]', page.selectImage);
    $('.logOut').on('click', page.logOut);
    $('.content').on('click','.editMessage', page.checkIfUserCanEdit);
    $('.content').on('click', '.submitEdit', page.submitTheEdit);
    $('.toggle').on('click', 'a', page.togglePages);
    $(window).on('beforeunload', function(){ //added popup to have users log out to avoid locking account
          if(page.yourUsername !== ""){
            return "Please Log Out to Avoid Locking Account"
          }
      });


    },

    selectImage: function(e){
      page.selectedImage= $(this).attr('value');
      // console.log("you selected an image ", page.selectedImage);

    },
    togglePages: function (event) {
    event.preventDefault();
    var clickedPage = $(this).attr('rel');
    $(clickedPage).siblings().removeClass('active');
    $(clickedPage).addClass('active');
  },


    logOut: function(e){
        console.log("you want to log out");
        console.log(page.yourUsername);
        var userAccount = page.yourUsername;
        var user = {
            isOnline: false,
            pass: page.yourPassword,
            image: page.yourImage,
        };
        var objectToSend = {};
        objectToSend[userAccount] = user;

        $.ajax({
            url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557b32324ef0f403000002a7",
            method: 'PUT',
            data: objectToSend,
            success: function (data) {
              },
            error: function (err) {

            }
      });
      page.yourUsername = "";
      page.yourPassword = "";
      page.yourImage = "";
      $(".feedbackMessage").removeClass('active');
      $('.returnUser').removeClass('active');
      $('.newUser').addClass('active');
      $('.userSubmit').addClass('active');
      $('.loginData input').addClass('active');
      $('.verifyPassword').removeClass('active');
      $('.logOut').removeClass('active');
      $('.loggedOn').removeClass('active');
      $('.loggedOn img').attr("src", page.yourImage );
      $('.loggedOn h4').text(page.yourUsername);
    },
    userLogin: function(e){
      e.preventDefault();
      console.log("this is an existing user");
      $(".feedbackMessage").removeClass('active');
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
      $(".feedbackMessage").removeClass('active');
      $('.returnUser').addClass('active');
      $('.newUser').removeClass('active');
      $('.verifyPassword').addClass('active');
      $('.pickImage').addClass('active');
      $('.userCreate').addClass('active');
      $('.userSubmit').removeClass('active');
    },

    loginAccount: function(){
      $(".feedbackMessage").removeClass('active');
    var username= $('.userName').val();
    var password= $('.password').val();
    console.log("username: ", username);
    console.log("password: ", password);
    if(username !== "" && password !== ""){
          $.ajax({
              url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557b32324ef0f403000002a7",
              method: 'GET',
              success: function (data) {
                      console.log("this is the login data: ", data);
                      _.each(data, function(e, i){
                        if(i === username){
                          console.log("this is the info: ", e);

                            if(e.pass === password){
                                    console.log("you selected the correct password " ,e.isOnline);
                                    if(e.isOnline === "true"){
                                      $(".feedbackMessage").addClass('active');
                                      $('#response').text('User is Already Logged On');
                                    }
                                    else{
                                      page.yourUsername= username;
                                      page.yourImage= e.image;
                                      page.yourPassword = e.pass;
                                      console.log("your image: ", page.yourImage);
                                      console.log("your username: ", page.yourUsername);
                                      var userAccount = page.yourUsername;
                                      var user = {
                                          isOnline: true,
                                          pass: page.yourPassword,
                                          image: page.yourImage,
                                      };
                                      var objectToSend = {};
                                      objectToSend[userAccount] = user;

                                      $.ajax({
                                          url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557b32324ef0f403000002a7",
                                          method: 'PUT',
                                          data: objectToSend,
                                          success: function (data) {
                                            },
                                          error: function (err) {

                                          }
                                      });
                                      $(".feedbackMessage").removeClass('active');
                                      $('.returnUser').removeClass('active');
                                      $('.newUser').removeClass('active');
                                      $('.verifyPassword').removeClass('active');
                                      $('.pickImage').removeClass('active');
                                      $('.userCreate').removeClass('active');
                                      $('.userSubmit').removeClass('active');
                                      $('.loginData input').removeClass('active');
                                      $('.logOut').addClass('active');
                                      $('.loggedOn').addClass('active');
                                      $('.loggedOn img').attr("src", page.yourImage);
                                      $('.loggedOn h4').text(page.yourUsername);
                                }

                            }
                            else{
                              console.log("you used this password: ", password);
                              $(".feedbackMessage").addClass('active');
                              $('#response').text('Incorrect Password');
                            }
                              }
                        });
                },
              error: function (err) {

              }
        });
    }
    else if(username !=="" && password == ""){
      // console.log("please enter password");
      $(".feedbackMessage").addClass('active');
      $('#response').text('Please Enter Password');
    }
    else if(username =="" && password !== ""){
      console.log("please enter username");
      $(".feedbackMessage").addClass('active');
      $('#response').text('Please Enter Username');
    }
    else{ //if button is pressed but nothing was entered it will do nothing
      console.log("please enter user name and password");
    }
  },


  createAccount: function(e){
    console.log("decided to create account");
    console.log($('.userName').val());
    var password= $('.password').val();
    var vPassword= $('.verifyPassword').val();
    console.log(page.selectedImage);
    if(password !== vPassword){
      console.log("password does not match");
    }
    else{
      var userAccount = $('.userName').val();
      console.log("this is page exists: ", page.exists);
      $.ajax({
          url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557b32324ef0f403000002a7",
          method: 'GET',
          success: function (data) {
                  console.log("this is the login data: ", data);
                  _.each(data, function(e, i){
                    if(i === userAccount){
                      console.log("this username already exists");
                      page.exists = false;
                      console.log("this is page.exists: ", page.exists)

                    }
                  });
                }
        });
        if(page.exists){
          console.log("it said this was false: " ,page.exists)
                    var user = {
                        isOnline: true,
                        pass: password,
                        image: page.selectedImage
                    };
                    var objectToSend = {};
                    objectToSend[userAccount] = user;
                $.ajax({
                     url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557b32324ef0f403000002a7",
                     method: 'PUT',
                     data: objectToSend,
                     success: function (data) {
                       console.log("success!!: ", data);
                       page.yourUsername= userAccount;
                       page.yourImage= page.selectedImage;
                       page.yourPassword= password;
                       console.log("these are set for the page: ", page.yourUsername + page.yourImage);
                       $(".feedbackMessage").removeClass('active');
                       $('.returnUser').removeClass('active');
                       $('.newUser').removeClass('active');
                       $('.verifyPassword').removeClass('active');
                       $('.pickImage').removeClass('active');
                       $('.userCreate').removeClass('active');
                       $('.userSubmit').removeClass('active');
                       $('.loginData input').removeClass('active');
                       $('.logOut').addClass('active');
                       $('.loggedOn').addClass('active');
                       $('.loggedOn img').attr("src", page.yourImage);
                       $('.loggedOn h4').text(page.yourUsername);
                       $('.loginData').reset();

                     },
                     error: function (err) {
                       console.log("error ", err);
                     }
              });
        }
        else{
          console.log("cant create this account");
          console.log("page exists");
        }
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

  checkIfUserCanEdit: function (e) {

  e.preventDefault();

  if (page.yourUserName === "trevor") {
    console.log("make some changes")
  }else{
    console.log("stop")
  };
  // if(globalUserName === $(.textBox).siblings(something).children('.theUserName')) {

        $(this).next().toggleClass('active');


  // }
},

  submitTheEdit: function (e) {

    e.preventDefault();
      console.log("submit the edit");
          var $thisEditing = $(this).closest('.editing');
          var messageId = $(this).closest('article').data('id');
          var updatedMessage = {
          message: $thisEditing.find('.editMessage').val(),
        };
      console.log("the updated message:",updatedMessage)
      page.updateMessage(updatedMessage, messageId);
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

    // $.ajax({
    //    url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557b32324ef0f403000002a7",
    //    method: 'GET',
    //    success: function (data) {
    //            console.log("this is the login data: ", data);
    //            _.each(data, function(e, i){
    //                    console.log("user name: ", i);
    //              }
    //            });
    //          }
    //  });


      var newMessage = {
      message: $('input[name="message"]').val(),
      user: page.yourUsername,
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
