import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaScreen from "../screens/ListaScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: 'purple',
        headerStyle: {
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: '#000',
        },
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: 'normal',
        }
      }}        
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Lista' component={ListaScreen} />
    </Stack.Navigator>
  );
}