$(document).ready(function(){

    var titles = [
        { "id": 1, "name": "ID" },
        { "id": 1, "name": "Başlık" },
        { "id": 1, "name": "Genişlik" },
        { "id": 1, "name": "Yükseklik" },
        { "id": 1, "name": "Hacim" }
    ];

    var d = new DynTable(titles);

    d.init();

});
