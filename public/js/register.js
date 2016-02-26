/*global $:false, jQuery:false */
(function($) {
  'use strict';

  var form = $('form#register');

  form.on('submit', function(e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);

    $.post('/registrations', data,
      function success(response) {
        console.log(response);
      }
    );
  });

})(jQuery);
