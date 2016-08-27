/* eslint-env jquery */

(function adventure() {
  var group = JSON.parse(localStorage.getItem('group'));
  localStorage.setItem('objectives', JSON.stringify({}));
  $('.js-titlePage').text(group.name);

  $('.js-createObjetive').click(function createObjetive() {
    var text = $('[type="text"]').val();
    if (!text) {
      return error('.js-createObjetive');
    }
    var objectives = JSON.parse(localStorage.getItem('objectives'));
    objectives[text] = text;
    localStorage.setItem('objectives', JSON.stringify(objectives))
    $('.js-objectiveList').append($(makeObjective(text)).children().click(function(event) {
      $(event.currentTarget).parent().remove();
      var objectivesInEvent = JSON.parse(localStorage.getItem('objectives'));
      delete objectivesInEvent[$($(event.currentTarget).parent()[0]).text()];
      localStorage.setItem('objectives', JSON.stringify(objectivesInEvent));
    }).parent());
    $('[type="text"]').val('');
    $('.js-finish').removeClass('hidden')
  });

  function makeObjective(str) {
    return `<p>${str}<button type="button" class="button-delete"><span class="glyphicon glyphicon-remove"></span></button></p>`;
  }

  function removeObjective(str) {
    $(`td:contains("${str}")`).remove();
  }

  $('input[name="text"]').keyup(function removeErr() {
    error('.js-createObjetive', true);
  });

  function error(selector, remove) {
    if (remove) {
      $(selector).css('border-color', '#FFFFFF');
    } else {
      $(selector).css('border-color', '#d00000');
    }
  }
}());
