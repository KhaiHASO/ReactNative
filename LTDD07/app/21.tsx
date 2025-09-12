import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FlexboxIntroDemo() {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Flexbox trong React Native</Text>

			{/* 1) Trục chính (main axis) và trục phụ (cross axis) */}
			<Text style={styles.section}>1) Trục: flexDirection = 'row' | 'column'</Text>
			<Text style={styles.note}>Row: trục chính là ngang, Column: trục chính là dọc</Text>
			<View style={[styles.box, { height: 72 }]}>
				<Text style={styles.caption}>row</Text>
				<View style={[styles.row, styles.demoArea]}>
					<View style={[styles.dot, styles.red]} />
					<View style={[styles.dot, styles.green]} />
					<View style={[styles.dot, styles.blue]} />
				</View>
			</View>
			<View style={[styles.box, { height: 120 }]}>
				<Text style={styles.caption}>column (mặc định)</Text>
				<View style={[styles.column, styles.demoArea]}>
					<View style={[styles.dot, styles.red]} />
					<View style={[styles.dot, styles.green]} />
					<View style={[styles.dot, styles.blue]} />
				</View>
			</View>

			{/* 2) justifyContent (căn theo trục chính) */}
			<Text style={styles.section}>2) justifyContent (trục chính)</Text>
			<View style={styles.box}>
				<Text style={styles.caption}>space-between</Text>
				<View style={[styles.row, styles.h56, { justifyContent: 'space-between' }]}>
					<View style={[styles.item, styles.redLight]}><Text style={styles.itemText}>A</Text></View>
					<View style={[styles.item, styles.greenLight]}><Text style={styles.itemText}>B</Text></View>
					<View style={[styles.item, styles.blueLight]}><Text style={styles.itemText}>C</Text></View>
				</View>
			</View>
			<View style={styles.box}>
				<Text style={styles.caption}>center</Text>
				<View style={[styles.row, styles.h56, { justifyContent: 'center' }]}>
					<View style={[styles.item, styles.redLight]} /><View style={[styles.item, styles.greenLight]} /><View style={[styles.item, styles.blueLight]} />
				</View>
			</View>

			{/* 3) alignItems (căn theo trục phụ) */}
			<Text style={styles.section}>3) alignItems (trục phụ)</Text>
			<View style={styles.box}>
				<Text style={styles.caption}>alignItems: 'flex-start' | 'center' | 'flex-end'</Text>
				<View style={[styles.row, styles.h80, { alignItems: 'flex-start' }]}>
					<View style={[styles.tall, styles.redLight]} />
					<View style={[styles.short, styles.greenLight]} />
					<View style={[styles.medium, styles.blueLight]} />
				</View>
				<View style={[styles.row, styles.h80, { alignItems: 'center' }]}>
					<View style={[styles.tall, styles.redLight]} />
					<View style={[styles.short, styles.greenLight]} />
					<View style={[styles.medium, styles.blueLight]} />
				</View>
				<View style={[styles.row, styles.h80, { alignItems: 'flex-end' }]}>
					<View style={[styles.tall, styles.redLight]} />
					<View style={[styles.short, styles.greenLight]} />
					<View style={[styles.medium, styles.blueLight]} />
				</View>
			</View>

			{/* 4) alignSelf (ghi đè từng phần tử) */}
			<Text style={styles.section}>4) alignSelf (ghi đè trên từng item)</Text>
			<View style={styles.box}>
				<Text style={styles.caption}>alignSelf: 'flex-start' | 'center' | 'flex-end'</Text>
				<View style={[styles.row, styles.h100, { alignItems: 'center' }]}>
					<View style={[styles.itemTall, styles.redLight, { alignSelf: 'flex-start' }]} />
					<View style={[styles.itemTall, styles.greenLight, { alignSelf: 'center' }]} />
					<View style={[styles.itemTall, styles.blueLight, { alignSelf: 'flex-end' }]} />
				</View>
			</View>

			{/* 5) flexWrap (xuống dòng khi thiếu chỗ) */}
			<Text style={styles.section}>5) flexWrap (tự xuống dòng)</Text>
			<View style={styles.box}>
				<Text style={styles.caption}>wrap: các item tự xuống hàng khi không đủ chỗ</Text>
				<View style={[styles.row, styles.wrapArea, { flexWrap: 'wrap' }]}>
					{Array.from({ length: 12 }).map((_, i) => (
						<View key={i} style={[styles.wrapItem, { backgroundColor: wrapColors[i % wrapColors.length] }]}>
							<Text style={styles.wrapText}>{i + 1}</Text>
						</View>
					))}
				</View>
			</View>

			{/* 6) Bố cục thường gặp: Header / Content (flex:1) / Footer */}
			<Text style={styles.section}>6) Layout phổ biến</Text>
			<View style={[styles.layout]}>
				<View style={[styles.centerBox, { height: 56, backgroundColor: '#fff7e6' }]}>
					<Text style={styles.layoutText}>Header (cao cố định)</Text>
				</View>
				<View style={[styles.centerBox, { flex: 1, backgroundColor: '#e6fffb' }]}>
					<Text style={styles.layoutText}>Content (flex:1 chiếm phần còn lại)</Text>
				</View>
				<View style={[styles.centerBox, { height: 56, backgroundColor: '#ffe7ba' }]}>
					<Text style={styles.layoutText}>Footer (cao cố định)</Text>
				</View>
			</View>
		</View>
	);
}

const wrapColors = [
	'#fff1f0', '#f6ffed', '#e6f7ff', '#fffbe6', '#f9f0ff', '#e6fffb'
];

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

	// Khối minh họa
	box: {
		borderWidth: 1,
		borderColor: '#f0f0f0',
		borderRadius: 12,
		padding: 8,
		marginBottom: 8,
		backgroundColor: '#fafafa',
	},
	caption: {
		fontSize: 12,
		color: '#555555',
		marginBottom: 6,
	},

	// Khu demo
	demoArea: {
		backgroundColor: '#ffffff',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#f0f0f0',
		paddingHorizontal: 8,
		paddingVertical: 6,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	column: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'center',
		flex: 1,
	},

	// Items nhỏ
	dot: { width: 20, height: 20, borderRadius: 10 },
	red: { backgroundColor: '#ff7875' },
	green: { backgroundColor: '#95de64' },
	blue: { backgroundColor: '#69c0ff' },

	h56: { height: 56 },
	h80: { height: 80 },
	h100: { height: 100 },

	item: {
		width: 48,
		height: 36,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	itemText: { fontSize: 12, color: '#333333' },

	// Các chiều cao khác nhau để thấy alignItems
	tall: { width: 36, height: 64, borderRadius: 8 },
	short: { width: 36, height: 28, borderRadius: 8 },
	medium: { width: 36, height: 44, borderRadius: 8 },

	itemTall: {
		width: 40,
		height: 72,
		borderRadius: 8,
	},

	redLight: { backgroundColor: '#fff1f0' },
	greenLight: { backgroundColor: '#f6ffed' },
	blueLight: { backgroundColor: '#e6f7ff' },

	// Wrap
	wrapArea: {
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#f0f0f0',
		padding: 6,
	},
	wrapItem: {
		width: 56,
		height: 40,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	wrapText: {
		fontSize: 12,
		color: '#333333',
	},

	// Layout phổ biến
	layout: {
		height: 220,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#f0f0f0',
		overflow: 'hidden',
	},
	centerBox: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	layoutText: {
		fontSize: 12,
		color: '#333333',
	},
});