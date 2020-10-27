import { Directive ,  ElementRef,Input,forwardRef, HostListener, } from '@angular/core';
import {InjectionToken} from "@angular/core";

import {MAT_INPUT_VALUE_ACCESSOR} from '@angular/material';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Directive({
  selector: '[ktNumberOnly]',
})
export class NumberOnlyDirective {
  private _value: string | null;
  constructor(private el: ElementRef) {
    console.log("TEst")
    el.nativeElement.style.backgroundColor = 'yellow';
  }


  get value(): string | null {
  return this._value;
}

@Input('value')
set value(value: string | null) {
  this._value = value;
  this.formatValue(value);
}

private formatValue(value: string | null)
{
  console.log(value)
  if (value !== null) {
    this.el.nativeElement.value = "1000";
  } else {
    this.el.nativeElement.value = '';
  }
}

@HostListener('input', ['$event.target.value'])
  onInput(value) {
    // here we cut any non numerical symbols
    this._value = value.replace(/[^\d.-]/g, '');
  }

@HostListener('blur')
  _onBlur() {
    this.formatValue(this._value); // add commas
  }



}
