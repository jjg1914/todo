$(function() {
  $.get('todo.tpl.html').then(function(tpl) {
    if (localStorage.getItem('todo-version') < 2) {
      localStorage.clear();
    }
    localStorage.setItem('todo-version', 2);

    var state = localStorage.getItem('todo');
    if (state == null) {
      state = {
        todos: [],
      };
    } else {
      state = JSON.parse(state);
    }

    var flip = function() {
      state.todos = state.todos.filter(function(e) {
        return (typeof e.text === 'string' && e.text.trim().length > 0);
      });
      $('body').html(Mustache.render(tpl, state));
      localStorage.setItem('todo', JSON.stringify(state));
    };

    $('body').on('click', '.todo-checkbox-input', function() {
      var index = $(this).parent().index();
      state.todos[index].complete = !state.todos[index].complete;
      flip();
    });

    $('body').on('change', '.todo-item .todo-input', function() {
      var index = $(this).parent().index();
      state.todos[index].text = $(this).val();
      flip();
    });

    $('body').on('submit', '.todo-new-item', function() {
      state.todos.unshift({ text: $(this).find('input').val() });
      flip();
      $('.todo-new-item input').focus();
    });

    flip();
  });
});
