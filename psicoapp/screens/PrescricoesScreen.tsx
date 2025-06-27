import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Prescricao'>;

export type Prescricao = {
  id: number;
  name: string;
  description: string;
  total_medicamento: number;
  atendimento: string; // Assuming this is a string for simplicity
};

const PrescricaoScreen: React.FC<Props> = ({ navigation }) => {
  const [prescricoes, setPrescricoes] = useState<Prescricao[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrescricoes = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/prescricoes/');
    const data = await response.json();
    setPrescricoes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPrescricoes();
  }, []);

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
      <Text style={styles.total}>{item.total_medicamento}</Text>
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
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <Button title="Adicionar Prescrição" onPress={() => navigation.navigate('CreatePrescricao')} />
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
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
  total: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#4B7BE5',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  editText: { 
    color: '#fff', 
    fontWeight: '500' 
  },
  deleteButton: {
    backgroundColor: '#E54848',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
});

export default PrescricaoScreen;
