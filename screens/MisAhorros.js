import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../supabase";

export default function MisAhorros({ usuario, refreshKey }) {
  const [ahorros, setAhorros] = useState([]);

  useEffect(() => {
    if (usuario) fetchAhorros();
  }, [usuario, refreshKey]); // 🔄 recarga al guardar

  const fetchAhorros = async () => {
    const { data, error } = await supabase
      .from("ahorros")
      .select("*")
      .eq("usuario", usuario)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("MisAhorros fetch error:", error);
      return;
    }
    setAhorros(data || []);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Ahorros</Text>
      {ahorros.length === 0 ? (
        <Text style={styles.empty}>No tienes ahorros aún.</Text>
      ) : (
        ahorros.map((item) => (
          <Text key={item.id} style={styles.item}>
            {item.usuario}: ${item.monto}
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#000" },
  item: { fontSize: 16, color: "#000", marginBottom: 5 },
  empty: { color: "#444" },
});
