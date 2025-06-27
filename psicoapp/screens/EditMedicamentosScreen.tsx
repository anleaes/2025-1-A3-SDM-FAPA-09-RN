import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditMedicamento'>;

const EditMedicamentoScreen = ({ route, navigation }: Props) => {
  const { medicamento } = route.params;
  const [name, setName] = useState(medicamento.name);
  const [description, setDescription] = useState(medicamento.description);
  const [price, setPrice] = useState(medicamento.price.toString());
  const [category, setCategory] = useState(medicamento.category.toString());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(medicamento.name);
    setDescription(medicamento.description);
    setPrice(medicamento.price.toString());
    setCategory(medicamento.category.toString());
  }, [medicamento]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/medicamentos/${medicamento.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, price: parseFloat(price), category: parseInt(category) }),
    });
    setSaving(false);
    navigation.navigate('Medicamento');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Medicamento</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <Text style={styles.label}>Descrição</Text>
      <TextInput value={description} onChangeText={setDescription} style={[styles.input, { height: 100 }]} multiline />
      <Text style={styles.label}>Preço</Text>
      <TextInput value={price} onChangeText={setPrice} style={styles.input} keyboardType="decimal-pad" />
      <Text style={styles.label}>ID da Categoria</Text>
      <TextInput value={category} onChangeText={setCategory} style={styles.input} keyboardType="numeric" />
      {saving ? <ActivityIndicator size="large" color="#4B7BE5" /> : <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />}
      <Button title="Voltar" onPress={() => navigation.navigate('Medicamento')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default EditMedicamentoScreen;