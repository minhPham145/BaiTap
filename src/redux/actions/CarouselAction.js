import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { STATUS_CODE } from '../../util/settings/config';
import { SET_CAROUSEL } from '../types/CarouselType';

export const getCarouselAction = () => {
	return async dispatch => {
		try {
			const { status, data } = await quanLyPhimService.layDanhSachBanner();
			if (status === STATUS_CODE.SUCCESS) {
				dispatch({
					type: SET_CAROUSEL,
					arrImg: data.content,
				});
			}
		} catch (err) {
			alert(err);
		}
	};
};
