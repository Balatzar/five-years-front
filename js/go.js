/* eslint-env jquery */

(function go() {
  $('.js-sendName').click(function sendName() {
    var name = $('input[name="name"]').val();
    if (!name) {
      return error('.js-sendName');
    }
    const data = {
      name: name,
    };
    $.post('http://localhost:3000/api/groups/create', data, function success(res) {
      localStorage.setItem('groupId', res._id);
      window.location.assign('adventure.html');
    })
      .fail(function error(err) {
      console.warn(err)
    })
  })

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
