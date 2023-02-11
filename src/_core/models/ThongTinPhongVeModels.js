class ThongTinPhim {
	maLichChieu = '';
	tenCumRap = '';
	tenRap = 'Rạp 0';
	diaChi = '';
	tenPhim = '';
	hinhAnh = 'https://picsum.photos/200/300';
	ngayChieu = '01/01/2001';
	gioChieu = '00:00';
}

class Ghe {
	maGhe = '';
	tenGhe = '';
	maRap = '';
	loaiGhe = '';
	stt = '';
	giaVe = '';
	daDat = false;
	taiKhoanNguoiDat = null;
}

export class ThongTinLichChieu {
	thongTinPhim = new ThongTinPhim();
	danhSachGhe = Array(1).fill(new Ghe());
}
