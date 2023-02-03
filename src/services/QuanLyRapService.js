import { GROUPID } from '../util/settings/config';
import { BaseService } from './BaseService';

class QuanLyRapService extends BaseService {
	layDanhSachHeThongRap = () => {
		return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);
	};

	layThongTinHeThongRap = () => {
		return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
	};
}

export const quanLyRapService = new QuanLyRapService();
