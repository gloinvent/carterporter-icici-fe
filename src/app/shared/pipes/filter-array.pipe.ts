import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterArr"
})
@Injectable()
export class FilterArrayPipe implements PipeTransform {
  transform(array: any[], value): any {
    console.log("pipe", array, value);
    if (!value) {
      return array;
    }
    return array.filter(item => {
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const element = item[key];
          if (
            String(element)
              .toLowerCase()
              .includes(value)
          ) {
            return true;
          }
        }
      }
      return false;
    });
  }
}
