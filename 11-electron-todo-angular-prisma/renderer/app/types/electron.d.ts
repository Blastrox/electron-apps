// Re-export depuis shared/ — source de vérité unique
// Ce fichier évite les chemins relatifs profonds dans les composants Angular
export type { Todo, ElectronAPI } from '../../../../../shared/todo';

// Extension de Window — nécessaire pour que Angular reconnaisse window.api
declare global {
    interface Window {
        api: import('../../../../../shared/todo').ElectronAPI;
    }
}
