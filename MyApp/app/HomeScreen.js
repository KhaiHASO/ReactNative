import React from 'react';
import { View, Text, TextInput, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import foodFakeData from './foodFakeData'
import { useRouter } from 'expo-router';


const HomeScreen = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            {/* Gradient Header */}
            <LinearGradient
                colors={['#00B4D8', '#0077B6']}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Giao đến</Text>
                <Text style={styles.headerSubtitle}>Đà Nẵng, Việt Nam</Text>
            </LinearGradient>

            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Bạn đang thèm gì nào?"
                />
            </View>

            {/* Nội dung chính */}
            <ScrollView style={styles.content}>
                {/* Danh mục */}
                <FlatList
                    data={foodFakeData.category}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.categoryItem}>
                            <Image source={{ uri: item.image }} style={styles.categoryImage} />
                            <Text style={styles.categoryName}>{item.name}</Text>
                        </View>
                    )}
                />

                {/* Banner */}
                <View style={styles.bannerContainer}>
                    <Image source={{ uri: foodFakeData.banner[0].image }} style={styles.bannerImage} />
                    <Text style={styles.bannerText}>{foodFakeData.banner[0].name}</Text>
                </View>

                {/* Danh sách cửa hàng */}
                <Text style={styles.sectionTitle}>Cửa hàng tốt nhất trong khu vực</Text>
                <FlatList
                    data={foodFakeData.store}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.storeItem}
                            onPress={() => router.push("StoreDetailScreen")} // Điều hướng đến StoreDetailScreen
                        >
                            <Image source={{ uri: item.image }} style={styles.storeImage} />
                            <Text style={styles.storeName}>{item.name}</Text>
                            <Text style={styles.storeRating}>⭐ {item.rating}</Text>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: 150,
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    headerTitle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 5,
    },
    searchContainer: {
        marginTop: -20,
        paddingHorizontal: 16,
    },
    searchInput: {
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    content: {
        paddingHorizontal: 16,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 12,
    },
    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    categoryName: {
        marginTop: 8,
        fontSize: 14,
        textAlign: 'center',
    },
    bannerContainer: {
        width: '100%',
        height: 150,
        marginVertical: 20,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    bannerText: {
        position: 'absolute',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    storeItem: {
        width: 150,
        marginRight: 12,
        alignItems: 'center',
    },
    storeImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    storeName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 8,
        textAlign: 'center',
    },
    storeRating: {
        fontSize: 12,
        color: '#888',
    },
});

export default HomeScreen;