import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditAtendimento'>;

const EditAtendimentoScreen: React.FC<Props> = ({ route, navigation }) => {
  const { atendimento } = route.params;
  const [status, setStatus] = useState(atendimento.status);
  const [profissional, setProfissional] = useState(atendimento.profissional);
  const [cliente, setCliente] = useState(atendimento.cliente);
  const [data, setData] = useState(atendimento.data);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setStatus(atendimento.status);
    setProfissional(atendimento.profissional);
    setCliente(atendimento.cliente);
    setData(atendimento.data);
  }, [atendimento]);  

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/atendimentos/${atendimento.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, profissional, cliente, data }),
    });
    navigation.navigate('Atendimento');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profissional</Text>
      <TextInput value={profissional} onChangeText={setProfissional} style={styles.input} />
      <Text style={styles.label}>Cliente</Text>
      <TextInput value={cliente} onChangeText={setCliente} style={styles.input} />
      <Text style={styles.label}>Data</Text>
      <TextInput value={data} onChangeText={setData} style={styles.input} />
      <Text style={styles.label}>Status</Text>
      <TextInput value={status ? 'Ativo' : 'Inativo'} onChangeText={(text) => setStatus(text === 'Ativo')} style={styles.input} />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Atendimento')} />
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

export default EditAtendimentoScreen;
