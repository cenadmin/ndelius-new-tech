(function ($) {

    'use strict';

    $(function () {

        // Show/hide content
        var showHideContent = new GOVUK.ShowHideContent();
        showHideContent.init();

        // Stick at top when scrolling
        GOVUK.stickAtTopWhenScrolling.init();

        /**
         * Method to show/hide under/over recommended character limit elements/messages.
         * @param {Boolean} over Text entry over the recommended limit
         * @param {String} target Element name
         */
        function toggleCountMessage(over, target) {

            var targetUnder = $('#' + target + '-under'),
            targetOver = $('#' + target + '-over');

            if (over) {
                targetUnder.addClass('js-hidden');
                targetUnder.attr('aria-hidden', 'true');
                targetOver.removeClass('js-hidden');
                targetOver.attr('aria-hidden', 'false');
            } else {
                targetUnder.removeClass('js-hidden');
                targetUnder.attr('aria-hidden', 'false');
                targetOver.addClass('js-hidden');
                targetOver.attr('aria-hidden', 'true');
            }
        }

        /**
         * Textarea elements
         */
        $('textarea').keyup(function () {
            var textArea = $(this),
                limit = textArea.data('limit'),
                current = textArea.val().length;

            if (limit && textArea.data('target')) {
                toggleCountMessage(current > limit, textArea.data('target'));
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

        // tinyMCE init method
        function mceSetup(editor) {

            function spellcheck() {
                editor.buttons.spellchecker.onclick();
            }

            // Spellcheck on spelling error from server
            editor.on('init', function(evt) {

                var id = evt.target.id,
                    ignoreCheckbox = $('#ignore' + id.charAt(0).toUpperCase() + id.slice(1) + 'Spelling');

                if ($('label[for=' + id  + ']').parent().hasClass('form-group-error')) {

                    ignoreCheckbox.removeClass('js-hidden');

                    if (tinymce.get(id).getContent().length) {
                        spellcheck();
                    }
                } else {
                    ignoreCheckbox.addClass('js-hidden');
                }
            });

            // Spellcheck on blur
            editor.on('blur', function(evt) {
                if (tinymce.get(evt.target.id).getContent().length) {
                    spellcheck();
                }
            });
        }

        // Spellcheck response from TinyMCE
        function spellcheckResponse(method, text, success, failure) {
            if (method === 'spellcheck' && text.replace(/\s/g, '').length) {

                var csrfToken = $('input[name=csrfToken]').val();

                // Pass the entered text to the back-end for spellchecking
                $.ajax({
                    type: 'POST',
                    url: '/spellcheck',
                    headers: { 'Csrf-Token' : csrfToken },
                    contentType: 'text/plain',
                    data: text.trim(),
                    dataType: 'json'
                }).done(function(data) {
                    var suggestions = {};

                    // Filter the response so TinyMCE can display the results
                    for (var i = 0, len = data.length; i < len; i++) {
                        suggestions[data[i].mistake] = data[i].suggestions;
                    }

                    success(suggestions);
                }).fail(function(jqXHR, textStatus) {
                    failure('Server error: ' + textStatus);
                });

            } else {
                success({});
            }
        }

        // Progressive enhancement for browsers > IE8
        if (!$('html').is('.lte-ie8')) {

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

            /**
             *
             */
            // TinyMCE - all textarea elements
            $('textarea').tinymce({
                selector: "textarea",
                plugins: 'spellchecker autoresize lists placeholder',
                menubar: '',
                toolbar: 'spellchecker',
                spellchecker_languages: 'English=en_gb',
                resize: false,
                branding: false,
                elementpath: false,
                statusbar: false,
                autoresize_bottom_margin: '10px',
                content_style: 'body { padding: 0 !important; margin: 0 !important; }',
                spellchecker_callback: spellcheckResponse,
                setup: mceSetup
            });
        }

    });

})(window.jQuery);
