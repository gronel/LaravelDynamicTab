var currentTab;
var composeCount = 0;
//initilize tabs
$(function() {
    //when ever any tab is clicked this method will be call
    $("#myTab").on("click", "a", function(e) {
        e.preventDefault();

        $(this).tab("show");
        $currentTab = $(this);
    });
});

//this method will demonstrate how to add tab dynamically
function openNewTab(url, tabName) {
    /* just for this demo */
    //  e.preventDefault();

    var tabId = "compose" + composeCount; //this is id on tab content div where the
    composeCount = composeCount + 1; //increment compose count

    $(".nav-tabs").append(
        '<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#' +
            tabId +
            '"><button class="close closeTab" type="button" >×</button>' +
            tabName +
            "</a></li>"
    );
    $(".tab-content").append('<div class="tab-pane" id="' + tabId + '"></div>');

    craeteNewTabAndLoadUrl("", url, "#" + tabId);

    $('a[href="#' + tabId + '"]').tab("show");
    showTab(tabId);
    registerCloseEvent();
}

//this method will register event on close icon on the tab..
function registerCloseEvent() {
    $(".closeTab").click(function() {
        //there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
        var tabContentId = $(this)
            .parent()
            .attr("href");
        $(this)
            .parent()
            .parent()
            .remove(); //remove li of tab
        $("#myTab a:last").tab("show"); // Select first tab
        $(tabContentId).remove(); //remove respective tab content
    });
}

//shows the tab with passed content div id..paramter tabid indicates the div where the content resides
function showTab(tabId) {
    $('#myTab a[href="#' + tabId + '"]').tab("show");
}
//return current active tab
function getCurrentTab() {
    return currentTab;
}

//This function will create a new tab here and it will load the url content in tab content div.
function craeteNewTabAndLoadUrl(parms, url, loadDivSelector) {
    $("" + loadDivSelector).load(url, function(response, status, xhr) {
        if (status == "error") {
            var msg = "Sorry but there was an error getting details ! ";
            $("" + loadDivSelector).html(
                msg + xhr.status + " " + xhr.statusText
            );
            $("" + loadDivSelector).html("Load Ajax Content Here...");
        } else {
            $("" + loadDivSelector).html(response);
        }
    });
}

//this will return element from current tab
function getElement(selector) {
    var tabContentId = $currentTab.attr("href");
    return $("" + tabContentId).find("" + selector);
}

function removeCurrentTab() {
    var tabContentId = $currentTab.attr("href");
    $currentTab.parent().remove(); //remove li of tab
    $("#myTab a:last").tab("show"); // Select first tab
    $(tabContentId).remove(); //remove respective tab content
}
