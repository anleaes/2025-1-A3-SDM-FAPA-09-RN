import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Prescricao'>;

export type Prescricao = {
  id: number;
  name: string;
  description: string;
  total_medicamento: number;
};

const PrescricoesScreen = ({ navigation }: Props) => {
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrescricoes = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:8000/prescricoes/');
    const data = await res.json();
    setPrescricoes(data);
    setLoading(false);
  };

  useFocusEffect(useCallback(() => {
    fetchPrescricoes();
  }, []));

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/prescricoes/${id}/`, {
      method: 'DELETE',
    });
    setPrescricoes(prev => prev.filter(p => p.id !== id));
  };

  const renderItem = ({ item }: { item: Prescricao }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.description}>Total: {item.total_medicamento}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditPrescricao', { prescricao: item })}
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
      <Text style={styles.title}>Prescrições</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={prescricoes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePrescricao')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  card: { backgroundColor: '#e7f0ff', padding: 16, borderRadius: 10, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  description: { marginTop: 4, fontSize: 14, color: '#555' },
  row: { flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end' },
  editButton: { backgroundColor: '#4B7BE5', padding: 8, borderRadius: 6, marginRight: 8 },
  deleteButton: { backgroundColor: '#E54848', padding: 8, borderRadius: 6 },
  editText: { color: '#fff', fontWeight: '500' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#0D47A1', borderRadius: 28, padding: 14 },
});

export default PrescricoesScreen;
