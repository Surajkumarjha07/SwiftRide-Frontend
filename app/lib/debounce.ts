
function debounce(fn: (...args: any[]) => Promise<void>, delay: number) {
    let timerId: any = 0;

    return function (...args: any[]) {
        clearTimeout(timerId);
        
        timerId = setTimeout(() => {
            fn(...args);
        }, delay);
    }

}

export default debounce;