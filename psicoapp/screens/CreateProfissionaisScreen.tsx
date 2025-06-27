import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'CreateProfissional'>;

const CreateProfissionaisScreen = ({ navigation }: Props) => {
  const [name, setName] = useState('');
  const [cell_phone, setCellPhone] = useState('');
  const [gender, setGender] = useState<'M' | 'F' | 'O'>('M');
  const [especialidadeId, setEspecialidadeId] = useState<number | null>(null);
  const [especialidades, setEspecialidades] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  const fetchEspecialidades = async () => {
    const res = await fetch('http://localhost:8000/profissionais/');
    const data = await res.json();
    setEspecialidades(data);
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch('http://localhost:8000/profissionais/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, cell_phone, gender }),
    });
    const novoProfissional = await res.json();

    if (especialidadeId) {
      await fetch('http://localhost:8000/profissionais-especialidades/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profissional: novoProfissional.id,
          especialidade: especialidadeId,
        }),
      });
    }

    navigation.navigate('Profissional');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Profissional</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput value={cell_phone} onChangeText={setCellPhone} style={styles.input} />

      <Text style={styles.label}>Gênero</Text>
      <Picker selectedValue={gender} onValueChange={setGender}>
        <Picker.Item label="Masculino" value="M" />
        <Picker.Item label="Feminino" value="F" />
        <Picker.Item label="Outro" value="O" />
      </Picker>

      <Text style={styles.label}>Especialidade</Text>
      <Picker selectedValue={especialidadeId} onValueChange={setEspecialidadeId}>
        <Picker.Item label="Selecione..." value={null} />
        {especialidades.map((esp) => (
          <Picker.Item key={esp.id} label={esp.name} value={esp.id} />
        ))}
      </Picker>

      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
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

export default CreateProfissionaisScreen;
