import {Url} from "./urlModel.entity";
import {HTTP400Error, HTTP404Error} from "../../utils/httpErrors";
import crypto from 'crypto'


const _shortenUrl = ( url: string): string => {
    const hash = crypto.createHash("sha256");
    hash.update(url);
    const hashDigest = hash.digest("hex");
    return hashDigest.slice(0, 8);
}

export const registerUrl = async (url: string): Promise<string> => {
    const urls = await Url.findBy({url: url});
    if (urls.length) throw new HTTP400Error("url already exist");

    const urlEntity = new Url();
    urlEntity.url = url;
    let isUrlExist = false;
    let shortUrl = "";
    while (!isUrlExist) {
        urlEntity.shortUrl = _shortenUrl(urlEntity.url);
         const urlIfExist =  await Url.findOne({where: { shortUrl}});
        if (!urlIfExist) isUrlExist = true;
    }

    await urlEntity.save()
    return urlEntity.shortUrl;
}

export const getFullUrl = async (url: string  ): Promise<string> => {
    const urlEntity = await Url.find({where: { shortUrl: url}});

    if (!urlEntity.length) throw new HTTP404Error("no such url exist in db");

    return urlEntity[0].url;
}

