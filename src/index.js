/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import SearchHandbooksCommands from './searchResourcesCommands';

// Register the plugin with search handbook commands
registerPlugin("search-handbooks-commands", {
  render: SearchHandbooksCommands
});
