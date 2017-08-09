import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HeroSearchService } from '../services/hero-search.service';
import { Hero } from '../models/hero';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

    heroes: Observable<Hero[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private heroSearchService: HeroSearchService,
        private router: Router) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.heroes = this.searchTerms
        .debounceTime(300)        // wait for 300ms pause in events
        .distinctUntilChanged()   // ignore if next search term is same as previous
        .switchMap(term => term   // switch to new observable each time
            ? this.heroSearchService.search(term)
            : Observable.of<Hero[]>([]))
        .catch(error => {
            console.log(error);
            return Observable.of<Hero[]>([]);
        });
    }

    goToDetail(hero: Hero): void {
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}