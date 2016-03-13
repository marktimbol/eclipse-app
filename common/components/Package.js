'use strict';
import React, {
	Component,
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	Dimensions,
} from 'react-native';

var PageTitle = require('./PageTitle');
var Button = require('./Button');
var HTMLView = require('react-native-htmlview')
var BookPackageForm = require('./BookPackage');
var PackageTicket = require('./PackageTicket');

var remoteImagePath = 'https://marktimbol.com/images/uploads/';

class Package extends Component {

	constructor(props) {
		super(props);
	}

	handleBookPackage(selectedPackage) {
		this.props.navigator.push({
			title: 'Booking Request',
			component: BookPackageForm,
			passProps: { selectedPackage: selectedPackage }
		});
	}

	render() {
		var {height, width} = Dimensions.get('window');
		var featuredImageStyle = {
			width: width
		}

		var ticketOptions = null;
		if( this.props.selectedPackage.has_ticket_option ) {
			ticketOptions = this.props.selectedPackage.tickets.map( (ticket) => {
				return (
					<PackageTicket key={ticket.id} ticket={ticket} />
				)
			});
		}

		var packageInformation = this.props.selectedPackage.information.map((information) => {
			return (
				<View key={information.id}>
					<View style={styles.separator} />
					<Text style={styles.packageInformationText}>
						{ information.title } { information.description }
					</Text>
				</View>
			)
		});

		return (
			<View style={styles.container}>
				<PageTitle title={ this.props.selectedPackage.subtitle } style={{ marginTop: 64 }} />
				<ScrollView style={styles.scrollView}>
					<Image source={{ uri: remoteImagePath + this.props.selectedPackage.photos[0].path }} 
						style={[styles.featuredImage, featuredImageStyle ]} />
					<View style={styles.pageContent}>
						<View style={styles.packageInformation}>
							<Text style={styles.packageInformationText}>
								Adult Price: 
									{ 
										this.props.selectedPackage.confirm_availability ? 
										<Text>Upon Request</Text> : 
										<Text>AED { this.props.selectedPackage.adult_price }</Text>
									}
							</Text>
							<View style={styles.separator} />
							<Text style={styles.packageInformationText}>
								Child Price: 
									{ 
										this.props.selectedPackage.confirm_availability ? 
										<Text>Upon Request</Text> : 
										<Text>AED { this.props.selectedPackage.child_price }</Text>
									}
							</Text>
							{ packageInformation }
						</View>

						<View style={styles.tickets}>
							{ ticketOptions }
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
		height: 300,
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

	tickets: {
		flexDirection: 'row',
		flexWrap: 'wrap',
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