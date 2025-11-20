import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl;
  getNotices(): Observable<void> {
    return this.http.get<void>(this.apiUrl + '/notice');
  }
  saveNotices(data: any): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/notice', data);
  }
  deleteNotices(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/notice/${id}`)
  }
  updateNotices(id: string, data: any): Observable<void> {
    return this.http.put<void>(this.apiUrl + `/notice/${id}`, data)
  }
  getEvents(): Observable<void> {
    return this.http.get<void>(this.apiUrl + '/event')
  }
  saveEvents(data: any): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/event', data)
  }
  updateEvents(id: string, data: any): Observable<void> {
    return this.http.put<void>(this.apiUrl + `/event/${id}`, data)
  }
  deleteEvents(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/event/${id}`)
  }
  getGallery(): Observable<void> {
    return this.http.get<void>(this.apiUrl + '/gallery')
  }
  saveGallery(data: any): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/gallery', data)
  }
  updateGallery(id: string, data: any): Observable<void> {
    return this.http.put<void>(this.apiUrl + `/gallery/${id}`, data)
  }
  deleteGallery(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/gallery/${id}`)
  }
  getTeacher(): Observable<void> {
    return this.http.get<void>(this.apiUrl + '/teacher');
  }
  saveTeacher( data: any): Observable<void> {
    return this.http.post<void>(this.apiUrl + `/teacher`, data)
  }
  updateTeacher(id: string, data: any): Observable<void> {
    return this.http.put<void>(this.apiUrl + `/teacher/${id}`, data)
  }
   deleteTeacher(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/teacher/${id}`)
  }
  saveContact(data: any): Observable<void> {
    return this.http.post<void>(this.apiUrl + '/contact', data)
  }
  getContact(): Observable<void> {
    return this.http.get<void>(this.apiUrl + '/contact')
  }
  deleteContact(id: any): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/contact/${id}`)
  }
}
