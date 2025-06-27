import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import CategoriesScreen, { Category } from '../screens/CategoriesScreen';
import CreateCategoryScreen from '../screens/CreateCategoryScreen';
import EditCategoryScreen from '../screens/EditCategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import AtendimentosScreen, { Atendimento } from '../screens/AtendimentosScreen';
import CreateAtendimentosScreen from '../screens/CreateAtendimentosScreen';
import EditAtendimentosScreen from '../screens/EditAtendimentosScreen';
import MedicamentosScreen, { Medicamento } from '../screens/MedicamentosScreen';
import CreateMedicamentosScreen from '../screens/CreateMedicamentosScreen';
import EditMedicamentosScreen from '../screens/EditMedicamentosScreen';
import PacientesScreen, { Paciente } from '../screens/PacientesScreen';
import CreatePacientesScreen from '../screens/CreatePacientesScreen';
import EditPacientesScreen from '../screens/EditPacientesScreen';
import PrescricoesScreen, { Prescricao } from '../screens/PrescricoesScreen';
import CreatePrescricoesScreen from '../screens/CreatePrescricoesScreen';
import EditPrescricoesScreen from '../screens/EditPrescricoesScreen';



export type DrawerParamList = {
  Home: undefined;
  Categories: undefined;
  CreateCategory: undefined; 
  EditCategory: { category: Category };
  Atendimento: undefined;
  CreateAtendimento: undefined; 
  EditAtendimento: { atendimento: Atendimento };
  Medicamento: undefined;
  CreateMedicamento: undefined; 
  EditMedicamento: { medicamento: Medicamento };
  Paciente: undefined;
  CreatePaciente: undefined; 
  EditPaciente: { paciente: Paciente };
  Prescricao: undefined;
  CreatePrescricao: undefined; 
  EditPrescricao: { prescricao: Prescricao };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          title: 'Categorias',
        }}
      />
      <Drawer.Screen
        name="CreateCategory"
        component={CreateCategoryScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova categoria' }}
      />
      <Drawer.Screen
        name="EditCategory"
        component={EditCategoryScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar categoria' }}
      />
      <Drawer.Screen
        name="Atendimento"
        component={AtendimentosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          title: 'Atendimentos',
        }}  
      />
      <Drawer.Screen
        name="CreateAtendimento"
        component={CreateAtendimentosScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo atendimento' }}
      />
      <Drawer.Screen
        name="EditAtendimento"
        component={EditAtendimentosScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar atendimento' }}
      />
      <Drawer.Screen
        name="Medicamento"
        component={MedicamentosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          title: 'Medicamentos',
        }}  
      />
      <Drawer.Screen
        name="CreateMedicamento"
        component={CreateMedicamentosScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo medicamento' }}
      />
      <Drawer.Screen
        name="EditMedicamento"
        component={EditMedicamentosScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar medicamento' }}
      />
      <Drawer.Screen
        name="Paciente"
        component={PacientesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          title: 'Pacientes',
        }}  
      />
      <Drawer.Screen
        name="CreatePaciente"
        component={CreatePacientesScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo paciente' }}
      />
      <Drawer.Screen
        name="EditPaciente"
        component={EditPacientesScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar paciente' }}
      />
      <Drawer.Screen
        name="Prescricao"
        component={PrescricoesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
          title: 'Prescricoes',
        }}  
      />
      <Drawer.Screen
        name="CreatePrescricao"
        component={CreatePrescricoesScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova prescrição' }}
      />
      <Drawer.Screen
        name="EditPrescricao"
        component={EditPrescricoesScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar prescrição' }}
      />
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;