import axios from 'axios';
import FormData from 'form-data';

export async function saveImage(file: any): Promise<any> {
    const formData = new FormData();
    formData.append('file', file, 'teste.png');

    try {
        var config = {
            method: 'post',
            url: 'https://images.henriquebarucco.com.br',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        };

        const response = await axios(config);

        return response.data;
    } catch (error: any) {
        throw new Error('Error uploading image: ' + error.message);
    }
}
