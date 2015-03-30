$(document).ready(function(){

    var d = new DynTable();

    d.generateTable();

    $(document).on('click', '#mtable-add-table', function(){
        d.generateTable();
    });

    $(document).on('click', '.mtable-add-row', function(){
        d.addRow($(this));
    });

    $(document).on('click', '.mtable-add-column', function(){
        d.addColumn($(this));
    });

});
