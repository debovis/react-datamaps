import React from 'react';

import Datamap from '../src';
import Example from './example';

export default class BasicExample extends React.Component {
	constructor (props: Object) {
    	super(props)

    	this.onClick = this.onClick.bind(this)
    }

	onClick(e){
		console.log('ddd')
	}
	render() {
		return (
			<Example label="Basic">
				<Datamap onClick={this.onClick}/>
			</Example>
		);
	}

}
