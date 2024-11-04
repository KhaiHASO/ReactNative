import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const storeData = {
    name: "Gadana - Chân Gà Cay",
    rating: 4.1,
    reviews: "50+ đánh giá",
    openTime: "08:00 - 23:00 (T2 - CN)",
    deliveryTime: "11-20 phút",
    categories: ["Thức ăn", "Đồ uống", "Món khai vị", "Món chính"],
    products: [
        { id: 1, name: "Mực chiên mắm", price: "35.000đ", originalPrice: "60.000đ", sold: "1 đã bán", rating: 4.1, discount: "Giảm 30%", image: "https://example.com/muc_chien_mam.jpg" },
        { id: 2, name: "Thịt xào hành ớt", price: "35.000đ", originalPrice: "60.000đ", sold: "1 đã bán", rating: 4.1, discount: "Giảm 30%", image: "https://example.com/thit_xao.jpg" },
        { id: 3, name: "Nem chua rán", price: "35.000đ", originalPrice: "60.000đ", sold: "1 đã bán", rating: 4.1, discount: "Giảm 30%", image: "https://example.com/nem_chua.jpg" },
        { id: 4, name: "Thân lăn chiên", price: "35.000đ", originalPrice: "60.000đ", sold: "1 đã bán", rating: 4.1, discount: "Giảm 30%", image: "https://example.com/than_lan.jpg" }
    ]
};

const StoreDetailScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState("Thức ăn");

    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <Text style={styles.productOriginalPrice}>{item.originalPrice}</Text>
                </View>
                <View style={styles.additionalInfo}>
                    <Text style={styles.soldText}>{item.sold}</Text>
                    {item.discount && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>{item.discount}</Text>
                        </View>
                    )}
                </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );

    // Header component để hiển thị phần thông tin cửa hàng và tab
    const ListHeader = () => (
        <>
            {/* Header Image */}
            <Image source={{ uri: 'https://example.com/store_banner.jpg' }} style={styles.bannerImage} />

            {/* Store Info */}
            <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{storeData.name}</Text>
                <Text style={styles.storeDetails}>{storeData.openTime} | {storeData.deliveryTime}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.storeRating}>⭐ {storeData.rating}</Text>
                    <Text style={styles.storeReviews}>{storeData.reviews}</Text>
                </View>
            </View>

            {/* Category Tabs */}
            <View style={styles.categoryTabs}>
                {storeData.categories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        onPress={() => setSelectedCategory(category)}
                        style={[
                            styles.categoryTab,
                            selectedCategory === category && styles.activeTab
                        ]}
                    >
                        <Text style={[
                            styles.categoryText,
                            selectedCategory === category && styles.activeTabText
                        ]}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    );

    return (
        <FlatList
            data={storeData.products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={ListHeader}
            contentContainerStyle={styles.productList}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    bannerImage: {
        width: screenWidth,
        height: 200,
        resizeMode: 'cover',
    },
    storeInfo: {
        padding: 16,
        alignItems: 'center',
    },
    storeName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    storeDetails: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    storeRating: {
        fontSize: 14,
        color: '#FFD700',
        marginRight: 8,
    },
    storeReviews: {
        fontSize: 14,
        color: '#666',
    },
    categoryTabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    categoryTab: {
        paddingHorizontal: 15,
        paddingBottom: 8,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#007BFF',
    },
    categoryText: {
        fontSize: 16,
        color: '#666',
    },
    activeTabText: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    productList: {
        paddingHorizontal: 16,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
        marginLeft: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF5733',
    },
    productOriginalPrice: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'line-through',
        marginLeft: 5,
    },
    additionalInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    soldText: {
        fontSize: 12,
        color: '#999',
    },
    discountBadge: {
        backgroundColor: '#FF5733',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        marginLeft: 10,
    },
    discountText: {
        color: '#FFF',
        fontSize: 12,
    },
    addButton: {
        backgroundColor: '#007BFF',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default StoreDetailScreen;
