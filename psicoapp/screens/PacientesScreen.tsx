import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Paciente'>;

export type Paciente = {
  id: number;
  name: string;
  cell_phone: string;
  email: string;
  gender: 'M' | 'F' | 'O';
};

const PacientesScreen = ({ navigation }: Props) => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPacientes = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/pacientes/');
    const data = await response.json();
    setPacientes(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPacientes();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/pacientes/${id}/`, {
      method: 'DELETE',
    });
    setPacientes((prev) => prev.filter((p) => p.id !== id));
  };

  const renderItem = ({ item }: { item: Paciente }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.cell_phone}</Text>
      <Text>{item.gender}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditPaciente', { paciente: item })}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.editText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pacientes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={pacientes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreatePaciente')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', alignSelf: 'center', marginBottom: 12 },
  card: { backgroundColor: '#f0f4ff', padding: 16, borderRadius: 10, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: '600' },
  row: { flexDirection: 'row', marginTop: 8, justifyContent: 'flex-end' },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  editText: { color: '#fff', fontWeight: '500' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0D47A1',
    borderRadius: 28,
    padding: 14,
  },
});

export default PacientesScreen;
