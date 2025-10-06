import { StyleSheet, Text, View } from 'react-native';
//component 
export default function FixedDimensionsDemo() {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Fixed Dimensions (Kích thước cố định)</Text>

			{/* Hàng 1: width/height cố định */}
			<View style={styles.row}>
				<View style={[styles.box, styles.box100]} />
				<View style={[styles.box, styles.box150]} />
				<View style={[styles.box, styles.box200]} />
			</View>
			<Text style={styles.note}>Các box trên có width/height cố định bằng số (px logic)</Text>

			{/* Hàng 2: so sánh border để dễ thấy kích thước */}
			<View style={styles.row}>
				<View style={[styles.box, styles.box100, styles.redBorder]} />
				<View style={[styles.box, styles.box150, styles.greenBorder]} />
				<View style={[styles.box, styles.box200, styles.blueBorder]} />
			</View>
			<Text style={styles.note}>Dù màn hình to/nhỏ, kích thước không đổi (không co giãn)</Text>

			{/* Hàng 3: text nằm trong box cố định */}
			<View style={styles.row}>
				<View style={[styles.box, styles.box100, styles.center]}>
					<Text style={styles.label}>100 x 100</Text>
				</View>
				<View style={[styles.box, styles.box150, styles.center]}>
					<Text style={styles.label}>150 x 120</Text>
				</View>
				<View style={[styles.box, styles.box200, styles.center]}>
					<Text style={styles.label}>200 x 140</Text>
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
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	box: {
		backgroundColor: '#f2f2f2',
		borderRadius: 8,
	},
	box100: {
		width: 100,
		height: 100,
	},
	box150: {
		width: 150,
		height: 120,
	},
	box200: {
		width: 200,
		height: 140,
	},
	center: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	label: {
		fontSize: 12,
		color: '#333333',
	},
	redBorder: { borderWidth: 2, borderColor: '#ff4d4f' },
	greenBorder: { borderWidth: 2, borderColor: '#52c41a' },
	blueBorder: { borderWidth: 2, borderColor: '#1677ff' },
	note: {
		fontSize: 12,
		color: '#666666',
		marginBottom: 8,
	},
});