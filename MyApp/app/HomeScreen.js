import React from 'react';
import { View, Text, TextInput, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { NHOMMONAN, CUAHANG, IMAGES } from '../FoodAppData/FoodData'; // Import dữ liệu từ FoodData

const HomeScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Gradient Header */}
            <LinearGradient
                colors={['#00B4D8', '#0077B6']}
                style={styles.header}
            >
                <View style={styles.headerLeft}>
                    <View style={styles.headerLeftBack}>
                        <TouchableOpacity>
                            <Image
                                style={{
                                    width: 30,
                                    height: 15,
                                }}
                                source={IMAGES.back}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerLeftDropDown}>
                        <Text style={styles.headerLeftDropDownTitle}>Giao đến</Text>
                        <Text style={styles.headerLeftDropDownSubTitle}>Đà Nẵng, Việt Nam</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <Image style={styles.iconHeader} source={IMAGES.ringing}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={styles.iconHeader} source={IMAGES.ringing}></Image>
                    </TouchableOpacity>
                </View>

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
                    data={NHOMMONAN}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.categoryItem}>
                            <Image source={item.icon} style={styles.categoryImage} />
                            <Text style={styles.categoryName}>{item.name}</Text>
                        </View>
                    )}
                />

                {/* Banner (Bạn có thể thêm dữ liệu banner nếu có) */}
                <View style={styles.bannerContainer}>
                    <Image source={IMAGES.discount} style={styles.bannerImage} />
                    <Text style={styles.bannerText}>Khuyến mãi đặc biệt 30%</Text>
                </View>

                {/* Danh sách cửa hàng */}
                <Text style={styles.sectionTitle}>Cửa hàng tốt nhất trong khu vực</Text>
                <FlatList
                    data={CUAHANG}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.storeItem}
                            onPress={() => router.push("StoreDetailScreen")} // Điều hướng đến StoreDetailScreen
                        >
                            <Image source={item.photo} style={styles.storeImage} />
                            <Text style={styles.storeName}>{item.name}</Text>
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 150,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    headerLeft: {
        width: 180,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerLeftBack: {
        justifyContent: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        width: 65,
        justifyContent: 'space-between',
    },
    iconHeader: {
        height: 30,
        width: 30,
    },
    headerLeftDropDownTitle: {
        fontSize: 13,
        color: '#FFFFFF',
    },
    headerLeftDropDownSubTitle: {
        fontSize: 16,
        color: '#FFFFFF',
        marginTop: 5,
        fontWeight: 'bold',
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
});

export default HomeScreen;
