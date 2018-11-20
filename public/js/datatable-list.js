/*
* Author: Kenneth Carl Nacua Ybañez
* Created Date: September 2018
* */
$(document).ready(function() {
    var recordCount = $("#recordCount").val();
    var currentPage = $("#currentPage").val();
    var recordsPerPage = $("#recordsPerPage").val();
    var maxPage = $("#maxPage").val();
    var from ="";
    var to = "";
    var page = "";
    var columnDefinitions = JSON.parse($("#columnDefinitions").val());
    var width = parseInt($('#container').width());

    function setDataTable(){
        $('#my-data-table').DataTable( {
            "order": [[ 0, "asc" ]],
            "bLengthChange": false,
            "bFilter": false,
            "bAutoWidth": false,
            "pageLength": parseInt(recordsPerPage),
            "info": false,
            "paginate": false,
            "responsive": true
        } );
        $('#my-data-table').attr('style', 'border-collapse: collapse !important');
    }

    function setDataTableInfo(){
        if(parseInt(recordCount) == 0) return;

        if (currentPage.toString() == "1") {
            from = 1;
            to = parseInt(recordCount) >= parseInt(recordsPerPage) ? parseInt(recordsPerPage) : parseInt(recordCount);
        }
        else {
            from = ((parseInt(currentPage) - 1) * parseInt(recordsPerPage)) + 1;
            if(parseInt(currentPage) < parseInt(maxPage)) {
                to = parseInt(currentPage) * parseInt(recordsPerPage);
            }
            else{
                to = parseInt(recordCount);
            }
        }

        $("#info").html("Showing " + from.toString() + " to " + to.toString() + " of " + recordCount + " records.");
    }

    function appendPreviousButton(){
        page = parseInt(currentPage) > 1 ? parseInt(currentPage) - 1 : 1;
        if(parseInt(currentPage) > 1) {
            $("#pageButtons").append('<li id="previous" class="page-item" data-value="' + page + '"><a class="page-link">Previous</a></li>');
        }
        else{
            $("#pageButtons").append('<li id="previous" class="page-item disabled" data-value="' + page + '"><a class="page-link">Previous</a></li>');
        }
    }

    function appendFirstButton(page){
        $("#pageButtons").append('<li id="first" class="page-item" data-value="' + page + '"><a class="page-link">First</a></li>');
    }

    function appendNextButton(){
        page = parseInt(currentPage) < parseInt(maxPage) ? (parseInt(currentPage) + 1) : parseInt(maxPage);
        if(parseInt(currentPage) < parseInt(maxPage)){
            $("#pageButtons").append('<li id="next" class="page-item" data-value="' + page + '"><a class="page-link">Next</a></li>');
        }
        else{
            $("#pageButtons").append('<li id="next" class="page-item disabled" data-value="' + page + '"><a class="page-link">Next</a></li>');
        }
    }

    function appendButton(page){
        if(parseInt(page) == parseInt(currentPage)) {
            $("#pageButtons").append('<li class="page-item active"><a class="page-link" data-value="' + page + '">' + page + '<span class="sr-only">(current)</span></a></li>');
        }
        else{
            $("#pageButtons").append('<li class="page-item" data-value="' + page + '"><a class="page-link">' + page + '</a></li>');

        }
    }

    function appendLabel(value){
        $("#pageButtons").append('<label style="padding: 0px 3px 0px 3px; margin-top: 0px;">' + value + '</label>');
    }

    function setDataTablePageButtons(){
        if(parseInt(recordCount) == 0) return;
        appendPreviousButton();
        if(maxPage <= 6){
            // Show at most six page buttons
            for(var i = 1; i <= maxPage; i++){
                appendButton(i);
            }
        }
        else{
            var min = 1;
            var max = 3;

            // Show first three page buttons
            if(parseInt(currentPage) > 1 && currentPage < parseInt(maxPage) - 2){
                min = parseInt(currentPage);
                max = parseInt(currentPage) + 2;
            }

            if(parseInt(currentPage) > 2){
                appendFirstButton(1);
            }

            for(var i = min; i <= max; i++){
                appendButton(i);
            }

            appendLabel(".....");

            min = parseInt(maxPage) - 2;
            max = parseInt(maxPage);

            for(var i = min; i <= max; i++){
                appendButton(i);
            }
        }
        appendNextButton();
    }

    // set table-container max width
    $('#table-container').css("max-width", width);
    $('#scrollbar-top').css("max-width", width);

    // watch window width and set table-container max width
    $( window ).resize(function() {
        setTimeout(function () {
            width = parseInt($('#container').width());
            $('#table-container').css("max-width", width);
            $('#scrollbar-top').css("max-width", width);
            $('#scrollbar-top-content').css("width", parseInt($('#my-data-table').width()) + 15);
        }, 200);
    });

    // Initialize data table
    setDataTable();
    setDataTableInfo();
    setDataTablePageButtons();

    setTimeout(function () {
        $('#my-data-table_wrapper').css("width", parseInt($('#my-data-table_wrapper').width()) - 15);
        $('#scrollbar-top-content').css("width", parseInt($('#my-data-table').width()) + 15);
    }, 200);

    $('#scrollbar-top-content').css("width", parseInt($('#my-data-table').width()) + 15);
    $('#table-container').show();
    $('#scrollbar-top').show();
    $('#processing').hide();

    $("#table-container").scroll(function(){
        $("#scrollbar-top")
            .scrollLeft($("#table-container").scrollLeft());
    });
    $("#scrollbar-top").scroll(function(){
        $("#table-container")
            .scrollLeft($("#scrollbar-top").scrollLeft());
    });

    // set select with search bar
    $('select').select2({
        theme: 'bootstrap'
    });

    // Click event of page buttons
    $(".page-item").click(function(){
        if((parseInt(currentPage) == 1 && $(this).attr("id") == "previous")
        || (parseInt(currentPage) == parseInt(maxPage) && $(this).attr("id") == "next")
        || parseInt($(this).data("value")) == parseInt(currentPage)){
            return;
        }
        else{
            var link = window.location.href;
            var splitter = "page=" + currentPage;
            var link_list = link.split(splitter);

            // Redirect to the selected page
            window.location.href = link_list[0] + "page=" + $(this).data("value");
        }
    });

    $("#clear_search").click(function(){
        var id = "";
        for(var i = 0; i < columnDefinitions.length; i++){
            if(columnDefinitions[i].enableFilter == true){
                id = "#" + columnDefinitions[i].key + "_filter";
                $(id).val("");
            }
        }
        $('#search').trigger( "click" );
    });

    $("#clear").click(function(){
        for(var i = 0; i < columnDefinitions.length; i++){
            if(columnDefinitions[i].enableFilter == true){
                id = "#" + columnDefinitions[i].key + "_filter";
                $(id).val("");
            }
        }
    });

    // Click event for search button
    $('#search').click(function(){
        var id = "";
        var redirect = window.location.href.toString().split("&")[0];
        for(var i = 0; i < columnDefinitions.length; i++){
            if(columnDefinitions[i].enableFilter == true){
                id = "#" + columnDefinitions[i].key + "_filter";
                if($(id).val().trim() != ""){
                    redirect = redirect + "&" + columnDefinitions[i].key + "=" + $(id).val().trim();
                }
            }
        }
        window.location.href = redirect;
    });

    // Click event for search icon beside Actions column
    $('#search_icon').click(function(){
        if($('#search_bar_row').is(":visible")){
            $('#search_bar_row').hide();
        }
        else{
            $('#search_bar_row').show();
        }
    });
} );
