import { Ionicons } from '@expo/vector-icons';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'Atendimento'>;

export type Atendimento = {
  id: number;
  profissional: string;
  cliente: string;
  data: string;
  status: boolean;
};

const AtendimentosScreen = ({ navigation }: Props) => {

  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAtendimentos = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:8000/atendimentos/');
    const data = await response.json();
    setAtendimentos(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchAtendimentos();
    }, [])
  );

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:8000/atendimentos/${id}/`, { 
        method: 'DELETE',
    });
    setAtendimentos(prev => prev.filter(a => a.id !== id));
  };

  const renderItem = ({ item }: { item: Atendimento }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.profissional} - {item.cliente}</Text>
      <Text style={styles.description}>{item.data}</Text>
      <View style={styles.row}>
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
        />
      )}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateAtendimento')}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#e6f0ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
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
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
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

export default AtendimentosScreen;
