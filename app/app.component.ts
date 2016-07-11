import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterConfig, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { NS_ROUTER_DIRECTIVES, nsProvideRouter} from "nativescript-angular/router"
import {Http, Headers, Response, RequestMethod  } from "@angular/http";
import {Observable} from "rxjs";

@Component({
    selector: "first",    
    template: `
    <StackLayout>
        <Label text="First component" class="title"></Label>
    </StackLayout>`
})
class FirstComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log("FirstComponent - ngOnInit()");
    }
    
    ngOnDestroy() {
        console.log("FirstComponent - ngOnDestroy()");
    }
}

@Component({
    selector: "second",    
    template: `
    <StackLayout>
        <Label [text]="'Second component: ' + (id | async)" class="title"></Label>
    </StackLayout>`
})
class SecondComponent implements OnInit, OnDestroy {
    id;
    constructor(route: ActivatedRoute) {
        this.id = route.params.map(r => r["id"]);
    }

    ngOnInit() {
        console.log("SecondComponent - ngOnInit()");
    }

    ngOnDestroy() {
        console.log("SecondComponent - ngOnDestroy()");
    }
}

@Component({
    selector: 'navigation-test',
    directives: [ROUTER_DIRECTIVES, NS_ROUTER_DIRECTIVES],    
    template: `
        <StackLayout>
            <StackLayout class="nav">
                <Button text="HTTP POST" (tap)="vote()"></Button>
                <Button text="First" nsRouterLink="/"></Button>
                <Button text="Second(1)" nsRouterLink="/second/1"></Button>
                <Button text="Second(2)" [nsRouterLink]="['/second', '2' ]"></Button>
            </StackLayout>            
            <page-router-outlet></page-router-outlet>
        </StackLayout>
    `
})
export class RouterOutletAppComponent {

    constructor(private _http: Http){}

    vote(){
       var headers: Headers;
       headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
    //    headers.append("Accept" , "text/plain")           

        var url =  "http://servicetest.picpollapp.com/PollService.svc/rest/TestPost?PollID=1008&OptionID=3469"              

        this._http.request(url, {headers: headers, method: RequestMethod.Post })        
        .map((res) => res.totalBytes)
        .catch(this.handleError)
        .subscribe(
            (data) => console.log("Sucess: " + data),
            (Error) => console.log("Error: " + Error),
            () => console.log("done")                        
        )  
    }

    handleError(error: Response) {
        return Observable.throw(error.json() || 'Server error');
    }

}


const routes: RouterConfig = [
    { path: "", component: FirstComponent},
    { path: "second/:id", component: SecondComponent },
];

export const RouterOutletRouterProviders = [
    nsProvideRouter(routes, { enableTracing: false })
];
