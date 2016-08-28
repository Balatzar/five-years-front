/* eslint-env jquery */

(function autresgens() {
  init();

  $('.js-sendInvite').click(function createObjetive() {
    var name = $('input[name="name"]').val();
    var mail = $('input[name="mail"]').val();
    if (!name || !mail || !validateEmail(mail)) {
      return error('.js-sendInvite');
    }
    var invites = JSON.parse(localStorage.getItem('invites'));
    var text = name + ' ' + mail;
    invites[text] = {
      name: name,
      mail: mail,
    };
    localStorage.setItem('invites', JSON.stringify(invites));
    insertInvitationInDOM(name, mail);
    $('input[name="name"]').val('');
    $('input[name="mail"]').val('');
    $('.js-finish').removeClass('hidden');
  });

  $('.js-finish button').click(function sendInvites() {
    var invites = JSON.parse(localStorage.getItem('invites'));
    var group = JSON.parse(localStorage.getItem('group'));
    var data = {
      groupId: group.id,
      invitations: Object.keys(invites).map(function(key) {
        return Object.assign({}, {
          name: invites[key].name,
          mail: invites[key].mail,
        });
      }),
    };
    console.log(data)
    $.post('https://five-years-api.herokuapp.com/api/invitations/invite', data, function success() {
      window.location.assign('finito.html');
    })
      .fail(function error(err) {
        console.warn(err);
      });
  })

  function insertInvitationInDOM(name, mail) {
    $('.js-inviteList').append($(makeInvite(name, mail)).children().click(function(event) {
      $(event.currentTarget).parent().remove();
      var invitesInEvent = JSON.parse(localStorage.getItem('invites'));
      delete invitesInEvent[$(this).parent().get(0).firstChild.nodeValue];
      localStorage.setItem('invites', JSON.stringify(invitesInEvent));
      if (!$('.js-objective').length) {
        $('.js-finish').addClass('hidden');
      }
    }).parent());
  }

  function makeInvite(name, mail) {
    return '<p class="js-invite">' + name + ' ' + mail + '<button type="button" class="button-delete"><span class="glyphicon glyphicon-remove"></span></button></p>';
  }

  $('input').keyup(function removeErr() {
    error('.js-sendInvite', true);
  });

  function error(selector, remove) {
    if (remove) {
      $(selector).css('border-color', '#FFFFFF');
    } else {
      $(selector).css('border-color', '#d00000');
    }
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  function init() {
    var group = JSON.parse(localStorage.getItem('group'));
    var invites = localStorage.getItem('invites');
    if (!group) {
      window.location.assign('/');
    }
    if (!invites || invites === '{}') {
      localStorage.setItem('invites', JSON.stringify({}));
    } else {
      invites = JSON.parse(invites);
      Object.keys(invites).forEach(function(inv) {
        insertInvitationInDOM(invites[inv].name, invites[inv].mail);
      });
      $('.js-finish').removeClass('hidden');
    }
  }
}());
