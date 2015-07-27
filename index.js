var todo = angular.module('todo', [ 'ui.router', 'ngAnimate' ]);

todo.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'index.tpl.html',
    controller: function($scope, todoStore) {
      $scope.todos = todoStore.open();
      console.log($scope.todos);

      $scope.$watch('todos', function(newValue) {
        $scope.todos = newValue.filter(function(e,i) {
          return i === 0 || (typeof e.text === 'string' && e.text.trim().length > 0);
        });
        todoStore.save($scope.todos);
      }, true);

      this.addTodo = function() {
        $scope.todos.unshift({ text: '' });
      };

      this.isEmpty = function() {
        return $scope.todos == null || $scope.todos.length === 0;
      };
    },
    controllerAs: 'ctrl',
  });

  $urlRouterProvider.otherwise('/');
});

todo.service('todoStore', function($q) {
  return {
    open: function() {
      if (localStorage['todos'] != null) {
        return JSON.parse(localStorage['todos']);
      } else {
        return [ { text: null } ];
      }
    },
    save: function(todos) {
      localStorage['todos'] = JSON.stringify(todos.map(function(e) {
        return {
          text: e.text,
        };
      }));
    }
  };
});

todo.directive('todoAutoFocus', function($animate) {
  return {
    restrict: 'A',
    link: function($scope, $element) {
      $animate.on('enter', $element, function() {
        $element.find('input')[0].focus();
      });
    },
  };
});

todo.directive('todoCompleted', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<span class="todo-completed" ng-click="value=!value">' +
        '<span ng-show="value">&#10004;</span>' +
      '</span>',
    scope: {
      value: '=',
    },
    link: function($scope, $element) {
    },
  };
});
