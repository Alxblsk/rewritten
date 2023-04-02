import get from 'lodash/get'

export function getBlogPostHero(postSource) {
    console.log('postSource', postSource)
    const imageProps = get(postSource, 'image.childImageSharp.fixed', null);
    return imageProps || {
        src: null,
        width: 0,
        height: 0
    };
}

export function getBlogPostUrl(siteUrl, { date, slug }) {
    const isoDate = new Date(date);
    const year = isoDate.getFullYear();
    const month = `${(isoDate.getMonth() + 1)}`.padStart(2, '0');
    const day = `${isoDate.getDate()}`.padStart(2, '0');

    return `${siteUrl}/${year}/${month}/${day}/${slug}/`;
}

export function getBlogPostDate(postSource) {
    return new Date(postSource.date).toLocaleDateString('be', { year: 'numeric', month: 'long', day: 'numeric' });
}