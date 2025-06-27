import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateProfissional'>;

const CreateProfissional = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [gender, setGender] = useState('O');

  const handleSubmit = async () => {
    await fetch('http://localhost:8000/profissionais/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, cell_phone: cellPhone, gender }),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Profissional</Text>

      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefone"
        value={cellPhone}
        onChangeText={setCellPhone}
        style={styles.input}
      />
      <TextInput
        placeholder="Gênero (M, F ou O)"
        value={gender}
        onChangeText={setGender}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  button: {
    backgroundColor: '#4B7BE5',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreateProfissional;
