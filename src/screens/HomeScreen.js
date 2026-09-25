import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Database from '../database/db';
import TransactionCard from '../components/TransactionCard';

export default function HomeScreen({ route, navigation }) {
  const { userId, username } = route.params;
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  function loadData() {
    try {
      const rows = Database.getTransactionsByUser(userId);
      const total = Database.getBalance(userId);
      setTransactions(rows);
      setBalance(total);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os lançamentos.');
    }
  }

  // Recarrega sempre que a tela volta a ficar em foco (ex: após adicionar).
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [userId])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {username}</Text>
        <Text style={styles.balanceLabel}>Saldo atual</Text>
        <Text style={[styles.balance, balance >= 0 ? styles.positive : styles.negative]}>
          R$ {balance.toFixed(2).replace('.', ',')}
        </Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhum lançamento ainda. Toque em "+" para adicionar.</Text>
        }
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 90 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction', { userId })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: {
    backgroundColor: '#2c3e50',
    padding: 24,
    paddingTop: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: { color: '#ecf0f1', fontSize: 16 },
  balanceLabel: { color: '#bdc3c7', fontSize: 13, marginTop: 12 },
  balance: { fontSize: 32, fontWeight: '800', marginTop: 4 },
  positive: { color: '#2ecc71' },
  negative: { color: '#e74c3c' },
  empty: { textAlign: 'center', marginTop: 40, color: '#95a5a6' },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 30 },
});
