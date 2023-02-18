import React, { useState } from 'react';
import { DatePicker, Form, Input, InputNumber, Switch } from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../../redux/actions/QuanLyPhimAction';
import { GROUPID } from '../../../../util/settings/config';
import dayjs from 'dayjs';

export default function AddNew() {
	const [imgSrc, setImgSrc] = useState('');
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			tenPhim: '',
			trailer: '',
			moTa: '',
			ngayKhoiChieu: '',
			dangChieu: false,
			sapChieu: false,
			hot: false,
			danhGia: 0,
			hinhAnh: {},
			maNhom: GROUPID,
		},
		onSubmit: values => {
			//tạo đối tượng form data
			let formData = new FormData();
			for (let key in values) {
				if (key !== 'hinhAnh') {
					formData.append(key, values[key]);
				} else {
					formData.append('File', values[key], values[key].name);
				}
			}

			dispatch(themPhimUploadHinhAction(formData));
		},
	});

	const handleChangeDatePicker = value => {
		const ngayKhoiChieu = dayjs(value).format('DD/MM/YYYY');
		formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
	};

	const handleChangeSwitch = name => {
		return value => {
			formik.setFieldValue(name, value);
		};
	};

	const handleChangeFile = e => {
		const file = e.target.files[0];
		if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif') {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = e => {
				setImgSrc(e.target.result);
			};
			formik.setFieldValue('hinhAnh', file);
		}
	};

	return (
		<Form onSubmitCapture={formik.handleSubmit} labelCol={{ span: 5 }} layout='horizontal' style={{ maxWidth: 600 }}>
			<h1 className='text-xl font-medium mb-5'>Thêm phim mới</h1>
			<Form.Item label='Tên phim'>
				<Input name='tenPhim' onChange={formik.handleChange} />
			</Form.Item>
			<Form.Item label='Trailer'>
				<Input name='trailer' onChange={formik.handleChange} />
			</Form.Item>
			<Form.Item label='Mô tả'>
				<Input name='moTa' onChange={formik.handleChange} />
			</Form.Item>
			<Form.Item label='Ngày khởi chiếu'>
				<DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
			</Form.Item>
			<Form.Item label='Đang chiếu' valuePropName='checked'>
				<Switch onChange={handleChangeSwitch('dangChieu')} />
			</Form.Item>
			<Form.Item label='Sắp chiếu' valuePropName='checked'>
				<Switch onChange={handleChangeSwitch('sapChieu')} />
			</Form.Item>
			<Form.Item label='Hot' valuePropName='checked'>
				<Switch onChange={handleChangeSwitch('hot')} />
			</Form.Item>
			<Form.Item label='Số sao'>
				<InputNumber min={1} max={10} onChange={handleChangeSwitch('danhGia')} />
			</Form.Item>

			<Form.Item label='Hình ảnh'>
				<input type='file' onChange={handleChangeFile} accept='image/png, image/jpeg, image/gif' />
				<img className='w-[200px] h-[200px] rounded mt-5 bg-gray-200' src={imgSrc} alt='loadingimg' />
			</Form.Item>

			<Form.Item label='Tác vụ'>
				<button className='px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-400 font-medium' type='submit'>
					Thêm phim
				</button>
			</Form.Item>
		</Form>
	);
}
