import { TOKEN, USER_LOGIN } from '../../util/settings/config';
import { ThongTinNguoiDung } from '../../_core/models/ThongTinNguoiDungModels';
import { DANG_NHAP, SET_DANH_SACH_NGUOI_DUNG, SET_LOAI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_CAP_NHAT } from '../types/QuanLyNguoiDungType';

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
	user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
	userLogin: user,
	thongTinNguoiDung: new ThongTinNguoiDung(),
	danhSachLoaiNguoiDung: [],
	danhSachNguoiDung: [],
	thongTinNguoiDungCapNhat: {},
};

const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case DANG_NHAP:
			localStorage.setItem(USER_LOGIN, JSON.stringify(action.userLogin));
			localStorage.setItem(TOKEN, action.userLogin.accessToken);
			return { ...state, userLogin: action.userLogin };

		case SET_THONG_TIN_NGUOI_DUNG:
			return { ...state, thongTinNguoiDung: action.thongTinNguoiDung };

		case SET_LOAI_NGUOI_DUNG:
			return { ...state, danhSachLoaiNguoiDung: action.danhSachLoaiNguoiDung };

		case SET_DANH_SACH_NGUOI_DUNG:
			return { ...state, danhSachNguoiDung: action.danhSachNguoiDung };

		case SET_THONG_TIN_NGUOI_DUNG_CAP_NHAT:
			if (state.danhSachNguoiDung.length === 0) {
				return { ...state, thongTinNguoiDungCapNhat: {} };
			}

			return { ...state, thongTinNguoiDungCapNhat: state.danhSachNguoiDung.find(user => user.taiKhoan === action.thongTinNguoiDungCapNhat) };

		default:
			return state;
	}
};

export default QuanLyNguoiDungReducer;
