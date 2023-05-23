import { latinize } from 't13n';

export const latinizeTag = function(tag) {
    return latinize(tag, { safeOnly: true, language: "be", style: "lacinka" });
}