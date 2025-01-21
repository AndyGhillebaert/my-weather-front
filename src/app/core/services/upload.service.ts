import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Media } from '../models/media';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly API_URL = `${environment.apiUrl}/api/upload`;

  constructor(private http: HttpClient) {}

  findAllUploads() {
    return this.http.get<Media[]>(this.API_URL);
  }

  uploadUserImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<Media>(`${this.API_URL}/image/user`, formData);
  }

  uploadMoodImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<Media>(`${this.API_URL}/image/mood`, formData);
  }

  uploadMoodSound(file: File) {
    const formData = new FormData();
    formData.append('sound', file);
    return this.http.post<Media>(`${this.API_URL}/sound/mood`, formData);
  }

  removeMedia(media: Media) {
    return this.http.delete<string>(`${this.API_URL}/${media._id}`);
  }
}
