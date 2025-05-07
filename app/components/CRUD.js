import localforage from 'localforage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Ma'lumotlar bazasini yaratish
const db = localforage.createInstance({
  name: "expensesDB"
});

export { db };

// Yangi xarajat qo'shish
export const insertExpense = async (newItem) => {
    try {
      const jsonValue = await AsyncStorage.getItem('expenses');
      const data = jsonValue != null ? JSON.parse(jsonValue) : [];
  
      const updated = [...data, newItem];
      alert('keldi')
      await AsyncStorage.setItem('expenses', JSON.stringify(updated));
  
      console.log('Expense added');
    } catch (e) {
      console.log('Error adding expense:', e);
    }
  };
  

  

// Yangi kirim qo'shish

  

// User ma'lumotlarini qo'shish
export const setUser = (userName, email, phone) => {
  const user = { userName, email, phone };
  db.setItem('user', user)
    .then(() => console.log('User data added'))
    .catch(err => console.log('Error adding user data:', err));
};

// Xarajatlarni olish
export const getExpenses = async (setXarajatlar) => {
    try {
      const jsonValue = await AsyncStorage.getItem('expenses');
      const data = jsonValue != null ? JSON.parse(jsonValue) : [];
      setXarajatlar(data);
    } catch (e) {
      console.log('Error fetching expenses:', e);
    }
  };



// User ma'lumotlarini olish
export const getUser = (callback) => {
  db.getItem('user')
    .then(user => {
      callback(user);
    })
    .catch(err => console.log('Error fetching user:', err));
};

// Xarajatni o'chirish
export const deleteExpense = (key) => {
  db.removeItem(key)
    .then(() => console.log('Expense deleted'))
    .catch(err => console.log('Error deleting expense:', err));
};

// Kirim qo'shish
export const insertIncome = async (newItem) => {
    try {
      const jsonValue = await AsyncStorage.getItem('income');
      const data = jsonValue != null ? JSON.parse(jsonValue) : [];
  
      const updated = [...data, newItem];
      await AsyncStorage.setItem('income', JSON.stringify(updated));
  
      console.log('Income added');
    } catch (e) {
      console.log('Error adding income:', e);
    }
  };
  
  // Kirimlarni olish
  export const getIncomes = async (setKirimlar) => {
    try {
      const jsonValue = await AsyncStorage.getItem('income');
      const data = jsonValue != null ? JSON.parse(jsonValue) : [];
      setKirimlar(data);
    } catch (e) {
      console.log('Error fetching incomes:', e);
    }
  };
  
 

// Kiritilgan kirimni o'chirish
export const deleteIncome = (key) => {
  db.removeItem(key)
    .then(() => console.log('Income deleted'))
    .catch(err => console.log('Error deleting income:', err));
};


export const clearAllData = async () => {
    alert('keldi')
    try {
      // AsyncStorage ni tozalash
      await AsyncStorage.clear();
      console.log('AsyncStorage tozalandi');
  
      // localforage ni tozalash
      await db.clear();
      console.log('LocalForage (db) tozalandi');
  
      alert('Barcha maʼlumotlar (expenses, income, user) tozalandi');
    } catch (e) {
      console.log('Tozalashda xatolik:', e);
    }
  };
  