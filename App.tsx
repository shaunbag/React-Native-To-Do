import {useState} from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import React from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {

  const [todoText,setTodoText] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (): void => {
    if (todoText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setTodoText('');
    }
  };

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',  
      backgroundColor: 'white'  
    }}>
      <Text>My To-do List</Text>
      <TextInput 
        value={todoText} 
        onChangeText={setTodoText} 
        placeholder="Enter a new to-do"
      />
      <Button title="Add To-Do" onPress={addTodo}/>
      <Text>Tasks:</Text>
      <ScrollView style={{maxHeight:400, width: '80%'}}>
        {
          todos.length > 0 ? (
            todos.map((todo) => {
              return <View key={todo.id} style={{width: '80%'}}><Text onPress={() => toggleTodo(todo.id)}>{todo.completed ? '✓' : '○'} {todo.text}</Text></View>
            })
          ) : (
            <Text style={{textAlign: 'center'}}>No tasks added yet.</Text>
          )
        }
      </ScrollView>
      <View>
        <Text>Completed: {todos.filter(todo => todo.completed).length}</Text>
        <Text>Total: {todos.length}</Text>
        <Button title="Clear All" onPress={() => setTodos([])}/>
      </View>
    </View>
  );
}