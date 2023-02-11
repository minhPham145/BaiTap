import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDungService';
import { STATUS_CODE } from '../../util/settings/config';
import { DANG_NHAP, SET_DANH_SACH_NGUOI_DUNG, SET_LOAI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_CAP_NHAT } from '../types/QuanLyNguoiDungType';
import { history } from '../../util/history';

export const dangNhapAction = thongTinDangNhap => {
	return async dispatch => {
		try {
			const { data, status } = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: DANG_NHAP,
					userLogin: data.content,
				});
				history.goBack();
			}
			console.log(data);
		} catch (err) {
			console.log(err);
			alert(err.response.data.content);
		}
	};
};

export const dangKyAction = thongTinDangKy => {
	return async dispatch => {
		try {
			const { data, status } = await quanLyNguoiDungService.dangKy(thongTinDangKy);
			if (status === STATUS_CODE.SUCCESS) {
				alert('Đăng ký thành công!');
				history.push('/home');
			}
			console.log(data);
		} catch (err) {
			console.log(err);
			alert(err.response.data.content);
		}
	};
};

export const layThongTinNguoiDungAction = () => {
	return async dispatch => {
		try {
			const { data, status } = await quanLyNguoiDungService.layThongTinNguoiDung();
			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: SET_THONG_TIN_NGUOI_DUNG,
					thongTinNguoiDung: data.content,
				});
			}
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
};

export const layDanhSachLoaiNguoiDungAction = () => {
	return async dispatch => {
		try {
			const { data, status } = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: SET_LOAI_NGUOI_DUNG,
					danhSachLoaiNguoiDung: data.content,
				});
			}
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
};

export const capNhatThongTinNguoiDungAction = thongTinCapNhat => {
	return async dispatch => {
		try {
			const { data, status } = await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinCapNhat);
			if (status === STATUS_CODE.SUCCESS) {
				dispatch(layThongTinNguoiDungAction());
				alert('Cập nhật thông tin thành công!');
			}
			console.log(data);
		} catch (err) {
			console.log(err);
			alert(err.response.data.content);
		}
	};
};

export const layDanhSachNguoiDungAction = (tuKhoa = '') => {
	return async dispatch => {
		try {
			const { data, status } = await quanLyNguoiDungService.layDanhSachNguoiDung(tuKhoa);
			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: SET_DANH_SACH_NGUOI_DUNG,
					danhSachNguoiDung: data.content,
				});
			}
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
};

export const themNguoiDungAction = thongTinNguoiDung => {
	return async dispatch => {
		try {
			const { data, status } = await quanLyNguoiDungService.themNguoiDung(thongTinNguoiDung);
			if (status === STATUS_CODE.SUCCESS) {
				alert('Thêm người dùng thành công!');
				history.push('/admin/users');
			}
			console.log(data);
		} catch (err) {
			console.log(err);
			alert(err.response.data.content);
		}
	};
};

export const layThongTinNguoiDungCapNhatAction = thongTinNguoiDungCapNhat => {
	return {
		type: SET_THONG_TIN_NGUOI_DUNG_CAP_NHAT,
		thongTinNguoiDungCapNhat,
	};
};

export const capNhatThongTinNguoiDungAdminAction = thongTinNguoiDungCapNhat => {
	return async dispatch => {
		try {
			const { data, status } = await quanLyNguoiDungService.capNhatThongTinNguoiDungAdmin(thongTinNguoiDungCapNhat);
			if (status === STATUS_CODE.SUCCESS) {
				alert('Cập nhật người dùng thành công!');
				history.push('/admin/users');
			}
			console.log(data);
		} catch (err) {
			console.log(err);
			alert(err.response.data.content);
		}
	};
};

export const xoaNguoiDungAction = taiKhoan => {
	return async dispatch => {
		try {
			const { data, status } = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
			if (status === STATUS_CODE.SUCCESS) {
				alert('Xóa người dùng thành công!');
				dispatch(layDanhSachNguoiDungAction());
			}
			console.log(data);
		} catch (err) {
			console.log(err);
			alert(err.response.data.content);
		}
	};
};
