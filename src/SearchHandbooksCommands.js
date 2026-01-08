/**
 * Main component for Search Handbooks Commands plugin.
 *
 * This component orchestrates handbook search functionality through:
 * - Dynamic command generation based on search input
 * - Keyboard shortcuts (Cmd+Option+H followed by B/T/P/R)
 * - Static commands visible in the command palette
 *
 * The component itself renders nothing (returns null) but registers
 * all necessary commands, shortcuts, and event handlers.
 *
 * @module SearchHandbooksCommands
 */
import { useCommandLoader } from "@wordpress/commands";
import { getHandbookCommandsSearch } from "./hooks/useHandbookCommandsSearch";
import { useHandbookKeyboardShortcuts } from "./hooks/useHandbookKeyboardShortcuts";
import { useHandbookCommands } from "./hooks/useHandbookCommands";

/**
 * Main plugin component.
 *
 * Coordinates all handbook search features by:
 * 1. Registering dynamic search command loader
 * 2. Setting up keyboard shortcuts
 * 3. Registering static handbook commands
 *
 * Component only registers hooks and doesn't render anything.
 */
const SearchHandbooksCommands = () => {
	// Register dynamic search commands that appear based on user input
	useCommandLoader({
		name: "search-handbooks-commands/handbooks-search-shortcuts",
		hook: getHandbookCommandsSearch(),
	});

	// Set up two-step keyboard shortcuts (Cmd+Option+H + B/T/P/R)
	useHandbookKeyboardShortcuts();

	// Register static commands for each handbook
	useHandbookCommands();
};

export default SearchHandbooksCommands;
