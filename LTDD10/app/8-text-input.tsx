import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function TextInputDemo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>8. TextInput</Text>

      <Text style={styles.label}>Họ và tên</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập họ và tên"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.preview}>
        <Text style={styles.previewText}>Xem trước:</Text>
        <Text>Họ tên: {name || '—'}</Text>
        <Text>Email: {email || '—'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#1565C0' },
  label: { marginTop: 12, marginBottom: 6, color: '#333', fontWeight: '600' },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  preview: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },
  previewText: { fontWeight: '700', marginBottom: 4 },
});


