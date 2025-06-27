import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditPrescricao'>;

const EditPrescricaoScreen = ({ route, navigation }: Props) => {
  const { prescricao } = route.params;
  const [name, setName] = useState(prescricao.name);
  const [description, setDescription] = useState(prescricao.description);
  const [total, setTotal] = useState(prescricao.total_medicamento.toString());
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/prescricoes/${prescricao.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, total_medicamento: parseInt(total) }),
    });
    navigation.navigate('Prescricao');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />
      <TextInput style={styles.input} value={total} onChangeText={setTotal} keyboardType="numeric" />
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
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
});

export default EditPrescricaoScreen;
