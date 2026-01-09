/**
 * Notices component to render snackbar notifications from core/notices store.
 *
 * This makes wp.data.dispatch('core/notices') work outside the Block Editor
 * by providing a rendering component for the notices.
 */
import { useSelect, useDispatch } from "@wordpress/data";
import { store as noticesStore } from "@wordpress/notices";
import { store as editorStore } from "@wordpress/editor";
import { SnackbarList } from "@wordpress/components";

/**
 * Renders notices from the core/notices store.
 *
 * @returns {JSX.Element|null} The notices component or null if in block editor
 */
const Notices = ({ className }) => {
  const { notices, isBlockEditor } = useSelect((select) => {
    // Check if we're in the block editor (post editor or site editor)
    const getCurrentPostType = select(editorStore)?.getCurrentPostType;
    const isInBlockEditor =
      typeof getCurrentPostType === "function" && getCurrentPostType() !== null;

    return {
      notices: select(noticesStore)
        .getNotices()
        .filter((notice) => notice.type === "snackbar"),
      isBlockEditor: isInBlockEditor,
    };
  }, []);

  const { removeNotice } = useDispatch(noticesStore);

  // Don't render if we're in the block editor
  if (isBlockEditor) {
    return null;
  }

  // Always render the container, even when empty
  // This ensures proper styles are loaded from the beginning
  return (
    <div
      className={`components-editor-notices__snackbar ${className}`}
      style={{
        position: "fixed",
        left: 0,
        bottom: "16px",
        paddingLeft: "16px",
        paddingRight: "16px",
        zIndex: 1000000,
      }}
    >
      <SnackbarList notices={notices} onRemove={removeNotice} />
    </div>
  );
};

export default Notices;
