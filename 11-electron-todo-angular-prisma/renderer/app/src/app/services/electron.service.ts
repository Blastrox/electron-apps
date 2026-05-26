import { Injectable } from '@angular/core';
import { ElectronAPI } from '../../../types/electron';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  isElectron(): boolean {
    return !!window.api;
  }

  getApi(): ElectronAPI {
    if (!this.isElectron()) {
      throw new Error('Not running in Electron environment');
    }
    return window.api;
  }
}
