$.get("../view/includes/bandeau_bas.html", function (data) {
    $("#footer").html(data);
});

if (sessionStorage.getItem('login')) {
    $.get("../view/includes/bandeau_haut_connecte.html", function (data) {
        $("#header").html(data);
    });
} else {
    $.get("../view/includes/bandeau_haut.html", function (data) {
        $("#header").html(data);
    });
}
