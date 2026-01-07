/**
 * Notices component to render snackbar notifications from core/notices store.
 *
 * This makes wp.data.dispatch('core/notices') work outside the Block Editor
 * by providing a rendering component for the notices.
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { Snackbar, SnackbarList } from '@wordpress/components';

/**
 * Renders notices from the core/notices store.
 *
 * @returns {JSX.Element} The notices component
 */
const Notices = () => {
	const notices = useSelect(
		(select) =>
			select(noticesStore)
				.getNotices()
				.filter((notice) => notice.type === 'snackbar'),
		[]
	);

	const { removeNotice } = useDispatch(noticesStore);

	return (
		<SnackbarList
			notices={notices}
			className="handbook-commands-snackbar-list"
			onRemove={removeNotice}
		/>
	);
};

export default Notices;
