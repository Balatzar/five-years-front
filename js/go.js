/* eslint-env jquery */

(function go() {
  $('.js-sendName').submit(function sendName(event) {
    event.preventDefault();
    var name = $('input[name="name"]').val();
    if (!name) {
      return error('.js-alert');
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
    error('.js-alert', true);
  });

  function error(selector, hide) {
    if (hide) {
      $(selector).addClass('hidden');
    } else {
      $(selector).removeClass('hidden');
    }
  }
}());
