'use strict';

import React, {
	Component,
	View,
	Text,
	ListView,
	TouchableHighlight,
	Image,
	StyleSheet,
} from 'react-native';

var Package = require('./Package');

var remoteImagePath = 'https://marktimbol.com/images/uploads/';

class Packages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			packages: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2
			})
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
					packages: this.state.packages.cloneWithRows(responseData)
				})
			})
			.done();
	}

	renderRow(currentPackage, sectionID, rowID) {
		return (	
			<View style={styles.container}>
				<TouchableHighlight 
					underlayColor={'#328fcc'}
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

	showPackage(currentPackage) {
		this.props.navigator.push({
			title: currentPackage.name,
			component: Package,
			passProps: { selectedPackage: currentPackage}
		});
	}

	render() {
		return (
			<ListView
				dataSource={this.state.packages}
				renderRow={this.renderRow.bind(this)} />
		);
	}
}

const styles = StyleSheet.create({

	container: {
		marginVertical: 5,
	},

	row: {
		flexDirection: 'row',
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
	},

	packagePrice: {
		fontSize: 10,
		fontWeight: 'bold',
		marginTop: 10,
	}
});

module.exports = Packages;

