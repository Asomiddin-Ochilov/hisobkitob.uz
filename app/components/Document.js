import React, { useState, useEffect } from 'react';
import { TextInput, Platform, View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button, FlatList, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const Document = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [todos, setTodos] = useState([]);

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Sana tanlash
  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);
  const handleConfirm = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    hidePicker();
  };

  // Ma’lumotlarni olish (AsyncStorage)
  const loadTodos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('todos');
      const data = jsonValue != null ? JSON.parse(jsonValue) : [];
      setTodos(data);
    } catch (e) {
      console.log('Error loading todos:', e);
    }
  };

  // Ma’lumotlarni saqlash
  const saveTodos = async (newTodos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    } catch (e) {
      console.log('Error saving todos:', e);
    }
  };

  // Qo‘shish
  const handleAddTodo = () => {
    if (title && description && amount) {
      const newTodo = {
        id: Date.now(),
        title,
        description,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString(),
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);

      setTitle('');
      setDescription('');
      setAmount('');
      setModalVisible(false);
    } else {
      Alert.alert('Diqqat', 'Barcha maydonlarni to‘ldiring!');
    }
  };

  // O‘chirish
  const handleDelete = (id) => {
    Alert.alert(
      "Ishonchingiz komilmi?",
      "Ushbu elementni o‘chirib tashlamoqchimisiz?",
      [
        { text: "Bekor qilish", style: "cancel" },
        {
          text: "O‘chirish", style: "destructive", onPress: () => {
            const updatedTodos = todos.filter((item) => item.id !== id);
            setTodos(updatedTodos);
            saveTodos(updatedTodos);
          }
        }
      ]
    );
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const renderItem = (item) => (
    <View style={styles.item} key={item.id}>
      <View style={styles.left}>
        <Text style={styles.company}>{item.title}</Text>
        <Text style={styles.dateText}>{item.description} — {item.amount} so‘m</Text>
        <Text style={{ color: '#999', fontSize: 13, fontFamily: 'Poppins_400Regular' }}>{item.date}</Text>
      </View>
      <TouchableOpacity style={styles.right} onPress={() => handleDelete(item.id)}>
        <FontAwesome name="trash" size={18} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.nav}>
            <Text style={styles.title}>Barcha Ishlarim {todos.length} </Text>

           
            
          </View>

          <View style={styles.items}>
            {todos.map((item) => renderItem(item))}
          </View>

        </View>
      </ScrollView>

      {/* Qo‘shish tugmasi */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Qo‘shish Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{
          flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: 'white', padding: 20, width: '90%', borderRadius: 10
          }}>
            <Text style={{ fontSize: 20, fontFamily: 'Poppins_600SemiBold', marginBottom: 10 }}>Yangi ish qo‘shish</Text>

            <TextInput
              placeholder="Sarlavha"
              value={title}
              onChangeText={setTitle}
              style={[styles.input, { width: '100%', marginBottom: 10 }]}
            />
            <TextInput
              placeholder="Tavsif"
              value={description}
              onChangeText={setDescription}
              style={[styles.input, { width: '100%', marginBottom: 10 }]}
            />
            <TextInput
              placeholder="Pul miqdori"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={[styles.input, { width: '100%', marginBottom: 15 }]}
            />

<View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
  <TouchableOpacity
    style={{
      backgroundColor: 'gray',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 6,
    }}
    onPress={() => setModalVisible(false)}
  >
    <Text style={{ color: 'white', fontFamily: 'Poppins_500Medium' }}>Bekor</Text>
  </TouchableOpacity>

  <View style={{ width: 10 }} />

  <TouchableOpacity
    style={{
      backgroundColor: '#2B46F9',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 6,
    }}
    onPress={handleAddTodo}
  >
    <Text style={{ color: 'white', fontFamily: 'Poppins_500Medium' }}>Qo‘shish</Text>
  </TouchableOpacity>
</View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Document;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0f0',
  },
  scroll: {
    paddingBottom: 80,
  },
  header: {
    width: '93%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: '3.5%',
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    fontFamily:'Poppins_400Regular',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily:'Poppins_400Regular',

  },
  dateButton: {
    backgroundColor: '#2B46F9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  dateButtonText: {
    color: 'white',
    fontSize: 17,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins_400Regular',
  },
  placeholder: {
    fontSize: 16,
    color: '#A0A0A0',
    fontFamily: 'Poppins_400Regular',
  },
  calendarIcon: {
    marginLeft: 10, // Ikonkaning matndan bir oz ajralishi uchun
  },
  items: {
    marginTop: 10,
  },
  item: {
    height: 65,
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {},
  company: {
    color: 'black',
    fontSize: 18,
    fontFamily:'Poppins_400Regular',
  },
  dateText: {
    color: '#6A6B82',
    fontSize: 15,
    fontFamily:'Poppins_400Regular',
  },
  right: {
    width: 35,
    height: 35,
    borderWidth: 2,
    borderColor: '#2B46F9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: '20%',
    right: '7%',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#2B46F9',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 40,
    lineHeight: 30,
  },
});
