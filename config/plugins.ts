export default {
    upload: {
      config: {
        provider: '../src/plugins/strapi-provider-upload-gcs',
        providerOptions: {
          projectId: 'glassy-tube-418713',
          keyFilename: './serviceAccount.json',
          bucketName: 't-api',
        },
      },
    },
  };
  