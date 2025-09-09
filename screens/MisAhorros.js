import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";

export default function MisAhorros({ usuario }) {
  const [misAhorros, setMisAhorros] = useState([]);

  useEffect(() => {
    if (usuario) {
      fetchMisAhorros();
    }
  }, [usuario]);

  const fetchMisAhorros = async () => {
    const { data, error } = await supabase
      .from("ahorros")
      .select("*")
      .eq("usuario", usuario);

    if (!error) {
      setMisAhorros(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Ahorros ({usuario})</Text>
      <FlatList
        data={misAhorros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>- ${item.monto}</Text>
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
