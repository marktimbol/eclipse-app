
'use strict';

import React, {
	AppRegistry,
	Component,
	NavigatorIOS,
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';


var SearchPackage = require('./components/ios/SearchPackage');
var Packages = require('./components/ios/Packages');

class EclipseTourism extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<NavigatorIOS
				initialRoute={{
					title: 'Eclipse Tourism',
					component: Packages,
					passProps: { },
				}} style={styles.routes} />
		)
	}	
}

var FirstPage = React.createClass({
	nextPage() {
		this.props.navigator.push({
			title: 'Second Page',
			component: SecondPage,
			passProps: {}
		})
	},

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight onPress={ this.nextPage }>
					<Text>Go to next page</Text>
				</TouchableHighlight>
			</View>	
		);
	}
});

var SecondPage = React.createClass({
	firstPage() {
		this.props.navigator.pop();
	},

	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight onPress={ this.firstPage }>
					<Text style={styles.text}>Go back</Text>
				</TouchableHighlight>
			</View>	
		);
	}
});


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	routes: {
		flex: 1
	}
})

AppRegistry.registerComponent('EclipseTourism', () => EclipseTourism);
module.exports = EclipseTourism;

