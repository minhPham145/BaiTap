import { quanLyRapService } from '../../services/QuanLyRapService';
import { STATUS_CODE } from '../../util/settings/config';
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU } from '../types/QuanLyRapType';

export const layDanhSachHeThongRapAction = () => {
	return async dispatch => {
		try {
			const { status, data } = await quanLyRapService.layDanhSachHeThongRap();
			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: SET_HE_THONG_RAP_CHIEU,
					heThongRapChieu: data.content,
				});
			}
		} catch (err) {
			alert(err);
		}
	};
};

export const layThongTinLichChieuPhimAction = id => {
	return async dispatch => {
		try {
			const { status, data } = await quanLyRapService.layThongTinLichChieuPhim(id);
			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: SET_CHI_TIET_PHIM,
					filmDetail: data.content,
				});
			}
		} catch (err) {
			alert(err);
		}
	};
};
