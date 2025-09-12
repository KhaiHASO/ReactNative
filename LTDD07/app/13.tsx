import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FlexDimensionsDemo() {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Flex Dimensions (Kích thước với flex)</Text>

			{/* 1) flex theo tỉ lệ chiều ngang (row) */}
			<Text style={styles.section}>Row: flex là tỉ lệ chiều ngang</Text>
			<View style={styles.row}>
				<View style={[styles.bar, styles.flex1, styles.red]}><Text style={styles.barText}>flex:1</Text></View>
				<View style={[styles.bar, styles.flex2, styles.green]}><Text style={styles.barText}>flex:2</Text></View>
				<View style={[styles.bar, styles.flex3, styles.blue]}><Text style={styles.barText}>flex:3</Text></View>
			</View>
			<Text style={styles.note}>Tỉ lệ rộng: 1 : 2 : 3 trong cùng một hàng.</Text>

			{/* 2) flex theo tỉ lệ chiều dọc (column - mặc định) */}
			<Text style={styles.section}>Column: flex là tỉ lệ chiều dọc</Text>
			<View style={styles.column}>
				<View style={[styles.cell, styles.flex1, styles.redLight]}><Text style={styles.cellText}>flex:1</Text></View>
				<View style={[styles.cell, styles.flex1, styles.greenLight]}><Text style={styles.cellText}>flex:1</Text></View>
				<View style={[styles.cell, styles.flex2, styles.blueLight]}><Text style={styles.cellText}>flex:2</Text></View>
			</View>
			<Text style={styles.note}>Chiều cao theo tỉ lệ 1 : 1 : 2 trong cùng một cột.</Text>

			{/* 3) flexGrow / flexShrink / flexBasis */}
			<Text style={styles.section}>flexGrow / flexShrink / flexBasis</Text>
			<View style={styles.gsbRow}>
				<View style={[styles.gsbItem, { flexBasis: 120, flexGrow: 1, flexShrink: 1, backgroundColor: '#ffd6e7' }]}>
					<Text style={styles.gsbText}>basis 120 • grow 1 • shrink 1</Text>
				</View>
				<View style={[styles.gsbItem, { flexBasis: 120, flexGrow: 2, flexShrink: 1, backgroundColor: '#d9f7be' }]}>
					<Text style={styles.gsbText}>basis 120 • grow 2 • shrink 1</Text>
				</View>
				<View style={[styles.gsbItem, { flexBasis: 120, flexGrow: 0, flexShrink: 0, backgroundColor: '#bae7ff' }]}>
					<Text style={styles.gsbText}>basis 120 • grow 0 • shrink 0</Text>
				</View>
			</View>
			<Text style={styles.note}>Parent hẹp lại: item có shrink 0 không co lại; parent rộng ra: item grow lớn hơn sẽ nở nhiều hơn.</Text>

			{/* 4) Bố cục phổ biến: Header / Content / Footer */}
			<Text style={styles.section}>Bố cục: Header / Content / Footer</Text>
			<View style={styles.layout}>
				<View style={[styles.layoutBlock, { height: 56, backgroundColor: '#fff1b8' }]}>
					<Text style={styles.layoutText}>Header (cao cố định 56)</Text>
				</View>
				<View style={[styles.layoutBlock, { flex: 1, backgroundColor: '#e6fffb' }]}>
					<Text style={styles.layoutText}>Content (flex:1 chiếm phần còn lại)</Text>
				</View>
				<View style={[styles.layoutBlock, { height: 56, backgroundColor: '#ffd8bf' }]}>
					<Text style={styles.layoutText}>Footer (cao cố định 56)</Text>
				</View>
			</View>
			<Text style={styles.note}>Phần Content dùng flex:1 để lấp đầy khoảng trống giữa Header và Footer.</Text>
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
	note: {
		fontSize: 12,
		color: '#666666',
		marginBottom: 8,
	},

	// Row demo
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 56,
		borderRadius: 12,
		overflow: 'hidden',
		marginBottom: 8,
	},
	bar: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	barText: {
		fontSize: 12,
		color: '#222222',
	},
	flex1: { flex: 1 },
	flex2: { flex: 2 },
	flex3: { flex: 3 },
	red: { backgroundColor: '#ffccc7' },
	green: { backgroundColor: '#d9f7be' },
	blue: { backgroundColor: '#bae7ff' },

	// Column demo
	column: {
		height: 160,
		borderRadius: 12,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#f0f0f0',
		marginBottom: 8,
	},
	cell: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	cellText: {
		fontSize: 12,
		color: '#222222',
	},
	redLight: { backgroundColor: '#fff1f0' },
	greenLight: { backgroundColor: '#f6ffed' },
	blueLight: { backgroundColor: '#e6f7ff' },

	// Grow/Shrink/Basis demo
	gsbRow: {
		flexDirection: 'row',
		alignItems: 'stretch',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#f0f0f0',
		overflow: 'hidden',
		height: 72,
		marginBottom: 8,
	},
	gsbItem: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 8,
	},
	gsbText: {
		fontSize: 12,
		color: '#333333',
		textAlign: 'center',
	},

	// Layout demo
	layout: {
		height: 220,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#f0f0f0',
		overflow: 'hidden',
	},
	layoutBlock: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	layoutText: {
		fontSize: 12,
		color: '#333333',
	},
});