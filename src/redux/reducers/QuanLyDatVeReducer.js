import { ThongTinLichChieu } from '../../_core/models/ThongTinPhongVeModels';
import { CHON_GHE, CHUYEN_TAB, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from '../types/QuanLyDatVeType';

const stateDefault = {
	ChiTietPhongVe: new ThongTinLichChieu(),
	danhSachGheDangDat: [],
	tabActive: '1',
};

const QuanLyDatVeReducer = (state = stateDefault, action) => {
	switch (action.type) {
		case SET_CHI_TIET_PHONG_VE:
			return { ...state, ChiTietPhongVe: action.ChiTietPhongVe };

		case CHON_GHE:
			let danhSachGheCapNhat = [...state.danhSachGheDangDat];
			const index = danhSachGheCapNhat.findIndex(gheDangDat => gheDangDat.maGhe === action.gheDuocChon.maGhe);
			if (index !== -1) {
				danhSachGheCapNhat.splice(index, 1);
			} else {
				danhSachGheCapNhat = [...danhSachGheCapNhat, action.gheDuocChon];
			}
			return { ...state, danhSachGheDangDat: danhSachGheCapNhat };

		case DAT_VE_HOAN_TAT:
			return { ...state, danhSachGheDangDat: [] };

		case CHUYEN_TAB:
			return { ...state, tabActive: action.key };

		default:
			return state;
	}
};

export default QuanLyDatVeReducer;
