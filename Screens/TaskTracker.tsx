import React, { useEffect, useState, FC } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = "UTILITY_HUB_TODOS";

const TodoList: FC = () => {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  // ✅ FIXED: safer loading
  const loadTodos = async (): Promise<void> => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Todo[] = JSON.parse(stored);
        setTodos(Array.isArray(parsed) ? parsed : []);
      }
    } catch (err) {
      console.log("Load error:", err);
    }
  };

  // ✅ FIXED: stable saving
  const saveTodos = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  const addTodo = (): void => {
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setText("");
  };

  const deleteTodo = (id: string): void => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleDone = (id: string): void => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // ✏️ EDIT FUNCTION
  const startEdit = (todo: Todo): void => {
    setText(todo.text);
    setEditingId(todo.id);
  };

  const saveEdit = (): void => {
    if (!editingId || !text.trim()) return;

    setTodos((prev) =>
      prev.map((t) =>
        t.id === editingId ? { ...t, text: text.trim() } : t
      )
    );

    setEditingId(null);
    setText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <Text style={styles.subtitle}>Saved automatically</Text>

      {/* Input */}
      <View style={styles.inputCard}>
        <TextInput
          placeholder="Add a task..."
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholderTextColor="#7aa7ff"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={editingId ? saveEdit : addTodo}
        >
          <Text style={styles.buttonText}>
            {editingId ? "Save" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoCard}>

            {/* done toggle */}
            <TouchableOpacity onPress={() => toggleDone(item.id)}>
              <View
                style={[
                  styles.circle,
                  item.completed && styles.circleDone,
                ]}
              />
            </TouchableOpacity>

            {/* text */}
            <Text
              style={[
                styles.todoText,
                item.completed && styles.todoTextDone,
              ]}
            >
              {item.text}
            </Text>

            {/* EDIT ICON */}
            <TouchableOpacity onPress={() => startEdit(item)}>
              <FontAwesome name="edit" size={22} color="blue" />
            </TouchableOpacity>

            {/* DELETE ICON */}
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <AntDesign name="delete" size={22} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f7ff",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e66ff",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 13,
    color: "#6b8cff",
    textAlign: "center",
    marginBottom: 20,
  },

  inputCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },

  input: {
    flex: 1,
    padding: 10,
    color: "#1e66ff",
  },

  button: {
    backgroundColor: "#1e66ff",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  todoCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  circle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#1e66ff",
    marginRight: 10,
  },

  circleDone: {
    backgroundColor: "#1e66ff",
  },

  todoText: {
    flex: 1,
    color: "#1e66ff",
    fontSize: 15,
    fontWeight: "600",
  },

  todoTextDone: {
    textDecorationLine: "line-through",
    color: "#8aa6ff",
  },
});