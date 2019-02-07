import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {url} from '../_const/DataSource';
import {Tag} from '../_dto/model/Tag';


@Injectable({ providedIn: 'root' })
export class TagService {

  private url: string = url + '/tags';

  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<Tag[]>(this.url);
  }
}
