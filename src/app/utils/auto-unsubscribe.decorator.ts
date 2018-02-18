// based on https://github.com/NetanelBasal/ngx-auto-unsubscribe/
import {Subscription} from 'rxjs/Subscription';

export default function autoUnsubscribe(constructor: Function): void {
  const original: Function = constructor.prototype.ngOnDestroy;
  const originalExists = typeof original !== 'function';

  // the aot build would not call ngOnDestroy if it's not visible for the builder itself
  if (originalExists) {
    console.warn(`${constructor.name} is using @AutoUnsubscribe but does not implement OnDestroy`);
  }

  constructor.prototype.ngOnDestroy = function () {
    Object.keys(this)
      .filter(key => this[key] instanceof Subscription)
      .forEach(sub => this[sub].unsubscribe());

    if (originalExists) {
      original.apply(this, arguments);
    }
  };
}
