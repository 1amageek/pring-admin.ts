const path = require('path')

module.exports = {
    '@google-cloud/firestore': path.resolve(
        __dirname,
        'admin-firestore-replacement'
    ),
}
