import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Animated } from 'react-native';
import moment from 'moment'; // Biblioteca para formatar a data
import { FontAwesome } from '@expo/vector-icons'; // Importando FontAwesome para ícones
import { SafeAreaView, StatusBar } from 'react-native'; // Importa SafeAreaView e StatusBar
import Agendamento from './Agendamento'; // Importa o componente Agendamento

export default function App() {
  const [screen, setScreen] = useState('Home');
  const [userName, setUserName] = useState('');
  const [service, setService] = useState('');
  const [provider, setProvider] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [reservedTimes, setReservedTimes] = useState([]);
  const [scheduledData, setScheduledData] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Para animação de fade no título

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  const times = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const providers = ['Leon Valente', 'Cauã Valente'];

  const currentDate = moment().locale('pt-br').format('D [de] MMMM [de] YYYY'); // Formatação da data para o formato brasileiro

  const handleNext = () => {
    if (screen === 'Home') {
      if (!userName.trim() || !service.trim()) {
        Alert.alert('Erro', 'Por favor, preencha seu nome e o serviço desejado.');
        return;
      }
      setScreen('Provider');
    } else if (screen === 'Provider') {
      if (!provider) {
        Alert.alert('Erro', 'Selecione um prestador.');
        return;
      }
      setScreen('Schedule');
    }
  };

  const handleSchedule = () => {
    if (!selectedTime) {
      Alert.alert('Erro', 'Selecione um horário.');
      return;
    }
    const newSchedule = {
      name: userName,
      service,
      provider,
      time: selectedTime,
    };
    setScheduledData([...scheduledData, newSchedule]);
    setReservedTimes([...reservedTimes, selectedTime]);

    Alert.alert(
      'Confirmação',
      `Agendamento confirmado:\nCliente: ${userName}\nServiço: ${service}\nPrestador: ${provider}\nHorário: ${selectedTime}`
    );
    resetApp();
  };

  const resetApp = () => {
    setUserName('');
    setService('');
    setProvider('');
    setSelectedTime(null);
    setScreen('Home');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" /> {/* Controla a cor da barra de status */}

      <View style={styles.container}>
        {screen === 'Home' && (
          <>
            <Text style={styles.title}>Bem-vindo à Barbearia Valente!</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              value={userName}
              onChangeText={setUserName}
            />
            <TextInput
              style={styles.input}
              placeholder="Serviço desejado (ex: Corte de cabelo)"
              value={service}
              onChangeText={setService}
            />
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </>
        )}

        {screen === 'Provider' && (
          <>
            <Text style={styles.title}>Escolha o prestador:</Text>
            <View style={styles.providersContainer}>
              {providers.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[styles.providerButton, provider === item && styles.selectedProviderButton]}
                  onPress={() => setProvider(item)}
                >
                  <FontAwesome
                    name={item === 'Leon Valente' ? 'user' : 'user-circle'} // Ícones diferentes para cada prestador
                    size={30}
                    color={provider === item ? '#fff' : '#6A1B9A'}
                  />
                  <Text
                    style={[styles.providerText, provider === item && styles.selectedProviderText]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </>
        )}

        {screen === 'Schedule' && (
          <>
            <Animated.View style={[styles.dateContainer, { opacity: fadeAnim }]}>
              <Text style={styles.dateText}>{currentDate}</Text>
            </Animated.View>

            <Text style={styles.title}>Escolha o horário:</Text>
            <View style={styles.timesContainer}>
              {times.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.timeButton,
                    selectedTime === item && styles.selectedTimeButton,
                    reservedTimes.includes(item) && styles.reservedTimeButton,
                  ]}
                  onPress={() => {
                    if (reservedTimes.includes(item)) {
                      Alert.alert('Erro', 'Este horário já está reservado!');
                      return;
                    }
                    setSelectedTime(item);
                  }}
                  disabled={reservedTimes.includes(item)}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === item && styles.selectedTimeText,
                      reservedTimes.includes(item) && styles.reservedTimeText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSchedule}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>

            {scheduledData.length > 0 && (
              <View style={styles.tableContainer}>
                <Text style={styles.tableTitle}>Agendamentos Confirmados</Text>
                <FlatList
                  data={scheduledData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                      <Text style={styles.tableRowText}>{item.name}</Text>
                      <Text style={styles.tableRowText}>{item.service}</Text>
                      <Text style={styles.tableRowText}>{item.provider}</Text>
                      <Text style={styles.tableRowText}>{item.time}</Text>
                    </View>
                  )}
                  ListHeaderComponent={() => (
                    <View style={styles.tableHeader}>
                      <Text style={styles.tableHeaderText}>Nome</Text>
                      <Text style={styles.tableHeaderText}>Serviço</Text>
                      <Text style={styles.tableHeaderText}>Prestador</Text>
                      <Text style={styles.tableHeaderText}>Horário</Text>
                    </View>
                  )}
                />
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6A1B9A',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#6A1B9A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  providerButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 1,
    borderColor: '#6A1B9A',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedProviderButton: {
    backgroundColor: '#6A1B9A',
  },
  providerText: {
    color: '#6A1B9A',
    fontSize: 16,
  },
  selectedProviderText: {
    color: '#fff',
  },
  providersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  timeButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: '#6A1B9A',
    alignItems: 'center',
  },
  selectedTimeButton: {
    backgroundColor: '#6A1B9A',
  },
  reservedTimeButton: {
    backgroundColor: '#ccc',
  },
  timeText: {
    color: '#6A1B9A',
    fontSize: 16,
  },
  selectedTimeText: {
    color: '#fff',
  },
  reservedTimeText: {
    color: '#999',
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6A1B9A',
    padding: 10,
  },
  tableHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  tableRowText: {
    flex: 1,
    textAlign: 'center',
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A1B9A',
    textAlign: 'center', // Alinha o texto horizontalmente no centro
    width: '100%', // Garante que o texto ocupe toda a largura disponível
  
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
