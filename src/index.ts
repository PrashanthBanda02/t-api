import { Storage } from '@google-cloud/storage';
import { Strapi } from '@strapi/strapi';

interface ProviderOptions {
  projectId: string;
  keyFilename: string;
  bucketName: string;
}

const init = ({ strapi }: { strapi: Strapi }) => {
  const config = strapi.config.get('plugin.upload.providerOptions') as ProviderOptions;

  const storage = new Storage({
    projectId: config.projectId,
    keyFilename: config.keyFilename,
  });

  const bucket = storage.bucket(config.bucketName);

  return {
    async upload(file: any) {
      return new Promise<void>((resolve, reject) => {
        const blob = bucket.file(file.hash + file.ext);
        const blobStream = blob.createWriteStream({
          resumable: false,
          contentType: file.mime,
        });

        blobStream.on('error', (err) => reject(err));
        blobStream.on('finish', () => {
          file.url = `https://storage.googleapis.com/${config.bucketName}/${file.hash}${file.ext}`;
          resolve();
        });

        blobStream.end(file.buffer);
      });
    },
    async delete(file: any) {
      return new Promise<void>((resolve, reject) => {
        const blob = bucket.file(file.hash + file.ext);
        blob.delete((err: any) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    },
  };
};

export default {
  init,
};
