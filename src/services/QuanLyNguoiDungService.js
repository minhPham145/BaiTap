import { GROUPID } from '../util/settings/config';
import { BaseService } from './BaseService';

class QuanLyNguoiDungService extends BaseService {
	dangNhap = thongTinDangNhap => {
		return this.post('/api/QuanLyNguoiDung/DangNhap', thongTinDangNhap);
	};

	dangKy = thongTinDangKy => {
		return this.post('/api/QuanLyNguoiDung/DangKy', thongTinDangKy);
	};

	layThongTinNguoiDung = () => {
		return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
	};

	layDanhSachLoaiNguoiDung = () => {
		return this.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
	};

	capNhatThongTinNguoiDung = thongTinCapNhat => {
		return this.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', thongTinCapNhat);
	};

	layDanhSachNguoiDung = (tuKhoa = '') => {
		if (tuKhoa.trim() !== '') {
			return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`);
		}
		return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`);
	};

	themNguoiDung = thongTinNguoiDung => {
		return this.post('/api/QuanLyNguoiDung/ThemNguoiDung', thongTinNguoiDung);
	};

	capNhatThongTinNguoiDungAdmin = thongTinCapNhat => {
		return this.post('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', thongTinCapNhat);
	};

	xoaNguoiDung = taiKhoan => {
		return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
	};
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
