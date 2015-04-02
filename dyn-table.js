var DynTable = function (t) {

    var tableContainers = '#product-tables';

    var titles = t;

    var generateInput = function(tableIndex, rowIndex) {
        return '<input type="text" name="rows[' + tableIndex + '][' + rowIndex + '][]" class="form-control">';
    };

    var generateSelectbox = function(tableIndex) {

        var selectbox = '';

        selectbox += '' +
            '<div class="mtable-remove-column">' +
                '<a class="btn btn-danger" href="#">' +
                    '<i class="icon-white icon-remove"></i> Sil' +
                '</a>' +
            '</div>';

        selectbox += '<select name="heads[' + tableIndex + '][]" class="form-control"><option value="">Seçiniz..</option>';

        for (var k = 0; k < titles.length; k++) {
            selectbox += '<option value="' + titles[k].name + '">' + titles[k].name + '</option>';
        }

        selectbox += '</select>';

        return selectbox;

    };

    this.init = function(){
        this.generateTable();
        this.addTable();
        this.removeTable();
        this.addRow();
        this.addColumn();
        this.removeColumn();
        this.enableColumnHover();
    };

    this.generateTable = function() {

        var newTableIndex = $(tableContainers).find('.mtable-container').length + 1;

        var tableSchema = '' +
            '<div id="mtable-' + newTableIndex + '" class="mtable-container" data-index="' + newTableIndex + '">' +
                '<div class="mtable-buttons">' +
                    '<button class="btn btn-success mtable-add-row" type="button">' +
                        '<i class="icon-white icon-plus"></i> Satır Ekle' +
                    '</button>&nbsp;' +
                    '<button class="btn btn-success mtable-add-column" type="button">' +
                        '<i class="icon-white icon-plus"></i> Sütun Ekle' +
                    '</button>&nbsp;' +
                    '<button class="btn btn-danger mtable-remove-table" type="button">' +
                        '<i class="icon-white icon-remove"></i> Tabloyu Sil' +
                    '</button>' +
                '</div>' +
                '<table class="table table-striped tabloe-hover table-bordered">' +
                    '<thead>' +
                        '<tr>';
                            for (var i = 0; i < 5; i++) {
                                tableSchema += '<td class="selectbox-wrapper">' + generateSelectbox(newTableIndex) + '</td>';
                            }
                            tableSchema += '' +
                        '</tr>' +
                    '</thead>' +
                    '<tbody>';
                        for (var row = 0; row < 5; row++) {
                            tableSchema += '<tr>';
                                for (var column = 0; column < 5; column++) {
                                    tableSchema += '<td>' + generateInput(newTableIndex, row) + '</td>';
                                }
                            tableSchema += '</tr>';
                        }
                        tableSchema += '' +
                    '</tbody>' +
                '</table>' +
            '</div>';

        $(tableContainers).append(tableSchema);
    };

    this.addTable = function() {

        var _this = this;

        $(document).on('click', '#mtable-add-table', function(){
            _this.generateTable();
        });

    };

    this.removeTable = function () {

        $(document).on('click', '.mtable-remove-table', function(e){

            if (confirm("Bu işlem tüm tabloyu kalıcı olarak silecektir. \nEmin misiniz?")) {
                $(this).parents('.mtable-container:eq(0)').remove();
            }

            e.preventDefault();

        });

    };

    this.addRow = function () {

        $(document).on('click', '.mtable-add-row', function(e){

            var $parents     = $(this).parents('div:eq(1)');
            var $table       = $parents.find('.table');
            var $tableBodyTr = $table.find('tbody tr');
            var tableIndex   = $parents.data('index');
            var input        = '<input type="text" name="" class="form-control">';

            $table.find('tbody').append($tableBodyTr.last().clone());

            $table.find('tbody tr').last().find('input').each(function(){
                $(this).attr('name', '[' + tableIndex + '][' + parseInt($tableBodyTr.length + 1) + '][]');
            });

            e.preventDefault();

        });

    };

    this.addColumn = function () {

        $(document).on('click', '.mtable-add-column', function(e){

            var $parents     = $(this).parents('div:eq(1)');
            var $table       = $parents.find('.table');
            var $tableAllTr  = $table.find('tr');
            var $tableBodyTr = $table.find('tbody tr');
            var tableIndex   = $parents.data('index');
            var input        = '<input type="text" name="" class="form-control">';

            $tableAllTr.append('<td class="selectbox-wrapper">');
            $table.find('thead tr > td').last().html(generateSelectbox(tableIndex));

            $tableBodyTr.each(function() {
                var $_this = $(this);
                var $_td   = $(this).find('td').last();
                $_td.html(input);
                $_td.find('input').attr('name', '['+tableIndex+']['+$_this.index()+'][]');

            });

            e.preventDefault();

        });

    };

    this.removeColumn = function () {

        $(document).on('click', '.mtable-remove-column', function(e){

            if (confirm("Bu işlem tüm sütunu kalıcı olarak silecektir. \nEmin misiniz?")) {
                var index = $(this).parent().index();
                $(this).parent().remove();
                $('.table').find('tbody tr td:nth-child('+(index+1)+')').remove();
            }

            e.preventDefault();

        });

    };

    this.enableColumnHover = function () {

        $(document).on('mouseover', '.selectbox-wrapper', function(e){

            var $this  = $(this);
            var $table = $this.parents('.table:eq(0)');
            var index  = $this.index();

            $this.css('backgroundColor', '#fcfedf');

            $table.find('tbody tr').each(function(k, tr){
                $(tr).find('td:eq('+index+')').css('backgroundColor', '#fcfedf');
            });

            e.preventDefault();

        });

        $(document).on('mouseleave', '.selectbox-wrapper', function(e){

            var $this  = $(this);
            var $table = $this.parents('.table:eq(0)');
            var index  = $this.index();

            $this.css('backgroundColor', '');

            $table.find('tbody tr').each(function(k, tr){
                $(tr).find('td:eq('+index+')').css('backgroundColor', '');
            });

            e.preventDefault();

        });

    };


};