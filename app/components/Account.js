import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Button } from 'react-native';
import { FontAwesome,Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { clearAllData } from './CRUD';
const Account = () => {


   const [fontsLoaded] = useFonts({
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_600SemiBold,
          Poppins_700Bold,
        });

  return (
    <View style={styles.account}>
      <View style={styles.header}>
        <View style={styles.user}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: 'https://t3.ftcdn.net/jpg/03/94/89/90/360_F_394899054_4TMgw6eiMYUfozaZU3Kgr5e0LdH4ZrsU.jpg',
              }}
              style={styles.profileImage}
            />
            <View style={styles.name}>
              <Text style={styles.nameText}>User lastname</Text>
              <Text style={styles.email}>user@gmail.com</Text>
              <Text style={styles.phone}>+9989999999</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.edit}>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={clearAllData}>
      <Text style={styles.buttonText}>Reset qilish</Text>
    </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  account: {
    flex: 1,
    backgroundColor: '#e0e0f0',
    paddingTop: 10,
    paddingLeft:10,
    paddingRight:10,
    fontFamily:'Poppins_400Regular',
  },
  button: {
    backgroundColor: '#FF5C5C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '0 1px 8px 0 #DBE0F5',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  name: {
    marginLeft: 10,
    fontFamily:'Poppins_400Regular',
  },
  nameText: {
    fontSize: 20,
    color: 'black',
    margin: 0,
    fontWeight:'600',
    fontFamily:'Poppins_400Regular',
  },
  email: {
    fontSize: 16,
    color: '#6A6B82',
    fontFamily:'Poppins_400Regular',
  },
  phone: {
    fontSize: 16,
    color: '#6A6B82',
    fontFamily:'Poppins_400Regular',
  },
  edit: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default Account;
