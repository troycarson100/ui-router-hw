angular.module('todoApp', ['ui.router'])
  .directive('navigationBar', navigationBar)
  .config(['$stateProvider', '$urlRouterProvider', router])
  .controller('TodoController', TodoController)


function router($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/templates/home.html'
    })
    .state('todos', {
      url: '/todos',
      templateUrl: '/templates/todos.html',
      controller: 'TodoController as tc'
    })
    .state('todo', {
      url: '/todo',
      templateUrl: '/templates/todo.html',
      controller: 'TodoController as tc'
    })
}

function navigationBar() {
  return {
    restrict: 'E',
    templateUrl: 'partials/nav.html'
  }
}

TodoController.$inject = ['$http']

function TodoController($http){
  var vm = this
  var apiUrl = '/api/todos'
  console.log('connected')
  var cb = function(data){
    console.log(data)
    vm.todos = data
  }

  $http.get(apiUrl)
    .success(cb)

  vm.addTodo = function(){
    console.log(vm.newTodo)
    $http.post(apiUrl, vm.newTodo)
      .success(function(data){
        console.log(data)
        vm.todos.push(data.item)
      })
    }
}
