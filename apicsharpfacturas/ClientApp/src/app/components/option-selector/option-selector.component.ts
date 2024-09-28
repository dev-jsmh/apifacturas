import { Component, Input, Output } from '@angular/core';
import { ProductEntity } from 'src/app/models/ProductEntity';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-option-selector',
  templateUrl: './option-selector.component.html',
  styleUrl: './option-selector.component.css'
})
export class OptionSelectorComponent {

  @Input()
  list: ProductEntity[] = [];

  @Output()
  onProductSelection = new EventEmitter();
  // reset the selector value to empty string
  reset = "";

  // extract a product from the list
  getProduct(event: any) {
    const { value } = event.target
    // print value of the selected option on console
    console.log(value);
    // filter the product array
    this.list.filter((el) => {
      if (el.id == value) {
        console.log(el);
        // emit an event with the product object
        this.onProductSelection.emit(el);
        return el;
      } else {
        return undefined;
      }
    }
    );
  }


}
