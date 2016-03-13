'use strict';
import React, {
	Component,
	Text,
	TouchableHighlight,
	StyleSheet
} from 'react-native';

class Button extends Component {
	render() {
		return (
			<TouchableHighlight 
				onPress={this.props.onPress} 
				underlayColor={'#3471ae'}
				style={styles.button}>
				<Text style={styles.buttonText}>{ this.props.label }</Text>
			</TouchableHighlight>
		)
	}
}

const styles = StyleSheet.create({
	button: {
		flex: 1,
		backgroundColor: '#2196f3',
		borderRadius: 2,
		height: 40,
		paddingHorizontal: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},

	buttonText: {
		color: 'white',
		fontSize: 12,
	}
});

module.exports = Button;