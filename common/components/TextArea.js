'use strict';

import React, {
	Component,
	TextInput,
	StyleSheet,
} from 'react-native';

class TextArea extends Component {

	constructor(props) {
		super(props);
	}

	onChangeText(value) {
		this.props.onChangeText(value);
	}

	render() {
		return (
			<TextInput 
				multiline={true}
				style={ styles.formControl } 
				value={ this.props.value }
				onChangeText={ this.onChangeText.bind(this) } />
		)
	}
}

const styles = StyleSheet.create({

	formControl: {
		flex: 1,
		height: 90,
		padding: 5,
		borderRadius: 2,
		borderWidth: 1,
		borderColor: '#ddd',
	}

});

module.exports = TextArea;