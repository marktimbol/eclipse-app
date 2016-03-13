'use strict';

import React, {
	Component,
	View,
	Text,
	ListView,
	ScrollView,
	TouchableHighlight,
	Image,
	StyleSheet,
	ActivityIndicatorIOS,
	Dimensions,
} from 'react-native';

var PageTitle = require('./PageTitle');
var Package = require('./Package');
var BookPackageForm = require('./BookPackage');
var Icon = require('react-native-vector-icons/MaterialIcons');
var Card = require('./Card');

var remoteImagePath = 'https://marktimbol.com/images/uploads/';
var {height, width} = Dimensions.get('window');

class Packages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			packages: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			loaded: false,
			addIcon: null,
		}
	}

	componentDidMount() {
		this.fetchPackages();
	}

	componentWillMount() {
		Icon.getImageSource('add', 24)
			.then( (source) => this.setState({ addIcon: source }) );
	}

	fetchPackages() {
		var url = 'https://marktimbol.com/api/v1/packages/';

		fetch(url)
			.then( (response) => response.json() )
			.then( (responseData) => {
				this.setState({
					packages: this.state.packages.cloneWithRows(responseData),
					loaded: true,
				})
			})
			.done();
	}

	renderRow(currentPackage, sectionID, rowID) {
		return (	
			<Card key={rowID}
				onPress={this.showPackage.bind(this, currentPackage) }
				currentPackage={currentPackage} />
		)	
	}

	renderHeader() {
		return (
			<PageTitle title={'Available Packages'} />
		)
	}

	renderFooter() {
		return (
			<View style={styles.footerContainer}>
				<Text style={styles.footerText}>
					You have seen them all, wanna talk to us now?
				</Text>
			</View>
		)
	}

	showPackage(currentPackage) {
		this.props.navigator.push({
			title: currentPackage.name,
			component: Package,
			rightButtonIcon: this.state.addIcon,
			onRightButtonPress: this.bookPackage.bind(this, currentPackage),
			passProps: { selectedPackage: currentPackage}
		});
	}

	bookPackage(selectedPackage) {
		this.props.navigator.push({
			title: 'Booking Request',
			component: BookPackageForm,
			passProps: { selectedPackage: selectedPackage }
		});
	}

	showLoading() {
		return (
			<View style={styles.loading}>
				<ActivityIndicatorIOS
					animating={true} size={'large'} />
			</View>
		)
	}

	render() {
		if( ! this.state.loaded ) {
			return this.showLoading();
		}

		if( ! this.state.addIcon ) {
			return false;
		}

		return (
			<ListView
				dataSource={this.state.packages}
				renderRow={this.renderRow.bind(this)}
				initialListSize={5}
				renderSectionHeader={this.renderHeader}
				renderFooter={this.renderFooter}
				contentContainerStyle={styles.listView} />
		);
	}
}

const styles = StyleSheet.create({

	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	listView: {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: '#f4f4f4',
		marginTop: 64,
	},

	footerContainer: {
		width: width,
		padding: 20,
		marginTop: 20,
		backgroundColor: '#2196f3',
	},

	footerText: {
		color: 'white',
		fontSize: 10,
		textAlign: 'center',
	}
});

module.exports = Packages;
