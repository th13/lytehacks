/*global $:false, jQuery:false */
(function($) {
  'use strict';

  var form = $('form#register');

  form.on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serialize();

    $.ajax({
      method: 'POST',
      url: '/registrations',
      data: data
    }).done(function(msg) {
      console.log('Data saved: ', msg);
    });
  });

})(jQuery);
