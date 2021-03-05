import axiosResource from './axios.resource';

export class BoardService {
	static createPost = async post => {
		try {
			const result = await axiosResource.post('/board', {
				title: post.title,
				content: post.content,
				url: post.url,
				author: 'hschoi1104',
			});
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
	static readPost = async _id => {
		try {
			const result = await axiosResource.get(`/board/${_id}`);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
	static updatePost = async post => {
		try {
			const result = await axiosResource.patch(`/board/${post._id}`, post);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
	static deletePost = async _id => {
		try {
			const result = await axiosResource.delete(`/board/${_id}`);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
}
