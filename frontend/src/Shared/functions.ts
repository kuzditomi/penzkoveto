export const hasValue = (item: Loading) => {
    return item !== 'loading' && item !== undefined;
}

export const isMobileApp = () => {
    // TODO: remove extra negation
    return !(window as any).cordova;
}