import React, { useState } from 'react';
import {
	Text,
	View,
	SafeAreaView,
	Image,
	FlatList,
	TouchableOpacity,
} from 'react-native';

import { COLORS, SIZES, FONTS, images, icons } from '../constants';
import featuresData from '../data/featuresData';
import specialPromoData from '../data/specialPromoData';

const Home = () => {
	// state for data store
	const [features, setFeatures] = useState(featuresData);
	const [specialPromos, setSpecialPromos] = useState(specialPromoData);

	const renderHeader = () => {
		return (
			<View
				style={{
					flexDirection: 'row',
					marginVertical: SIZES.padding * 2,
				}}
			>
				<View style={{ flex: 1 }}>
					<Text style={{ ...FONTS.h1 }}>Hello!</Text>
					<Text
						style={{
							...FONTS.body2,
							color: COLORS.gray,
						}}
					>
						Dr.Doom
					</Text>
				</View>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<TouchableOpacity
						style={{
							height: 40,
							width: 40,
							justifyContent: 'center',
							alignItems: 'center',
							color: COLORS.gray,
						}}
					>
						<Image
							source={icons.bell}
							style={{
								width: 20,
								height: 20,
								tintColor: COLORS.secondary,
							}}
						/>
						<View
							style={{
								position: 'absolute',
								top: -5,
								right: -5,
								height: 10,
								width: 10,
								backgroundColor: COLORS.red,
								borderRadius: 5,
							}}
						></View>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	const renderBanner = () => {
		return (
			<View
				style={{
					height: 120,
					borderRadius: 20,
					// backgroundColor: COLORS.primary,
				}}
			>
				<Image
					source={images.banner}
					style={{
						width: '100%',
						height: '100%',
						borderRadius: 20,
					}}
				/>
			</View>
		);
	};

	// features render functions
	const renderFeatures = () => {
		// header component for features list
		const Header = () => {
			return (
				<View style={{ marginBottom: SIZES.padding * 2 }}>
					<Text style={{ ...FONTS.h4 }}>Features</Text>
				</View>
			);
		};
		// render Item function for features
		const renderItem = ({ item }) => {
			return (
				<TouchableOpacity
					style={{
						marginBottom: SIZES.padding * 2,
						width: 60,
						alignItems: 'center',
					}}
					onPress={() => {
						console.log(`${item.description}`);
					}}
				>
					<View
						style={{
							height: 50,
							width: 50,
							marginBottom: 5,
							borderRadius: 20,
							backgroundColor: item.backgroundColor,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Image
							source={item.icon}
							resizeMode="contain"
							style={{
								height: 20,
								width: 20,
								tintColor: item.color,
							}}
						/>
					</View>
					<Text
						style={{
							textAlign: 'center',
							flexWrap: 'wrap',
							...FONTS.body4,
						}}
					>
						{item.description}
					</Text>
				</TouchableOpacity>
			);
		};

		return (
			<FlatList
				ListHeaderComponent={Header}
				data={features}
				numColumns={4}
				columnWrapperStyle={{ justifyContent: 'space-between' }}
				keyExtractor={(item) => `${item.id}`}
				renderItem={renderItem}
				style={{ marginTop: SIZES.padding * 2 }}
			/>
		);
	};

	// function for render promo header
	const renderPromoHeader = () => {
		return (
			<View
				style={{
					flexDirection: 'row',
					marginBottom: SIZES.padding,
				}}
			>
				<View style={{ flex: 1 }}>
					<Text style={{ ...FONTS.h3 }}>Special Promos</Text>
				</View>
				<TouchableOpacity onPress={() => console.log('View all')}>
					<Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
				</TouchableOpacity>
			</View>
		);
	};

	// custome render function
	function renderPromos() {
		// header components for home screen
		const HeaderComponent = () => {
			return (
				<View>
					{renderHeader()}
					{renderBanner()}
					{renderFeatures()}
					{renderPromoHeader()}
				</View>
			);
		};

		// secondary custom render function for renderItem in list
		const renderItem = ({ item }) => {
			return (
				<TouchableOpacity
					style={{
						marginVertical: SIZES.base,
						width: SIZES.width / 2.5,
					}}
					onPress={() => {
						console.log(item.title);
					}}
				>
					<View
						style={{
							height: 80,
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
							backgroundColor: COLORS.primary,
						}}
					>
						<Image
							source={images.promoBanner}
							resizeMode="cover"
							style={{
								width: '100%',
								height: '100%',
								borderTopRightRadius: 20,
								borderTopLeftRadius: 20,
							}}
						/>
					</View>
					<View
						style={{
							padding: SIZES.padding,
							backgroundColor: COLORS.lightGray,
							borderBottomLeftRadius: 20,
							borderBottomRightRadius: 20,
						}}
					>
						<Text
							style={{
								...FONTS.h4,
							}}
						>
							{item.title}
						</Text>
						<Text style={{ ...FONTS.body4 }}>{item.description}</Text>
					</View>
				</TouchableOpacity>
			);
		};

		return (
			<FlatList
				ListHeaderComponent={HeaderComponent}
				contentContainerStyle={{
					paddingHorizontal: SIZES.padding * 3,
				}}
				columnWrapperStyle={{
					justifyContent: 'space-between',
				}}
				numColumns={2}
				data={specialPromos}
				keyExtractor={(item) => `${item.id}`}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={<View style={{ marginBottom: 80 }}></View>}
			/>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			{renderPromos()}
		</SafeAreaView>
	);
};

export default Home;
