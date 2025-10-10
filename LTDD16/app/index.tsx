import { FlatList, Image, Text, View } from "react-native";
import { useGetProductsQuery } from "./services/productsApi";

export default function Index() {
  const { data, isLoading, isError, error, refetch, isFetching } = useGetProductsQuery();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Đang tải sản phẩm...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 8 }}>
        <Text>Không thể tải dữ liệu.</Text>
        <Text selectable>{String((error as any)?.error || (error as any)?.status || "")}</Text>
        <Text onPress={() => refetch()} style={{ color: "blue", marginTop: 8 }}>Thử lại</Text>
      </View>
    );
  }

  const products = data?.products ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 24 }}>
      <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          Sản phẩm ({products.length}) {isFetching ? "· đang làm mới" : ""}
        </Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              padding: 12,
              borderRadius: 12,
              backgroundColor: "#F7F7F7",
              alignItems: "center",
            }}
          >
            {item.image ? (
              <Image
                source={{ uri: `${item.image.startsWith('http') ? '' : 'http://localhost:3000'}${item.image}` }}
                style={{ width: 72, height: 72, borderRadius: 8 }}
                resizeMode="cover"
              />
            ) : (
              <View style={{ width: 72, height: 72, borderRadius: 8, backgroundColor: "#DDD" }} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
              {item.description ? (
                <Text numberOfLines={2} style={{ color: "#555", marginTop: 2 }}>{item.description}</Text>
              ) : null}
              <View style={{ flexDirection: "row", gap: 8, marginTop: 6, alignItems: "center" }}>
                <Text style={{ fontWeight: "700" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</Text>
                {typeof item.old_price === 'number' ? (
                  <Text style={{ color: "#999", textDecorationLine: "line-through" }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.old_price)}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        )}
        onRefresh={refetch}
        refreshing={isFetching}
      />
    </View>
  );
}
