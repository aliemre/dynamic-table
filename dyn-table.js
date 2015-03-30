var DynTable = function () {

    var tableContainers = '#product-tables';

    var titles = [];

    this.generateTable = function() {

        var newTableIndex = $(tableContainers).find('.mtable-container').length + 1;

        var tableSchema = '' +
            '<div id="mtable-' + newTableIndex + '" class="mtable-container">' +
                '<div class="mtable-buttons">' +
                    '<button class="btn btn-success mtable-add-row" type="button">' +
                        '<i class="icon-white icon-plus"></i> Satır Ekle' +
                    '</button>&nbsp;' +
                    '<button class="btn btn-success mtable-add-column" type="button">' +
                        '<i class="icon-white icon-plus"></i> Sütun Ekle' +
                    '</button>' +
                '</div>' +
                '<table class="table table-striped tabloe-hover table-bordered">' +
                    '<thead>' +
                        '<tr>';
                            for (var i = 0; i < 5; i++) {
                                tableSchema += '<td id="select-'+ i +'"></td>';
                            }
                            tableSchema += '' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>';
                        for (var k = 0; k < 5; k++) {
                            tableSchema += '' +
                            '<tr>' +
                                '<td><input type="text" name="" class="form-control"></td>' +
                                '<td><input type="text" name="" class="form-control"></td>' +
                                '<td><input type="text" name="" class="form-control"></td>' +
                                '<td><input type="text" name="" class="form-control"></td>' +
                                '<td><input type="text" name="" class="form-control"></td>' +
                            '</tr>';
                        }
                        tableSchema += '' +
                    '</tbody>' +
                '</table>' +
            '</div>';

        $(tableContainers).append(tableSchema);
        getTitles();
    };

    var generateInput = function() {
        return '<input type="text">';
    };

    var getTitles = function() {

        $.get('package.json', function (response) {
            if (response.titles.length) {
                titles = response.titles;
                generateSelectbox();
            }
        });

        return titles;

    };

    var generateSelectbox = function() {

        for (var i = 0; i < 5; i++) {

            var selectbox = '<select name="" class="form-control"><option value="">Seçiniz..</option>';

            for (var k = 0; k < titles.length; k++) {
                selectbox += '<option value="' + titles[k].name + '">' + titles[k].name + '</option>';
            }

            selectbox += '</select>';

            $("#select-" + i).html(selectbox);
        }

    };

    this.addTable = function() {

        this.generateTable();

    };

    this.addRow = function ($trigger) {

        var $table = $trigger.parents('div:eq(1)').find('.table');
        var $tableBodyTr = $table.find('tbody tr');

        $table.find('tbody').append($tableBodyTr.last().clone());
        $tableBodyTr.last().find('td').first().html(generateInput());

    };

    this.addColumn = function ($trigger) {

        var $table       = $trigger.parents('div:eq(1)').find('.table');
        var $tableAllTr  = $table.find('tr');
        var $tableBodyTr = $table.find('tbody tr');
        var input        = generateInput();

        $tableAllTr.append('<td>');
        $table.find('thead tr > td').last().html(generateSelectbox());

        $tableBodyTr.each(function() {
            $(this).find('td').last().html(input)
        });

    }

};