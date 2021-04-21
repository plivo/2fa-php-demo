$("document").ready(function() {
    //////////////////////////////////
    // event handlers registration  //
    //////////////////////////////////
    $(".phone-number").keyup(function(e) {
        phoneNumber = iti.getNumber();
    });
    $('input').on('input', function() {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
    $('input[type="text"]').keyup(function() {
        $('input[type="text"]').removeClass('error-text-box');
        $('.error-text').css('display', 'none');
    })
    $(".return a").click(function() {
        location.reload(true);
    })
    $(".phone-number-verify-button").click(function(e) {
        $.ajax({
            "url": "/verify/" + phoneNumber,
            "type": "GET",
            "success": function(data) {
                data = JSON.parse(data);
                if (data["status"] == "success") {
                    // show the verification code input box
                    countdown(1);
                    $(".box-1").css({
                        "display": "none"
                    });
                    $(".box-2").css({
                        "display": "block"
                    });
                    $(".events li:nth-child(2)").addClass('progress-2');
                    $(".progress-step-2").addClass('progress-bar-fill');
                }
            },
            "error": function(er) {
                console.log(er);
            }
        });
    });
    $(".verification-code-check-button").click(function(e) {
        $.ajax({
            "url": "/checkcode/" + phoneNumber + "/" + $(".verification-code").val(),
            "type": "GET",
            "success": function(data) {
                data = JSON.parse(data);
                if (data["status"] == "success") {
                    $('input[type="text"]').removeClass('error-text-box');
                    $(".box-1").css({
                        "display": "none"
                    });
                    $(".box-2").css({
                        "display": "none"
                    });
                    $(".box-3").css({
                        "display": "block"
                    });
                    $(".events li:last-child()").addClass('progress-3');
                    $(".progress-step-2").addClass('progress-bar-fill');
                    $(".progress-step-3").addClass('progress-bar-fill');
                    $('.box-2').addClass('success');
                } else {
                    $('input[type="text"]').addClass('error-text-box');
                    $('.error-text').css('display', 'block');
                }
                $(".result-row").css({
                    "display": "block"
                });
            },
            "error": function(er) {
                console.log(er);
            }
        });
    });
    var input = document.querySelector("#phone");
    var iti = window.intlTelInput(input, {
        utilsScript: "build/js/utils.js",
        separateDialCode: true,
    });

    function countdown(minutes) {
        var seconds = 60;
        var mins = minutes

        function tick() {
            //This script expects an element with an ID = "counter".
            var counter = document.getElementById("counter");
            var current_minutes = mins - 1
            seconds--;
            counter.innerHTML = "(" + current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds) + ")";
            if (seconds > 0) {
                setTimeout(tick, 1000);
            } else {
                if (!$('.box-2').hasClass('success')) {
                    callmeFunction();
                }
                if (mins > 1) {
                    countdown(mins - 1);
                }
            }
        }
        tick();
    }

    function callmeFunction() {
        $('.call-me').css('display', 'block');
    }

    $(".call-me").click(function(e) {
        $('.call-me').css('display', 'none');
        $.ajax({
            "url": "/verify_voice/" + phoneNumber,
            "type": "GET",
            "success": function(data) {
                data = JSON.parse(data);
                if (data["status"] == "success") {
                    // show the verification code input box
                    $(".verification-code").attr("placeholder", "Enter the verification code from call")
                    countdown2(1);
                    $(".box-1").css({
                        "display": "none"
                    });
                    $(".box-2").css({
                        "display": "block"
                    });
                    $(".events li:nth-child(2)").addClass('progress-2');
                    $(".progress-step-2").addClass('progress-bar-fill');
                }
            },
            "error": function(er) {
                console.log(er);
            }
        });
    });

    function countdown2(minutes) {
        var seconds = 60;
        var mins = minutes

        function tick() {
            //This script expects an element with an ID = "counter".
            var counter = document.getElementById("counter");
            var current_minutes = mins - 1
            seconds--;
            counter.innerHTML = "(" + current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds) + ")";
            if (seconds > 0) {
                setTimeout(tick, 1000);
            } else {
                if (!$('.box-2').hasClass('success')) {
                    expiredFunction();
                }
                if (mins > 1) {
                    countdown(mins - 1);
                }
            }
        }
        tick();
    }
    //You can use this script with a call to onclick, onblur or any other attribute you would like to use.
    function expiredFunction() {
        $(".events li:last-child()").addClass('progress-error');
        $(".progress-step-3").addClass('progress-bar-error-fill');
        $('input[type="text"]').attr("disabled", "disabled");
        $('.error-text').text('OTP Expired');
        $('.error-text').css('display', 'block');
        $('.call-me').css('display', 'none');
        $('.verification-code-check-button').css('display', 'none');
        $('.expired-return').css('display', 'block');
    }
});