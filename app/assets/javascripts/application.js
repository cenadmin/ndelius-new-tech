(function ($) {

    'use strict';

    $(function () {

        // Show/hide content
        var showHideContent = new GOVUK.ShowHideContent();

        showHideContent.init();

        // Stick at top when scrolling
        GOVUK.stickAtTopWhenScrolling.init();

        /**
         *
         * @param parent
         * @param child
         */
        function showHint(parent, child) {
            child.hasClass('js-hidden') ? child.removeClass('js-hidden') : child.addClass('js-hidden');

            if(child.hasClass('js-hidden')) {
                parent.removeClass('active');
                parent.attr('aria-expanded', 'false');
                child.attr('aria-hidden', 'true');
            } else {
                parent.addClass('active');
                parent.attr('aria-expanded', 'true');
                child.attr('aria-hidden', 'false');
            }
        }

        /**
         * Textarea elements
         */
        $('textarea').keyup(function () {
            var textArea = $(this),
                limit = textArea.data('limit'),
                current = textArea.val().length,
                messageHolder = $('#' + textArea.attr('id') + '-countHolder'),
                messageTarget = $('#' + textArea.attr('id') + '-count');

            if (limit && current > 0) {
                messageHolder.removeClass('js-hidden');
                messageTarget.text(limit + " recommended characters, you have used " + current);
            } else {
                messageHolder.addClass('js-hidden');
            }
        });

        /**
         * Navigation items
         */
        $('.nav-item').click(function (e) {

            e.preventDefault();

            var target = $(this).data('target');
            if (target && !$(this).hasClass('active')) {
                $('#jumpNumber').val(target);
                $('form').submit();
            }
        });

        /**
         * Feedback link - change form action and submit
         */
        $('.feedback-link').click(function (e) {
            e.preventDefault();

            var form = $('form');
            form.attr('action', form.attr('action') + '/feedback').submit();
        });

        /**
         * Ensure jumpNumber is cleared if next after clicking browser back button
         */
        $('#nextButton').click(function () {
            $('#jumpNumber').val('');
        });

        /**
         * Save and exit
         */
        $('#exitLink').click(function (e) {
            e.preventDefault();
            $('#jumpNumber').val(0);
            $('form').submit();
        });

        /**
         *
         */
        $('a.expand-content').each(function (i, elem) {
            var parent = $(this),
                child = $('#' + elem.getAttribute('data-target'));
            parent.attr('aria-controls', elem.getAttribute('data-target'));
            parent.click(function() {
                showHint(parent, child)
            });
        });

        // Progressive enhancement for browsers > IE8
        if (!$('html').is('.lte-ie8')) {
            // Autosize all Textarea elements (does not support IE8).
            autosize(document.querySelectorAll('textarea'));

            // Date picker
            $('.date-picker').datepicker({
                dateFormat: 'dd/mm/yy'
            }).parent().addClass('date-wrapper');
        }

    });

})(window.jQuery);
