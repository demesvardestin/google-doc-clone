module.exports = {
    devServer: {
        disableHostCheck: true
    },

    pluginOptions: {
      s3Deploy: {
        registry: undefined,
        awsProfile: 'default',
        region: 'us-east-2',
        bucket: 'gdoc-clone',
        createBucket: true,
        staticHosting: true,
        staticIndexPage: 'index.html',
        staticErrorPage: 'index.html',
        assetPath: 'dist',
        assetMatch: '**',
        deployPath: '/',
        acl: 'public-read',
        pwa: true,
        pwaFiles: 'service-worker.js',
        enableCloudfront: false,
        uploadConcurrency: 5,
        pluginVersion: '3.0.0'
      }
    }
};
