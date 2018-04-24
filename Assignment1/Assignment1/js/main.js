/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Yu Hang (David) Lin Student ID: 135034163 Date: Jan 24, 2018
*
*
********************************************************************************/ 


$(function() {
    $(".dropdown-menu").on("click", ".menu", function(event) {
        event.preventDefault();

        let $this = $(this);

        $.ajax({
            url: "http://warm-ocean-35680.herokuapp.com/" + $this.attr("data-src"),
            type: "GET",
            contentType: "application/json"
        })
        .done(function(teams) {
            var $data = $("#data");
			$data.empty();
			$data.append("<h3>" + $this.attr("data-src") + "</h3");
			$data.append(JSON.stringify(teams));

        })
        .fail(function(err) {
            console.log("failed with:" + err);
        })
    })

    
    


});