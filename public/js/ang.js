var myapp=angular.module("app",['ngRoute']);
// Routes 
myapp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../HTML/listView.html"
    })
    .when("/hierarchical", {
        templateUrl : "../HTML/hierarchical.html"
    })
});
// Hirearchial Controller 
myapp.controller('hierarchicalView',function($scope,$http,$rootScope){
	$scope.tree=$rootScope.tree;
});
//Initial Controller 
myapp.controller('ctrl', function($scope,$http,$window,$rootScope){
	//Navigation To new Page 
	$scope.hierarchical=function(){
		$scope.DepthFirstSearch();
		$window.location.href='#/hierarchical';
	}
	// Tree Declaration 
	$scope.tree;
	// Send User Profile to server
	$scope.sendProfile=function(){
		// Send data to Backend
		$http.post('/profileDetails', $scope.profile).then(
			function()
			{
				$scope.profile.name="";
				$scope.profile.designation="";
				$scope.profile.manager="";
			},
			function(){
				console.log("error");
		})
		.then(function(){
			gerateDetails();
		})
	}
	// Get data from server 
	var gerateDetails=function(){
		$http.get('/sendLogic').then(function(response){
			$rootScope.nodes= response.data;
		});
	}
	// get data on initial Load
	gerateDetails();
	// Generate Tree and View 
	$scope.DepthFirstSearch=function(){
		var mappedArr=[],i,tree = [],len,arrElem,arr=$rootScope.nodes,element;
		for(i = 0, len = arr.length; i < len; i++) {
	        arrElem = arr[i];
	        mappedArr[i] = arrElem;
	        mappedArr[i].id=i;
	        mappedArr[i].children = [];
      	}
      	for(i=0;i<mappedArr.length;i++)
      	{
      		element=mappedArr[i];
      		if (element.manager!=undefined && element.manager!="none") {
      			var managerId=findid(mappedArr,element.manager)
            mappedArr[managerId].children.push(element);
          }
          else {
          	if(element.name!="none")
            tree.push(element);
          }
      	}
      	$scope.tree=tree;
      	$rootScope.tree=tree;
	}
	// find Id of element 
	var findid=function(array,name){
		for(var i=0;i<array.length;i++){
			if(array[i].name==name){
				return i;
				break;
			}
		}
	}

});