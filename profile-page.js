document.querySelector("#profilePhoto").addEventListener('change', function(event) {
    document.querySelector("#photoDisplayArea");

var file = event.target.files[0];

if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        displayArea.style.backgroundImage = 'url(' + e.target.result + ')';
    }}})


