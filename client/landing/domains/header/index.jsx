/**
 * External dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import WordPressLogo from 'components/wordpress-logo';

/**
 *
 * Style dependencies
 */
import './style.scss';

class DomainsLandingHeader extends Component {
	static propTypes = {
		title: PropTypes.string,
	};

	render() {
		const { title } = this.props;
		return (
			<Card className="header">
				<WordPressLogo className="header__logo" size={ 52 } />
				{ title && <h2 className="header__title">{ title }</h2> }
			</Card>
		);
	}
}

export default DomainsLandingHeader;
