import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendSegnerService {
  SERVER_URL = '/api/v1/documents/dd4919cf-cf05-4d3c-8c7e-759e17de4135/upload?tokenAPI=live_e3fd7b803cae4546cf4d1395ccca277ea2daa025910425818fd79f6c6c3caac6&cryptKey=live_crypt_wCpPa3DDNgR7vBnh8yWsgwvZdD9ZO5nD';

  constructor(private httpClient: HttpClient) { }
  //Upload de arquivo para api
  public upload(formData) {
        return this.httpClient.post<any>(this.SERVER_URL, formData, {
          reportProgress: true,
          observe: 'events'
        });
    }

    //https://www.ahmedbouchefra.com/angular-tutorial-example-upload-files-with-formdata-httpclient-rxjs-and-material-progressbar/
}
