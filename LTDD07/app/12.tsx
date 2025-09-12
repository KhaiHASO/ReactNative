import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PercentageDimensionsDemo() {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Percentage Dimensions (Kích thước theo tỉ lệ %)</Text>

			{/* Hàng 1: width theo % trong một hàng */}
			<Text style={styles.section}>Width theo phần trăm (theo chiều ngang của parent)</Text>
			<View style={styles.row}>
				<View style={[styles.pill, styles.w25]}><Text style={styles.pillText}>25%</Text></View>
				<View style={[styles.pill, styles.w35]}><Text style={styles.pillText}>35%</Text></View>
				<View style={[styles.pill, styles.w40]}><Text style={styles.pillText}>40%</Text></View>
			</View>
			<Text style={styles.note}>Tổng ≈ 100%. Mỗi box rộng theo % bề ngang của hàng (parent).</Text>

			{/* Hàng 2: 2 cột mỗi cột 50% */}
			<Text style={styles.section}>Hai cột 50% - 50%</Text>
			<View style={styles.row}>
				<View style={[styles.card, styles.w50]}><Text style={styles.cardText}>Cột trái (50%)</Text></View>
				<View style={[styles.card, styles.w50]}><Text style={styles.cardText}>Cột phải (50%)</Text></View>
			</View>

			{/* Khối dọc: height theo % (parent phải có height cố định) */}
			<Text style={styles.section}>Height theo phần trăm (parent cần height cố định)</Text>
			<View style={styles.fixedHeightParent}>
				<View style={[styles.block, styles.h30, styles.red]}><Text style={styles.blockText}>30% height</Text></View>
				<View style={[styles.block, styles.h20, styles.green]}><Text style={styles.blockText}>20% height</Text></View>
				<View style={[styles.block, styles.h50, styles.blue]}><Text style={styles.blockText}>50% height</Text></View>
			</View>
			<Text style={styles.note}>Ở trên, parent cao 240px; các block cao theo % của 240.</Text>

			{/* Nested %: phần trăm của phần trăm */}
			<Text style={styles.section}>Nested % (phần trăm lồng nhau)</Text>
			<View style={[styles.nestedParent]}>
				<View style={[styles.nestedChildOuter]}>
					<View style={[styles.nestedChildInner, { width: '60%', height: '60%' }]}>
						<Text style={styles.blockText}>60% của ô ngoài</Text>
					</View>
				</View>
			</View>
			<Text style={styles.note}>Phần trăm của con dựa trên kích thước của parent gần nhất có kích thước xác định.</Text>
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
	section: {
		fontSize: 14,
		fontWeight: '500',
		marginTop: 8,
		marginBottom: 8,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	pill: {
		height: 44,
		backgroundColor: '#f5f5f5',
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pillText: {
		fontSize: 12,
		color: '#333333',
	},
	card: {
		height: 80,
		backgroundColor: '#fafafa',
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#e8e8e8',
	},
	cardText: {
		fontSize: 13,
		color: '#333333',
	},
	w25: { width: '25%' },
	w35: { width: '35%' },
	w40: { width: '40%' },
	w50: { width: '50%' },

	fixedHeightParent: {
		height: 240,
		borderRadius: 12,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#e8e8e8',
		marginBottom: 8,
	},
	block: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	h30: { height: '30%' },
	h20: { height: '20%' },
	h50: { height: '50%' },

	red: { backgroundColor: '#ffccc7' },
	green: { backgroundColor: '#d9f7be' },
	blue: { backgroundColor: '#bae7ff' },

	nestedParent: {
		height: 160,
		backgroundColor: '#f0f0f0',
		borderRadius: 12,
		padding: 12,
	},
	nestedChildOuter: {
		width: '80%',
		height: '80%',
		backgroundColor: '#ffffff',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#e8e8e8',
	},
	nestedChildInner: {
		backgroundColor: '#e6f7ff',
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	blockText: {
		fontSize: 12,
		color: '#333333',
	},
	note: {
		fontSize: 12,
		color: '#666666',
		marginBottom: 8,
	},
});