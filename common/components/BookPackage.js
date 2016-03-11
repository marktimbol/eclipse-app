'use strict';

import React, {
	Component,
	View,
	Text,
	TextInput,
	StyleSheet,
} from 'react-native';

var TextBox = require('./TextBox');
var TextArea = require('./TextArea');
var Button = require('./Button');

class BookPackage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
		}
	}

	handleChangeName(name) {
		this.setState({
			name: name
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.pageTitleContainer}>
					<Text style={styles.pageTitle}>You are requesting to book { this.props.selectedPackage.name }.</Text>
				</View>

				<View style={styles.form}>
					<View style={styles.formControl}>
						<Text style={styles.label}>Name</Text>
						<TextBox value={this.state.name} onChangeText={this.handleChangeName.bind(this)} />
					</View>

					<View style={styles.formControl}>
						<Text style={styles.label}>Email</Text>
						<TextBox value={this.state.name} onChangeText={this.handleChangeName.bind(this)} />
					</View>

					<View style={styles.formControl}>
						<Text style={styles.label}>Phone Number</Text>
						<TextBox value={this.state.name} onChangeText={this.handleChangeName.bind(this)} />
					</View>

					<View style={styles.formControl}>
						<Text style={styles.label}>Any additional details?</Text>
						<TextArea value={this.state.name} onChangeText={this.handleChangeName.bind(this)} />
					</View>

					<View style={styles.formControl}>
						<Button label={'Send Message'} onPress={ () => console.log('pressed') } />
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({

	container: {
		marginTop: 64,
	},

	pageTitleContainer: {
		paddingVertical: 5,
		backgroundColor: '#3471ae',
	},

	pageTitle: {
		color: 'white',
		textAlign: 'center',
		fontSize: 10,
	},	

	form: {
		margin: 10,
	},

	formControl: {
		marginBottom: 15,
	},

	label: {
		marginBottom: 5,
	}

});

module.exports = BookPackage;