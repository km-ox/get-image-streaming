import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const twentyFiveMB = 25 * 1024 * 1024;
export const createString = (size = twentyFiveMB) => {
  return "x".repeat(size);
};

export const main = async () => {
  const str = createString();
  console.info("created placeholder large file");
  const buffer = Buffer.from(str, "utf8");

  const bucketName = process.env.BUCKET;
  console.info(`Bucket name: ${bucketName}`)
  const key = `${Date.now()}.txt`
  console.info(`Key: ${key}`)

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
