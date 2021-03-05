import s3 from './../util/s3';
import multer from 'multer';
import multerS3 from 'multer-s3';

const upload = multer(
  {
    storage: multerS3({
      s3: s3,
      bucket: 'cms-s3',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // 이름 설정
      },
    }),
  },
  'NONE'
);
module.exports = upload;
