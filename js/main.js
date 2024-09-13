$("#home-tab").click(() => {
    $("#home").show("3s");
    $("#backbone").hide("3s");
    $("#infra").hide("3s");
    $("#sobre").hide("3s");
});
$("#backbone-tab").click(() => {
    $("#backbone").show("3s");
    $("#home").hide("3s");
    $("#infra").hide("3s");
    $("#sobre").hide("3s");
});
$("#infra-tab").click(() => {
    $("#infra").show("3s");
    $("#backbone").hide("3s");
    $("#home").hide("3s");
    $("#sobre").hide("3s");
});
$("#sobre-tab").click(() => {
    $("#sobre").show("3s");
    $("#backbone").hide("3s");
    $("#infra").hide("3s");
    $("#home").hide("3s");
});