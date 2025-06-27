import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreatePrescricao'>;

const CreatePrescricaoScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [total, setTotal] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await fetch('http://localhost:8000/prescricoes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, total_medicamento: parseInt(total) }),
    });
    navigation.navigate('Prescricao');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Prescrição</Text>
      <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Descrição" value={description} onChangeText={setDescription} multiline />
      <TextInput style={styles.input} placeholder="Total de medicamentos" value={total} onChangeText={setTotal} keyboardType="numeric" />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Prescricao')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
});

export default CreatePrescricaoScreen;
