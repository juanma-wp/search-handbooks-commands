declare module '@wordpress/commands' {
	export interface WPCommandConfig {
		name: string;
		label: string;
		searchLabel?: string;
		context?: string;
		icon: JSX.Element;
		callback: (options: { close: () => void }) => void;
		disabled?: boolean;
		keywords?: string[];
	}

	export interface WPCommandLoaderConfig {
		name: string;
		context?: string;
		hook: WPCommandLoaderHook;
		disabled?: boolean;
	}

	export interface WPCommandLoaderHookReturn {
		commands: WPCommandConfig[];
		isLoading: boolean;
	}

	export interface WPCommandLoaderHookParams {
		search: string;
	}

	export type WPCommandLoaderHook = (params: WPCommandLoaderHookParams) => WPCommandLoaderHookReturn;

	export type Command = WPCommandConfig;

	export function useCommand(command: WPCommandConfig): void;
	export function useCommands(commands: WPCommandConfig[]): void;
	export function useCommandLoader(config: WPCommandLoaderConfig): void;

	export const store: any;
}
