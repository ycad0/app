define(function(require) {
    var $ = require("jquery");
    var dp = require("eonasdan-bootstrap-datetimepicker");

    $(function () {
        $('#datetimepicker12').datetimepicker({
            inline: true,
            sideBySide: true
        });
    });
});
