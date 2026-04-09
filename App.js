import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  const [menu, setMenu] = useState('menu');

  const menuOpciones = () => {
    switch (menu) {
      case 'menu':
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Menú</Text>

            <View style={styles.btn}>
              <Button title="Lista conectada con API" onPress={() => setMenu('lista_api')} />
            </View>

            <View style={styles.btn}>
              <Button title="Original" onPress={() => setMenu('original')} />
            </View>

          </View>
        );

      case 'lista_api':
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Lista conectada con API</Text>

            <Button title="Volver" onPress={() => setMenu('menu')} />
          </View>
        );

      case 'original':
        return (
          <View style={styles.container}>
            <Text style={styles.title}>Original</Text>

            <Button title="Volver" onPress={() => setMenu('menu')} />
          </View>
        );      

      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>{menuOpciones()}</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  btn: {
    marginVertical: 5,
    width: 250,
  },
});