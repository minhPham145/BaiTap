import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, InputNumber, Switch } from 'antd';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../util/settings/config';

export default function Edit(props) {
	const [imgSrc, setImgSrc] = useState('');

	const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
	console.log('thongTinPhim: ', thongTinPhim);
	const dispatch = useDispatch();
	const { id } = props.match.params;
	useEffect(() => {
		dispatch(layThongTinPhimAction(id));
	}, []);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			maPhim: thongTinPhim.maPhim,
			tenPhim: thongTinPhim.tenPhim,
			trailer: thongTinPhim.trailer,
			moTa: thongTinPhim.moTa,
			ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
			dangChieu: thongTinPhim.dangChieu,
			sapChieu: thongTinPhim.sapChieu,
			hot: thongTinPhim.hot,
			danhGia: thongTinPhim.danhGia,
			hinhAnh: null,
			maNhom: GROUPID,
		},
		onSubmit: values => {
			console.log('value: ', values);

			//tạo đối tượng form data
			let formData = new FormData();
			for (let key in values) {
				if (key !== 'hinhAnh') {
					formData.append(key, values[key]);
				} else {
					if (values.hinhAnh !== null) {
						formData.append('File', values[key], values[key].name);
					}
				}
			}

			dispatch(capNhatPhimUploadAction(formData));
		},
	});

	const handleChangeDatePicker = value => {
		const ngayKhoiChieu = dayjs(value);

		formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
	};

	const handleChangeSwitch = name => {
		return value => {
			formik.setFieldValue(name, value);
		};
	};

	const handleChangeFile = async e => {
		const file = e.target.files[0];
		if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif') {
			await formik.setFieldValue('hinhAnh', file);

			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = e => {
				setImgSrc(e.target.result);
			};
		}
	};

	return (
		<Form onSubmitCapture={formik.handleSubmit} labelCol={{ span: 5 }} layout='horizontal' style={{ maxWidth: 600 }}>
			<h1 className='text-xl font-medium mb-5'>Cập nhật thông tin phim</h1>
			<Form.Item label='Tên phim'>
				<Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
			</Form.Item>
			<Form.Item label='Trailer'>
				<Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
			</Form.Item>
			<Form.Item label='Mô tả'>
				<Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
			</Form.Item>
			<Form.Item label='Ngày khởi chiếu'>
				<DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} value={dayjs(formik.values.ngayKhoiChieu)} />
			</Form.Item>
			<Form.Item label='Đang chiếu' valuePropName='checked'>
				<Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
			</Form.Item>
			<Form.Item label='Sắp chiếu' valuePropName='checked'>
				<Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
			</Form.Item>
			<Form.Item label='Hot' valuePropName='checked'>
				<Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
			</Form.Item>
			<Form.Item label='Số sao'>
				<InputNumber min={1} max={10} onChange={handleChangeSwitch('danhGia')} value={formik.values.danhGia} />
			</Form.Item>

			<Form.Item label='Hình ảnh'>
				<input type='file' onChange={handleChangeFile} accept='image/png, image/jpeg, image/gif' />
				<img className='w-[200px] h-[200px] rounded mt-5 bg-gray-200' src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt='loadingimg' />
			</Form.Item>

			<Form.Item label='Tác vụ'>
				<button className='px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-400 font-medium' type='submit'>
					Cập nhật
				</button>
			</Form.Item>
		</Form>
	);
}
