import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function Input({ placeholder, value, onChangeText, secureTextEntry, keyboardType }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 5,
    borderColor: '#15ff00',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
});