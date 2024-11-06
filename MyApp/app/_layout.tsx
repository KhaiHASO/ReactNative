import { Stack } from "expo-router";
import { ICONS } from '../FoodCirclesData/FoodData';
import { View, Image, TouchableOpacity } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerTintColor: '#fff',
        headerTransparent: true, // Đặt header trong suốt
        headerTitle: '', // Bỏ tiêu đề
      }}
    >
      {/* Login Screen */}
      <Stack.Screen
        name="LoginScreen"
        options={{
          headerShown: false,
        }}
      />

      {/* Home Screen */}
      <Stack.Screen
        name="HomeScreen"
        options={{
          headerShown: false,
        }}
      />

      {/* Store Detail Screen */}
      <Stack.Screen
        name="StoreDetailScreen"
        options={{
          headerShown: false,
        }}
      />

    </Stack>
  );
}
