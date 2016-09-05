/* eslint-env jquery */
/* global redom */

(function autresgens() {

  var el = redom.el;
  var mount = redom.mount;
  var text = redom.text;
  
  var children = redom.children;
  var props = redom.props;
  var events = redom.events;

  var count = 1;

  init();

  $('.js-sendInvite').submit(function createObjetive(event) {
    event.preventDefault();
    var name = $('input[name="name"]').val();
    var mail = $('input[name="mail"]').val();
    if (!name || !mail || !validateEmail(mail)) {
      return error('.js-error');
    }
    var invites = JSON.parse(localStorage.getItem('invites'));
    var text = name + ' ' + mail;
    invites[text] = {
      name: name,
      mail: mail,
    };
    localStorage.setItem('invites', JSON.stringify(invites));
    makeObjective(text);
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
  });

  function makeObjective(str) {
    var div = el('div');
    var span = el('span');

    var objective = div(
      props({ className: 'panel-heading clearfix', }),
      children(function(el) {
        return [
          el.div1 = div(text(str), props({ className: 'panel-title pull-left', })),
          el.div2 = div(props({ className: 'btn-group pull-right', }), children(function(el) {
            return [
              el.span1 = span(
                props({ className: 'glyphicon glyphicon-pencil', }),
                events({
                  onclick: function() {
                    // var objectives = JSON.parse(localStorage.getItem('objectives'));
                    console.log('faut faire l\'édition !');
                  },
                })
              ),
              el.span2 = span(
                props({ className: 'glyphicon glyphicon-remove', }),
                events({
                  onclick: function(el) {
                    var invites = JSON.parse(localStorage.getItem('invites'));
                    delete invites[str];
                    localStorage.setItem('invites', JSON.stringify(invites));
                    $(el).parent().parent().remove();
                    if (!Object.keys(invites).length) {
                      $('.js-finish').addClass('hidden');
                    }
                  },
                })
              ),
            ];
          })),
        ];
      })
    );
    
    mount(document.querySelector(count % 2 ? '.js-odd' : '.js-even'), objective);
    count += 1;
  }

  $('input').keyup(function removeErr() {
    error('.js-error', true);
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
        makeObjective(invites[inv].name + invites[inv].mail);
      });
      $('.js-finish').removeClass('hidden');
    }
  }
}());
