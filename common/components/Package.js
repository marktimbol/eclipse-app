'use strict';
import React, {
	Component,
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
} from 'react-native';

var Button = require('./Button');
var HTMLView = require('react-native-htmlview')
var BookPackage = require('./BookPackage');

var remoteImagePath = 'https://marktimbol.com/images/uploads/';

class Package extends Component {

	constructor(props) {
		super(props);

		this.state = {
			boooking: 'no'
		}
	}

	handleBookPackage(selectedPackage) {
		this.props.navigator.push({
			title: 'Booking Request',
			component: BookPackage,
			passProps: { selectedPackage: selectedPackage }
		});
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
			<View style={styles.container}>
				<View style={styles.pageTitleContainer}>
					<Text style={styles.pageTitle}>{ this.props.selectedPackage.subtitle }</Text>
				</View>
				<ScrollView style={styles.scrollView}>
					<Image source={{ uri: remoteImagePath + this.props.selectedPackage.photos[0].path }} 
						style={styles.featuredImage} />
					<View style={styles.pageContent}>
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

						<View style={styles.bookPackage}>
							<Button onPress={ this.handleBookPackage.bind(this, this.props.selectedPackage) }
								label={'Yup, I want to book this'} />
						</View>

						<View style={styles.packageDescription}>
							<Text style={styles.packageDescriptionTitle}>Description</Text>
							<HTMLView
								stylesheet={htmlView}
								value={ this.props.selectedPackage.description } />
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const htmlView = StyleSheet.create({
	p: {
		color: '#424242',
	},

	h3: {
		flex: 1,
		alignItems: 'flex-start',
		color: '#3471ae',
		fontSize: 16,
		fontWeight: 'normal',
		textAlign: 'left',
	},

	li: {
		flex: 1,
		alignItems: 'flex-start',
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	pageTitleContainer: {
		paddingVertical: 5,
		marginTop: 64,
		backgroundColor: '#3471ae',
	},

	pageTitle: {
		color: 'white',
		textAlign: 'center',
		fontSize: 10,
	},	

	separator: {
		borderBottomColor: '#ddd',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},

	scrollView: {
		marginTop: -64,
	},

	pageContent: {
		margin: 10,
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

	bookPackage: {
		marginVertical: 10,
		marginHorizontal: 0,
	},

	packageDescription: {
		marginTop: 10,
	},

	packageDescriptionTitle: {
		color: '#3471ae',
		marginBottom: 10,
	},

	packageDescriptionText: {
		fontSize: 5,
	}
});

module.exports = Package;