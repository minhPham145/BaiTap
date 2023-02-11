import React, { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Select, DatePicker } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { STATUS_CODE } from '../../../util/settings/config';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';

export default function Showtime(props) {
	const formik = useFormik({
		initialValues: {
			maPhim: props.match.params.id,
			ngayChieuGioChieu: 'string',
			maRap: 'string',
			giaVe: 0,
		},
		onSubmit: async values => {
			console.log('values: ', values);
			try {
				const { data, status } = await quanLyDatVeService.taoLichChieu(values);
				if (status === STATUS_CODE.SUCCESS) {
					alert('Tạo lịch chiếu thành công! ');
				}
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		},
	});

	const [state, setState] = useState({
		heThongRapChieu: [],
		cumRapChieu: [],
	});

	useEffect(() => {
		const getDanhSachHeThongRap = async () => {
			try {
				const { data, status } = await quanLyRapService.layThongTinHeThongRap();
				if (status === STATUS_CODE.SUCCESS) {
					setState({
						...state,
						heThongRapChieu: data.content,
					});
				}
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};
		getDanhSachHeThongRap();
	}, []);

	const handleChangeHeThongRap = async value => {
		try {
			const { data, status } = await quanLyRapService.layThongTinCumRap(value);
			if (status === STATUS_CODE.SUCCESS) {
				setState({
					...state,
					cumRapChieu: data.content,
				});
			}
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChangeCumRap = value => {
		formik.setFieldValue('maRap', value);
	};

	const onChangeDate = (value, dateString) => {
		formik.setFieldValue('ngayChieuGioChieu', dateString);
	};
	const onOk = value => {
		formik.setFieldValue('ngayChieuGioChieu', dayjs(value).format('DD/MM/YYYY hh:mm:ss'));
	};

	const onChangeInputNumber = value => {
		formik.setFieldValue('giaVe', value);
	};

	const convertSelectHTR = () => {
		return state.heThongRapChieu.map(htr => {
			return { label: htr.tenHeThongRap, value: htr.maHeThongRap };
		});
	};

	const convertSelectCumRap = () => {
		return state.cumRapChieu.map(cumRap => {
			return { label: cumRap.tenCumRap, value: cumRap.maCumRap };
		});
	};

	let film = {};
	if (localStorage.getItem('filmParams')) {
		film = JSON.parse(localStorage.getItem('filmParams'));
	}
	return (
		<div className='container'>
			<h1 className='text-2xl mb-5'>Tạo lịch chiếu - {props.match.params.tenphim}</h1>
			<div className='flex items-end'>
				<img className='w-[200px] h-[300px] inline' src={film.hinhAnh} alt={film.hinhAnh} />
				<Form onSubmitCapture={formik.handleSubmit} name='basic' labelCol={{ span: 10 }} wrapperCol={{ span: 20 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }}>
					<Form.Item label='Hệ thống rạp'>
						<Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder='Chọn hệ thống rạp' />
					</Form.Item>
					<Form.Item label='Cụm rạp'>
						<Select options={convertSelectCumRap()} onChange={handleChangeCumRap} placeholder='Chọn cụm rạp' />
					</Form.Item>
					<Form.Item label='Ngày giờ chiếu'>
						<DatePicker format='DD/MM/YYYY hh:mm:ss' showTime onChange={onChangeDate} onOk={onOk} />
					</Form.Item>
					<Form.Item label='Giá vé'>
						<InputNumber min={75000} max={200000} onChange={onChangeInputNumber} />
					</Form.Item>
					<Form.Item label='Tác vụ'>
						<Button htmlType='submit'>Tạo lịch chiếu</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
