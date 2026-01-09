/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import SearchResourcesCommands from './searchResourcesCommands';
import domReady from "@wordpress/dom-ready";
import Notices from "./components/Notices";
import "./styles.css";

const ID = "search-resources-commands";

domReady(() => {
  const container = document.createElement("div");
  container.id = `${ID}-root`;
  document.body.appendChild(container);
  createRoot(container).render(
    <>
      <SearchResourcesCommands />
      <Notices className={`${ID}-notices`} />
    </>
  );
});