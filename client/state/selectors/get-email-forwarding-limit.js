/** @format */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import createSelector from 'lib/create-selector';
import { getSitePlanSlug } from 'state/sites/selectors';
import { planHasFeature } from 'lib/plans';
import { FEATURE_EMAIL_FORWARDING_EXTENDED_LIMIT } from 'lib/plans/constants';

const DEFAULT_EMAIL_FORWARDING_LIMT = 5;
const EXTENDED_EMAIL_FORWARDING_LIMIT = 100;

/**
 * Returns true if site has a plan with extened email forwarding features
 *
 * @param  {Object}  state  Global state tree
 * @param  {String}  siteId The Site ID
 * @return {Boolean} True if site has a plan with extended email forwarding limit
 */
export const siteHasEligibleWpcomPlan = createSelector(
	( state, siteId ) => {
		const slug = getSitePlanSlug( state, siteId );

		return planHasFeature( slug, FEATURE_EMAIL_FORWARDING_EXTENDED_LIMIT );
	},
	( state, siteId ) => [ getSitePlanSlug( state, siteId ) ]
);

/**
 * Returns the email forwarding limit of a site
 *
 * @param  {Object} state  Global state tree
 * @param  {String} siteId The Site ID
 * @return {Number} the number of email forwards to allow
 */
export default function getEmailForwardingLImit( state, siteId ) {
	return siteHasEligibleWpcomPlan( state, siteId )
		? EXTENDED_EMAIL_FORWARDING_LIMIT
		: DEFAULT_EMAIL_FORWARDING_LIMT;
}
