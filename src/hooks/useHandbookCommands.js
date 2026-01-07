/**
 * Custom hook for registering individual handbook search commands.
 *
 * Creates command palette entries for each handbook that:
 * - Appear in the command palette by default
 * - Guide users on how to use the shortcut syntax
 * - Open the command palette with usage instructions
 *
 * @module useHandbookCommands
 */
import { useCommand } from "@wordpress/commands";
import { useDispatch } from "@wordpress/data";
import { store as commandsStore } from "@wordpress/commands";
import { store as noticesStore } from "@wordpress/notices";
import { __ } from "@wordpress/i18n";
import { HANDBOOKS } from "../constants/handbooks";

/**
 * Registers static commands for each handbook.
 *
 * These commands are always visible in the command palette and serve as
 * entry points for users who don't know about the shortcut syntax.
 *
 * @returns {void}
 */
export const useHandbookCommands = () => {
	const { open } = useDispatch(commandsStore);
	const { createInfoNotice } = useDispatch(noticesStore);

	// Register each handbook command individually
	// Cannot use forEach with hooks - must call at top level
	useCommand({
		name: `search-handbooks-commands/search-${HANDBOOKS[0].prefix}`,
		label: __(`Search ${HANDBOOKS[0].name} Handbook`, "search-handbooks-commands"),
		icon: HANDBOOKS[0].icon,
		callback: () => {
			open();
			createInfoNotice(
				__(`Type your search term and add "${HANDBOOKS[0].prefix}" to search`, 'search-handbooks-commands'),
				{
					type: 'snackbar',
					isDismissible: true,
				}
			);
		},
	});

	useCommand({
		name: `search-handbooks-commands/search-${HANDBOOKS[1].prefix}`,
		label: __(`Search ${HANDBOOKS[1].name} Handbook`, "search-handbooks-commands"),
		icon: HANDBOOKS[1].icon,
		callback: () => {
			open();
			createInfoNotice(
				__(`Type your search term and add "${HANDBOOKS[1].prefix}" to search`, 'search-handbooks-commands'),
				{
					type: 'snackbar',
					isDismissible: true,
				}
			);
		},
	});

	useCommand({
		name: `search-handbooks-commands/search-${HANDBOOKS[2].prefix}`,
		label: __(`Search ${HANDBOOKS[2].name} Handbook`, "search-handbooks-commands"),
		icon: HANDBOOKS[2].icon,
		callback: () => {
			open();
			createInfoNotice(
				__(`Type your search term and add "${HANDBOOKS[2].prefix}" to search`, 'search-handbooks-commands'),
				{
					type: 'snackbar',
					isDismissible: true,
				}
			);
		},
	});

	useCommand({
		name: `search-handbooks-commands/search-${HANDBOOKS[3].prefix}`,
		label: __(`Search ${HANDBOOKS[3].name} Handbook`, "search-handbooks-commands"),
		icon: HANDBOOKS[3].icon,
		callback: () => {
			open();
			createInfoNotice(
				__(`Type your search term and add "${HANDBOOKS[3].prefix}" to search`, 'search-handbooks-commands'),
				{
					type: 'snackbar',
					isDismissible: true,
				}
			);
		},
	});
};
