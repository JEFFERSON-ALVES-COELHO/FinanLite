import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IncomeCardModel from '../models/IncomeCardModel';
import ExpenseCardModel from '../models/ExpenseCardModel';

// Fábrica defensiva: decide qual subclasse polimórfica usar
// e nunca deixa um erro de dado quebrar a tela inteira.
function buildCardModel(transaction) {
  try {
    if (!transaction || typeof transaction !== 'object') {
      throw new Error('Transação inválida.');
    }
    if (transaction.type === 'income') {
      return new IncomeCardModel(transaction);
    }
    if (transaction.type === 'expense') {
      return new ExpenseCardModel(transaction);
    }
    throw new Error('Tipo de transação desconhecido.');
  } catch (error) {
    console.warn('TransactionCard: falha ao montar modelo -', error.message);
    return null;
  }
}

export default function TransactionCard({ transaction }) {
  const cardModel = buildCardModel(transaction);

  if (!cardModel) {
    return (
      <View style={[styles.card, styles.errorCard]}>
        <Text style={styles.errorText}>Não foi possível exibir este lançamento.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{cardModel.getIcon()}</Text>
      <View style={styles.info}>
        <Text style={styles.description}>{cardModel.getDescription()}</Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
      <Text
        style={[
          styles.value,
          transaction.type === 'income' ? styles.income : styles.expense,
        ]}
      >
        {cardModel.getFormattedValue()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  errorCard: {
    backgroundColor: '#fdecea',
  },
  errorText: {
    color: '#b00020',
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
  },
  income: {
    color: '#1b8a3d',
  },
  expense: {
    color: '#c0392b',
  },
});
