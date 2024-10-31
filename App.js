import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

export default function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para buscar uma nova piada
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming');
      const data = await response.json();
      setJoke(data.joke || data.setup + ' ' + data.delivery);
    } catch (error) {
      console.error("Erro ao buscar a piada de programadores:", error);
      setJoke('Falha ao carregar a piada de programadores');
    } finally {
      setLoading(false);
    }
  };

  // Carrega uma citação ao iniciar o app
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Piada de Programadores</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f3b23d" />
      ) : (
        <Text style={styles.joke}>{joke}</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Carregar Outra Piada" onPress={fetchQuote} color="#f3b23d" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b1e50', // Cor de fundo
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f3b23d',
    marginBottom: 20,
    textAlign: 'center',
  },
  joke: {
    fontSize: 22,
    color: '#ffffff',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
});
