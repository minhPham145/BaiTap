import { BaseService } from './BaseService';

class QuanLyNguoiDungService extends BaseService {
	dangNhap = thongTinDangNhap => {
		//{taiKhoan: '', matKhau: '' }
		return this.post('/api/QuanLyNguoiDung/DangNhap', thongTinDangNhap);
	};
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
