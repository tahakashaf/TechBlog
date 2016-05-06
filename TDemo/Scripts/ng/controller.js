patientApp.controller("patientController", ['$scope', '$http', function ($scope, $http) {

    $scope.genders = ["F", "M"];


    var currentDate = new Date();
    currentDate.setHours(0,0,0,0)
    

    function CheckDate(input) {
        console.log(input + "input date");
        console.log(currentDate + "current date")

        if (input == "Invalid Date" ) {
            $scope.dateerror = "Please select a  date";
            return false;
            }
        else if (input >= currentDate) {
            $scope.dateerror = "Invalid Date of Birth Selected";
        }

        else {
            $scope.dateerror = " ";

            return true;

        }


    }


    $scope.save = function (patientForm) {
        $scope.fnameError = " ";
        $scope.lnameError = " ";
        $scope.countrymsg = " ";
        $scope.statemsg = " ";
        $scope.gendermsg = " ";

        
         var parts = $('#datepicker').val().split('/');
         var mydate = new Date(parts[2], parts[0] - 1, parts[1]);
         console.log(patientForm.$valid);
         console.log(CheckDate(mydate));
       
         if (patientForm.$valid && CheckDate(mydate)) {
        
            $scope.patient.DateOfBirth = $('#datepicker').val();

            $http.post("/Home/Save/", $scope.patient).then(function (data) {
                alert("Successfully Saved");
                reset();
            },
            function (result) {
                console.log("The request failed: " + result);
            });


        }

        else {
         

            if (patientForm.fname.$error.required == true) {
                $scope.fnameError = "FirstName is Required";

            }
           
           else if (patientForm.fname.$error.pattern == true) {
                $scope.fnameError = "Alphabets Only";

            }
            else {

                $scope.fnameError = " ";
            }
            if (patientForm.lname.$error.required == true) {

                $scope.lnameError = "Last Name Required";
            }
            else if (patientForm.lname.$error.pattern == true) {
                $scope.lnameError = "Alphabets Only";
            }
            else {

                $scope.lnameError = " ";
            }
           
            if (patientForm.gender.$error.required == true) {

                $scope.gendermsg = "Please select a gender";
            }
            else {
                $scope.gendermsg = " ";

            }
            if (patientForm.state.$error.required == true) {

                $scope.statemsg = "Please select a state";
            }
            else { 
                $scope.statemsg = " ";

            }
            if (patientForm.country.$error.required == true) {

                $scope.countrymsg = "please select a country";
            }
            else {
                $scope.countrymsg = " ";

            }



        }



    }
   function reset()
    {
        $scope.patient = [];
        $('#datepicker').val(" ")

    }


    $scope.gridOptions = {
        paginationPageSizes: [5, 10, 15],
        paginationPageSize: 5,
        columnDefs: [
          { field: 'FirstName' },
          { field: 'LastName' },
          { field: 'DateOfBirth', cellFilter: 'date:\'dd/MMM/yyyy \'' },
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