import React, { useState ,useEffect} from 'react';
import { getExpenses, getIncomes, getUser, insertExpense, insertIncome, deleteExpense, deleteIncome ,db } from './CRUD';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  ScrollView
} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
const Sales = () => {


  const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_500Medium,
      Poppins_600SemiBold,
      Poppins_700Bold,
    });

  const [openModal, setOpenModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Xaftalik');
  const [expenses, setExpenses] = useState(null);

  

  const getData = async () => {
    getExpenses(setExpenses);
  };
  
  useEffect(() => {
    getData()
    
  }, []);

  const [newExpense, setNewExpense] = useState({
    xarajat: '',
    price: '',
  });

  const openModalFunc = () => {
    setOpenModal(!openModal);
    setNewExpense({ xarajat: '', price: '' });
  };

  const handleAddExpense = async () => {
    if (newExpense.xarajat && newExpense.price) {
      const newItem = {
        id: Date.now(),
        xarajat: newExpense.xarajat,
        date: new Date().toLocaleString(),
        price: parseFloat(newExpense.price),
      };
      console.log(newItem);
      
      insertExpense(newItem).then(() => {
        getData(); // Qo‘shgandan keyin yangilash
      });
      setOpenModal(false);
    }
  };

   const calculateTotal = (array) => {
    if (Array.isArray(array) && array.length > 0) {
      return array.reduce((sum, item) => sum + Number(item.price), 0);
    } else {
      return 0;
    }
  };

 

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Umumiy xarajat va Filter tugmalari */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Xarajatlar</Text>
        <Text style={styles.totalAmount}>${  calculateTotal(expenses).toFixed(2)}</Text>

        <View style={styles.buttonRow}>
          {['Xaftalik', 'Oylik', 'Yillik'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.selectedButton,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.selectedButtonText,
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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

      {/* Xarajatlar ro'yxati */}
      <View style={styles.expenseList}>
  <Text style={styles.sectionTitle}>Barcha Xarajatlar</Text>
  {expenses &&  expenses.map((item) => (
    <View key={item.id} style={styles.expenseItem}>
      <View style={styles.left}>
        <Text style={styles.name}>{item.xarajat}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.status}>Ishlatildi</Text>
        <Text style={styles.total}>${item.price}</Text>
      </View>
    </View>
  ))}
</View>

{/* Qo'shish tugmasi */}
<TouchableOpacity style={styles.addButton} onPress={openModalFunc}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal (Xarajat qo'shish) */}
      <Modal visible={openModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xarajat qo'shish</Text>

            <TextInput
              style={styles.input}
              placeholder="Xarajat haqida yozing"
              value={newExpense.xarajat}
              onChangeText={(text) =>
                setNewExpense({ ...newExpense, xarajat: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Ketgan pul"
              keyboardType="numeric"
              value={newExpense.price}
              onChangeText={(text) =>
                setNewExpense({ ...newExpense, price: text })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalBtn} onPress={handleAddExpense}>
                <Text style={styles.modalBtnText}>Qo'shish</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
                onPress={() => setOpenModal(false)}
              >
                <Text style={[styles.modalBtnText, { color: 'black' }]}>Bekor qilish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    
      


      
      </ScrollView>
    </View>
  );
};

export default Sales;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0f0',
    padding: 10,
    fontFamily:'Poppins_400Regular',
    position:'relative'
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    fontFamily:'Poppins_400Regular',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily:'Poppins_400Regular',
  },
  totalAmount: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: '900',
    fontFamily:'Poppins_400Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:-5,
  },
  periodButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#2B46F9',
  },
  list: {
    flexDirection: 'row',
    marginTop:20
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
  periodButtonText: {
    color: '#333',
    fontSize: 16,
    fontFamily:'Poppins_400Regular',
  },
  selectedButtonText: {
    color: '#fff',
    fontFamily:'Poppins_400Regular',
  },
  expenseList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    flex: 1,
    marginTop:10,
    position:'relative'
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  left: {},
  name: {
    fontSize: 17,
    color: 'black',
    fontFamily:'Poppins_400Regular',
  },
  date: {
    fontSize: 15,
    color: '#6A6B82',
    fontFamily:'Poppins_400Regular',
  },
  right: {
    alignItems: 'center',
  },
  status: {
    backgroundColor: '#CAF5EB',
    color: '#00835E',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    fontSize: 16,
    marginBottom: 5,
    fontFamily:'Poppins_400Regular',
  },
  total: {
    fontSize: 18,
    fontWeight: '800',
    fontFamily:'Poppins_400Regular',
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: '#2B46F9',
    width: 60,
    height: 60,
    borderRadius: 30,
    textAlign:'center',
    alignItems: 'center',
    paddingBottom:8,
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 40,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily:'Poppins_400Regular',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '85%',
    padding: 20,
    fontFamily:'Poppins_400Regular',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily:'Poppins_400Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    fontFamily:'Poppins_400Regular',
    outlineColor:'gray'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#2B46F9',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalBtnText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:'Poppins_400Regular',
  },
});
