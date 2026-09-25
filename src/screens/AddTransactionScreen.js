import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Transaction from '../models/Transaction';
import Database from '../database/db';

export default function AddTransactionScreen({ route, navigation }) {
  const { userId } = route.params;
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  function handleSave() {
    try {
      const today = new Date().toISOString().split('T')[0];
      // A validação de regras de negócio acontece dentro da classe Transaction.
      const transaction = new Transaction(type, description, amount, today);

      Database.insertTransaction(
        userId,
        transaction.getType(),
        transaction.getDescription(),
        transaction.getAmount(),
        transaction.getDate()
      );

      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao salvar', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo lançamento</Text>

      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeButton, type === 'income' && styles.typeButtonActiveIncome]}
          onPress={() => setType('income')}
        >
          <Text style={[styles.typeText, type === 'income' && styles.typeTextActive]}>Receita</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === 'expense' && styles.typeButtonActiveExpense]}
          onPress={() => setType('expense')}
        >
          <Text style={[styles.typeText, type === 'expense' && styles.typeTextActive]}>Despesa</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor (ex: 150.00)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 48, backgroundColor: '#f5f6fa' },
  title: { fontSize: 22, fontWeight: '800', color: '#2c3e50', marginBottom: 24 },
  typeRow: { flexDirection: 'row', marginBottom: 20 },
  typeButton: {
    flex: 1,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dfe4ea',
  },
  typeButtonActiveIncome: { backgroundColor: '#eafaf1', borderColor: '#2ecc71' },
  typeButtonActiveExpense: { backgroundColor: '#fdecea', borderColor: '#e74c3c' },
  typeText: { color: '#7f8c8d', fontWeight: '600' },
  typeTextActive: { color: '#2c3e50' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dfe4ea',
  },
  button: {
    backgroundColor: '#2c3e50',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
