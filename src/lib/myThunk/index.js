const thunk = store => next => action => {
	if (typeof action === 'function') {
		console.log('in thunk middleware');
		return action(store.dispatch, store.getState);
	}
	console.log('next action in thunk');
	return next(action);
};

export default thunk;
