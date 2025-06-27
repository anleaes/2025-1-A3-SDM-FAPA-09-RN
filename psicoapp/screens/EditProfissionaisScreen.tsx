import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditProfissional'>;

const EditProfissionaisScreen = ({ route, navigation }: Props) => {
  const { profissional } = route.params;

  const [name, setName] = useState(profissional.name);
  const [cell_phone, setCellPhone] = useState(profissional.cell_phone);
  const [gender, setGender] = useState<'M' | 'F' | 'O'>(profissional.gender);
  const [especialidadeId, setEspecialidadeId] = useState<number | null>(null);
  const [especialidades, setEspecialidades] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/profissionais-especialidades/')
      .then(res => res.json())
      .then(data => {
        const match = data.find((item: any) => item.profissional === profissional.id);
        if (match) setEspecialidadeId(match.especialidade);
      });

    fetch('http://localhost:8000/profissionais/')
      .then(res => res.json())
      .then(data => setEspecialidades(data));
  }, [profissional.id]);

  const handleSave = async () => {
    setSaving(true);

    await fetch(`http://localhost:8000/api/profissionais/${profissional.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, cell_phone, gender }),
    });

    if (especialidadeId) {
    
      const current = await fetch('http://localhost:8000/profissionais-especialidades/')
        .then(res => res.json());

      const match = current.find((item: any) => item.profissional === profissional.id);

      if (match) {
        await fetch(`http://localhost:8000/profissionais-especialidades/${match.id}/`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profissional: profissional.id,
            especialidade: especialidadeId,
          }),
        });
      } else {
        // Cria vínculo se não existir
        await fetch('http://localhost:8000/profissionais-especialidades/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            profissional: profissional.id,
            especialidade: especialidadeId,
          }),
        });
      }
    }

    navigation.navigate('Profissional');
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Profissional</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Telefone</Text>
      <TextInput value={cell_phone} onChangeText={setCellPhone} style={styles.input} />

      <Text style={styles.label}>Gênero</Text>
      <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue as 'M' | 'F' | 'O')}>
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

      <Button title="Voltar" onPress={() => navigation.navigate('Profissional')} />
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

export default EditProfissionaisScreen;
