'use strict';

import React, {
	Component,
	View,
	Text,
	StyleSheet,
	Dimensions,
} from 'react-native';

var {height, width} = Dimensions.get('window');

class PackageTicket extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var divideBy = 2;

		if( width > 400 ) {
			divideBy = 3;
		}

		var itemWidth = {
			width: width / divideBy - 20
		}

		var ticketInformation = this.props.ticket.information.map( (information) => {
			return (
				<View key={information.id} style={styles.ticketInfo}>
					<Text style={styles.infoName}>{ information.name }</Text>
					<Text style={styles.infoDescription}>{ information.description }</Text>
				</View>	
			)
		});

		return (
			<View style={[styles.ticket, itemWidth]}>
				<View style={styles.darkBlueBg}>
					<Text style={styles.name}>{ this.props.ticket.name }</Text>
				</View>
				<View style={styles.blueBg}>
					<View style={[styles.row, styles.alignCenter]}>
						<Text style={styles.currency}>AED</Text>
						<Text style={styles.price}>
							{ this.props.ticket.adultPrice }
						</Text>
					</View>

					<Text style={styles.ticketDuration}>{ this.props.ticket.duration }</Text>
				</View>

				<View style={styles.ticketInformation}>
					<View style={styles.ticketInfo}>
						<Text style={styles.infoName}>
							AED { this.props.ticket.childPrice }
						</Text>
						<Text style={styles.infoDescription}>
							 per child
						</Text>
					</View>

					{ ticketInformation }
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	ticket: {
		margin: 5,
		borderRadius: 3,
		shadowColor: '#333',
		shadowOpacity: 0.1,
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 0,
		},
	},

	alignCenter: {
		alignItems: 'center',
		justifyContent: 'center',
	},

	darkBlueBg: {
		backgroundColor: '#0398dc',
	},

	blueBg: {
		backgroundColor: '#03a9f4',
		padding: 10,
	},

	name: {
		fontSize: 8,
		color: 'white',
		textAlign: 'center',
		padding: 7,
	},

	row: {
		flexDirection: 'row',
	},

	currency: {
		fontSize: 8,
		color: 'white',
		marginRight: 2,
	},

	price: {
		fontSize: 20,
		color: 'white',
	},

	ticketDuration: {
		fontSize: 8,
		color: 'white',
		textAlign: 'center',
	},

	ticketInformation: {
		padding: 10,
	},

	ticketInfo: {
		paddingVertical: 10,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#ddd',
	},

	infoName: {
		fontSize: 8,
		fontWeight: 'bold',
		textAlign: 'center',
	},

	infoDescription: {
		fontSize: 8,
		textAlign: 'center',
	},


});

module.exports = PackageTicket;