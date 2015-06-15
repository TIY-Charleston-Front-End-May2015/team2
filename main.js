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
  whoWereYou: "",
  exists: true,
  totalMessages: 0,
  totalPeople: 0,
  totalOnline: 0,
  totalOffline: 0,
  findName: true,



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
    $('.editUser').on('click', page.editName);
    $('.NewuserSubmit').on('click', page.updateUserNameNow);
    $('.cancelChange').on('click', page.cancelChangeUser);
    $(window).on('beforeunload', function(){ //added popup to have users log out to avoid locking account
          if(page.yourUsername !== ""){
            return "Please Log Out to Avoid Locking Account"
          }
      });

      setInterval(function(){
        $.ajax({
        url: page.url,
        method: 'GET',
        success: function (data) {

          var checkLength = data.length;
          console.log("length:",data.length);
          console.log("load messages data:",data);
          if(page.totalMessages !== checkLength) {
            $('.chat > .content').empty()
            page.addAll(data);
          }else {
            console.log("no new messages");
          }

        },
        error: function (err) {
          console.log("error on load messages:", err);
        }
      });

    }, 3000);

    setInterval(function(){
          $.ajax({
          url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557e214b24c7a7030000029b",
          method: 'GET',
          success: function (data) {
            var online = 0;
            var offline = 0;
            _.each(data,function(e, i){
              if(i === "_id"){console.log("this is the id");}
              else{
                  if(e.isOnline === 'true'){
                    online +=1;
                  }
                  else{
                  offline +=1;
                  }
            }
            });

            if(page.totalOnline !== online || page.totalOffline !== offline){
              $('.whosOnline').empty();
              page.loadPeople();
            }
            // console.log("these may people recorded online: ", page.totalOnline);
            // console.log("these many people recorded Offline: ", page.totalOffline);
            // console.log("these may people online: ", online);
            // console.log("these many people Offline: ", offline);
          }
        });
      }, 2000);

},

    selectImage: function(e){
      page.selectedImage= $(this).attr('value');
      console.log("you selected an image ", page.selectedImage);

    },
    togglePages: function (event) {
    event.preventDefault();
    var clickedPage = $(this).attr('rel');
    $(clickedPage).siblings().removeClass('active');
    $(clickedPage).addClass('active');
  },

  editName: function(e){
      e.preventDefault();
      $('.editUser').removeClass('active');
      $('.editInfoUser').addClass('active');
      console.log("lets change the name");

  },

  cancelChangeUser: function(){
    $('.editUser').addClass('active');
    $('.editInfoUser').removeClass('active');
    $('#response').empty();

  },

  updateUserNameNow: function(e){
    e.preventDefault();
    var newUserName = $('.NewuserName').val();
    if(newUserName !== ""){
      page.pushNewUserName(newUserName);
    }
    else{
      console.log("enter new user name");
    }
  },


  pushNewUserName: function(name){
    console.log("current user name: ", page.yourUsername);
    console.log("new user name: ", name);
    //Create and "log in" to the updated name
    page.whoWereYou = page.yourUsername;
    page.addNewUsernametoServer(name);

  },

  addNewUsernametoServer: function(name){
    var userAccount = name;
    $.ajax({
        url:  "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557e214b24c7a7030000029b",
        method: 'GET',
        success: function (data) {
                _.each(data, function(e, i){
                  if(i === userAccount){
                    console.log("this username already exists");
                    page.findName = false;

                  }
                });
                if(page.findName){
                  console.log("WHYYYYYYY!!!!!: " ,page.findName);
                            var user = {
                                isOnline: true,
                                pass: page.yourPassword,
                                image: page.yourImage
                            };
                            var objectToSend = {};
                            objectToSend[userAccount] = user;
                        $.ajax({
                             url:  "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557e214b24c7a7030000029b",
                             method: 'PUT',
                             data: objectToSend,
                             success: function (data) {
                               console.log("success!!: ", data);
                               page.yourUsername= userAccount;
                               page.logOutOfDeleted();
                               page.findMessageUser();
                               page.turnStuffOff();
                               $('.whosOnline').empty();
                               page.loadPeople();
                               $('.editUser').addClass('active');
                               $('.editInfoUser').removeClass('active');
                               console.log("we are all done updating your info!");
                               $('#response').empty();
                               page.findName = true;

                             },
                             error: function (err) {
                               console.log("error ", err);
                             }
                      });
                }
                else{
                  // console.log("cant create this account");
                  // console.log("page exists", page.findName);
                  $(".feedbackMessage").addClass('active');
                  $('#response').text('User Already Exists');
                }
              }
      });


  },

  logOutOfDeleted: function(){
    var userAccount = page.whoWereYou;
    var user = {
        isOnline: false,
        pass: page.yourPassword,
        image: page.yourImage,
    };
    var objectToSend = {};
    objectToSend[userAccount] = user;

    $.ajax({
        url:  "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557e214b24c7a7030000029b",
        method: 'PUT',
        data: objectToSend,
        success: function (data) {
          },
        error: function (err) {

        }
      });

    },

    findMessageUser: function(){
      $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        page.filterThroughMessages(data);
      },
      error: function (err) {
        console.log("error on load messages:", err);
      }
    });

  },

  filterThroughMessages: function(data){
    _.each(data, function(e){
          if(e._id === "557e214b24c7a7030000029b"){
            console.log("this is the user account: ", e._id);
          }
          else{
            console.log("trying to change the messages: ", e.user);
            console.log("who were you? ". whoWereYour)
            if(e.user === page.whoWereYou){
              console.log("this is one of your messaged: ", e);
              console.log("this is the id of your message: ", e._id);
              var updatedUser = {
                user: page.yourUsername,
                };
              console.log("the updated user:",updatedUser)
              page.updateMessage(updatedUser, e._id);
            }
          }
    });

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
            url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557e214b24c7a7030000029b",
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
      $('.chat').removeClass('active');
      $('.chat').addClass('page');
      $('.whosOnline').removeClass('active');
      $('.whosOnline').empty();
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
    // console.log("username: ", username);
    // console.log("password: ", password);
    if(username !== "" && password !== ""){
          $.ajax({
              url:  "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557e214b24c7a7030000029b",
              method: 'GET',
              success: function (data) {
                      // console.log("this is the login data: ", data);
                      _.each(data, function(e, i){
                        if(i === username){
                          // console.log("this is the info: ", e);

                            if(e.pass === password){
                                    // console.log("you selected the correct password " ,e.isOnline);
                                    if(e.isOnline === "true"){
                                      $(".feedbackMessage").addClass('active');
                                      $('#response').text('User is Already Logged On');
                                    }
                                    else{
                                      page.yourUsername= username;
                                      page.yourImage= e.image;
                                      page.yourPassword = e.pass;
                                      // console.log("your image: ", page.yourImage);
                                      // console.log("your username: ", page.yourUsername);
                                      var userAccount = page.yourUsername;
                                      var user = {
                                          isOnline: true,
                                          pass: page.yourPassword,
                                          image: page.yourImage,
                                      };
                                      var objectToSend = {};
                                      objectToSend[userAccount] = user;

                                      $.ajax({
                                          url:  "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557e214b24c7a7030000029b",
                                          method: 'PUT',
                                          data: objectToSend,
                                          success: function (data) {
                                            },
                                          error: function (err) {

                                          }
                                      });
                                      page.turnStuffOff();
                                      $('.whosOnline').empty();
                                      page.loadPeople();
                                }

                            }
                            else{
                              // console.log("you used this password: ", password);
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
      // console.log("please enter username");
      $(".feedbackMessage").addClass('active');
      $('#response').text('Please Enter Username');
    }
    else{ //if button is pressed but nothing was entered it will do nothing
      // console.log("please enter user name and password");
    }
  },


  turnStuffOff: function(){
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
    $('.chat').removeClass('page');
    $('.chat').addClass('active');
    $('.whosOnline').addClass('active');
  },

  createAccount: function(e){
    // console.log("decided to create account");
    // console.log($('.userName').val());
    var password= $('.password').val();
    var vPassword= $('.verifyPassword').val();
    // console.log(page.selectedImage);
    if(password !== vPassword){
      // console.log("password does not match");
    }
    else{
      var userAccount = $('.userName').val();
      // console.log("this is page exists: ", page.exists);
      $.ajax({
          url: page.url,
          method: 'GET',
          success: function (data) {
                  // console.log("this is the login data: ", data);
                  _.each(data, function(e, i){
                    if(i === userAccount){
                      // console.log("this username already exists");
                      page.exists = false;
                      // console.log("this is page.exists: ", page.exists)

                    }
                  });
                }
        });
        if(page.exists){
          // console.log("it said this was false: " ,page.exists)
                    var user = {
                        isOnline: true,
                        pass: password,
                        image: page.selectedImage
                    };
                    var objectToSend = {};
                    objectToSend[userAccount] = user;
                    console.log("this is object to send: ", objectToSend);
                $.ajax({
                     url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557e214b24c7a7030000029b",
                     method: 'PUT',
                     data: objectToSend,
                     success: function (data) {
                      //  console.log("success!!: ", data);
                       page.yourUsername= userAccount;
                       page.yourImage= page.selectedImage;
                       page.yourPassword= password;
                      //  console.log("these are set for the page: ", page.yourUsername + page.yourImage);
                      page.turnStuffOff();
                      $('.whosOnline').empty();
                       page.loadPeople();
                      //  $('.loginData').reset();

                     },
                     error: function (err) {
                       console.log("error ", err);
                     }
              });
        }
        else{
          // console.log("cant create this account");
          // console.log("page exists");
          $(".feedbackMessage").addClass('active');
          $('#response').text('User Already Exists');
        }
    }
  },
  addOne: function (message) {
    page.loadTemplate("message", message, $('.chat > .content'));
    // console.log("one message to the dom:",message);
  },
  addAll: function (messageCollection) {
    _.each(messageCollection, page.addOne);
    // console.log("message collection:",messageCollection)
  },

  loadMessages: function () {

      $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        page.totalMessages = data.length;
        // console.log("length:",data.length);
        // console.log("load messages data:",data);
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
        page.totalMessages = data.length;
        // console.log("successful message creation = ", data);
        // console.log("user:",page.yourUserName);
        // console.log("image:",page.yourImage);
      },
      error: function (err) {
        console.log("error on create message:", err);
      }
    });

  },

  checkIfUserCanEdit: function (e) {

  e.preventDefault();


  var check = $(this).attr("name")
  // console.log("check value:",check)

  if(check === page.yourUsername) {
    // console.log("you can edit")
    $(this).next().toggleClass('active');
  }else {
    // console.log("you cant edit")
  };

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

    var check = $(this).attr("name")
    console.log("check value:",check)

    if(check === page.yourUsername) {
      console.log("you can delete")
      $.ajax({
        url: page.url + "/" + $(this).closest('article').data('id'),
        method: 'DELETE',
        success: function (data) {
          console.log("this delete:",this);
          $('.content').html('');
          page.loadMessages();

        }
      });
    }else {
      console.log("you cant delete")
    };


  },

  addMessage: function (event) {
    event.preventDefault();
      var newMessage = {
      message: $('input[name="message"]').val(),
      user: page.yourUsername,
      image: page.yourImage

    };

    page.createMessage(newMessage);

    $('input, textarea').val("");
  },

  addOnePerson: function (data) {
    // console.log("this is the login: ", data);
    page.loadTemplate("Online", data, $('.whosOnline'));
  },
  addAllPeople: function (allPeople) {
    page.totalOnline = 0;
    page.totalOffline = 0;
    // console.log("this is what we are passing: ", allPeople);
    _.each(allPeople,function(e, i){
      if(i === "_id"){console.log("this is the id");}
      else{
        if(e.isOnline === 'true'){
          page.totalOnline +=1;
        }
        else{ //this will also log the _id variable, but thats fine.
          page.totalOffline +=1;
        }

      var personArray = {username: i, Status: e.isOnline, image: e.image};
      page.addOnePerson(personArray);
      }
    });
  },

  loadPeople: function () {

      $.ajax({
      url:  "http://tiy-fee-rest.herokuapp.com/collections/team2Chat/557e214b24c7a7030000029b",
      method: 'GET',
      success: function (data) {
        page.totalPeople = data.length;
        // console.log("load people data:",data);
        page.addAllPeople(data);
      },
      error: function (err) {
        console.log("error on load messages:", err);
      }
    });
  },

  loadTemplate: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTemplate(tmplName));
    $target.append(compiledTmpl(data));
  },


  getTemplate: function (name) {
    return templates[name];
  }


};
