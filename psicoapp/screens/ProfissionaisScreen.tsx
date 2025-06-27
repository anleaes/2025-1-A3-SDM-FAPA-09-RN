import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Profissional'>;

export type Profissional = {
  id: number;
  name: string;
  cell_phone: string;
  gender: 'M' | 'F' | 'O';
  especialidades: string[];
};

const ProfissionaisScreen = ({ navigation }: Props) => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfissionais = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:8000/profissionais/');
    const data = await res.json();
    setProfissionais(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfissionais();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/profissionais/${id}/`, { method: 'DELETE' });
    setProfissionais(prev => prev.filter(p => p.id !== id));
  };

  const renderItem = ({ item }: { item: Profissional }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.cell_phone}</Text>
      <Text>{item.gender}</Text>
      <Text>Especialidades: {item.especialidades?.join(', ')}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfissional', { profissional: item })}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.editText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profissionais</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={profissionais}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateProfissional')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', alignSelf: 'center', marginBottom: 12 },
  card: { backgroundColor: '#e6f0ff', padding: 16, borderRadius: 10, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: '600', color: '#222' },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  editText: { color: '#fff', fontWeight: '500' },
  row: { flexDirection: 'row', marginTop: 8 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#0D47A1',
    borderRadius: 28,
    padding: 14,
    elevation: 4,
  },
});

export default ProfissionaisScreen;
