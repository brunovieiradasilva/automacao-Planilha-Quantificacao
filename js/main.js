let cor = 'black'
$("#home-tab").click(() => {
    $("#home").show("3s");

    $("#home-tab").parent().css("background-color",cor);
    $("#backbone-tab").parent().css("background-color",'');
    $("#infra-tab").parent().css("background-color",'');
    $("#sobre-tab").parent().css("background-color",'');

    $("#backbone").hide("3s");
    $("#infra").hide("3s");
    $("#sobre").hide("3s");
});
$("#backbone-tab").click(() => {
    $("#backbone").show("3s");

    $("#backbone-tab").parent().css("background-color",cor);
    $("#home-tab").parent().css("background-color",'');
    $("#infra-tab").parent().css("background-color",'');
    $("#sobre-tab").parent().css("background-color",'');

    $("#home").hide("3s");
    $("#infra").hide("3s");
    $("#sobre").hide("3s");
});
$("#infra-tab").click(() => {
    $("#infra").show("3s");

    $("#infra-tab").parent().css("background-color",cor);
    $("#backbone-tab").parent().css("background-color",'');
    $("#home-tab").parent().css("background-color",'');
    $("#sobre-tab").parent().css("background-color",'');

    $("#backbone").hide("3s");
    $("#home").hide("3s");
    $("#sobre").hide("3s");
});
$("#sobre-tab").click(() => {
    $("#sobre").show("3s");

    $("#sobre-tab").parent().css("background-color",cor);
    $("#backbone-tab").parent().css("background-color",'');
    $("#infra-tab").parent().css("background-color",'');
    $("#home-tab").parent().css("background-color",'');

    $("#backbone").hide("3s");
    $("#infra").hide("3s");
    $("#home").hide("3s");
});