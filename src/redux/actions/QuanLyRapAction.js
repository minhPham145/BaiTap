import { quanLyRapService } from '../../services/QuanLyRapService';
import { STATUS_CODE } from '../../util/settings/config';
import { SET_HE_THONG_RAP_CHIEU } from '../types/QuanLyRapType';

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
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};
};
