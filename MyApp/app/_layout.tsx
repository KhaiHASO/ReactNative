import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="index" // Đặt màn hình LoginScreen là màn hình khởi động
      screenOptions={{
        headerTintColor: '#fff', // Màu của nút trong header
        headerTitleAlign: 'center', // Căn giữa tiêu đề header
        headerTransparent: true, // Làm toàn bộ header của stack trong suốt
        headerTitle: '', // Ẩn tiêu đề mặc định trên tất cả các màn hình
      }}
    >
      {/* Login Screen */}
      <Stack.Screen
        name="LoginScreen"
        options={{
          headerShown: true, // Hiển thị header trong suốt
        }}
      />

      {/* Home Screen */}
      <Stack.Screen
        name="HomeScreen"
        options={{
          headerShown: true,
          headerTitle: 'Trang chủ', // Tiêu đề cho Home Screen
        }}
      />

      {/* Store Detail Screen */}
      <Stack.Screen
        name="StoreDetailScreen"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
