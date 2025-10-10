import { useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { getBaseUrl } from '../constants/config';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchProducts } from '../store/features/products/productsSlice';

export default function ProductsScreen() {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((s) => s.products);

  useEffect(() => {
    console.log('[ProductsScreen] mount -> dispatch fetchProducts');
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    console.log('[ProductsScreen] loading...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Đang tải sản phẩm...</Text>
      </View>
    );
  }

  if (error) {
    console.log('[ProductsScreen] error:', error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Không thể tải dữ liệu</Text>
        <Text selectable style={{ marginTop: 4 }}>{error}</Text>
        <Text onPress={() => dispatch(fetchProducts())} style={{ color: 'blue', marginTop: 8 }}>Thử lại</Text>
      </View>
    );
  }

  const products = data?.products ?? [];
  console.log('[ProductsScreen] render list, count:', products.length);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 24 }}>
      {/* Debug bar */}
      <View style={{ backgroundColor: '#111', paddingVertical: 6, paddingHorizontal: 10 }}>
        <Text style={{ color: '#0f0' }}>BASE: {getBaseUrl()}</Text>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 6 }}>
          <TouchableOpacity onPress={() => dispatch(fetchProducts())}>
            <Text style={{ color: '#4EA8DE' }}>Refetch</Text>
          </TouchableOpacity>
          <Text style={{ color: '#aaa' }}>Items: {products.length}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>Sản phẩm ({products.length})</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', gap: 12, padding: 12, borderRadius: 12, backgroundColor: '#F7F7F7', alignItems: 'center' }}>
            {item.image ? (
              <Image
                source={{ uri: `${item.image.startsWith('http') ? '' : getBaseUrl()}${item.image}` }}
                style={{ width: 72, height: 72, borderRadius: 8 }}
                resizeMode="cover"
              />
            ) : (
              <View style={{ width: 72, height: 72, borderRadius: 8, backgroundColor: '#DDD' }} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
              {item.description ? (
                <Text numberOfLines={2} style={{ color: '#555', marginTop: 2 }}>{item.description}</Text>
              ) : null}
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 6, alignItems: 'center' }}>
                <Text style={{ fontWeight: '700' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</Text>
                {typeof item.old_price === 'number' ? (
                  <Text style={{ color: '#999', textDecorationLine: 'line-through' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.old_price)}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        )}
        onRefresh={() => dispatch(fetchProducts())}
        refreshing={loading}
      />
    </View>
  );
}


