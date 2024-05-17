import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, Giphy } from '../interfaces/giphy';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList:Gif[]=[];

  private apiKey:string='JNCDdyRfvFD72OjhN3cXFkEV9F2RHzZR';
  private serviceUrl:string='https://api.giphy.com/v1/gifs/search';

  private _tagHistory:string[]=[];

  constructor(private http: HttpClient) {
    this.loadLocalstorage();
   }

  get tagsHistory(){
    return [...this._tagHistory];

  }

  private organizeHistory(tag:string){
    tag= tag.toLowerCase();
    if(this.tagsHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter(
        (oldTag) => oldTag !== tag
      );
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0,10);
    this.setLocalStorage();

  }
  private setLocalStorage():void{
      localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }

    private loadLocalstorage():void{
      if(localStorage.getItem('history')){
       this._tagHistory= JSON.parse(localStorage.getItem('history')!);
      }
      if(this._tagHistory.length>0){
        this.searchTag(this._tagHistory[0]);
      }
    }
   searchTag(tag:string):void{
    if(tag.length===0) {return;}
    this.organizeHistory(tag);

    const params= new HttpParams()
      .set('api_key',this.apiKey)
      .set('q',tag)
      .set('limit','10');


    this.http.get<Giphy>(`${this.serviceUrl}`,{params})
    .subscribe(resp  => {
      this.gifList=resp.data;
    })



  }

}
