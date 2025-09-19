import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function StateDemo() {
  const [count, setCount] = useState(0);
  const [enabled, setEnabled] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const doubled = useMemo(() => count * 2, [count]);
  const containerStyle = useMemo(
    () => [styles.section, theme === 'dark' ? styles.dark : styles.light],
    [theme]
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🧠 State Demo</Text>
        <Text style={styles.subtitle}>Quản lý trạng thái với useState và state dẫn xuất</Text>
      </View>

      {/* 1. Counter cơ bản */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Counter cơ bản</Text>
        <Text style={styles.counterText}>Giá trị: {count}</Text>
        <View style={styles.row}>
          <Pressable style={[styles.btn, styles.dec]} onPress={() => setCount((v) => v - 1)}>
            <Text style={styles.btnText}>-1</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.reset]} onPress={() => setCount(0)}>
            <Text style={styles.btnText}>Reset</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.inc]} onPress={() => setCount((v) => v + 1)}>
            <Text style={styles.btnText}>+1</Text>
          </Pressable>
        </View>
        <Text style={styles.preview}>Giá trị x2 (derived): {doubled}</Text>
      </View>

      {/* 2. Toggle enabled/disabled */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Toggle enabled/disabled</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Enabled:</Text>
          <Switch value={enabled} onValueChange={setEnabled} />
        </View>
        <Pressable style={[styles.bigBtn, enabled ? styles.bigEnabled : styles.bigDisabled]} disabled={!enabled}>
          <Text style={styles.bigBtnText}>{enabled ? 'Có thể nhấn' : 'Đang tắt'}</Text>
        </Pressable>
      </View>

      {/* 3. Theme state */}
      <View style={containerStyle}>
        <Text style={styles.sectionTitle}>3. Theme state</Text>
        <Text style={styles.preview}>Theme hiện tại: {theme.toUpperCase()}</Text>
        <View style={styles.row}>
          <Pressable style={[styles.btn, styles.lightBtn]} onPress={() => setTheme('light')}>
            <Text style={styles.btnText}>Light</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.darkBtn]} onPress={() => setTheme('dark')}>
            <Text style={styles.btnText}>Dark</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#607D8B',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 8,
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  counterText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  btnText: { color: 'white', fontWeight: 'bold' },
  dec: { backgroundColor: '#E53935' },
  reset: { backgroundColor: '#757575' },
  inc: { backgroundColor: '#43A047' },
  preview: { marginTop: 8, fontSize: 16, color: '#333', textAlign: 'center' },
  bigBtn: {
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  bigEnabled: { backgroundColor: '#4CAF50' },
  bigDisabled: { backgroundColor: '#BDBDBD' },
  bigBtnText: { color: 'white', fontWeight: 'bold' },
  light: { backgroundColor: 'white' },
  dark: { backgroundColor: '#263238' },
  lightBtn: { backgroundColor: '#90CAF9' },
  darkBtn: { backgroundColor: '#1E88E5' },
});


