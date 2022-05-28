import setCookie from '../utils/setCookie';

export default function deleteCookie(name) {
	setCookie(name, '', {
		'max-age': -1,
	});
}
