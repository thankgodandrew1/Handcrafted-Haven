import { BehaviorSubject } from 'rxjs';

const alertSubject = new BehaviorSubject(null);

export const alertService = {
    alert: alertSubject.asObservable(),
    success,
    error,
    clear
};

function success(message: string, showAfterRedirect = false) {
    alertSubject.next({
        type: 'alert-success',
        message,
        showAfterRedirect
    } as any);
}

function error(message: string, showAfterRedirect = false) {
    alertSubject.next({
        type: 'alert-danger',
        message,
        showAfterRedirect
    } as any);
}

// clear alerts
function clear() {
    // Use optional chaining to safely access properties
    //@ts-ignore
    const alert = alertSubject.value?.showAfterRedirect
    //@ts-ignore
        ? { ...alertSubject.value, showAfterRedirect: false }
        : alertSubject.value;

    // Update alertSubject with the modified or null alert
    alertSubject.next(alert);
}


