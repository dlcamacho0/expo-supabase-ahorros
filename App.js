
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import MisAhorros from "./screens/MisAhorros";
import TodosAhorros from "./screens/TodosAhorros";
import { supabase } from "./supabase";

export default function App() {
  const [usuario, setUsuario] = useState("");
  const [monto, setMonto] = useState("");

  const guardarAhorro = async () => {
    if (!usuario || !monto) {
      Alert.alert("Error", "Debes ingresar usuario y monto");
      return;
    }

    const { error } = await supabase
      .from("ahorros")
      .insert([{ usuario, monto: parseFloat(monto) }]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Éxito", "Ahorro guardado");
      setUsuario("");
      setMonto("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro de Ahorros</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />

      <Button title="Guardar Ahorro" onPress={guardarAhorro} />

      <View style={{ marginTop: 30 }}>
        <MisAhorros usuario={usuario} />
        <TodosAhorros />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  titulo: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
