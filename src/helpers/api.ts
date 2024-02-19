import axios from 'axios';
import { checkToken } from './auth';
import { toastError } from './toast-messages';

export async function getData (url: string) {
  const token = localStorage.getItem('token');
	const response: any = {}
  
  response['user'] = await checkToken(token)

	try {
		const { data } = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

    response['data'] = data;
		return response;
	} catch (error: any) {
		const messages = error.response.data.message;

		if (Array.isArray(messages)) {
			for (let message of messages) {
				toastError(message);
			}
		} else {
			toastError(messages);
		}
	}
}