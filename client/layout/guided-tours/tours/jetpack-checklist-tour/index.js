/**
 * External dependencies
 */
import React, { Fragment } from 'react';

/**
 * Internal dependencies
 */
import meta from './meta';
import {
	ButtonRow,
	Continue,
	makeTour,
	Quit,
	Step,
	Tour,
} from 'layout/guided-tours/config-elements';

export const JetpackChecklistTour = makeTour(
	<Tour { ...meta }>
		<Step arrow="bottom-left" name="init" placement="above" target=".checklist">
			{ ( { translate } ) => (
				<Fragment>
					<p>
						{ translate(
							"This is your security checklist that'll help you quickly setup Jetpack. " +
								'Pick and choose the features that you want.'
						) }
					</p>
					<ButtonRow>
						<Continue target=".plugin-item-jetpack .form-toggle__switch" step="finish" click>
							{ translate( 'Got it' ) }
						</Continue>
					</ButtonRow>
				</Fragment>
			) }
		</Step>

		<Step
			arrow="bottom-left"
			name="finish"
			placement="above"
			target=".jetpack-checklist__footer .button"
		>
			{ ( { translate } ) => (
				<Fragment>
					<p>
						{ translate(
							"After you're done setting everything up, you can return to your WordPress " +
								'admin here or continue using the WordPress.com dashboard.'
						) }
					</p>
					<ButtonRow>
						<Quit>{ translate( 'Got it' ) }</Quit>
					</ButtonRow>
				</Fragment>
			) }
		</Step>
	</Tour>
);
