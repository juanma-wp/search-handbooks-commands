/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';
import SearchHandbooksCommands from './SearchHandbooksCommands';

// Register the plugin with search handbook commands
registerPlugin("search-handbooks-commands", {
  render: SearchHandbooksCommands
});
