import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditProfissional'>;

const EditProfissional = ({ route, navigation }: Props) => {
  const { profissional } = route.params;

  const [name, setName] = useState(profissional.name);
  const [cellPhone, setCellPhone] = useState(profissional.cell_phone);
  const [gender, setGender] = useState(profissional.gender);

  const handleUpdate = async () => {
    await fetch(`http://localhost:8000/profissionais/${profissional.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, cell_phone: cellPhone, gender }),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Profissional</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="Nome"
      />
      <TextInput
        value={cellPhone}
        onChangeText={setCellPhone}
        style={styles.input}
        placeholder="Telefone"
      />
      <TextInput
        value={gender}
        onChangeText={setGender}
        style={styles.input}
        placeholder="Gênero (M, F ou O)"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar</Text>
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

export default EditProfissional;
