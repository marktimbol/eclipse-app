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

var remoteImagePath = 'https://marktimbol.com/images/uploads/';

class Packages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			packages: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			}),
			loaded: false
		}
	}

	componentDidMount() {
		this.fetchPackages();
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
			<View>
				<TouchableHighlight 
					underlayColor={'#e3f2fd'}
					onPress={ this.showPackage.bind(this, currentPackage) }>
					<View style={styles.row}>
						<Image source={{ uri: remoteImagePath + currentPackage.photos[0].path }} 
							style={styles.thumbnail }/>
						<View style={styles.packageContent}>
							<Text style={styles.packageName} numberOfLines={1}>{ currentPackage.name }</Text>
							<Text style={styles.packageSubtitle} numberOfLines={1}>{ currentPackage.subtitle }</Text>
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
			passProps: { selectedPackage: currentPackage}
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

		return (
			<ListView
				dataSource={this.state.packages}
				renderRow={this.renderRow.bind(this)}
				initialListSize={5}
				renderSectionHeader={this.renderHeader}
				renderFooter={this.renderFooter}
				style={styles.listView} />
		);
	}
}

const styles = StyleSheet.create({

	pageTitleContainer: {
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
		marginTop: 64,
	},

	row: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
	},

	separator: {
		borderBottomColor: '#328fcc',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},

	packageContent: {
		flex: 1,
	},

	thumbnail: {
		width: 80,
		height: 80,
		borderRadius: 2,
		marginRight: 10,
	},

	packageName: {
		fontSize: 12,
	},

	packageSubtitle: {
		fontSize: 10,
		color: '#757575',
	},

	packagePrice: {
		fontSize: 10,
		fontWeight: 'bold',
		marginTop: 10,
	},

	footerContainer: {
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

