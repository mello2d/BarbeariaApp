// Agendamento.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function Agendamento() {
  const [userName, setUserName] = useState('');
  const [service, setService] = useState('');
  const [provider, setProvider] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);

  const handleSchedule = async () => {
    if (!userName || !service || !provider || !selectedTime) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const agendamento = {
      name: userName,
      service,
      provider,
      time: selectedTime,
    };

    try {
      const response = await axios.post('http://localhost:5000/agendamentos', agendamento);
      Alert.alert('Sucesso', 'Agendamento realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao agendar: ', error);
      Alert.alert('Erro', 'Não foi possível realizar o agendamento.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Serviço desejado"
        value={service}
        onChangeText={setService}
      />
      <TextInput
        style={styles.input}
        placeholder="Prestador"
        value={provider}
        onChangeText={setProvider}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário"
        value={selectedTime}
        onChangeText={setSelectedTime}
      />
      <TouchableOpacity style={styles.button} onPress={handleSchedule}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#6A1B9A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
