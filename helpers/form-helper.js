import datepicker from 'js-datepicker';

export function formatDateUSA(date) {
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
}

export function  formatDateISO(date) {
    date.setDate(date.getDate() + 1);
    let localISOTime = date.toISOString(false).slice(0, -1);

    return (localISOTime.substring(0, 10)).trim();
}
