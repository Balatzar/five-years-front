/* eslint-env jquery */

(function adventure() {
  var group = JSON.parse(localStorage.getItem('group'));
  var objectives = localStorage.getItem('objectives');
  if (!objectives || !group) {
    window.location.assign('/');
  }

  $('.js-sendName').click(function sendName() {
    var name = $('input[name="name"]').val();
    var mail = $('input[name="mail"]').val();
    if (!name || !mail) {
      return error('.js-sendName');
    }
    var data = {
      name: name,
      mail: mail,
      groupId: group.id,
      objectives: Object.keys(JSON.parse(objectives)),
    }
    console.log(data)
    $.post('https://five-years-api.herokuapp.com/api/participations/create', data, function success(res) {
      console.log(res)
      // window.location.assign('adventure.html');
    })
      .fail(function error(err) {
      console.warn(err);
    });
  });

  $('input').keyup(function removeErr() {
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
