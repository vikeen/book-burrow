/**
 * Amazon Configuration
 *
 * These settings are for any configuration related to amazon
 *
 */

module.exports = {
    aws: {
        s3: {
            accessKeyId: process.env.BOOK_BURROW_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.BOOK_BURROW_AWS_SECRET_ACCESS_KEY,
            region: process.env.BOOK_BURROW_AWS_REGION,
            apiVersion: process.env.BOOK_BURROW_API_VERSION
        }
    }
};
