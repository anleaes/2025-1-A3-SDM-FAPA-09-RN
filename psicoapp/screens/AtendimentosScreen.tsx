import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Atendimento'>;

export type Atendimento = {
  id: number;
  status: boolean;
  profissional: string; // Assuming this is a string for simplicity
  cliente: string; // Assuming this is a string for simplicity
  data: string; // Assuming this is a string for date
};

const AtendimentoScreen: React.FC<Props> = ({ navigation }) => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAtendimentos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/atendimentos/');
    const data = await response.json();
    setAtendimentos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAtendimentos();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/atendimentos/${id}/`, {
      method: 'DELETE',
    });
    setAtendimentos(prev => prev.filter(a => a.id !== id));
  };

  const renderItem = ({ item }: { item: Atendimento }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.profissional}</Text>
      <Text style={styles.description}>{item.cliente}</Text>
      <Text style={styles.date}>{item.data}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditAtendimento', { atendimento: item })}
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
      <Text style={styles.title}>Atendimentos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <FlatList
          data={atendimentos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <Button title="Adicionar Atendimento" onPress={() => navigation.navigate('CreateAtendimento')} />
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
  date: {
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

export default AtendimentoScreen;
