import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function DataBindingDemo() {
  const [firstName, setFirstName] = useState('Nguyen');
  const [lastName, setLastName] = useState('An');
  const [age, setAge] = useState('20');
  const [items, setItems] = useState<string[]>(['Táo', 'Chuối', 'Cam']);
  const [newItem, setNewItem] = useState('');

  const fullName = useMemo(() => `${firstName} ${lastName}`.trim(), [firstName, lastName]);
  const ageNumber = useMemo(() => Number(age) || 0, [age]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🔗 Data Binding Demo</Text>
        <Text style={styles.subtitle}>
          Minh hoạ cách ràng buộc dữ liệu hai chiều giữa UI và state trong React Native
        </Text>
      </View>

      {/* 1. Two-way binding với TextInput */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Two-way binding với TextInput</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Họ:</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Nhập họ"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tên:</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Nhập tên"
          />
        </View>
        <Text style={styles.preview}>Xin chào, {fullName} 👋</Text>
      </View>

      {/* 2. Binding với chuyển đổi kiểu (controlled input) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Binding với chuyển đổi kiểu</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Tuổi:</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Ví dụ: 21"
            keyboardType="number-pad"
          />
        </View>
        <Text style={styles.preview}>Tuổi hợp lệ: {ageNumber}</Text>
      </View>

      {/* 3. Binding danh sách (list binding) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Binding danh sách</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Thêm trái cây"
            onSubmitEditing={() => {
              if (!newItem.trim()) return;
              setItems((prev) => [...prev, newItem.trim()]);
              setNewItem('');
            }}
            returnKeyType="done"
          />
          <Pressable
            style={styles.addButton}
            onPress={() => {
              if (!newItem.trim()) return;
              setItems((prev) => [...prev, newItem.trim()]);
              setNewItem('');
            }}
          >
            <Text style={styles.addButtonText}>Thêm</Text>
          </Pressable>
        </View>

        <View style={styles.list}>
          {items.map((item, index) => (
            <View key={`${item}-${index}`} style={styles.listItem}>
              <Text style={styles.listItemText}>{index + 1}. {item}</Text>
              <Pressable
                style={styles.removeButton}
                onPress={() => setItems((prev) => prev.filter((_, i) => i !== index))}
              >
                <Text style={styles.removeButtonText}>Xoá</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      {/* 4. Derived binding (state dẫn xuất) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Derived binding (state dẫn xuất)</Text>
        <Text style={styles.preview}>
          Họ tên viết hoa: {fullName.toUpperCase()} {'\n'}
          Số ký tự: {fullName.length}
        </Text>
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
    backgroundColor: '#009688',
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
    gap: 8,
    marginBottom: 10,
  },
  label: {
    width: 60,
    fontSize: 14,
    color: '#555',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
  },
  preview: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    marginTop: 8,
    gap: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  listItemText: {
    color: '#33691E',
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#E53935',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


