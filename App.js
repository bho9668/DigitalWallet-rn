import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

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
	return (
		<NavigationContainer theme={theme}>
			<Stack.Navigator
				screenOptions={{
					headerShow: false,
				}}
				initialRouteName={'SignUp'}
			>
				<Stack.Screen name="SignUp" component={SignUp} />
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
