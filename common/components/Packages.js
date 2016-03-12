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
} from 'react-native';

var Package = require('./Package');
var BookPackageForm = require('./BookPackage');

var Icon = require('react-native-vector-icons/MaterialIcons');

var remoteImagePath = 'https://marktimbol.com/images/uploads/';

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
			<View style={styles.item} key={rowID}>
				<TouchableHighlight 
					underlayColor={'#e3f2fd'}
					onPress={ this.showPackage.bind(this, currentPackage) }>
					<View>
						<Image source={{ uri: remoteImagePath + currentPackage.photos[0].path }} 
							style={styles.thumbnail }/>
						<View style={styles.packageContent}>
							<Text style={styles.packageName} numberOfLines={1}>{ currentPackage.name }</Text>
							<Text style={styles.packagePrice}>AED { currentPackage.adult_price }</Text>
						</View>
					</View>
				</TouchableHighlight>
			</View>
		)	
	}

	renderHeader() {
		return (
			<View style={styles.pageTitleContainer}>
				<Text style={styles.pageTitle}>Available Packages</Text>
			</View>
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

	pageTitleContainer: {
		width: 1000,
		paddingVertical: 5,
		backgroundColor: '#3471ae',
	},

	pageTitle: {
		color: 'white',
		textAlign: 'center',
		fontSize: 10,
	},	

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

	item: {
		width: 150,
		height: 180,
		margin: 5,
		shadowColor: '#333',
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		backgroundColor: 'white',
	},

	packageContent: {
		padding: 5,
	},

	separator: {
		borderBottomColor: '#328fcc',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},

	thumbnail: {
		width: 150,
		height: 130,
	},

	packageName: {
		fontSize: 10,
	},

	packageSubtitle: {
		fontSize: 10,
		color: '#757575',
	},

	packagePrice: {
		fontSize: 8,
		fontWeight: 'bold',
		marginTop: 10,
	},

	footerContainer: {
		width: 1000,
		padding: 20,
		marginTop: 20,
		backgroundColor: '#3471ae',
	},

	footerText: {
		color: 'white',
		fontSize: 10,
		textAlign: 'center',
	}
});

module.exports = Packages;
