import { inject, Injectable } from '@angular/core';
import {
  deleteObject,
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = inject(Storage);
  AddImagetoStorage = async (files: any) => {
    const file = files;
    const filePath = `img/${Date.now()}`;
    const pathReference = ref(this.storage, filePath);
    const uploadTask = await uploadBytes(pathReference, file);
    window.localStorage.setItem('pathReference', uploadTask.ref.fullPath);
    return await getDownloadURL(pathReference);
  };

  DeleteImgToStorage = async () => {
    const pathReference = window.localStorage.getItem('pathReference');
    const fileRef = ref(this.storage, pathReference!);
    return deleteObject(fileRef);
  };
  getRef(url: string) {
    return ref(this.storage, url);
  }
}
