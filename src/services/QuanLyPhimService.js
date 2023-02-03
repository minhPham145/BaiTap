import { GROUPID } from '../util/settings/config';
import { BaseService } from './BaseService';

class QuanLyPhimService extends BaseService {
	layDanhSachBanner = () => {
		return this.get('/api/QuanLyPhim/LayDanhSachBanner');
	};

	layDanhSachPhim = () => {
		return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`);
	};
}

export const quanLyPhimService = new QuanLyPhimService();
