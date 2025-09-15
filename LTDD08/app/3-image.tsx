import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ImageDemo() {
  const { width: screenWidth } = Dimensions.get('window');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🖼️ Image Component Demo</Text>
        <Text style={styles.subtitle}>
          Image là component để hiển thị hình ảnh từ local assets hoặc network URLs
        </Text>
      </View>

      {/* Ví dụ 1: Image cơ bản từ assets */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Image cơ bản từ assets</Text>
        <Image 
          source={require('../assets/images/icon.png')} 
          style={styles.basicImage}
        />
        <Text style={styles.imageCaption}>Icon từ assets folder</Text>
      </View>

      {/* Ví dụ 2: Image với resizeMode khác nhau */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Image với resizeMode</Text>
        
        <View style={styles.resizeContainer}>
          <Text style={styles.resizeLabel}>contain (mặc định)</Text>
          <Image 
            source={require('../assets/images/react-logo.png')} 
            style={styles.resizeImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.resizeContainer}>
          <Text style={styles.resizeLabel}>cover</Text>
          <Image 
            source={require('../assets/images/react-logo.png')} 
            style={styles.resizeImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.resizeContainer}>
          <Text style={styles.resizeLabel}>stretch</Text>
          <Image 
            source={require('../assets/images/react-logo.png')} 
            style={styles.resizeImage}
            resizeMode="stretch"
          />
        </View>

        <View style={styles.resizeContainer}>
          <Text style={styles.resizeLabel}>center</Text>
          <Image 
            source={require('../assets/images/react-logo.png')} 
            style={styles.resizeImage}
            resizeMode="center"
          />
        </View>
      </View>

      {/* Ví dụ 3: Image với kích thước khác nhau */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Image với kích thước khác nhau</Text>
        
        <View style={styles.sizeContainer}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.smallImage}
          />
          <Text style={styles.sizeLabel}>50x50</Text>
        </View>

        <View style={styles.sizeContainer}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.mediumImage}
          />
          <Text style={styles.sizeLabel}>100x100</Text>
        </View>

        <View style={styles.sizeContainer}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.largeImage}
          />
          <Text style={styles.sizeLabel}>150x150</Text>
        </View>
      </View>

      {/* Ví dụ 4: Image với borderRadius */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Image với góc bo tròn</Text>
        
        <View style={styles.roundedContainer}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.roundedImage}
          />
          <Text style={styles.imageCaption}>BorderRadius: 50</Text>
        </View>

        <View style={styles.roundedContainer}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.squareRoundedImage}
          />
          <Text style={styles.imageCaption}>BorderRadius: 20</Text>
        </View>
      </View>

      {/* Ví dụ 5: Image với border */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Image với border</Text>
        
        <View style={styles.borderContainer}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.borderImage}
          />
          <Text style={styles.imageCaption}>Border: 3px solid #FF5722</Text>
        </View>
      </View>

      {/* Ví dụ 6: Image với opacity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Image với opacity</Text>
        
        <View style={styles.opacityContainer}>
          <Image 
            source={require('../assets/images/react-logo.png')} 
            style={styles.opacityImage}
          />
          <Text style={styles.imageCaption}>Opacity: 0.5</Text>
        </View>
      </View>

      {/* Ví dụ 7: Image từ network (placeholder) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Image từ network URL</Text>
        
        <View style={styles.networkContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/200x200/4CAF50/FFFFFF?text=Network+Image' }}
            style={styles.networkImage}
            defaultSource={require('../assets/images/icon.png')}
          />
          <Text style={styles.imageCaption}>Image từ network với placeholder</Text>
        </View>
      </View>

      {/* Ví dụ 8: Image với tintColor */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Image với tintColor</Text>
        
        <View style={styles.tintContainer}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.tintImage}
            tintColor="#FF5722"
          />
          <Text style={styles.imageCaption}>TintColor: #FF5722</Text>
        </View>
      </View>

      {/* Ví dụ 9: Image với onLoad và onError */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9. Image với event handlers</Text>
        
        <View style={styles.eventContainer}>
          <Image 
            source={require('../assets/images/icon.png')} 
            style={styles.eventImage}
            onLoad={() => console.log('Image loaded successfully!')}
            onError={() => console.log('Image failed to load!')}
            onLoadStart={() => console.log('Image loading started!')}
            onLoadEnd={() => console.log('Image loading ended!')}
          />
          <Text style={styles.imageCaption}>Check console for events</Text>
        </View>
      </View>

      {/* Ví dụ 10: Image với aspectRatio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>10. Image với aspectRatio</Text>
        
        <View style={styles.aspectContainer}>
          <Image 
            source={require('../assets/images/react-logo.png')} 
            style={styles.aspectImage}
          />
          <Text style={styles.imageCaption}>AspectRatio: 16/9</Text>
        </View>
      </View>

      {/* Thông tin quan trọng */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>⚠️ Lưu ý quan trọng:</Text>
        <Text style={styles.infoText}>
          • Image component chỉ hiển thị hình ảnh, không chứa text{'\n'}
          • Có thể load từ assets (require) hoặc network (uri){'\n'}
          • resizeMode quyết định cách image được scale{'\n'}
          • Luôn nên set width/height hoặc sử dụng aspectRatio{'\n'}
          • Network images nên có defaultSource làm placeholder{'\n'}
          • Hỗ trợ các format: PNG, JPG, JPEG, GIF, WebP, SVG
        </Text>
      </View>

      {/* Kiến thức bổ sung */}
      <View style={styles.knowledgeSection}>
        <Text style={styles.knowledgeTitle}>💡 Kiến thức bổ sung:</Text>
        <Text style={styles.knowledgeText}>
          • Image trên iOS → UIImageView{'\n'}
          • Image trên Android → ImageView{'\n'}
          • resizeMode: contain, cover, stretch, center, repeat{'\n'}
          • Hỗ trợ caching tự động cho network images{'\n'}
          • Có thể sử dụng với FastImage library để tối ưu hơn{'\n'}
          • Hỗ trợ accessibility với accessibilityLabel
        </Text>
      </View>

      {/* ResizeMode giải thích */}
      <View style={styles.explanationSection}>
        <Text style={styles.explanationTitle}>🔍 Giải thích resizeMode:</Text>
        <Text style={styles.explanationText}>
          • <Text style={styles.boldText}>contain</Text>: Giữ tỷ lệ, fit trong container{'\n'}
          • <Text style={styles.boldText}>cover</Text>: Giữ tỷ lệ, fill container (có thể crop){'\n'}
          • <Text style={styles.boldText}>stretch</Text>: Không giữ tỷ lệ, stretch để fill{'\n'}
          • <Text style={styles.boldText}>center</Text>: Không scale, center trong container{'\n'}
          • <Text style={styles.boldText}>repeat</Text>: Lặp lại image để fill container
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
    backgroundColor: '#3F51B5',
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
  imageCaption: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  
  // Ví dụ 1: Image cơ bản
  basicImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  
  // Ví dụ 2: ResizeMode
  resizeContainer: {
    marginVertical: 8,
    alignItems: 'center',
  },
  resizeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  resizeImage: {
    width: 150,
    height: 100,
    backgroundColor: '#E0E0E0',
    borderWidth: 1,
    borderColor: '#999',
  },
  
  // Ví dụ 3: Kích thước khác nhau
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'center',
  },
  smallImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  mediumImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  largeImage: {
    width: 150,
    height: 150,
    marginRight: 16,
  },
  sizeLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
  
  // Ví dụ 4: BorderRadius
  roundedContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  roundedImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  squareRoundedImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  
  // Ví dụ 5: Border
  borderContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  borderImage: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: '#FF5722',
    borderRadius: 8,
  },
  
  // Ví dụ 6: Opacity
  opacityContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  opacityImage: {
    width: 150,
    height: 100,
    opacity: 0.5,
  },
  
  // Ví dụ 7: Network
  networkContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  networkImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  
  // Ví dụ 8: TintColor
  tintContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  tintImage: {
    width: 100,
    height: 100,
  },
  
  // Ví dụ 9: Event handlers
  eventContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  
  // Ví dụ 10: AspectRatio
  aspectContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  aspectImage: {
    width: 200,
    aspectRatio: 16/9,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
  
  // Thông tin quan trọng
  infoSection: {
    margin: 16,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C62828',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  
  // Kiến thức bổ sung
  knowledgeSection: {
    margin: 16,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  knowledgeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  knowledgeText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  
  // Giải thích resizeMode
  explanationSection: {
    margin: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1976D2',
  },
});
