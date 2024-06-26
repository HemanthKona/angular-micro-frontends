import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  modules: WritableSignal<any> = signal([]);
}
