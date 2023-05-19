
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './components/HomeTabs';

export default function App() {
 
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeTabs} options={{title: 'Sistema de Inventario'}} />
    </Stack.Navigator>
  </NavigationContainer>
    
  );
}




