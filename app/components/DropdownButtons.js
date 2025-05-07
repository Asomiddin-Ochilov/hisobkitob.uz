import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DropdownButtons({setSelectedValue}) {
  const [selectedPeriod, setSelectedPeriod] = useState('Xaftalik');

  const handleButtonPress = (period) => {
    setSelectedPeriod(period);
    setSelectedValue(period)
  };

  return (
    <View style={styles.container}>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedPeriod === 'Xaftalik' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('Xaftalik')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPeriod === 'Xaftalik' && styles.selectedButtonText,
            ]}
          >
            Xaftalik
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedPeriod === 'Oylik' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('Oylik')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPeriod === 'Oylik' && styles.selectedButtonText,
            ]}
          >
            Oylik
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            selectedPeriod === 'Yillik' && styles.selectedButton,
          ]}
          onPress={() => handleButtonPress('Yillik')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedPeriod === 'Yillik' && styles.selectedButtonText,
            ]}
          >
            Yillik
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Poppins_400Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginLeft:-10,
    marginTop:4,
  },
  button: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    fontFamily: 'Poppins_400Regular',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins_400Regular',
  },
  selectedButton: {
    backgroundColor: '#2B46F9',
  },
  selectedButtonText: {
    color: '#fff',
  },
  selection: {
    fontSize: 16,
    color: '#333',
  },
});
