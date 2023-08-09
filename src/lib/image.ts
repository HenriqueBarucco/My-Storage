import { exec } from 'child_process';
import * as fs from 'fs';

export async function saveImage(base64String: string): Promise<string> {
    const imageBuffer = Buffer.from(base64String, 'base64');

    const tempFilePath = '/tmp/file.jpg';
    fs.writeFileSync(tempFilePath, imageBuffer);

    const curlCommand = `curl --location --request POST 'https://images.henriquebarucco.com.br' \
      --form 'file=@"${tempFilePath}"'`;

    return new Promise((resolve, reject) => {
        exec(curlCommand, (error, stdout) => {
            fs.unlinkSync(tempFilePath);

            if (error) {
                reject(new Error('Error uploading image: ' + error.message));
                return;
            }

            resolve(stdout);
        });
    });
}
