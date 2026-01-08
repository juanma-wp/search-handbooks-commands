/**
 * Helper utilities for programmatically interacting with the command palette.
 *
 * These functions handle low-level DOM manipulation required to:
 * - Pre-fill search terms in the command palette input
 * - Trigger React's synthetic event system
 * - Manage text selection states
 *
 * @module commandPaletteHelper
 */

/**
 * Selector for the command palette input field.
 * @constant {string}
 */
const COMMAND_PALETTE_INPUT_SELECTOR = '.commands-command-menu__container input[type="text"]';

/**
 * Sets the value of a React-controlled input element.
 *
 * This bypasses React's controlled component mechanism by using the native
 * HTMLInputElement setter, then dispatches an input event to notify React
 * of the change.
 *
 * @param {HTMLInputElement} inputElement - The input element to modify
 * @param {string} value - The value to set
 */
const setReactInputValue = (inputElement, value) => {
	const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
		window.HTMLInputElement.prototype,
		'value'
	).set;
	nativeInputValueSetter.call(inputElement, value);

	const inputEvent = new Event('input', { bubbles: true });
	inputElement.dispatchEvent(inputEvent);
};

/**
 * Pre-fills the command palette with a search term and resource prefix.
 *
 * This function:
 * 1. Finds the command palette input element
 * 2. Sets its value using native DOM APIs (required for React)
 * 3. Dispatches an input event to trigger React's onChange handlers
 * 4. Focuses the input and selects the placeholder text
 *
 * @param {string} resourcePrefix - The resource prefix (e.g., "!b", "!t")
 * @param {number} [delay=100] - Delay in milliseconds before executing
 * @returns {number} Timeout ID for potential cleanup
 */
export const prefillCommandPalette = (resourcePrefix, delay = 100) => {
	return setTimeout(() => {
		const commandInput = document.querySelector(COMMAND_PALETTE_INPUT_SELECTOR);

		if (!commandInput) {
			return;
		}

		// Pre-fill with "search" + resource prefix
		const searchText = `search ${resourcePrefix}`;

		// Set value using helper that bypasses React's controlled input
		setReactInputValue(commandInput, searchText);

		// Focus and select "search" text so user can start typing immediately
		commandInput.focus();
		commandInput.setSelectionRange(0, 6); // Select "search"
	}, delay);
};
