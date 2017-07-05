$(function () {

  // Show/hide content
  var showHideContent = new GOVUK.ShowHideContent();
  showHideContent.init();

  /**
   * Date picker
   */
  $('.date-picker').datepicker({
    dateFormat: 'dd MM yy'
  }).parent().addClass('date-wrapper');

  /**
   * Method to show/hide under/over recommended character limit elements/messages.
   * @param {Boolean} over Text entry over the recommended limit
   * @param {HTMLElement} targetUnder Under limit element
   * @param {HTMLElement} targetOver Over limit element
   */
  function toggleCountMessage(over, targetUnder, targetOver) {
    if (over) {
      targetUnder.addClass('js-hidden');
      targetOver.removeClass('js-hidden');
    } else {
      targetUnder.removeClass('js-hidden');
      targetOver.addClass('js-hidden');
    }
  }

  /**
   * Textarea elements
   */
  $('textarea').keyup(function() {
    var textArea = $(this),
      limit = textArea.data('limit'),
      current = textArea.val().length,
      targetUnder,
      targetOver;

    if (limit && textArea.data('target')) {
      targetUnder = $('#' + textArea.data('target') + '-under');
      targetOver = $('#' + textArea.data('target') + '-over');

      toggleCountMessage(current > limit, targetUnder, targetOver);
    }
  });

  /**
   * Autosize all Textarea elements
   */
  autosize(document.querySelectorAll('textarea'));

  /**
   *
   */
  GOVUK.stickAtTopWhenScrolling.init();

  /**
   * Navigation items
   */
  $('.nav-item').click(function(e) {

    e.preventDefault();

    var target = $(this).data('target');
    if (!$(this).hasClass('active')) {
      $('#jumpNumber').val(target);
      $('form').submit();
    }
  });

});