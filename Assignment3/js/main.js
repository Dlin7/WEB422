let viewsModel = {
    teams: [],
    employees: [],
    projects: []
};

function showGenericModal(title, message) {
    $('.modal-title').html(title);
    $('.modal-body').html(message);
    $('#genericModal').modal({
        backdrop: 'static',
        keyboard: false
    });
}

function initializeTeams() {
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "http://warm-ocean-35680.herokuapp.com/teams-raw",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            //resolve(data);
            viewsModel.teams = ko.mapping.fromJS(data);
            resolve(data);
        })
        .fail(function (err) {
            reject("Error loading the team data");
        });
    });
}

function initializeEmployees() {
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "http://warm-ocean-35680.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            //resolve(data);
            viewsModel.employees = ko.mapping.fromJS(data);
            resolve(data);
        })
        .fail(function (err) {
            reject("Error loading the team data");
        });
    });
}

function initializeProjects() {
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "http://warm-ocean-35680.herokuapp.com/projects",
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data) {
            //resolve(data);
            viewsModel.projects = ko.mapping.fromJS(data);
            resolve(data);
        })
        .fail(function (err) {
            reject("Error loading the team data");
        });
    });
}

function saveTeam() {
    let currentTeam = this;

    $.ajax({
        url: "http://warm-ocean-35680.herokuapp.com/team/" + currentTeam._id(),
        type: "PUT",
        data: JSON.stringify({
            Projects: currentTeam.Projects(),
            Employees: currentTeam.Employees(),
            TeamLead: currentTeam.TeamLead()
        }),
        contentType: "application/json"
    })
    .done(function (data) {
        showGenericModal("Success", currentTeam.TeamName() + " Updated Successfully")
    })
    .fail(function (err) {
        showGenericModal("Error", "Error updating the team information.")
    });
}

$(function() {

        initializeTeams()
        .then(initializeEmployees)
        .then(initializeProjects)
        .then(function() {
            ko.applyBindings(viewsModel);

            $("select.multiple").multipleSelect({ filter: true });
            $("select.single").multipleSelect({ single: true, filter: true });


        }).catch(function(err) {
            showGenericModal("Error", err);
        });

});