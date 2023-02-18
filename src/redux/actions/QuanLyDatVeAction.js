import { quanLyDatVeService } from '../../services/QuanLyDatVeService';
import { STATUS_CODE } from '../../util/settings/config';
import { CHON_GHE, CHUYEN_TAB, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from '../types/QuanLyDatVeType';
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';

export const layDanhSachPhongVeAction = maLichChieu => {
	return async dispatch => {
		try {
			const { status, data } = await quanLyDatVeService.layDanhSachPhongVe(maLichChieu);
			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: SET_CHI_TIET_PHONG_VE,
					ChiTietPhongVe: data.content,
				});
			}
		} catch (err) {
			alert(err);
		}
	};
};

export const chonGheAction = gheDuocChon => {
	return { type: CHON_GHE, gheDuocChon };
};

export const datVeHoanTatAction = () => ({
	type: DAT_VE_HOAN_TAT,
});

export const chuyenTabAction = key => ({
	type: CHUYEN_TAB,
	key,
});

export const datVeAction = thongTinDatVe => {
	return async dispatch => {
		dispatch(displayLoadingAction());

		try {
			const { status } = await quanLyDatVeService.datVe(thongTinDatVe);
			if (status === STATUS_CODE.SUCCESS) {
				await dispatch(layDanhSachPhongVeAction(thongTinDatVe.maLichChieu));
				await dispatch(datVeHoanTatAction());
				await dispatch(hideLoadingAction());
				await dispatch(chuyenTabAction('2'));
			}
		} catch (err) {
			alert(err);
		}
	};
};
