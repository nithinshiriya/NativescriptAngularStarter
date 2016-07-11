import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterConfig, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { NS_ROUTER_DIRECTIVES, nsProvideRouter} from "nativescript-angular/router"
import {Http, Headers, Response, } from "@angular/http";
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
       headers.append('Content-Type', 'text/plain');
       var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoidXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjEwNDQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9hdXRoZW50aWNhdGlvbiI6ImV2ZXJ2YXN0X2Z1bGwiLCJpc3MiOiJFdmVydmFzdC4xMjNNZUFwcCIsImF1ZCI6Imh0dHA6Ly93d3cuMTIzbWVhcHAuY29tIiwiZXhwIjoxNjI1NjY4ODUxLCJuYmYiOjE0Njc5MDI0NTF9.IWnvqyk-nYtCehsJI9IeY82PofFsHNWG3FtMVhjSaXI";      
       headers.append('Tocken', token);           

        var url =  "http://service.picpollapp.com/PollService.svc/rest/AddPollAnswer?PollID=1008&OptionID=3469"              

        this._http.post(url, null, {headers:  headers})        
        .map((res) => res.json())
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
