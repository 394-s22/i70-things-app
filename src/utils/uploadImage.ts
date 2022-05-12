//@ts-ignore
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = (file: File): string => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${uuidv4()}`);
  const metadata = {
    contentType: "image/jpeg",
    public: true,
  };
  uploadBytes(storageRef, file, metadata).then((snapshot: any) => {
    console.log("Uploaded image!");
    getDownloadURL(storageRef).then((url) => {
      console.log(url);
      return url;
    });
  });
  return "";
};
