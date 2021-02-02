import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import { SignUp } from './Screens';

// theme for application
const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		border: 'transparent',
	},
};

// create stack navigators
const Stack = createStackNavigator();

export default function App() {
	const [fontsLoaded] = useFonts({
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
		'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
		'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
	});

	if (!fontsLoaded) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator
				screenOptions={{
					headerShow: false,
				}}
				initialRouteName={'SignUp'}
			>
				<Stack.Screen name="SignUp" component={SignUp} />

				{/* bottom tabs goes here */}
				<Stack.Screen name="Home" component={Tabs} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
