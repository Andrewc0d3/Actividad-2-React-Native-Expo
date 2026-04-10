import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList } from 'react-native';

export default function App() {
  const [menu, setMenu] = useState('menu');
  const [producto, setProducto] = useState(null);
  const [precioUsuario, setPrecioUsuario] = useState('');
  const [resultado, setResultado] = useState('');
  const [listaProductos, setListaProductos] = useState([]);

  // 🔹 Obtener producto aleatorio
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

  // 🔹 Obtener lista de productos ordenados
  const fetchListaProductos = async () => {
    try {
      const res = await fetch('https://fakeapi.net/products');
      const json = await res.json();
      const data = json.data || json;

      // Ordenar por precio
      const ordenados = data.sort((a, b) => a.price - b.price);

      setListaProductos(ordenados);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, []);

  // 🔹 Validar precio
  const comprobarPrecio = () => {
    if (!precioUsuario) return;

    const precioReal = producto.price;
    const precioIngresado = parseFloat(precioUsuario);

    if (precioReal === precioIngresado) {
      setResultado('Adivinaste el precio');
    } else {
      setResultado('No adivinaste el precio');
    }
  };

  // 🔹 Render del menú
  const menuOpciones = () => {
    switch (menu) {
      case 'menu':
        return (
          <View style={styles.contenedor}>
            <Text style={styles.title}>Menú</Text>

            <View style={styles.boton}>
              <Button 
                title="Lista conectada con API" 
                onPress={() => {
                  setMenu('lista_api');
                  fetchListaProductos();
                }} 
              />
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

            <FlatList
              data={listaProductos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.producto}>
                  <Text style={styles.nombreProd}>{item.title}</Text>
                  <Text style={styles.descProd}>{item.description}</Text>
                  <Text style={{ textAlign: 'center', marginTop: 5 }}>
                    Precio: ${item.price}
                  </Text>
                </View>
              )}
            />

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
    <View style={{ flex: 1 }}>
      {menuOpciones()}
    </View>
  );
}

// 🔹 Estilos
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
    marginBottom: 10,
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