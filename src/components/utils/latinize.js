import { latinize } from 't13n';

export const latinizeTag = function(tag) {
    console.log('latinize:', tag, latinize(tag, { safeOnly: true }));
    return latinize(tag, { safeOnly: true });
}