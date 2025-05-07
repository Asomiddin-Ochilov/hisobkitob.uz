// Home.js
import { useMemo } from 'react';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { getExpenses, getIncomes, getUser } from './CRUD';
import DropdownButtons from './DropdownButtons';
export default function Home() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);


  console.log(selectedValue);
  

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

 

  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [user, setUser] = useState({});
  
  useEffect(() => {
    getExpenses((expenses) => setExpenses(expenses || []));
    getIncomes((incomes) => setIncomes(incomes || []));
  }, []);
  

  
  
  

  const calculateTotal = (array) => {
      console.log(array);
      
    if (Array.isArray(array) && array.length > 0) {
      return array.reduce((sum, item) => sum + Number(item.price), 0);
    } else {
      return 0;
    }
  };


  const totalIncomes =  calculateTotal(incomes);
  const totalExpenses = calculateTotal(expenses);
 


  
const balance = totalIncomes - totalExpenses;

  if (!fontsLoaded) {
    return null; // yoki loading indicator qo‘ysa bo‘ladi
  }

  return (
    <ScrollView style={styles.container}>
      {/* Balans */}
      <View style={styles.card}>
        <Text style={styles.title}>Hisob-kitob.uz</Text>
        <Text style={styles.balance}>
  {Number(balance).toLocaleString('uz-UZ')} so'm
</Text>

        <View style={styles.prices}>
          <View style={styles.leftBox}>
            <Text style={styles.boxText}>{ totalIncomes}</Text>
          </View>
          <View style={styles.rightBox}>
            <Text style={styles.boxText}>{totalExpenses}</Text>
          </View>
        </View>
      </View>

      {/* Xarajatlar */}
      <View style={styles.card}>
        {/* Dropdown for 'Xaftalik xarajatlar' */}
       <Text style={styles.title}>Xarajatlar</Text>
      <DropdownButtons setSelectedValue={setSelectedValue} />

        {/* List of items */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.list}>
          {[...Array(6)].map((_, i) => (
            <TouchableOpacity style={styles.item} key={i}>
              <Text style={styles.itemPrice}>$14.00</Text>
              <View style={styles.itemLine}></View>
              <Text style={styles.itemDay}>04.05.25</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
     

      {/* Kirim */}
      <View style={styles.card}>
        <Text style={styles.title}>Kirim</Text>
        <DropdownButtons setSelectedValue={setSelectedValue2} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.list}>
          {[...Array(6)].map((_, i) => (
            <TouchableOpacity style={styles.item} key={i}>
              <Text style={styles.itemPrice}>$14.00</Text>
              <View style={styles.itemLine}></View>
              <Text style={styles.itemDay}>04.05.25</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0f0',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 10,
    padding: 15,
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
  },
  balance: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    marginTop: 10,
  },
  prices: {
    flexDirection: 'row',
    marginTop: 10,
  },
  leftBox: {
    flex: 0.6,
    height: 50,
    backgroundColor: '#C9D0F9',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  rightBox: {
    flex: 0.4,
    height: 50,
    backgroundColor: '#FFC7C9',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  boxText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
  },
  dropdownTitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
  },
  list: {
    flexDirection: 'row',
  },
  item: {
    alignItems: 'center',
    marginRight: 15,
  },
  itemPrice: {
    fontFamily: 'Poppins_500Medium',
    color: '#6A6B82',
    fontSize: 14,
  },
  itemLine: {
    width: 60,
    height: 100,
    backgroundColor: '#C9D0F9',
    borderRadius: 8,
    marginVertical: 5,
  },
  itemDay: {
    fontFamily: 'Poppins_500Medium',
    color: '#6A6B82',
    fontSize: 14,
  },
});
