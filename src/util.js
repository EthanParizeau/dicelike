export const DebugLog = {
    log(str) {
        console.log(str);
    },

    info(str) {
        console.info(`%c-- ${str} --`, 'color: lightgreen');
    },

    warn(str) {
        console.warn(str);
    },

    error(str) {
        console.error(str);
    }
}
