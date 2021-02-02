import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import { COLORS, icons, images, FONTS, SIZES } from '../constants';

const Scan = ({ navigation }) => {
	// Camera states for permission and camera type
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
	const [scanned, setScanned] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [qrType, setQrType] = useState('');
	const [qrValue, setQrValue] = useState('');

	// useEffect code
	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);
	// render header component for camera component in scanner
	const renderHeader = () => {
		return (
			<View
				style={{
					flexDirection: 'row',
					marginTop: SIZES.padding * 2,
					paddingHorizontal: SIZES.padding * 2,
				}}
			>
				<TouchableOpacity
					style={{
						width: 45,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={() => {
						navigation.navigate('Home');
					}}
				>
					<Image
						source={icons.close}
						style={{
							height: 20,
							width: 20,
							tintColor: COLORS.white,
						}}
					/>
				</TouchableOpacity>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text style={{ color: COLORS.white, ...FONTS.body3 }}>
						Scan for Payment
					</Text>
				</View>
				<TouchableOpacity
					style={{
						height: 45,
						width: 45,
						borderRadius: 10,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={() => {
						console.log('Camera Info button');
					}}
				>
					<Image
						source={icons.info}
						style={{
							height: 25,
							width: 25,
							tintColor: COLORS.white,
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	//function for render scan focus area in camera viewBox
	const renderScanFocus = () => {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Image
					source={images.focus}
					resizeMode="stretch"
					style={{
						marginTop: '-55%',
						width: 300,
						height: 300,
					}}
				/>
			</View>
		);
	};

	// function for render payment view in camera view section
	const renderPaymentMethods = () => {
		return (
			<View
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 220,
					padding: SIZES.padding * 2,
					borderTopLeftRadius: SIZES.radius,
					borderTopRightRadius: SIZES.radius,
					backgroundColor: COLORS.white,
				}}
			>
				<Text style={{ ...FONTS.h4 }}>Another Payment Method</Text>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						alignItems: 'flex-start',
						marginTop: SIZES.padding * 2,
					}}
				>
					<TouchableOpacity
						style={{ flexDirection: 'row', alignItems: 'center' }}
						onPress={() => {
							console.log('Phone Number click');
						}}
					>
						<View
							style={{
								width: 40,
								height: 40,
								backgroundColor: COLORS.lightPurple,
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 10,
							}}
						>
							<Image
								source={icons.phone}
								resizeMode="cover"
								style={{
									height: 25,
									width: 25,
									tintColor: COLORS.purple,
								}}
							/>
						</View>
						<Text style={{ marginLeft: SIZES.padding, ...FONTS.body4 }}>
							Phone Number
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							marginLeft: SIZES.padding * 2,
						}}
						onPress={() => {
							console.log('barcode clicked');
							setScanned(false);
						}}
					>
						<View
							style={{
								width: 40,
								height: 40,
								backgroundColor: COLORS.lightGreen,
								alignItems: 'center',
								justifyContent: 'center',
								borderRadius: 10,
							}}
						>
							<Image
								source={icons.barcode}
								resizeMode="cover"
								style={{
									width: 25,
									height: 25,
									tintColor: COLORS.primary,
								}}
							/>
						</View>
						<Text
							style={{
								marginLeft: SIZES.padding,
								...FONTS.body4,
							}}
						>
							Barcode
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	// barcode scan handle function
	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		setQrType(type);
		setQrValue(data);
		setModalVisible(true);
		console.log(
			`Bar code with type ${type} and data ${data} has been scanned!`
		);
	};

	// render scanned View modal
	const renderScannedView = () => {
		return (
			<Modal animationType="fade" transparent={true} visible={modalVisible}>
				<View
					style={{
						marginTop: SIZES.padding2 * 11,
						alignSelf: 'center',
						height: SIZES.height * 0.4,
						width: SIZES.width * 0.8,
						borderRadius: SIZES.radius,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: COLORS.white,
					}}
				>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text style={{ ...FONTS.body4 }}>Scan Complete</Text>
					</View>
					<View style={{ alignItems: 'center', justifyContent: 'center' }}>
						<Text style={{ ...FONTS.body5, textAlign: 'center' }}>
							{`QR Type is ${qrType} and Value is ${qrValue}`}
						</Text>
					</View>
					<View
						style={{
							marginTop: SIZES.padding2 * 3,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-around',
						}}
					>
						<TouchableOpacity
							style={{
								backgroundColor: COLORS.primary,
								padding: SIZES.padding,
								paddingHorizontal: SIZES.padding * 2,
								borderRadius: 18,
								marginHorizontal: SIZES.padding * 3,
							}}
							onPress={() => {
								setModalVisible(false);
								navigation.navigate('Home');
							}}
						>
							<Text style={{ ...FONTS.body5, color: COLORS.white }}>Done</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								backgroundColor: COLORS.primary,
								padding: SIZES.padding,
								borderRadius: 18,
								marginHorizontal: SIZES.padding * 2,
							}}
							onPress={() => setScanned(false)}
						>
							<Text style={{ ...FONTS.body5, color: COLORS.white }}>
								Scan again
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	};

	// if camera has permission is null return empty view
	if (hasPermission === null) {
		return <View />;
	}
	// if user has decline to give permission to camera return no access
	if (hasPermission === false) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text>No access to camera</Text>
				<Text>Camera is required for scan QR codes.</Text>
			</View>
		);
	}

	return (
		<View style={{ flex: 1, backgroundColor: COLORS.transparent }}>
			<Camera
				type={type}
				flashMode={flashMode}
				style={{ flex: 1 }}
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
			>
				{renderHeader()}
				{renderScanFocus()}
				{scanned && renderScannedView()}
				{renderPaymentMethods()}
			</Camera>
		</View>
	);
};

export default Scan;
