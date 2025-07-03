import * as fs from 'fs';
// import * as path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    // const uploadDir = path.resolve(process.cwd(), 'uploads');
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      try {
        fs.mkdirSync(uploadDir, { recursive: true });
      } catch {}
    }
    cb(null, uploadDir);
  },
  filename(_req, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export { storage };
