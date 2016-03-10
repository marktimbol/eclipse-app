'use strict';

import React, {
	Component,
	StyleSheet,
	View,
	Image,
	Text,
	TextInput,
	TouchableHighlight
} from 'react-native';

var Packages = require('./Packages');
var Button = require('./../Button');

class SearchPackage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
		}
	}

	handleChangeText(value) {
		this.setState({
			search: value
		});
	}

	onSearch() {
		console.log(this.state.search);
	}

	showAllPackages() {
		this.props.navigator.push({
			title: 'All Packages',
			component: Packages,
			passProps: {}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>{ this.props.foo }</Text>
				<Image style={styles.homeBackground} source={ require('../../images/home.jpg') }>
					<View style={styles.homeContent}>
						<View style={styles.formGroup}>
							<TextInput
								style={styles.formControl}
								onChangeText={this.handleChangeText.bind(this)}
								value={this.state.search}
								placeholder="Search Tours" />
							<Button onPress={this.onSearch.bind(this)}
								style={styles.button}
								label={'Go'} />
						</View>

						<TouchableHighlight onPress={ this.showAllPackages.bind(this) } underlayColor={'transparent'}>
							<Text style={styles.link}>View All Packages</Text>
						</TouchableHighlight>
					</View>
				</Image>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	homeBackground: {
		width: null,
		height: null,
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		alignItems: 'center'
	},

	homeContent: {
		width: 300,
		padding: 10,
		borderRadius: 5,
		backgroundColor: 'rgba(255,255,255,0.7)'
	},

	homeContentText: {
		color: '#328fcc',
		fontSize: 20,
	},

	formGroup: {
		flexDirection: 'row',
		marginVertical: 10,
	},

	formControl: {
		flex: 4,
		fontSize: 14,
		color: '#328fcc',
		height: 40,
		marginRight: 5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderColor: '#328fcc',
		borderWidth: 1,
		borderRadius: 3,
	},

	button: {
		flex: 1,
		marginTop: 10,
	},

	link: {
		fontSize: 10,
	},

	textCenter: {
		textAlign: 'center',
	}

});

module.exports = SearchPackage;

