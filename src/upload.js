import multer from 'multer';
/*multer 
1.file에 req를 넣어주고 
2.이름짓고 
3.url할당하고 
4.고유한 이름을주고 
5.확장자를 정해준다.*/
const upload = multer({ dest: 'uploads/' });
export const uploadMiddleware = upload.single('file');

export const uploadController = (req, res) => {
  const {
    file: { path },
  } = req;

  res.json({ path });
};
