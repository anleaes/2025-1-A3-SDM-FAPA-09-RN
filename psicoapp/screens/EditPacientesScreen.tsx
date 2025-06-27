import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { Picker } from '@react-native-picker/picker';


type Props = DrawerScreenProps<DrawerParamList, "EditPaciente">;

const EditPacienteScreen = ({ route, navigation }: Props) => {
  const { paciente } = route.params;
  const [name, setName] = useState(paciente.name);
  const [cellPhone, setCellPhone] = useState(paciente.cell_phone);
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, cell_phone: cellPhone, email, gender }),
    });
    navigation.navigate("Paciente");
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Paciente</Text>
      <Text style={styles.label}>Nome</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />
      <Text style={styles.label}>Telefone</Text>
      <TextInput
        value={cellPhone}
        onChangeText={setCellPhone}
        style={styles.input}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />
      <Text style={styles.label}>Gênero</Text>
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue as "M" | "F" | "O")}
      >
        <Picker.Item label="Masculino" value="M" />
        <Picker.Item label="Feminino" value="F" />
        <Picker.Item label="Outro" value="O" />
      </Picker>
      {saving ? (
        <ActivityIndicator size="large" color="#4B7BE5" />
      ) : (
        <Button title="Salvar" onPress={handleSave} color="#4B7BE5" />
      )}
      <Button title="Voltar" onPress={() => navigation.navigate("Paciente")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    alignSelf: "center",
  },
  label: {
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
});

export default EditPacienteScreen;
