import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ScrollViewDemo() {
  const items = Array.from({ length: 20 }).map((_, i) => i + 1);
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>10. ScrollView</Text>

      <View style={styles.grid}>
        {items.map((n) => (
          <View key={n} style={styles.card}>
            <Image
              source={require('../assets/images/react-logo.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.cardText}>Item {n}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#1565C0' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: 60, height: 60, marginBottom: 8 },
  cardText: { fontWeight: '600', color: '#333' },
});


