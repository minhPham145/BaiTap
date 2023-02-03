import axios from 'axios';
import { DOMAIN, TOKEN } from '../util/settings/config';

export class BaseService {
	put = (url, model) => {
		return axios({
			url: `${DOMAIN}/${url}`,
			method: 'PUT',
			headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
			data: model,
		});
	};

	post = (url, model) => {
		return axios({
			url: `${DOMAIN}/${url}`,
			method: 'POST',
			headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
			data: model,
		});
	};

	get = url => {
		return axios({
			url: `${DOMAIN}/${url}`,
			method: 'GET',
			headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
		});
	};

	delete = url => {
		return axios({
			url: `${DOMAIN}/${url}`,
			method: 'DELETE',
			headers: { Authorization: 'Bearer ' + localStorage.getItem(TOKEN) },
		});
	};
}
