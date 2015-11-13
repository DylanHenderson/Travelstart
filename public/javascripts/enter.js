var go = document.getElementById("search");
var txt = document.getElementById("overDiv");

txt.addEventListener("keypress", function() {
    if (event.keyCode == 13) go.click();
});