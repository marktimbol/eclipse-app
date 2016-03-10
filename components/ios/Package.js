'use strict';
import React, {
	Component,
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
} from 'react-native';

import HtmlText from 'react-native-htmltext';

var remoteImagePath = 'https://marktimbol.com/images/uploads/';

class Package extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		var packageInformation = this.props.selectedPackage.information.map((information) => {
			return (
				<View>
					<View style={styles.separator} />
					<Text style={styles.packageInformationText}>
						{ information.title } { information.description }
					</Text>
				</View>
			)
		});

		return (
			<ScrollView>
				<View style={styles.container}>
					<Image source={{ uri: remoteImagePath + this.props.selectedPackage.photos[0].path }} 
						style={styles.featuredImage} />
					<View style={styles.pageContent}>
						<Text style={styles.packageSubtitle}>{ this.props.selectedPackage.subtitle}</Text>
						<View style={styles.packageInformation}>
							<Text style={styles.packageInformationText}>
								Adult Price: AED { this.props.selectedPackage.adult_price }
							</Text>
							<View style={styles.separator} />
							<Text style={styles.packageInformationText}>
								Child Price: AED { this.props.selectedPackage.child_price }
							</Text>
							{ packageInformation }
						</View>

						<View style={styles.packageDescription}>
							<Text style={styles.packageDescriptionTitle}>Description</Text>
							<HtmlText 
								html={ this.props.selectedPackage.description }
								style={styles.packageDescriptionText}>
							</HtmlText>
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
	},

	separator: {
		borderBottomColor: '#ddd',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},

	pageContent: {
		margin: 10,
	},

	packageSubtitle: {
		marginBottom: 10,
	},

	featuredImage: {
		width: 380,
		height: 300,
		flex: 1,
	},

	packageInformation: {
		marginVertical: 10,
		borderRadius: 3,
		borderWidth: 1,
		marginVertical: 10,
		borderColor: '#ddd',
	},

	packageInformationText: {
		padding: 10,
	},

	packageDescription: {
		marginTop: 10,
	},

	packageDescriptionTitle: {
		marginBottom: 10,
	},

	packageDescriptionText: {
		fontSize: 5,
	}
});

module.exports = Package;