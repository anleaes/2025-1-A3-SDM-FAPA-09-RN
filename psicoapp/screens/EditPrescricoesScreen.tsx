import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditPrescricao'>;

const EditPrescricaoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { prescricao } = route.params;
  const [name, setName] = useState(prescricao.name);
  const [description, setDescription] = useState(prescricao.description);
  const [total_medicamento, setTotalMedicamento] = useState(prescricao.total_medicamento);
  const [atendimento, setAtendimento] = useState(prescricao.atendimento);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(prescricao.name);
    setDescription(prescricao.description);
    setTotalMedicamento(prescricao.total_medicamento);
    setAtendimento(prescricao.atendimento);
  }, [prescricao]);  

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/prescricoes/${prescricao.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, total_medicamento, atendimento }),
    });
    navigation.navigate('Prescricao');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <Text style={styles.label}>Descrição</Text>
      <TextInput value={description} onChangeText={setDescription} style={styles.input} />
      <Text style={styles.label}>Total de Medicamentos</Text>
      <TextInput 
        value={total_medicamento.toString()} 
        onChangeText={(text) => setTotalMedicamento(Number(text))} 
        style={styles.input} 
        keyboardType="numeric" 
      />
      <Text style={styles.label}>Atendimento</Text>
      <TextInput value={atendimento} onChangeText={setAtendimento} style={styles.input} />
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
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff' 
  },
  label: { 
    fontWeight: 'bold', 
    marginTop: 12, 
    marginBottom: 4 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});

export default EditPrescricaoScreen;
