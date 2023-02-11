import { DISPLAY_LOADING, HIDE_LOADING } from '../types/LoadingType';

const stateDefault = {
	isLoading: false,
};

const LoadingReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case DISPLAY_LOADING:
			return { ...state, isLoading: true };

		case HIDE_LOADING:
			return { ...state, isLoading: false };

		default:
			return state;
	}
};

export default LoadingReducer;
