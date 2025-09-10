import { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MisAhorros from "./screens/MisAhorros";
import TodosAhorros from "./screens/TodosAhorros";
import { supabase } from "./supabase";

export default function App() {
  const [usuario, setUsuario] = useState("");
  const [monto, setMonto] = useState("");
  const [refreshKey, setRefreshKey] = useState(0); // para refrescar listas tras guardar

  const guardarAhorro = async () => {
    if (!usuario.trim() || !monto.trim()) {
      Alert.alert("Error", "Debes ingresar usuario y monto");
      return;
    }

    const montoNumber = Number(monto);
    if (Number.isNaN(montoNumber)) {
      Alert.alert("Error", "El monto debe ser numérico");
      return;
    }

    const { data, error } = await supabase
      .from("ahorros")
      .insert([{ usuario: usuario.trim(), monto: montoNumber }])
      .select();

    if (error) {
      console.log("Supabase insert error:", error);
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert("Éxito", "Ahorro guardado");
    setMonto("");
    setRefreshKey((x) => x + 1); // 🔄 fuerza recarga de las listas
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.titulo}>💰 Registro de Ahorros</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#888"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={monto}
        onChangeText={setMonto}
      />

      <Button title="Guardar Ahorro" onPress={guardarAhorro} />

      <View style={{ marginTop: 30 }}>
        {usuario !== "" && <MisAhorros usuario={usuario} refreshKey={refreshKey} />}
        <TodosAhorros refreshKey={refreshKey} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#ccc",
    color: "#000",
    backgroundColor: "#fff",
  },
});
