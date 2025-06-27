import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Category } from './CategoriesScreen';

type Props = DrawerScreenProps<DrawerParamList, 'Medicamento'>;

export type Medicamento = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category
};

const MedicamentosScreen = ({ navigation }: Props) => {

  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedicamentos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/medicamentos/');
    const data = await response.json();
    setMedicamentos(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchMedicamentos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/medicamentos/${id}/`, {
      method: 'DELETE',
    });
    setMedicamentos((prev) => prev.filter((m) => m.id !== id));
  };

  const renderItem = ({ item }: { item: Medicamento }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditMedicamento', { medicamento: item })}
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
      <Text style={styles.title}>Medicamentos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={medicamentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateMedicamento')}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#e6f0ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: '#0a5',
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#4B7BE5',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#E54848',
    padding: 8,
    borderRadius: 6,
  },
  editText: {
    color: '#fff',
    fontWeight: '500',
  },
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

export default MedicamentosScreen;
