import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { STATUS_CODE } from '../../util/settings/config';
import { SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from '../types/QuanLyPhimType';

export const LayDanhSachPhimAction = () => {
	return async dispatch => {
		try {
			const { status, data } = await quanLyPhimService.layDanhSachPhim();
			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: SET_DANH_SACH_PHIM,
					arrFilm: data.content,
				});
			}
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
};

export const LayDanhSachPhimDangChieu = () => {
	return {
		type: SET_PHIM_DANG_CHIEU,
	};
};

export const LayDanhSachPhimSapChieu = () => {
	return {
		type: SET_PHIM_SAP_CHIEU,
	};
};
