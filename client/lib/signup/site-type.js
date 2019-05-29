/** @format **/
/**
 * Exernal dependencies
 */
import i18n from 'i18n-calypso';
import { find, get } from 'lodash';

/**
 * Internal dependencies
 */

/**
 * Looks up site types array for item match and returns a property value
 *
 * @example
 * // Find the site type where `id === 2`, and return the value of `slug`
 * const siteTypeValue = getSiteTypePropertyValue( 'id', 2, 'slug' );
 *
 * @param {string} key A property name of a site types item
 * @param {string|number} value The value of `key` with which to filter items
 * @param {string} property The name of, or path to, the property whose value you wish to return
 * @param {array} siteTypes (optional) A site type collection
 * @return {(string|int)?} value of `property` or `null` if none is found
 */
export function getSiteTypePropertyValue( key, value, property, siteTypes = getAllSiteTypes() ) {
	const siteTypeProperties = find( siteTypes, { [ key ]: value } );
	return get( siteTypeProperties, property, null );
}

const copyDefaults = {
	// General copy
	label: i18n.translate( 'Default label' ),
	description: i18n.translate( 'default description' ),
	previewScrollDownCopy: i18n.translate(
		'Scroll down to see your site. Once you complete setup you’ll be able to customize it further.'
	),
	// Site title step
	siteTitleLabel: i18n.translate( 'Give your site a name' ),
	siteTitleSubheader: i18n.translate(
		'This will appear at the top of your site and can be changed at anytime.'
	),
	siteTitlePlaceholder: i18n.translate( 'default siteTitlePlaceholder' ),
	// Site topic step
	siteTopicHeader: i18n.translate( 'What is your site about?' ),
	siteTopicSubheader: i18n.translate(
		"We'll add relevant content to your site to help you get started."
	),
	siteTopicInputPlaceholder: i18n.translate( 'Enter a topic or choose one from below.' ),
	// Domains step
	domainsStepHeader: i18n.translate( 'Give your site an address' ),
	domainsStepSubheader: i18n.translate(
		'Enter a keyword that describes your site to get started.'
	),
	// Site styles step
	siteStyleSubheader: i18n.translate(
		'This will help you get started with a theme you might like. You can change it later.'
	),
};

/**
 * Looks up site types array for item match and returns the specified copy item
 *
 * @example
 * // Find the site type where `id === 2`, and return the copy for `domainsStepHeader`
 * const siteTypeValue = getSiteTypePropertyValue( { id: 2, } 'domainsStepHeader' );
 *
 * @param {Object} siteTypeMatcher An object to be used to find a matching site type
 * @param {string} copyItemKey The name of, or path to, the property whose value you wish to return
 * @param {array} siteTypes (optional) A site type collection
 * @return {(string|int)?} copy item or `''` if none is found
 */
export function getCopyForSiteType( siteTypeMatcher, copyItemKey, siteTypes = getAllSiteTypes() ) {
	const siteTypeProperties = find( siteTypes, siteTypeMatcher ) || {};
	const defaultCopy = get( copyDefaults, copyItemKey, '' );

	return get( siteTypeProperties.copy, copyItemKey, defaultCopy );
}

/**
 * Returns a current list of site types that are displayed in the signup site-type step
 * Some (or all) of these site types will also have landing pages.
 * A user who comes in via a landing page will not see the Site Topic dropdown.
 * Do note that id's per site type should not be changed as we add/remove site-types.
 *
 * Please don't modify the IDs for now until we can integrate the /segments API into Calypso.
 *
 * @return {array} current list of site types
 */
export function getAllSiteTypes() {
	// should we memo this? It's not dynamic, we only function it up because of translations
	return [
		{
			id: 2, // This value must correspond with its sibling in the /segments API results
			slug: 'blog',
			theme: 'pub/independent-publisher-2',
			designType: 'blog',
			copy: {
				label: i18n.translate( 'Blog' ),
				description: i18n.translate( 'Share and discuss ideas, updates, or creations.' ),
				siteTitleLabel: i18n.translate( "Tell us your blog's name" ),
				siteTitleSubheader: i18n.translate(
					'This will appear at the top of your blog and can be changed at anytime.'
				),
				siteTitlePlaceholder: i18n.translate( "E.g., Stevie's blog " ),
				siteTopicHeader: i18n.translate( 'What is your blog about?' ),
				siteTopicLabel: i18n.translate( 'What will your blog be about?' ),
				siteTopicSubheader: i18n.translate(
					"We'll add relevant content to your blog to help you get started."
				),
				previewScrollDownCopy: i18n.translate(
					'Scroll down to see your blog. Once you complete setup you’ll be able to customize it further.'
				),
				domainsStepHeader: i18n.translate( 'Give your blog an address' ),
				domainsStepSubheader: i18n.translate(
					"Enter your blog's name or some keywords that describe it to get started."
				),
			},
		},
		{
			id: 1, // This value must correspond with its sibling in the /segments API results
			slug: 'business',
			theme: 'pub/professional-business',
			designType: 'page',
			customerType: 'business',
			copy: {
				label: i18n.translate( 'Business' ),
				description: i18n.translate( 'Promote products and services.' ),
				siteTitleLabel: i18n.translate( 'Tell us your business’s name' ),
				siteTitlePlaceholder: i18n.translate( 'E.g., Vail Renovations' ),
				siteTopicHeader: i18n.translate( 'What does your business do?' ),
				siteTopicLabel: i18n.translate( 'What type of business do you have?' ),
				domainsStepSubheader: i18n.translate(
					"Enter your business's name or some keywords that describe it to get started."
				),
			},
		},
		{
			id: 4, // This value must correspond with its sibling in the /segments API results
			slug: 'professional',
			theme: 'pub/altofocus',
			designType: 'portfolio',
			copy: {
				label: i18n.translate( 'Professional' ),
				description: i18n.translate( 'Showcase your portfolio and work.' ),
				siteTitleLabel: i18n.translate( 'What is your name?' ),
				siteTitlePlaceholder: i18n.translate( 'E.g., John Appleseed' ),
				siteTopicHeader: i18n.translate( 'What type of work do you do?' ),
				siteTopicInputPlaceholder: i18n.translate(
					'Enter your job title or choose one from below.'
				),
				domainsStepSubheader: i18n.translate(
					'Enter your name or some keywords that describe yourself to get started.'
				),
			},
		},
		{
			id: 3, // This value must correspond with its sibling in the /segments API results
			slug: 'online-store',
			theme: 'pub/dara',
			designType: 'store',
			customerType: 'business',
			copy: {
				label: i18n.translate( 'Online store' ),
				description: i18n.translate( 'Sell your collection of products online.' ),
				siteTitleLabel: i18n.translate( 'What is the name of your store?' ),
				siteTitlePlaceholder: i18n.translate( "E.g., Mel's Diner" ),
				siteTopicHeader: i18n.translate( 'What type of products do you sell?' ),
				siteTopicLabel: i18n.translate( 'What type of products do you sell?' ),
			},
		},
	];
}
