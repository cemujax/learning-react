import React, { Component } from "react";
import PageTemplate from "./PageTemplate";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const initialTodos = new Array(500)
  .fill(0)
  .map((foo, index) => ({ id: index, text: `일정 ${index}`, done: false }));
class App extends Component {
  state = {
    input: "",
    todos: initialTodos
  };

  id = 500;
  getId = () => {
    return ++this.id;
  };
  handleChange = e => {
    const { value } = e.target;
    this.setState({
      input: value
    });
  };

  // 데이터 추가
  handleInsert = () => {
    const { todos, input } = this.state;

    // 새 데이터 객체
    const newTodo = {
      id: this.getId(),
      text: input,
      done: false
    };

    this.setState({
      todos: [...todos, newTodo],
      input: ""
    });
  };

  // TodoItem toggle
  handleToggle = id => {
    console.log("handleToggle");

    const { todos } = this.state;
    // id로 배열의 인덱스를 찾는다
    const index = todos.findIndex(todo => todo.id === id);

    // 찾은 데이터의 done 값 toggle
    const toggled = {
      ...todos[index],
      done: !todos[index].done
    };
    this.setState({
      todos: [
        ...todos.slice(0, index),
        toggled,
        ...todos.slice(index + 1, todos.length)
      ]
    });
  };

  // TodoItem remove
  handleRemove = id => {
    console.log("handleRemove");

    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    this.setState({
      todos: [...todos.slice(0, index), ...todos.slice(index + 1, todos.length)]
    });
  };

  render() {
    const { input, todos } = this.state;
    const { handleChange, handleInsert, handleToggle, handleRemove } = this;

    return (
      <div>
        <PageTemplate>
          <TodoInput
            onChange={handleChange}
            onInsert={handleInsert}
            value={input}
          />
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        </PageTemplate>
      </div>
    );
  }
}

export default App;
