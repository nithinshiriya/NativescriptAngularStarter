import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute  } from '@angular/router';

@Component({
    selector: "second",
    template: `
    <StackLayout>
        <Label [text]="'Second component: ' + (id | async)" class="title"></Label>
    </StackLayout>`
})
export class SecondComponent implements OnInit, OnDestroy {
    id;
    constructor(route: ActivatedRoute) {
        //this.id = route.params.map(r => r["id"]);
    }

    ngOnInit() {
        console.log("SecondComponent - ngOnInit()");
    }

    ngOnDestroy() {
        console.log("SecondComponent - ngOnDestroy()");
    }
}