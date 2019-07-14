export const hasValue = (item: Loading) => {
    return item !== 'loading' && item !== undefined;
}

export const isMobileApp = () => {
    return window.hasOwnProperty('cordova');
}