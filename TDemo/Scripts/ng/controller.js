patientApp.controller("patientController", ['$scope', '$http', function ($scope, $http) {

    $scope.genders = ["F", "M"];


    var currentDate = new Date();
    currentDate.setHours(0,0,0,0)
    
   
    
  

    function CheckDate(input) {
        console.log(input + "input date");
        console.log(currentDate + "current date")

        if (input == "Invalid Date" || input >= currentDate) {
            $scope.dateerror = "Date validation";
            return false;
        }
        else
            return true;



    }


    $scope.save = function (patientForm) {

        
         var parts = $('#datepicker').val().split('/');
         var mydate = new Date(parts[2], parts[0] - 1, parts[1]);
         console.log(patientForm.$valid);
         console.log(CheckDate(mydate));
       
         if (patientForm.$valid && CheckDate(mydate)) {
        
            $scope.patient.DateOfBirth = $('#datepicker').val();

            $http.post("/Home/Save/", $scope.patient).then(function (data) {
                alert("ok");
            },
            function (result) {
                console.log("The request failed: " + result);
            });


        }

        else {
            console.log("do validations");

            if (patientForm.fname.$error.required == true) {
                $scope.fnameError = "Required";

            }
            if (patientForm.fname.$error.pattern == true) {
                $scope.fError = "AlphabetOnly";

            }
            if (patientForm.lname.$error.required == true) {

                $scope.lnameError = "Required";
            }
            if (patientForm.gender.$error.required == true) {

                $scope.gendermsg = "Required";
            }
            if (patientForm.state.$error.required == true) {

                $scope.statemsg = "Required";
            }
            if (patientForm.country.$error.required == true) {

                $scope.countrymsg = "Required";
            }



        }



    }



    $scope.gridOptions = {

        columnDefs: [
          { field: 'FirstName' },
          { field: 'LastName' },
          { field: 'DateOfBirth', cellFilter: 'date:\'MM/dd/yyyy \'' },
          { field: 'Gender' },
          { field: 'Country' },
          { field: 'State' },


        ]
    };










    GetAll();

    function GetAll() {
        $http({
            method: 'Get',
            url: '/Home/GetAll'
        }).success(function (data, status, headers, config) {
            $scope.allData = data;
            console.dir($scope.allData);
            angular.forEach($scope.allData, function (value, key) {

               // value.DateOfBirth = new Date(parseInt(value.DateOfBirth.replace("/Date(", "").replace(")/", ""), 10));
                value.DateOfBirth= new Date(parseInt(value.DateOfBirth.substr(6)));
         
            });
            
            $scope.gridOptions.data = $scope.allData;
            
        }).error(function (data, status, headers, config) {
            $scope.message1 = 'Unexpected Error';
        });
    }



    GetCountries();

    function GetCountries() {
        $http({
            method: 'Get',
            url: '/Home/GetCountries'
        }).success(function (data, status, headers, config) {
            $scope.countries = data;
        }).error(function (data, status, headers, config) {
            $scope.message = 'Unexpected Error';
        });
    }

    $scope.GetStates = function (id) {
        alert("hi" + id);
        var countryId = $scope.country;
        if (id) {
            $http({
                method: 'POST',
                url: '/Home/GetStates/',
                data: JSON.stringify({ countryId: id })
            }).success(function (data, status, headers, config) {
                $scope.states = data;
            }).error(function (data, status, headers, config) {
                $scope.message = 'Unexpected Error';
            });
        }
        else {
            $scope.states = null;
        }
    }








}]);