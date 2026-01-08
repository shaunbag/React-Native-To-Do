import {useState} from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet,ImageBackground } from 'react-native';
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
    <View style={styles.container}>
      <Text>My Todo List</Text>
      <TextInput 
        value={todoText} 
        onChangeText={setTodoText} 
        placeholder="Enter a new to-do"
        style={{
          padding: 10,
        }}
      />
      <Button title="Add To-Do" onPress={addTodo}/>
      <Text>Tasks:</Text>
      <ScrollView style={{maxHeight:400, width: '80%'}}>
        {
          todos.length > 0 ? (
            todos.map((todo) => {
              return <View key={todo.id} style={styles.todoItem}><Text onPress={() => toggleTodo(todo.id)} style={todo.completed ? styles.completedTodo : {}}>{todo.completed ? '✓' : '○'} {todo.text}</Text></View>
            })
          ) : (
            <Text style={[styles.warning,{textAlign: 'center'}]}>Please Add Tasks!</Text>
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aee2e2ff',
  },
  warning: {
    color: 'red',
  },
  todoItem: {
    fontSize: 18,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#474747ff',
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },  
  completedTodo: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
})