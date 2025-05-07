// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
// Pages
import Home from '../components/Home';
import Sales from '../components/Sales';
import Payroll from '../components/Payroll';
import Account from '../components/Account';
import Document from '../components/Document';

const Tab = createBottomTabNavigator();

function LoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <Image source={require('./logo.svg')} style={{ width: 150, height: 150 }} />
    </View>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);


  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });


  if (!fontsLoaded || loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationIndependentTree>
  <NavigationContainer independent={true}>
  <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Sales') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            } else if (route.name === 'Todo') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            } else if (route.name === 'Payroll') {
              iconName = focused ? 'cash' : 'cash-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={27} color={color} />;
          },
          tabBarActiveTintColor: '#2B46F9',
          tabBarInactiveTintColor: '#6A6B82',
          tabBarStyle: { height: 80, paddingBottom: 10, paddingTop: 10 },
          headerShown: false,
          tabBarLabelPosition: 'below-icon',
          tabBarLabelStyle: { fontFamily: 'Poppins_400Regular', fontSize: 14 },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Sales" component={Sales} />
        <Tab.Screen name="Todo" component={Document} />
        <Tab.Screen name="Payroll" component={Payroll} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
  </NavigationContainer>
</NavigationIndependentTree>
    
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B46F9',
    

  },
});
