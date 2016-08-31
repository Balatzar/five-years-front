/* eslint-env jquery */

(function go() {
  $('.js-sendName').click(function sendName() {
    var name = $('input[name="name"]').val();
    if (!name) {
      return error('.js-sendName');
    }
    var data = {
      name: name,
    };
    $.post('https://five-years-api.herokuapp.com/api/groups/create', data, function success(res) {
      localStorage.setItem('group', JSON.stringify({
        name: res.name,
        id: res._id,
      }));
      window.location.assign('adventure.html');
    })
      .fail(function error(err) {
        console.warn(err);
      });
  });

  $('input[name="name"]').keyup(function removeErr() {
    error('.js-sendName', true);
  });

  function error(selector, remove) {
    if (remove) {
      $(selector).css('border-color', '#FFFFFF');
    } else {
      $(selector).css('border-color', '#d00000');
    }
  }
}());
