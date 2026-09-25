import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Database from '../database/db';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    try {
      if (!username.trim() || !password) {
        throw new Error('Preencha usuário e senha.');
      }
      const user = Database.findUserByUsername(username.trim());
      if (!user || user.password !== password) {
        throw new Error('Usuário ou senha inválidos.');
      }
      navigation.replace('Home', { userId: user.id, username: user.username });
    } catch (error) {
      Alert.alert('Erro ao entrar', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FinanLite</Text>
      <Text style={styles.subtitle}>Controle Financeiro Pessoal</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f5f6fa' },
  title: { fontSize: 32, fontWeight: '800', textAlign: 'center', color: '#2c3e50' },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#7f8c8d', marginBottom: 32 },
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
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  link: { textAlign: 'center', marginTop: 16, color: '#2980b9' },
});
