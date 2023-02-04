import { SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from '../types/QuanLyPhimType';
import { SET_CHI_TIET_PHIM } from '../types/QuanLyRapType';

const stateDefault = {
	arrFilm: [],
	arrFilmDefault: [],
	dangChieu: false,
	sapChieu: false,
	filmDetail: {},
};

const QuanLyPhimReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case SET_DANH_SACH_PHIM:
			state.arrFilmDefault = action.arrFilm;
			return { ...state, arrFilm: action.arrFilm };

		case SET_PHIM_DANG_CHIEU:
			return { ...state, arrFilm: state.arrFilmDefault.filter(film => film.dangChieu), dangChieu: true, sapChieu: false };

		case SET_PHIM_SAP_CHIEU:
			return { ...state, arrFilm: state.arrFilmDefault.filter(film => film.sapChieu), dangChieu: false, sapChieu: true };

		case SET_CHI_TIET_PHIM:
			return { ...state, filmDetail: action.filmDetail };

		default:
			return state;
	}
};

export default QuanLyPhimReducer;
