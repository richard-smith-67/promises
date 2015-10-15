/**
 * Created by richard.smith on 15/10/2015.
 */
(function(){
    "use strict";
    angular
        .module('app',[])
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($http, $q){

        var vm = this;
        vm.getNames = getNames;
        vm.getStories = getStories;
        vm.login = login;

        function login(name) {

            fakeAsyncLoginTask(name)
                .then(function(response){
                    alert(response)
                }, function(err){
                    alert(err)
                })
        }

        function fakeAsyncLoginTask(name){

            //Return a promise
            return $q(function (resolve, reject) {

                setTimeout(function () {

                    if (name == 'rick') {
                        resolve('Hi ' + name)
                    } else {
                        reject('Name not recognised')
                    }

                }, 2000)

            });

        }

        function getNames(){

            var promise =  $http.get('http://localhost:3000/names');

            //Just explicitly referencing promise here
            //to remind myself what's being returned by get above
            promise.success(function(response){

                console.log(response.forEach(function(element){
                    console.log(element.name);
                }));

            });
        }

        function getStories(url) {
            httpWrapperRequest(url).then(function(response){
                console.log(response);
            });
        }

        //Shows how we create a Promise
        function httpWrapperRequest(url) {

            return new Promise(function(resolve, reject){

                var req = new XMLHttpRequest();

                req.open('GET', url);

                req.onload = function() {

                    if(req.status == 200){
                        resolve(req.response);
                    }
                    else {
                        reject(Error(req.status.text))
                    }
                };

                req.onerror = function() {
                    reject(Error('Network Error'));
                };

                req.send();
            })
        }

    }
})();