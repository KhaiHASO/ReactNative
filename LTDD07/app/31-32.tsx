import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function StyleBasicsDemo() {
	const [isPrimary, setIsPrimary] = useState<boolean>(true);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Tạo và sử dụng StyleSheet</Text>

			{/* 1) Style cơ bản */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>1. Style cơ bản</Text>
				<Text style={styles.cardText}>Dùng StyleSheet.create để có gợi ý kiểu và hiệu năng tốt hơn.</Text>
			</View>

			{/* 2) Kết hợp nhiều style qua mảng */}
			<View style={[styles.card, styles.shadow, styles.rounded]}>
				<Text style={styles.cardTitle}>2. Kết hợp nhiều style</Text>
				<Text style={styles.cardText}>Truyền mảng vào prop style để gộp nhiều style.</Text>
			</View>

			{/* 3) Style có điều kiện */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>3. Style có điều kiện</Text>
				<Text style={styles.cardText}>Nhấn nút để đổi màu kiểu nút.</Text>
				<View style={styles.row}>
					<Pressable
						style={[styles.button, isPrimary ? styles.buttonPrimary : styles.buttonSecondary]}
						onPress={() => setIsPrimary((prev) => !prev)}
					>
						<Text style={styles.buttonText}>{isPrimary ? 'Primary' : 'Secondary'}</Text>
					</Pressable>
					<View style={styles.spacer} />
					<Pressable style={[styles.button, styles.buttonDanger]}>
						<Text style={styles.buttonText}>Danger</Text>
					</Pressable>
				</View>
			</View>

			{/* 4) Gộp style với inline style động */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>4. Inline style động</Text>
				<Text style={styles.cardText}>Có thể thêm inline style để thay đổi kích thước, màu sắc theo runtime.</Text>
				<View style={styles.row}>
					<View style={[styles.colorBox, { backgroundColor: '#bae7ff' }]} />
					<View style={[styles.colorBox, { backgroundColor: '#ffd6e7', width: 56 }]} />
					<View style={[styles.colorBox, { backgroundColor: '#f6ffed', height: 56 }]} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 16,
		backgroundColor: '#ffffff',
	},
	title: {
		fontSize: 20,
		fontWeight: '600',
		marginBottom: 12,
	},
	card: {
		borderWidth: 1,
		borderColor: '#f0f0f0',
		borderRadius: 12,
		padding: 12,
		backgroundColor: '#fafafa',
		marginBottom: 12,
	},
	cardTitle: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 6,
	},
	cardText: {
		fontSize: 12,
		color: '#595959',
	},
	shadow: {
		shadowColor: '#000000',
		shadowOpacity: 0.08,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 2,
	},
	rounded: {
		borderRadius: 16,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	spacer: { width: 8, height: 8 },
	button: {
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonPrimary: { backgroundColor: '#1677ff' },
	buttonSecondary: { backgroundColor: '#52c41a' },
	buttonDanger: { backgroundColor: '#ff4d4f' },
	buttonText: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
	colorBox: {
		width: 48,
		height: 48,
		borderRadius: 8,
		marginRight: 8,
		borderWidth: 1,
		borderColor: '#e8e8e8',
	},
});


