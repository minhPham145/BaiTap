import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import { DANG_NHAP } from '../types/QuanLyNguoiDungType';

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
	user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
	userLogin: user,
};

const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case DANG_NHAP:
			localStorage.setItem(USER_LOGIN, JSON.stringify(action.userLogin));
			localStorage.setItem(TOKEN, JSON.stringify(action.userLogin.accessToken));
			return { ...state, userLogin: action.userLogin };

		default:
			return state;
	}
};

export default QuanLyNguoiDungReducer;
