import { Toast } from 'vant';
export function loading() {
    Toast.loading({
        message: 'loading...',
        forbidClick: true,
        duration:0
    });
}

export function success() {
    Toast.clear()
    Toast.success({
        message: 'success',
        forbidClick: true,
        duration:500
    });
}

export function fail() {
    Toast.clear()
    Toast.fail({
        message: 'fail',
        forbidClick: true,
        duration:500
    });
}