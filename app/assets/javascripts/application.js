(function ($) {

    'use strict';

    $(function () {

        // Show/hide content
        var showHideContent = new GOVUK.ShowHideContent();
        showHideContent.init();

        // Stick at top when scrolling
        GOVUK.stickAtTopWhenScrolling.init();

        // Autosize all Textarea elements
        autosize(document.querySelectorAll('textarea'));

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
        $('textarea').keyup(function () {
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
         * Navigation items
         */
        $('.nav-item').click(function (e) {

            e.preventDefault();

            var target = $(this).data('target');
            if (!$(this).hasClass('active')) {
                $('#jumpNumber').val(target);
                $('form').submit();
            }
        });

        /**
         * Accessible Datepicker v2.1.5
         * https://github.com/eureka2/ab-datepicker
         */
        $('.date-picker').datepicker({
            weekDayFormat: 'narrow',
            inputFormat: [''],
            outputFormat: 'dd/MM/yyyy',
            daysOfWeekDisabled: [0, 6],
            gainFocusOnConstruction: false
        });

    });

})(window.jQuery);
