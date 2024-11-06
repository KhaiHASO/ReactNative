import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { THUCAN, ICONS } from '../FoodCirclesData/FoodData';

const screenWidth = Dimensions.get('window').width;

const StoreDetailScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState("Thức ăn");

    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <Image source={item.icon} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>35.000đ</Text>
                    <Text style={styles.productOriginalPrice}>60.000đ</Text>
                </View>
                <View style={styles.additionalInfo}>
                    <Text style={styles.soldText}>1 đã bán</Text>
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>Giảm 30%</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );

    const ListHeader = () => (
        <>
            <View style={styles.headerContainer}>
                <Image source={ICONS.hinhnen} style={styles.bannerImage} />
                <View style={styles.logoContainer}>
                    <Image source={ICONS.logo} style={styles.logo} />
                </View>
                <View style={styles.storeInfo}>
                    <Text style={styles.storeName}>Gadana - Chân Gà Cay</Text>
                    <Text style={styles.storeDetails}>08:00 - 23:00 (T2 - CN) | 11-20 phút giao hàng</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.storeRating}>⭐ 4.1</Text>
                        <Text style={styles.storeReviews}>(50+ đánh giá)</Text>
                    </View>
                </View>
            </View>

            <View style={styles.categoryTabs}>
                {["Thức ăn", "Đồ uống", "Món khai vị", "Món chính"].map((category) => (
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
            data={THUCAN}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={ListHeader}
            contentContainerStyle={styles.productList}
        />
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    bannerImage: {
        width: screenWidth,
        height: 150,
        resizeMode: 'cover',
    },
    logoContainer: {
        position: 'absolute',
        top: 100,
        backgroundColor: '#FFF',
        borderRadius: 50,
        padding: 5,
    },
    logo: {
        width: 80,
        height: 80,
    },
    storeInfo: {
        paddingTop: 50,
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
