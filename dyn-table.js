var DynTable = function (clientOptions) {

    var options = {
        tableContainer: '#tables',
        columns: [{name: 'Default Column', value: '#1'}],
        minRowLength: 1,
        isTableRemoveEnabled: false,
        isColumnRemoveEnabled: false,
        isRowRemoveEnabled: true,
        clearInputOnNewRow: false,
    }

    $.extend(options, clientOptions);

    var initialColumnLength = options.columns.length;

    var generateInput = function (tableIndex, rowIndex, value) {
        return '<input type="text" name="rows[' + tableIndex + '][' + rowIndex + '][]" value="' + value + '" class="form-control">';
    };

    var generateSelectbox = function (tableIndex, columnIndex) {

        var selectbox = '';

        if (options.isColumnRemoveEnabled) {
            selectbox += '' +
            '<div class="mtable-remove-column">' +
                '<a class="btn btn-danger" href="#">' +
                    '<i class="icon-white icon-remove"></i> Sil' +
                '</a>' +
            '</div>';
        }

        selectbox += '<select name="heads[' + tableIndex + '][]" class="form-control"><option value="">Seçiniz..</option>';

        for (var k = 0; k < options.columns.length; k++) {
            selectbox += '<option value="' + options.columns[k].name + '"' + ((k == columnIndex) ? ' selected' : '') + '>' + options.columns[k].name + '</option>';
        }

        selectbox += '</select>';

        return selectbox;

    };

    this.init = function () {
        this.generateTable();
        this.addTable();
        this.addColumn();
        this.addRow();

        if (options.isTableRemoveEnabled) {
            this.removeTable();
        }

        if (options.isColumnRemoveEnabled) {
            this.removeColumn();
            this.enableColumnHover();
        }

        if (options.isRowRemoveEnabled) {
            this.removeRow();
        }
    };

    this.generateTable = function () {

        var newTableIndex = $(options.tableContainer).find('.mtable-container').length + 1;

        var tableSchema = '' +
            '<div id="mtable-' + newTableIndex + '" class="mtable-container" data-index="' + newTableIndex + '">' +
            '<div class="mtable-buttons">';

        if (options.isTableRemoveEnabled) {
            tableSchema += '' +
                '<button class="btn btn-danger mtable-remove-table" type="button">' +
                    '<i class="icon-white icon-remove"></i> Tabloyu Sil' +
                '</button>&nbsp;';
        }

        if (options.isRowRemoveEnabled) {
            tableSchema += '' +
                '<button class="btn btn-success mtable-add-row" type="button">' +
                    '<i class="icon-white icon-plus"></i> Satır Ekle' +
                '</button>&nbsp;';
        }

        if (options.isColumnRemoveEnabled) {
            tableSchema += '' +
                '<button class="btn btn-success mtable-add-column" type="button">' +
                    '<i class="icon-white icon-plus"></i> Sütun Ekle' +
                '</button>&nbsp;';
        }

        tableSchema += '</div>';

        tableSchema += '' +
            '<table class="table table-striped table-bordered">' +
            '<thead>' +
            '<tr>';
        
        tableSchema += '<td style="width: 40px;">&nbsp;</td>';
        for (var i = 0; i < initialColumnLength; i++) {
            tableSchema += '<td class="selectbox-wrapper">' + generateSelectbox(newTableIndex, i) + '</td>';
        }
        tableSchema += '' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        for (var row = 0; row < options.minRowLength; row++) {
            tableSchema += '<tr>';
            tableSchema += '<td style="width: 40px;"><a href="#" class="btn btn-danger mtable-remove-row"><i class="icon-white icon-remove"></i></a></td>';
            for (var column = 0; column < initialColumnLength; column++) {
                tableSchema += '<td>' + generateInput(newTableIndex, row, options.columns[column].value) + '</td>';
            }
            tableSchema += '</tr>';
        }
        tableSchema += '' +
            '</tbody>' +
            '</table>' +
            '</div>';

        $(options.tableContainer).append(tableSchema);
    };

    this.addTable = function () {

        var _this = this;

        $(document).on('click', '#mtable-add-table', function () {
            _this.generateTable();
        });

    };

    this.removeTable = function () {

        $(document).on('click', '.mtable-remove-table', function (e) {

            if (confirm("Bu işlem tüm tabloyu kalıcı olarak silecektir. \nEmin misiniz?")) {
                $(this).parents('.mtable-container:eq(0)').remove();
            }

            e.preventDefault();

        });

    };

    this.addRow = function () {

        $(document).on('click', '.mtable-add-row', function (e) {

            var $parents = $(this).parents('div:eq(1)');
            var $table = $parents.find('.table');
            var $tableBodyTr = $table.find('tbody tr');
            var tableIndex = $parents.data('index');
            var input = '<input type="text" name="" class="form-control">';

            $table.find('tbody').append($tableBodyTr.last().clone());

            $table.find('tbody tr').last().find('input').each(function () {
                $(this).attr('name', 'rows[' + tableIndex + '][' + parseInt($tableBodyTr.length + 1) + '][]');
            });

            if (options.clearInputOnNewRow) {
                setTimeout(function () {
                    $table.find('tbody tr').last().find('input').each(function () {
                        $(this).val("");
                    });
                }, 100);
            }

            e.preventDefault();

        });

    };

    this.removeRow = function () {

        $(document).on('click', '.mtable-remove-row', function (e) {

            if (confirm("Bu işlem tüm satırı kalıcı olarak silecektir. \nEmin misiniz?")) {
                $(this).parents('tr').remove();
            }

            e.preventDefault();

        });

    };

    this.addColumn = function () {

        $(document).on('click', '.mtable-add-column', function (e) {

            var $parents = $(this).parents('div:eq(1)');
            var $table = $parents.find('.table');
            var $tableAllTr = $table.find('tr');
            var $tableBodyTr = $table.find('tbody tr');
            var tableIndex = $parents.data('index');
            var input = '<input type="text" name="" class="form-control">';

            $tableAllTr.append('<td class="selectbox-wrapper">');
            $table.find('thead tr > td').last().html(generateSelectbox(tableIndex, initialColumnLength + 1));

            $tableBodyTr.each(function () {
                var $_this = $(this);
                var $_td = $(this).find('td').last();
                $_td.html(input);
                $_td.find('input').attr('name', 'rows[' + tableIndex + '][' + $_this.index() + '][]');

            });

            e.preventDefault();

        });

    };

    this.removeColumn = function () {

        $(document).on('click', '.mtable-remove-column', function (e) {

            if (confirm("Bu işlem tüm sütunu kalıcı olarak silecektir. \nEmin misiniz?")) {
                var index = $(this).parent().index();
                $(this).parent().remove();
                $('.table').find('tbody tr td:nth-child(' + (index + 1) + ')').remove();
            }

            e.preventDefault();

        });

    };

    this.enableColumnHover = function () {

        $(document).on('mouseover', '.selectbox-wrapper', function (e) {

            var $this = $(this);
            var $table = $this.parents('.table:eq(0)');
            var index = $this.index();

            $this.css('backgroundColor', '#fcfedf');

            $table.find('tbody tr').each(function (k, tr) {
                $(tr).find('td:eq(' + index + ')').css('backgroundColor', '#fcfedf');
            });

            e.preventDefault();

        });

        $(document).on('mouseleave', '.selectbox-wrapper', function (e) {

            var $this = $(this);
            var $table = $this.parents('.table:eq(0)');
            var index = $this.index();

            $this.css('backgroundColor', '');

            $table.find('tbody tr').each(function (k, tr) {
                $(tr).find('td:eq(' + index + ')').css('backgroundColor', '');
            });

            e.preventDefault();

        });

    };


};