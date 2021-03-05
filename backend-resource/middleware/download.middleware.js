import s3 from './../util/s3';

exports.download = (req, res) => {
  const s3Client = s3;
  const params = {
    Bucket: req.params.bucket,
    Key: req.params.key,
  };

  s3Client
    .getObject(params)
    .createReadStream()
    .on('error', function (err) {
      res.status(500).json({ error: 'Error -> ' + err });
    })
    .pipe(res);
};
