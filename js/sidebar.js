
$(document).ready(function () {
    var head = $("#sidebar-head");
    head.click(function (e) {
        e.preventDefault();

        let obj = $("#sidebar-top");
        let content = $("#sidebar-content");
        let icon = $("#imgTabito");


        if (obj.width() > 60) {
            obj.css("width", "60px");
            content.css("visibility", "collapse");
            icon.attr("src", "assets/logo_mini1.png");
            icon.css("width", "30px");
            icon.css("height", "30px");
        } else {
            obj.css("width", "250px"); // or your original width
            content.css("visibility", "visible");
            icon.attr("src", "assets/logo2.png"); // or your original image
            icon.css("width", "100px");
            icon.css("height", "37.87px");
        }
    });
});
