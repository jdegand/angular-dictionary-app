import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { PlayerComponent } from '../player/player.component';
import { MeaningComponent } from '../meaning/meaning.component';
import { SourceComponent } from '../source/source.component';

@Component({
  selector: 'app-word-details',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MeaningComponent, SourceComponent],
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.css', '../../styles.css'],
})
export class WordDetailsComponent {
  errorResponse: any;
  //word: any;
  word$: any;
  playing = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    /*
    this.route.queryParams
      .subscribe((params: any) => {
        // save the param value to a variable - optional
        // nest apiService call here 
        this.apiService.getWord(params.word).subscribe()
        // assign response of subscription to a variable and pass that to template  
      }
    );
    */

    this.word$ = this.route.queryParamMap.pipe(
      switchMap((params: any): any => {
        const query = params.get('word') ?? '';
        if (query) {
          this.errorResponse = undefined;
          return this.apiService.getWord(query).pipe(
            catchError((error) => {
              this.errorResponse = error;
              return of([]);
            })
          );
        }
        //return of([]);
      })
    );
  }

  findPhoneticText(parentList: any) {
    return parentList.filter((item: any) => item.text);
  }

  findAudio(parentList: any) {
    return parentList.filter((item: any) => item.audio);
  }

  isPlaying() {
    this.playing = !this.playing;
  }
}

/*
  const query: string = this.route.snapshot.queryParams['word'];
  console.log('query', query)
*/
