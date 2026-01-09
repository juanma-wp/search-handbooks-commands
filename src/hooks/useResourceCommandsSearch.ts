/**
 * Custom hook for dynamic resource search commands.
 *
 * This hook processes search terms to:
 * 1. Detect resource shortcuts (e.g., "query !b" for Block Editor)
 * 2. Generate executable search commands when shortcuts are matched
 *
 * @module useResourceCommandsSearch
 */
import { useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { search as searchIcon } from "@wordpress/icons";
import { ALL_RESOURCES } from "../constants/resources";
import type { WPCommandConfig } from '@wordpress/commands';

interface UseResourceCommandsSearchReturn {
	commands: WPCommandConfig[];
	isLoading: boolean;
}

/**
 * Creates commands based on search term patterns.
 *
 * @param {Object} params - Hook parameters
 * @param {string} params.search - Current search term from command palette
 * @returns {Object} Object containing commands array and loading state
 */
export const useResourceCommandsSearch = ({ search }: { search: string }): UseResourceCommandsSearchReturn => {
	const searchTerm = search;
	const commands = useMemo(() => {
		// Require minimum 3 characters to trigger any suggestions
		if (!searchTerm || searchTerm.length < 3) {
			return [];
		}

		// Check if search term ends with a resource prefix
		const matchedResources = ALL_RESOURCES.filter((resource) =>
			searchTerm.endsWith(` ${resource.prefix}`)
		);

		// Generate executable search commands when a prefix is detected
		return matchedResources.flatMap((resource) => {
			// Extract the actual query by removing the prefix
			const query = searchTerm.slice(0, -(resource.prefix.length + 1)).trim();

			// Skip empty queries
			if (!query) {
				return [];
			}

			const resourceType = resource.type === 'handbook' ? 'Handbook' : '';
			const label = resourceType
				? `Search ${resource.name} ${resourceType}: "${query}"`
				: `Search ${resource.name}: "${query}"`;

			return [
				{
					name: `search-resources-commands/resource-search-${resource.prefix}`,
					label: __(label, "search-resources-commands"),
					icon: searchIcon,
					searchLabel: `${query} ${resource.prefix}`,
					callback: () =>
						window.open(
							`${resource.url}?s=${encodeURIComponent(query)}`,
							"_blank"
						),
				},
			];
		});
	}, [searchTerm]);

	return { commands, isLoading: false };
};

