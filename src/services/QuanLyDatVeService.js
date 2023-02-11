import { ThongTinDatVe } from '../_core/models/ThongTinDatVeModels';
import { BaseService } from './BaseService';

class QuanLyDatVeService extends BaseService {
	layDanhSachPhongVe = maLichChieu => {
		return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
	};

	datVe = (thongTinDatVe = new ThongTinDatVe()) => {
		return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
	};

	taoLichChieu = thongTinLichChieu => {
		return this.post(`/api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu);
	};
}

export const quanLyDatVeService = new QuanLyDatVeService();
