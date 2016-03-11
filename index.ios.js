
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


var SearchPackage = require('./common/components/SearchPackage');
var Packages = require('./common/components/Packages');

class EclipseTourism extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<NavigatorIOS
				barTintColor={'#4d98e4'}
				tintColor={'white'}
				titleTextColor={'white'}
				shadowHidden={true}
				initialRoute={{
					title: 'Eclipse Tourism',
					component: SearchPackage,
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

