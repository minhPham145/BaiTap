import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDungService';
import { STATUS_CODE } from '../../util/settings/config';
import { DANG_NHAP } from '../types/QuanLyNguoiDungType';
import { history } from '../../util/history';

export const DangNhapAction = thongTinDangNhap => {
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
			console.log(data.content);
		} catch (err) {
			console.log(err);
		}
	};
};
