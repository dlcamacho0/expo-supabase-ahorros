import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";

export default function TodosAhorros() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("ahorros").select("*");

    if (!error) {
      setTodos(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Todos los Ahorros</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.usuario}: ${item.monto}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  titulo: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});
