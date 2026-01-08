/**
 * Custom hook for dynamic handbook search commands.
 *
 * This hook processes search terms to:
 * 1. Detect handbook shortcuts (e.g., "query !b" for Block Editor)
 * 2. Generate executable search commands when shortcuts are matched
 *
 * @module useHandbookCommandsSearch
 */
import { useMemo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { search } from "@wordpress/icons";
import { HANDBOOKS } from "../constants/handbooks";

/**
 * Creates commands based on search term patterns.
 *
 * @param {Object} params - Hook parameters
 * @param {string} params.search - Current search term from command palette
 * @returns {Object} Object containing commands array and loading state
 */
export const useHandbookCommandsSearch = ({ search: searchTerm }) => {
	const commands = useMemo(() => {
		// Require minimum 3 characters to trigger any suggestions
		if (!searchTerm || searchTerm.length < 3) {
			return [];
		}

		// Check if search term ends with a handbook prefix
		const matchedHandbooks = HANDBOOKS.filter((handbook) =>
			searchTerm.endsWith(` ${handbook.prefix}`)
		);

		// Generate executable search commands when a prefix is detected
		return matchedHandbooks.flatMap((handbook) => {
			// Extract the actual query by removing the prefix
			const query = searchTerm.slice(0, -(handbook.prefix.length + 1)).trim();

			// Skip empty queries
			if (!query) {
				return [];
			}

			return [
				{
					name: `search-handbooks-commands/handbook-search-${handbook.prefix}`,
					label: __(
						`Search ${handbook.name} Handbook: "${query}"`,
						"search-handbooks-commands"
					),
					icon: search,
					searchLabel: `${query} ${handbook.prefix}`,
					callback: () =>
						window.open(
							`${handbook.url}?s=${encodeURIComponent(query)}`,
							"_blank"
						),
				},
			];
		});
	}, [searchTerm]);

	return { commands, isLoading: false };
};

/**
 * Factory function to create the hook for useCommandLoader.
 *
 * @returns {Function} The useHandbookCommandsSearch hook
 */
export const getHandbookCommandsSearch = () => useHandbookCommandsSearch;
