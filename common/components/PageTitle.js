'use strict';

import React, {
	View,
	Text,
	StyleSheet,
	Component,
	Dimensions,
} from 'react-native';

var { height, width } = Dimensions.get('window');

class PageTitle extends Component {

	constructor(props) {	
		super(props);
	}

	render() {		
		var containerWidth = {
			width: width
		}

		var passStyle = this.props.style ? this.props.style : '';

		return (
			<View style={[styles.pageTitleContainer, containerWidth, passStyle]}>
				<Text style={styles.pageTitle}>
					{ this.props.title }
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	pageTitleContainer: {
		width: width,
		padding: 5,
		backgroundColor: '#2196f3',
	},

	pageTitle: {
		fontSize: 10,
		color: 'white',
		textAlign: 'center',
	},	
});

module.exports = PageTitle;