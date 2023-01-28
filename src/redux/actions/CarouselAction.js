import axios from 'axios';
import { DOMAIN } from '../../util/settings/config';
import { SET_CAROUSEL } from '../types/CarouselType';

export const getCarouselAction = () => {
	return async dispatch => {
		try {
			const result = await axios({
				url: `${DOMAIN}/api/QuanLyPhim/LayDanhSachBanner`,
				method: 'GET',
			});
			console.log(result);
			dispatch({
				type: SET_CAROUSEL,
				arrImg: result.data.content,
			});
		} catch (err) {
			console.log('err', err);
		}
	};
};
