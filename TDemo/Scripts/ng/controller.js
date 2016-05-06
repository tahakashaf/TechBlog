patientApp.controller("patientController", ['$scope', '$http', function ($scope, $http) {

    $scope.genders = ["F", "M"];


    $scope.currentDate = new Date();
   
    $scope.inputDate = new Date($('#datepicker').val()).toDateString();
    
   

    function CheckDate() {
        if ($('#datepicker').val() == "" && $scope.inputDate >= $scope.currentDate)
            return false;
        else
            return true;



    }


    $scope.save = function (patientForm) {
        console.log((typeof($('#datepicker').val())));
        console.log($scope.inputDate);
        console.log(CheckDate());
        if (patientForm.$valid && CheckDate()) {
            conosle.log("submit hoga")
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
            if (patientForm.lname.$error.required == true) {

                $scope.lnameError = "Required";
            }

           



        }



    }



    $scope.gridOptions = {

        columnDefs: [
          { field: 'FirstName' },
          { field: 'LastName' },
          { field: 'DateOfBirth', enableFiltering: false },
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
            $scope.gridOptions.data = data;
            console.dir($scope.allData);
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