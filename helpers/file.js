export function getFileFromURL(url, filename) {
    return fetch(url)
        .then(res => res.blob())
        .then(blob => {
            return new File([blob], filename,{ type: 'image/png' })
        })
}
