import axiosResource from './axios.resource';

export class ArObjectService {
	static createArObject = async formData => {
		try {
			const result = await axiosResource.post('/arobject', formData, {
				enctype: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
	static readArObject = async objectId => {
		try {
			const result = await axiosResource.get(`/arobject/${objectId}`);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
	static readArObjects = async () => {
		try {
			const result = await axiosResource.get(`/arobject`);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
	static updateArObject = async arObject => {
		try {
			const { name, category, s3Info, content, modifiedManager } = arObject;
			const modified = new Date();

			const result = await axiosResource.patch(
				`/arobject/${arObject.objectId}`,
				{
					name,
					category,
					s3Info,
					modifiedManager,
					modified,
					content,
				},
			);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
	static deleteArObject = async objectId => {
		try {
			const result = await axiosResource.delete(`/arobject/${objectId}`);
			return result.data.result;
		} catch (err) {
			return err;
		}
	};

	static downloadArObject = async (bucket, key) => {
		try {
			await axiosResource({
				url: `/arobject/${bucket}/${key}`,
				method: 'GET',
				responseType: 'blob',
			}).then(response => {
				var fileURL = window.URL.createObjectURL(new Blob([response.data]));
				var fileLink = document.createElement('a');

				fileLink.href = fileURL;
				fileLink.setAttribute('download', key);
				document.body.appendChild(fileLink);

				fileLink.click();
			});
		} catch (err) {
			return err;
		}
	};
}
