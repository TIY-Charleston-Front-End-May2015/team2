// dom ready;
$(document).ready(function () {
  page.init();
});

url: "http://tiy-fee-rest.herokuapp.com/collections/team2Chat",

var page = {
  
  getTemplate: function (name) {
    return templates[name];
  },

  init: function (arguments) {
    page.initStyling();
    page.initEvents();
  },

  initStyling: function (arguments) {

        messages.forEach(function (el) {
        page.loadTemplate("message", el, $('.oneMessage'));
      });


  },

  initEvents: function (arguments) {

    $('.toggle').on('click', 'a', page.togglePages);

  },


    togglePages: function (event) {
    event.preventDefault();
    var clickedPage = $(this).attr('rel');
    $(clickedPage).siblings().removeClass('active');
    $(clickedPage).addClass('active');
  },

  loadTemplate: function (tmplName, data, $target) {
    var compiledTmpl = _.template(page.getTemplate(tmplName));

    $target.append(compiledTmpl(data));
  }


};
