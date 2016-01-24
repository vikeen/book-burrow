/**
 * Facebook Configuration
 *
 * These settings are for any configuration related to Facebook
 *
 */

module.exports = {
    facebook: {
        oauth: {
            url: 'https://www.facebook.com/dialog/oauth',
            appId: process.env.BOOK_BURROW_FACEBOOK_APP_ID,
            appSecret: process.env.BOOK_BURROW_FACEBOOK_APP_SECRET,
            redirectPath: '/auth/social/facebook'
        }
    }
};
