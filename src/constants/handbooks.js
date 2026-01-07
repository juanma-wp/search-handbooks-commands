/**
 * Handbook configuration data.
 *
 * Each handbook entry defines:
 * - prefix: The shortcut prefix used in search (e.g., "!b" for Block Editor)
 * - name: Display name of the handbook
 * - url: Base URL for the handbook documentation
 * - icon: WordPress icon component to represent the handbook
 * - key: Single character key used in two-step shortcuts (e.g., "b" after Cmd+Option+H)
 */
import { help, pages, plugins, code } from "@wordpress/icons";

export const HANDBOOKS = [
	{
		prefix: "!b",
		name: "Block Editor",
		url: "https://developer.wordpress.org/block-editor/",
		icon: help,
		key: "b",
	},
	{
		prefix: "!t",
		name: "Theme",
		url: "https://developer.wordpress.org/themes/",
		icon: pages,
		key: "t",
	},
	{
		prefix: "!p",
		name: "Plugin",
		url: "https://developer.wordpress.org/plugins/",
		icon: plugins,
		key: "p",
	},
	{
		prefix: "!r",
		name: "REST API",
		url: "https://developer.wordpress.org/rest-api/",
		icon: code,
		key: "r",
	},
];
