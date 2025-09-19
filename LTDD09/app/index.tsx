import type { Href } from 'expo-router';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const items = [
    { href: '/5-data-binding' as unknown as Href, title: '5. Data Binding' },
    { href: '/6-touchable-opacity' as unknown as Href, title: '6. TouchableOpacity' },
    { href: '/7-state' as unknown as Href, title: '7. State' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native Demos</Text>
        <Text style={styles.subtitle}>Chọn một chủ đề để xem ví dụ</Text>
      </View>

      <View style={styles.list}>
        {items.map((item) => (
          <Link key={item.title} href={item.href} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.cardText}>{item.title}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16 },
  header: { backgroundColor: '#1565C0', padding: 20, borderRadius: 10, marginBottom: 16 },
  title: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: 'white', fontSize: 14, textAlign: 'center', marginTop: 6 },
  list: { gap: 12 },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: { fontSize: 16, color: '#333', fontWeight: '600' },
});
