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
import { useCommands } from "@wordpress/commands";
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

	const commands = HANDBOOKS.map((handbook) => ({
		name: `search-handbooks-commands/search-${handbook.prefix}`,
		label: __(`Search ${handbook.name} Handbook`, "search-handbooks-commands"),
		icon: handbook.icon,
		callback: () => {
			open();
			createInfoNotice(
				__(`Type your search term and add "${handbook.prefix}" to search`, 'search-handbooks-commands'),
				{
					type: 'snackbar',
					isDismissible: true,
				}
			);
		},
	}));

	useCommands(commands);
};
