$(function () {
    $("#datetimepicker1").datetimepicker({
        format: "MM/DD/YYYY",
        minDate: new Date(),
    });
    $("#datetimepicker2").datetimepicker({
        format: "LT",
    });
    $("#phoneText").mask("(999) 999-9999");
    $("#contactForm").validate({
        messages: {
            firstName: "Enter your First Name",
            phoneText: "Enter your Phone",
            dateText: "Enter a Date",
            timeText: "Enter a Time",
        },
        submitHandler: function (form) {
            $(".send-button").attr("disabled", true);
            $.ajax({
                type: "POST",
                url: "https://jsonplaceholder.typicode.com/posts",
                data: $(form).serialize(),
                dataType: "json",
                encode: true,
                success: function (response) {
                    $(".send-button").attr("disabled", false);
                    console.log("retorno: ", response);
                },
            });
        },
    });
    $("#email").rules("add", {
        messages: {
            required: "Enter your e-mail",
            email: "invalid e-mail!",
        },
    });
});

function montaPais() {
    $.ajax({
        type: "GET",
        url: "js/paises.json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
    }).done(function (response) {
        paises = "<option value='0' selected>Country</option>";

        $.each(response, function (p, pais) {
            paises +=
                '<option value="' + pais.Sigla + '">' + pais.Pais + "</option>";
        });

        $("#pais").html(paises);
    });
}

montaPais();
