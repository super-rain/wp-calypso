/** @format */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { isExpiring } from 'lib/purchases';
import { disableAutoRenew, enableAutoRenew } from 'lib/upgrades/actions';
import { isFetchingSitePurchases } from 'state/purchases/selectors';
import { fetchSitePurchases } from 'state/purchases/actions';
import DisablingDialog from './disabling-dialog';
import FormToggle from 'components/forms/form-toggle';

class AutoRenewToggle extends Component {
	static propTypes = {
		purchase: PropTypes.object.isRequired,
		siteDomain: PropTypes.string.isRequired,
		planName: PropTypes.string.isRequired,
		isEnabled: PropTypes.bool.isRequired,
		fetchingSitePurchases: PropTypes.bool,
	};

	static defaultProps = {
		fetchingSitePurchases: false,
	};

	state = {
		showDisablingDialog: false,
		isTogglingToward: null,
		isRequesting: false,
	};

	onCloseDisablingDialog = () => {
		this.setState( {
			showDisablingDialog: false,
		} );
	};

	onToggleAutoRenew = () => {
		const {
			purchase: { id: purchaseId, siteId },
			isEnabled,
		} = this.props;

		if ( isEnabled ) {
			this.setState( {
				showDisablingDialog: true,
			} );
		}

		const updateAutoRenew = isEnabled ? disableAutoRenew : enableAutoRenew;

		this.setState( {
			isTogglingToward: ! isEnabled,
			isRequesting: true,
		} );

		updateAutoRenew( purchaseId, success => {
			this.setState( {
				isRequesting: false,
			} );
			if ( success ) {
				this.props.fetchSitePurchases( siteId );
			}
		} );
	};

	isUpdatingAutoRenew = () => {
		return this.state.isRequesting || this.props.fetchingSitePurchases;
	};

	getToggleUiStatus() {
		if ( this.isUpdatingAutoRenew() ) {
			return this.state.isTogglingToward;
		}

		return this.props.isEnabled;
	}

	render() {
		const { planName, siteDomain, purchase } = this.props;

		return (
			<>
				<FormToggle
					checked={ this.getToggleUiStatus() }
					disabled={ this.isUpdatingAutoRenew() }
					onChange={ this.onToggleAutoRenew }
				/>
				{ this.state.showDisablingDialog && (
					<DisablingDialog
						planName={ planName }
						siteDomain={ siteDomain }
						expiryDate={ purchase.expiryMoment.format( 'LL' ) }
						onClose={ this.onCloseDisablingDialog }
					/>
				) }
			</>
		);
	}
}

export default connect(
	( state, { purchase } ) => ( {
		fetchingSitePurchases: isFetchingSitePurchases( state ),
		isEnabled: ! isExpiring( purchase ),
	} ),
	{
		fetchSitePurchases,
	}
)( AutoRenewToggle );
