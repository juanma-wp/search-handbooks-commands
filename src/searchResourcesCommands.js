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
 * @module searchResourcesCommands
 */
import { useCommandLoader } from "@wordpress/commands";
import { getResourceCommandsSearch } from "./hooks/useResourceCommandsSearch";
import { useResourceKeyboardShortcuts } from "./hooks/useResourceKeyboardShortcuts";
import { useResourceCommands } from "./hooks/useResourceCommands";

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
		hook: getResourceCommandsSearch(),
	});

	// Set up two-step keyboard shortcuts (Cmd+Option+H + B/T/P/R)
	useResourceKeyboardShortcuts();

	// Register static commands for each handbook
	useResourceCommands();
};

export default SearchHandbooksCommands;
