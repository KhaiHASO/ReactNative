import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Logic xử lý đăng nhập
    router.push("HomeScreen"); // Điều hướng đến HomeScreen sau khi đăng nhập
  };

  const handleForgotPassword = () => {
    // Thêm logic xử lý quên mật khẩu ở đây
    Alert.alert('Thông báo', 'Bạn đã nhấn vào Quên mật khẩu?');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TYCA</Text>
      <Text style={styles.subtitle}>Vui lòng đăng nhập để tiếp tục sử dụng dịch vụ</Text>

      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu của bạn"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#007BFF',
    textAlign: 'right',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
