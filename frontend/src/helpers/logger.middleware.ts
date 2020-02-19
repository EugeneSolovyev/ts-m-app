const logger = (state: any) => (next: Function) => (action: any) => {
	console.group('Logger:');
	console.log('Dispatching:', action);
	console.log('Previous state:', state.getState());
	const nextState = next(action);
	console.log('Next state:', state.getState());
	console.groupEnd();
	return nextState;
};

export default logger;
