angular.module('product', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.products = [
      {name:'Candidate 1',price:5, picture: "", orders:1},
      {name:'Candidate 2',price:4, picture: "", orders:2},
      {name:'Candidate 3',price:3, picture: "", orders:3},
      {name:'Candidate 4',price:2, picture: "", orders:4},
      {name:'Candidate 5',price:1, picture: "", orders:5}
    ];
    $scope.ordered = [];
    $scope.create = function(product) {
      return $http.post('/products', product).success(function(data){
        $scope.products.push(data);
      });
    };
    $scope.addProduct = function() {
//      $scope.comments.push({title:$scope.formContent,upvotes:0});
      if($scope.productName === '' || $scope.productPrice ==='' || $scope.productPicture === '') { return; }
        console.log("In addComment with "+$scope.productName);
        $scope.create({
          name: $scope.productName,
          price: $scope.productPrice,
          picture: $scope.productPicture,
          orders: 0,
        });
      $scope.productName = '';
      $scope.productPrice = '';
      $scope.productPicture = '';
    };
    $scope.order = function(product) {
//console.log(product._id);
      return $http.put('/products/' + product._id + '/order')
        .success(function(data){
          console.log("order worked");

         product.orders += 1;;
        });
    };
    $scope.save = function(){
      console.log("in save");
      $scope.ordered = [];
      angular.forEach($scope.products, function(product){
       if(product.selected){
          $scope.ordered.push(product);
          product.selected = false;
          console.log($scope.ordered.length);
          //for(i = 0; i < $scope.ordered.length;i++){
            $scope.incrementOrders(product);
         // }
        }
      });
    };
    $scope.incrementOrders = function(product) {
      console.log("in incrementOrders");
      console.log(product.name);
      $scope.order(product);
    };

    $scope.getAll = function() {
      return $http.get('/products').success(function(data){
        angular.copy(data, $scope.products);
      });
    };

    $scope.getAll();

     $scope.delete = function(product) {
      $http.delete('/products/' + product._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };
  }
]);
