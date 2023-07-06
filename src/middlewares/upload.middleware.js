import multer from 'multer';


const getDestinationPath = (fileName) => {

};

const getDestinationFileName = (email, fileName, originalName) => {
  const ext = originalName.split('.').pop();
  const name = email.split('@')[0];
  const filename = `${name}-${fileName}.${ext}`;
  return filename;
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname.includes('profile')) {
        cb(null, './uploads/profiles');
      } else if (file.fieldname.includes('product')) {
        cb(null, './uploads/products');
      } else if (file.fieldname.includes('identity')) {
        cb(null, './uploads/documents/identity');
      } else if (file.fieldname.includes('addressProof')) {
        cb(null, './uploads/documents/addressProof');
      } else if (file.fieldname.includes('accountStatement')) {
        cb(null, './uploads/documents/accountStatement');
      }

    },
    filename: (req, file, cb) => {
      const destinationFileName = getDestinationFileName(req.session.user, file.fieldname, file.originalname);
      console.log(typeof(destinationFileName));
      cb(null, destinationFileName);
    }
  })
});

export default upload;