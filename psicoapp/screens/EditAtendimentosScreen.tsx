import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditAtendimento'>;

const EditAtendimentoScreen = ({ route, navigation }: Props) => {
  const { atendimento } = route.params;
  const [profissional, setProfissional] = useState(atendimento.profissional);
  const [cliente, setCliente] = useState(atendimento.cliente);
  const [status, setStatus] = useState(atendimento.status);
  const [data, setData] = useState(atendimento.data);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setProfissional(atendimento.profissional);
    setCliente(atendimento.cliente);
    setData(atendimento.data);
    setStatus(atendimento.status);
  }, [atendimento]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/atendimentos/${atendimento.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profissional, cliente, status, data }),
    });
    navigation.navigate('Atendimento');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Atendimento</Text>
      <Text style={styles.label}>Profissional (ID)</Text>
      <TextInput value={profissional.toString()} onChangeText={setProfissional} style={styles.input} />
      <Text style={styles.label}>Paciente (ID)</Text>
      <TextInput value={cliente.toString()} onChangeText={setCliente} style={styles.input} />
      <Text style={styles.label}>Data (AAAA-MM-DD)</Text>
      <TextInput value={data} onChangeText={setData} style={styles.input} />
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
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, alignSelf: 'center' },
  label: { fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});

export default EditAtendimentoScreen;
