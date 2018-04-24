/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Yu Hang (David) Lin Student ID: 135034163 Date: February 9, 2018
*
*
********************************************************************************/ 


$(function() {


    let employeesModel = [];

    initalizeEmployeesModel();

    function initalizeEmployeesModel() {
        
            $.ajax({
                url: "http://warm-ocean-35680.herokuapp.com/employees",
                type: "GET",
                contentType: "application/json"
            })
            .done(function(employees) {
                employeesModel = employees;
                refreshEmployeeRows(employeesModel);
                $("#employee-search").keyup(function(event) {
                    
                    var string = $('#employee-search');
                    let filtered = getFilteredEmployeesModel(string.val());
                    refreshEmployeeRows(filtered);

                    console.log(filtered);

                    $(".body-row").on("click", function(event) {
                        console.log("click worked");
                        let id = $(this).attr("data-id");
    
    
                        let foundEmployee = getEmployeeModelById(id);
    
                        let mDate = moment(foundEmployee.HireDate);
                        
    
                        let mDate1 = mDate.format('LL');  
    
                        let clickedEmployeesTemplate = _.template('<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressState %> <%- employee.AddressCity %> <%- employee.AddressZip %>' +
                        '<br>' + '<strong>Phone Number:</strong> <%- employee.PhoneNum %>' + ' ext: ' + '<%- employee.Extension %>' + '<br>' +
                        '<strong>Hire Date:</strong>' + " " + mDate1
                        );
    
                        let somethingElse = clickedEmployeesTemplate({"employee":foundEmployee});
    
                        showGenericModal(foundEmployee.FirstName + " " + foundEmployee.LastName, somethingElse);
                    })

                })

                $(".body-row").on("click", function(event) {
                    console.log("click worked");
                    let id = $(this).attr("data-id");


                    let foundEmployee = getEmployeeModelById(id);

                    let mDate = moment(foundEmployee.HireDate);
                    

                    let mDate1 = mDate.format('LL');  

                    let clickedEmployeesTemplate = _.template('<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressState %> <%- employee.AddressCity %> <%- employee.AddressZip %>' +
                    '<br>' + '<strong>Phone Number:</strong> <%- employee.PhoneNum %>' + ' ext: ' + '<%- employee.Extension %>' + '<br>' +
                    '<strong>Hire Date:</strong>' + " " + mDate1
                    );

                    let somethingElse = clickedEmployeesTemplate({"employee":foundEmployee});

                    showGenericModal(foundEmployee.FirstName + " " + foundEmployee.LastName, somethingElse);
                })
            })
            .fail(function(err) {
                showGenericModal('Error', 'Unable to get Employees');
            });
        
    }

    

    function showGenericModal(title, message) {
        $('.modal-title').html(title);
        $('.modal-body').html(message);
        $('#genericModal').modal({
            backdrop: 'static',
            keyboard: false
        });
    }

    function refreshEmployeeRows(employees) {
        let employeesTemplate = _.template('<% _.forEach(employees, function(employee) { %>' +
                                    '<div class="row body-row" data-id="<%- employee._id %>">' +
                                    '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' + 
                                    '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
                                    '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' + 
                                    '</div>' +
                                    '<% }); %>');
                                    
        
        let employeesTemplateResult = employeesTemplate({ 'employees': employees }); 

        tableBody = $('#employees-table');
        tableBody.empty();

        tableBody.append(employeesTemplateResult);
    }

    function getFilteredEmployeesModel(filterString) {

        let filteredEmployees = _.filter(employeesModel, function(employee) { 
            return employee.FirstName.toLowerCase().indexOf(filterString.toLowerCase()) != -1 
            || employee.LastName.toLowerCase().indexOf(filterString.toLowerCase()) != -1 
            || employee.Position.PositionName.toLowerCase().indexOf(filterString.toLowerCase()) != -1; 
            

        });

        return filteredEmployees;
        console.log(filteredEmployees);
    }
    
    function getEmployeeModelById(id) {
        let foundEmployee =  _.find(employeesModel, function(employee) {
            console.log(id);
            return employee._id == id;
        });
        console.log(foundEmployee);
        if(foundEmployee) {
        return _.cloneDeep(foundEmployee);
        }
        else { 
            return null 
        };
    }


});