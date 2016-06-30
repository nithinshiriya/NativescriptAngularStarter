import { Component, OnInit, OnDestroy } from "@angular/core";
import { RouterConfig, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { NS_ROUTER_DIRECTIVES, nsProvideRouter} from "nativescript-angular/router"

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
                <Button text="First" nsRouterLink="/"></Button>
                <Button text="Second(1)" nsRouterLink="/second/1"></Button>
                <Button text="Second(2)" [nsRouterLink]="['/second', '2' ]"></Button>
            </StackLayout>            
            <page-router-outlet></page-router-outlet>
        </StackLayout>
    `
})
export class RouterOutletAppComponent {
}


const routes: RouterConfig = [
    { path: "", component: FirstComponent},
    { path: "second/:id", component: SecondComponent },
];

export const RouterOutletRouterProviders = [
    nsProvideRouter(routes, { enableTracing: false })
];
