import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';

type Props = DrawerScreenProps<DrawerParamList, 'EditPaciente'>;

const EditPacienteScreen: React.FC<Props> = ({ route, navigation }) => {
  const { paciente } = route.params;
  const [name, setName] = useState(paciente.name);
  const [cell_phone, setCellPhone] = useState(paciente.cell_phone);
  const [email, setEmail] = useState(paciente.email);
  const [gender, setGender] = useState(paciente.gender);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(paciente.name);
    setCellPhone(paciente.cell_phone);
    setEmail(paciente.email);
    setGender(paciente.gender);
  }, [paciente]);  

  const handleSave = async () => {
    setSaving(true);
    await fetch(`http://localhost:8000/pacientes/${paciente.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, cell_phone, email, gender }),
    });
    navigation.navigate('Paciente');        
    setSaving(false);  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <Text style={styles.label}>Telefone</Text>
      <TextInput value={cell_phone} onChangeText={setCellPhone} style={styles.input} />
      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />
      <Text style={styles.label}>Gênero</Text>
      <TextInput value={gender} onChangeText={setGender} style={styles.input} />
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate('Paciente')} />
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

export default EditPacienteScreen;
