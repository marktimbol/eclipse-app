
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

var SideMenu = require('react-native-side-menu');
var Menu = require('./common/components/Menu');
var Packages = require('./common/components/Packages');
var SearchPackage = require('./common/components/SearchPackage');
var Icon = require('react-native-vector-icons/MaterialIcons');

class EclipseApp extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			menuIcon: null,
			searchIcon: null,
			isMenuOpen: false,
		}
	}

	componentWillMount() {
		Icon.getImageSource('menu', 24)
			.then( (source) => this.setState({ menuIcon: source }) );

    	Icon.getImageSource('search', 24)
    		.then( (source) => this.setState({ searchIcon: source }) );
	}

	toggleMenu() {
		this.setState({
			isMenuOpen: ! this.state.isMenuOpen
		});
	}

	render() {

		const menu = <Menu navigator={navigator} />

		if( ! this.state.searchIcon || ! this.state.menuIcon ) {
			return false;
		}

		return (
			<SideMenu menu={menu}
				isOpen={this.state.isMenuOpen}
				bounceBackOnOverdraw={false}>
				<NavigatorIOS
					barTintColor={'#2196f3'}
					tintColor={'white'}
					titleTextColor={'white'}
					shadowHidden={true}
					initialRoute={{
						title: 'Eclipse Tourism',
						component: Packages,
						leftButtonIcon: this.state.menuIcon,
						rightButtonIcon: this.state.searchIcon,
						onLeftButtonPress: this.toggleMenu.bind(this),
						onRightButtonPress: this.toggleMenu.bind(this),
						passProps: { },
					}} style={styles.routes} />
			</SideMenu>
		)
	}	
}

const styles = StyleSheet.create({
	routes: {
		flex: 1
	}
})

module.exports = EclipseApp;

