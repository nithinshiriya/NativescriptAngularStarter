
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector: "first",    
    template: `
    <StackLayout>
        <Label text="First component" class="title"></Label>
    </StackLayout>`
})
export class FirstComponent implements OnInit, OnDestroy {
    ngOnInit() {
        console.log("FirstComponent - ngOnInit()");
    }
    
    ngOnDestroy() {
        console.log("FirstComponent - ngOnDestroy()");
    }
}