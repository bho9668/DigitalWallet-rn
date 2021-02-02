import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	FlatList,
	Modal,
	ScrollView,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

// custome constants
import { icons, images, COLORS, SIZES, FONTS } from '../constants';

// main signup render function
const SignUp = ({ navigation }) => {
	// states
	const [showPassword, setShowPassword] = useState(false);
	const [areas, setAreas] = useState([]);
	const [selectedArea, setSelectedArea] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);

	// useEffect code runs here for fething country codes
	useEffect(() => {
		//fetch does not working with without http header returning error
		fetch('https://restcountries.eu/rest/v2/all', {
			method: 'GET',
			mode: 'cors',
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				let areaData = data.map((item) => {
					return {
						code: item.alpha2Code,
						name: item.name,
						callingCode: `+${item.callingCodes[0]}`,
						flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,
					};
				});
				setAreas(areaData);

				// check if data exist or not
				if (areaData.length > 0) {
					let defaultData = areaData.filter((a) => a.code == 'US');
					if (defaultData.length > 0) {
						setSelectedArea(defaultData[0]);
					}
				}
			})
			.catch((error) =>
				console.warn(`Error occured could not load data ${error.message}`)
			);
	}, []);

	// render functions
	const renderHeader = () => {
		return (
			<>
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginTop: SIZES.padding * 6,
						paddingHorizontal: SIZES.padding * 2,
					}}
					onPress={() => {
						console.log('signUP');
					}}
				>
					<Image
						source={icons.back}
						resizeMode="contain"
						style={{ width: 20, height: 20, tintColor: COLORS.white }}
					/>
					<Text
						style={{
							marginLeft: SIZES.padding * 1.5,
							color: COLORS.white,
							...FONTS.h4,
						}}
					>
						SignUp
					</Text>
				</TouchableOpacity>
			</>
		);
	};

	const renderLogo = () => {
		return (
			<View
				style={{
					marginTop: SIZES.padding * 5,
					height: 100,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Image
					source={images.wallieLogo}
					resizeMode="contain"
					style={{
						width: '60%',
						height: '100%',
					}}
				/>
			</View>
		);
	};

	const renderForm = () => {
		return (
			<View
				style={{
					marginTop: SIZES.padding * 3,
					marginHorizontal: SIZES.padding * 3,
				}}
			>
				{/* full name */}
				<View
					style={{
						marginTop: SIZES.padding * 3,
					}}
				>
					<Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
						Full Name
					</Text>
					<TextInput
						style={{
							marginVertical: SIZES.padding,
							borderBottomColor: COLORS.white,
							borderBottomWidth: 1,
							height: 40,
							color: COLORS.white,
							...FONTS.body3,
						}}
						placeholder="Enter Full Name"
						placeholderTextColor={COLORS.white}
						selectionColor={COLORS.white}
					/>
				</View>
				{/* phone number */}
				<View
					style={{
						marginTop: SIZES.padding * 2,
					}}
				>
					<Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
						Phone Number
					</Text>
					<View style={{ flexDirection: 'row' }}>
						{/* Contry code field */}
						<TouchableOpacity
							style={{
								width: 100,
								height: 50,
								marginHorizontal: 5,
								borderBottomColor: COLORS.white,
								borderBottomWidth: 1,
								flexDirection: 'row',
								...FONTS.body2,
							}}
							onPress={() => {
								setModalVisible(true);
							}}
						>
							<View style={{ justifyContent: 'center' }}>
								<Image
									source={icons.down}
									style={{
										width: 10,
										height: 10,
										tintColor: COLORS.white,
									}}
								/>
							</View>
							<View style={{ justifyContent: 'center', marginLeft: 5 }}>
								<Image
									source={{ uri: selectedArea?.flag }}
									resizeMode="contain"
									style={{
										width: 30,
										height: 30,
									}}
								/>
							</View>
							<View style={{ justifyContent: 'center', marginLeft: 5 }}>
								<Text style={{ color: COLORS.white, ...FONTS.body3 }}>
									{selectedArea?.callingCode}
								</Text>
							</View>
						</TouchableOpacity>
						{/* Phone number value */}
						<TextInput
							style={{
								marginVertical: SIZES.padding,
								borderBottomColor: COLORS.white,
								borderBottomWidth: 1,
								height: 40,
								color: COLORS.white,
								...FONTS.body3,
							}}
							placeholder="Enter Phone Number"
							keyboardType="phone-pad"
							maxLength={10}
							placeholderTextColor={COLORS.white}
							selectionColor={COLORS.white}
						/>
					</View>
				</View>
				{/* password */}
				<View style={{ marginTop: SIZES.padding * 2 }}>
					<Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>
						Password
					</Text>
					<TextInput
						style={{
							marginVertical: SIZES.padding,
							borderBottomColor: COLORS.white,
							borderBottomWidth: 1,
							height: 40,
							color: COLORS.white,
							...FONTS.body3,
						}}
						placeholder="Enter Password"
						placeholderTextColor={COLORS.white}
						selectionColor={COLORS.white}
						secureTextEntry={!showPassword}
					/>
					<TouchableOpacity
						style={{
							position: 'absolute',
							right: 0,
							bottom: 10,
							height: 30,
							width: 30,
						}}
						onPress={() => {
							setShowPassword(!showPassword);
						}}
					>
						<Image
							source={showPassword ? icons.disable_eye : icons.eye}
							style={{ height: 20, width: 20, tintColor: COLORS.white }}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	const renderButton = () => {
		return (
			<View style={{ margin: SIZES.padding * 3 }}>
				<TouchableOpacity
					style={{
						height: 60,
						backgroundColor: COLORS.black,
						borderRadius: SIZES.radius / 1.5,
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onPress={() => {
						navigation.navigate('Home');
					}}
				>
					<Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>
				</TouchableOpacity>
			</View>
		);
	};

	const renderAreaCodesModal = () => {
		// model render Item function
		const renderItem = ({ item }) => {
			return (
				<TouchableOpacity
					style={{
						padding: SIZES.padding,
						flexDirection: 'row',
					}}
					onPress={() => {
						setSelectedArea(item);
						setModalVisible(false);
					}}
				>
					<Image
						source={{ uri: item.flag }}
						style={{ width: 30, height: 30, marginRight: 10 }}
					/>
					<Text style={{ ...FONTS.body4 }}>{item.name}</Text>
				</TouchableOpacity>
			);
		};

		// return of modal render method
		return (
			<Modal animationType="slide" transparent={true} visible={modalVisible}>
				<TouchableWithoutFeedback
					onPress={() => {
						setModalVisible(false);
					}}
				>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View
							style={{
								hight: 400,
								width: SIZES.width * 0.8,
								backgroundColor: COLORS.lightGreen,
								borderRadius: SIZES.radius,
							}}
						>
							<FlatList
								data={areas}
								renderItem={renderItem}
								keyExtractor={(item) => item.code}
								showsVerticalScrollIndicator={false}
								style={{
									padding: SIZES.padding * 2,
									marginBottom: SIZES.padding * 2,
								}}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		);
	};

	return (
		<KeyboardAvoidingView
			// runs on android device but not in web ?
			behavior={Constants.platform === 'ios' ? 'padding' : null}
			style={{ flex: 1 }}
		>
			<LinearGradient
				colors={[COLORS.lime, COLORS.emerald]}
				style={{ flex: 1 }}
			>
				<ScrollView>
					{renderHeader()}
					{renderLogo()}
					{renderForm()}
					{renderButton()}
				</ScrollView>
			</LinearGradient>
			{modalVisible ? renderAreaCodesModal() : null}
		</KeyboardAvoidingView>
	);
};

export default SignUp;
