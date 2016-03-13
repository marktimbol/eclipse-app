'use strict';

import React, {
	Component,
	View,
	Text,
	Image,
	TouchableHighlight,
	StyleSheet,
	Dimensions,
} from 'react-native';

var remoteImagePath = 'https://marktimbol.com/images/uploads/';
var {height, width} = Dimensions.get('window');

class Card extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var divideBy = 2;

		if( width > 400 ) {
			divideBy = 3;
		}

		var itemWidth = {
			width: width / divideBy - 10
		}

		return (
			<View style={[styles.card, itemWidth]}>
				<TouchableHighlight 
					underlayColor={'#e3f2fd'}
					onPress={ this.props.onPress }>
					<View>
						<Image source={{ uri: remoteImagePath + this.props.currentPackage.photos[0].path }} 
							style={[styles.thumbnail, itemWidth]}/>
						<View style={styles.cardContent}>
							<Text style={styles.packageName} numberOfLines={1}>{ this.props.currentPackage.name }</Text>
							<Text style={styles.packagePrice}>
								{ 
									this.props.currentPackage.confirm_availability ? 
									<Text>Upon Request</Text> : 
									<Text>AED { this.props.currentPackage.adult_price }</Text>
								}
							</Text>
						</View>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	card: {
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

	thumbnail: {
		height: 130,
	},

	cardContent: {
		padding: 10,
	},

	packageName: {
		fontSize: 10,
	},

	packagePrice: {
		fontSize: 8,
		fontWeight: 'bold',
		marginTop: 5,
	},
});

module.exports = Card;