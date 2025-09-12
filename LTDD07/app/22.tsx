import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FlexboxLayoutPropsDemo() {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Flexbox: Thuộc tính bố trí giao diện</Text>

			{/* 1) flexDirection: xác định trục chính */}
			<Text style={styles.section}>1 flexDirection</Text>
			<View style={styles.box}>
				<Text style={styles.caption}>row</Text>
				<View style={[styles.area, { flexDirection: 'row' }]}>
					{threeItems()}
				</View>
			</View>
			<View style={styles.box}>
				<Text style={styles.caption}>row-reverse</Text>
				<View style={[styles.area, { flexDirection: 'row-reverse' }]}>
					{threeItems()}
				</View>
			</View>
			<View style={styles.box}>
				<Text style={styles.caption}>column (mặc định)</Text>
				<View style={[styles.area, { flexDirection: 'column' }]}>
					{threeItems()}
				</View>
			</View>
			<View style={styles.box}>
				<Text style={styles.caption}>column-reverse</Text>
				<View style={[styles.area, { flexDirection: 'column-reverse' }]}>
					{threeItems()}
				</View>
			</View>

			{/* 2) justifyContent: căn theo trục chính */}
			<Text style={styles.section}>2 justifyContent (trục chính)</Text>
			<View style={styles.box}>
				<Text style={styles.caption}>flex-start | center | flex-end</Text>
				<View style={[styles.area, styles.row, { justifyContent: 'flex-start' }]}>
					{threeItems('S')}
				</View>
				<View style={[styles.area, styles.row, { justifyContent: 'center' }]}>
					{threeItems('C')}
				</View>
				<View style={[styles.area, styles.row, { justifyContent: 'flex-end' }]}>
					{threeItems('E')}
				</View>
			</View>
			<View style={styles.box}>
				<Text style={styles.caption}>space-between | space-around | space-evenly</Text>
				<View style={[styles.area, styles.row, { justifyContent: 'space-between' }]}>
					{threeItems('B')}
				</View>
				<View style={[styles.area, styles.row, { justifyContent: 'space-around' }]}>
					{threeItems('A')}
				</View>
				<View style={[styles.area, styles.row, { justifyContent: 'space-evenly' }]}>
					{threeItems('V')}
				</View>
			</View>

			{/* 3) alignItems: căn theo trục phụ */}
			<Text style={styles.section}>3 alignItems (trục phụ)</Text>
			<View style={styles.box}>
				<Text style={styles.caption}>flex-start | center | flex-end | stretch</Text>
				<View style={[styles.areaTall, styles.row, { alignItems: 'flex-start' }]}>
					{tallShortMedium()}
				</View>
				<View style={[styles.areaTall, styles.row, { alignItems: 'center' }]}>
					{tallShortMedium()}
				</View>
				<View style={[styles.areaTall, styles.row, { alignItems: 'flex-end' }]}>
					{tallShortMedium()}
				</View>
				<View style={[styles.areaTall, styles.row, { alignItems: 'stretch' }]}>
					{/* stretch sẽ kéo cao item nếu item không đặt height cố định */}
					<View style={[styles.stretchable, { backgroundColor: '#ffd6e7' }]} />
					<View style={[styles.stretchable, { backgroundColor: '#d9f7be' }]} />
					<View style={[styles.stretchable, { backgroundColor: '#bae7ff' }]} />
				</View>
			</View>

			{/* 4) alignSelf: ghi đè căn chỉnh cho từng item */}
			<Text style={styles.section}>4 alignSelf (ghi đè từng item)</Text>
			<View style={styles.box}>
				<View style={[styles.areaTall, styles.row, { alignItems: 'center' }]}>
					<View style={[styles.itemTall, { backgroundColor: '#ffd6e7', alignSelf: 'flex-start' }]} />
					<View style={[styles.itemTall, { backgroundColor: '#d9f7be', alignSelf: 'center' }]} />
					<View style={[styles.itemTall, { backgroundColor: '#bae7ff', alignSelf: 'flex-end' }]} />
				</View>
			</View>

			{/* 5) flexWrap + alignContent: xuống dòng và căn các dòng */}
			<Text style={styles.section}>5 flexWrap + alignContent</Text>
			<View style={styles.box}>
				<Text style={styles.caption}>flexWrap: 'wrap' (tự xuống dòng)</Text>
				<View style={[styles.wrapArea, { flexWrap: 'wrap' }]}>
					{Array.from({ length: 10 }).map((_, i) => (
						<View key={i} style={[styles.wrapItem, { backgroundColor: chipColors[i % chipColors.length] }]}>
							<Text style={styles.wrapText}>{i + 1}</Text>
						</View>
					))}
				</View>
			</View>
			<View style={styles.box}>
				<Text style={styles.caption}>alignContent: căn các hàng khi có wrap</Text>
				<View style={[styles.wrapAreaTall, { flexWrap: 'wrap', alignContent: 'space-between' }]}>
					{Array.from({ length: 10 }).map((_, i) => (
						<View key={i} style={[styles.wrapItem, { backgroundColor: chipColors[i % chipColors.length] }]}>
							<Text style={styles.wrapText}>{i + 1}</Text>
						</View>
					))}
				</View>
			</View>

			{/* 6) Thực tế: Header / Content / Sidebar (row) */}
			<Text style={styles.section}>6 Bố cục thực tế</Text>
			<View style={[styles.realLayout, styles.row]}>
				<View style={[styles.centerBox, { width: 90, backgroundColor: '#fff7e6' }]}>
					<Text style={styles.realText}>Sidebar</Text>
				</View>
				<View style={{ flex: 1 }}>
					<View style={[styles.centerBox, { height: 50, backgroundColor: '#e6f7ff' }]}>
						<Text style={styles.realText}>Header</Text>
					</View>
					<View style={[styles.centerBox, { flex: 1, backgroundColor: '#f6ffed' }]}>
						<Text style={styles.realText}>Content (flex:1)</Text>
					</View>
					<View style={[styles.centerBox, { height: 50, backgroundColor: '#fff1f0' }]}>
						<Text style={styles.realText}>Footer</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

function threeItems(label?: string) {
	return (
		<>
			<View style={[styles.item, { backgroundColor: '#ffd6e7' }]}>
				<Text style={styles.itemText}>{label ?? 'A'}</Text>
			</View>
			<View style={[styles.item, { backgroundColor: '#d9f7be' }]}>
				<Text style={styles.itemText}>{label ?? 'B'}</Text>
			</View>
			<View style={[styles.item, { backgroundColor: '#bae7ff' }]}>
				<Text style={styles.itemText}>{label ?? 'C'}</Text>
			</View>
		</>
	);
}

function tallShortMedium() {
	return (
		<>
			<View style={[styles.tall, { backgroundColor: '#ffd6e7' }]} />
			<View style={[styles.short, { backgroundColor: '#d9f7be' }]} />
			<View style={[styles.medium, { backgroundColor: '#bae7ff' }]} />
		</>
	);
}

const chipColors = ['#fff1f0', '#f6ffed', '#e6f7ff', '#fffbe6', '#f9f0ff', '#e6fffb'];

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
		color: '#666666',
		marginBottom: 6,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	area: {
		borderWidth: 1,
		borderColor: '#f0f0f0',
		borderRadius: 10,
		backgroundColor: '#ffffff',
		padding: 6,
		minHeight: 56,
		justifyContent: 'space-around',
	},
	areaTall: {
		borderWidth: 1,
		borderColor: '#f0f0f0',
		borderRadius: 10,
		backgroundColor: '#ffffff',
		paddingHorizontal: 6,
		paddingVertical: 8,
		minHeight: 90,
	},
	item: {
		width: 48,
		height: 36,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	itemText: { fontSize: 12, color: '#333333' },

	tall: { width: 36, height: 64, borderRadius: 8 },
	short: { width: 36, height: 28, borderRadius: 8 },
	medium: { width: 36, height: 44, borderRadius: 8 },

	itemTall: { width: 36, height: 64, borderRadius: 8 },

	stretchable: {
		width: 40,
		borderRadius: 8,
		marginHorizontal: 4,
	},

	wrapArea: {
		borderWidth: 1,
		borderColor: '#f0f0f0',
		borderRadius: 10,
		padding: 6,
		flexDirection: 'row',
		alignItems: 'center',
	},
	wrapAreaTall: {
		borderWidth: 1,
		borderColor: '#f0f0f0',
		borderRadius: 10,
		padding: 6,
		height: 140,
		flexDirection: 'row',
		alignItems: 'stretch',
	},
	wrapItem: {
		width: 64,
		height: 40,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	wrapText: { fontSize: 12, color: '#333333' },

	realLayout: {
		height: 230,
		borderWidth: 1,
		borderColor: '#f0f0f0',
		borderRadius: 12,
		overflow: 'hidden',
	},
	centerBox: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	realText: { fontSize: 12, color: '#333333' },
});