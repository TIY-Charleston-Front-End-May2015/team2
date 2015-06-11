$(document).ready(function () {
  page.init();
});

var page = {

  url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat",
  init: function () {
    page.initStyling();
    page.initEvents();
  },
  initStyling: function () {

    // page.loadItems();

  },
  initEvents: function () {

    $('.newUser').on('click', 'a', page.createLogin);
    $('.returnUser').on('click', 'a', page.userLogin);

    });
  },

  







};
