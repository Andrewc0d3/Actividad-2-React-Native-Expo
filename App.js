import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

export default function App() {
  const [menu, setMenu] = useState('menu');
  const [producto, setProducto] = useState(null);
  const [precioUsuario, setPrecioUsuario] = useState('');
  const [resultado, setResultado] = useState('');

  const fetchProducto = async () => {
    try {
      const res = await fetch('https://fakeapi.net/products');
      const json = await res.json();
      const data = json.data || json;

      setProducto(data[Math.floor(Math.random() * data.length)]);
      setPrecioUsuario('');
      setResultado('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, []);

  const comprobarPrecio = () => {
    if (!precioUsuario) return;

    const precioReal = producto.price;
    const PrecioIngresado = parseFloat(precioUsuario);

    if (precioReal === PrecioIngresado) {
      setResultado('Adivinaeste el precio');
    } else {
      setResultado('No adivinaste el precio');
    }
  };

  if (!producto) {
    return (
      <View style={styles.contenedor}>
        <Text>Cargando...</Text>
      </View>
    );
  }
  const menuOpciones = () => {
    switch (menu) {
      case 'menu':
        return (
          <View style={styles.contenedor}>
            <Text style={styles.title}>Menú</Text>

            <View style={styles.boton}>
              <Button title="Lista conectada con API" onPress={() => setMenu('lista_api')} />
            </View>

            <View style={styles.boton}>
              <Button title="Original" onPress={() => setMenu('original')} />
            </View>

          </View>
        );

      case 'lista_api':
        return (
          <View style={styles.contenedor}>
            <Text style={styles.title}>Lista conectada con API</Text>
            // INGRESA AQUI LA LISA DE LA API
            <Button title="Volver" onPress={() => setMenu('menu')} />
          </View>
        );

      case 'original':
        return (
          <View style={styles.contenedor}>
            <Text style={styles.title}>Original</Text>
            <Text style={styles.title}>Adivina el precio</Text>

            <View style={styles.producto}>
              <Text style={styles.nombreProd}>{producto.title}</Text>

              <Text style={styles.descProd}>{producto.description}</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Ingresa el precio"
              keyboardType="numeric"
              value={precioUsuario}
              onChangeText={setPrecioUsuario}
            />

            {resultado !== '' && (
              <Text style={styles.resultado}>
                {resultado}{"\n"}Precio real: ${producto.price}
              </Text>
            )}

            <View style={styles.boton}>
              <Button title="Adivinar" onPress={comprobarPrecio} />
            </View>

            <View style={styles.boton}>
              <Button title="Otro Producto" onPress={fetchProducto} />
            </View>

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
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
  },
  producto: {
    backgroundColor: '#babeee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
  },
  nombreProd: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descProd: {
    marginTop: 10,
    color: '#555',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  boton: {
    width: 250,
    marginVertical: 5,
  },
  resultado: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
  },
});