import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fetch from 'node-fetch';

export const main = async (event) => {

  const rs_image_url = event.rs_image_url
  console.info(`To obtain and upload the image from ${rs_image_url}`)
  const response = await fetch(rs_image_url);
  const buffer = await response.buffer()

  const bucketName = process.env.BUCKET;
  const key = `${Date.now()}.jpg`

  try {
    const upload = new Upload({
      client: new S3Client({}),
      params: {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
      },
    });

    await upload.done();
    return `uploaded file ${key} to ${bucketName}`
  } catch (caught) {
    if (caught instanceof Error && caught.name === "AbortError") {
      console.error(`Multipart upload was aborted. ${caught.message}`);
    } else {
      throw caught;
    }
  }
};
