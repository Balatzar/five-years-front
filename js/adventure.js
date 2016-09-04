/* eslint-env jquery */
/* global redom */

(function adventure() {

  var el = redom.el;
  var mount = redom.mount;
  var text = redom.text;
  
  var children = redom.children;
  var props = redom.props;
  var events = redom.events;

  init();

  $('.js-createObjetive').submit(function createObjetive(event) {
    event.preventDefault();
    var text = $('[type="text"]').val();
    if (!text) {
      return error('.js-error');
    }
    var objectives = JSON.parse(localStorage.getItem('objectives'));
    objectives[text] = text;
    localStorage.setItem('objectives', JSON.stringify(objectives));
    makeObjective(text);
    $('[type="text"]').val('');
    $('.js-finish').removeClass('hidden');
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
                  }
                })
              ),
              el.span2 = span(
                props({ className: 'glyphicon glyphicon-remove', }),
                events({
                  onclick: function(el) {
                    var objectives = JSON.parse(localStorage.getItem('objectives'));
                    delete objectives[str];
                    localStorage.setItem('objectives', JSON.stringify(objectives));
                    $(el).parent().parent().remove();
                    if (!Object.keys(objectives).length) {
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
    
    mount(document.querySelector('.js-objectiveList'), objective);
  }

  $('input[name="text"]').keyup(function removeErr() {
    error('.js-error', true);
  });

  function error(selector, remove) {
    if (remove) {
      $(selector).css('border-color', '#FFFFFF');
    } else {
      $(selector).css('border-color', '#d00000');
    }
  }

  function init() {
    var group = JSON.parse(localStorage.getItem('group'));
    var objectives = localStorage.getItem('objectives');
    if (!group) {
      window.location.assign('/');
    }
    if (!objectives || objectives === '{}') {
      localStorage.setItem('objectives', JSON.stringify({}));
    } else {
      objectives = JSON.parse(objectives);
      Object.keys(objectives).forEach(function(text) {
        makeObjective(text, objectives);
      });
      $('.js-finish').removeClass('hidden');
    }
    $('.js-titlePage').text(group.name);
  }
}());
