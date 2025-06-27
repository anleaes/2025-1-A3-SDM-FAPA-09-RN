import { DrawerScreenProps } from '@react-navigation/drawer';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateAtendimento'>;

const CreateAtendimentoScreen = ({ navigation }: Props) => {
  const [profissional, setProfissional] = useState('');
  const [cliente, setCliente] = useState('');
  const [status, setStatus] = useState(true);
  const [data, setData] = useState('');
  const [saving, setSaving] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setProfissional('');
      setCliente('');
      setData('');
      setStatus(true);
    }, [])
  );

  const handleSave = async () => {
    setSaving(true);
    await fetch('http://localhost:8000/atendimentos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profissional, cliente, status, data }),
    });
    navigation.navigate('Atendimento');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Atendimento</Text>
      <Text style={styles.label}>Profissional (ID)</Text>
      <TextInput value={profissional} onChangeText={setProfissional} style={styles.input} />
      <Text style={styles.label}>Paciente (ID)</Text>
      <TextInput value={cliente} onChangeText={setCliente} style={styles.input} />
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

export default CreateAtendimentoScreen;