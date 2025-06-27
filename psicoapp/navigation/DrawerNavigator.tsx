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
  Products: undefined;
  Socialnetworks: undefined;  
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
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;