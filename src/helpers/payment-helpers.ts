import crypto from 'crypto'

const HASHKEY = process.env.HASHKEY as string
const HASHIV = process.env.HASHIV as string
const MerchantID = process.env.MerchantID as String
const Version = process.env.Version as string
const ReturnUrl = process.env.ReturnUrl as string
const NotifyUrl = process.env.NotifyUrl as string
const RespondType = 'JSON';

export function createSesEncrypt(TradeInfo: any) {
  const encrypt = crypto.createCipheriv('aes-256-cbc', HASHKEY, HASHIV);
  const enc = encrypt.update(genDataChain(TradeInfo), 'utf8', 'hex');
  return enc + encrypt.final('hex');
}

// 對應文件 P18：使用 sha256 加密
// $hashs="HashKey=".$key."&".$edata1."&HashIV=".$iv;
export function createShaEncrypt(aesEncrypt: any) {
  const sha = crypto.createHash('sha256');
  const plainText = `HashKey=${HASHKEY}&${aesEncrypt}&HashIV=${HASHIV}`;

  return sha.update(plainText).digest('hex').toUpperCase();
}

export function createSesDecrypt(TradeInfo: any) {
  const decrypt = crypto.createDecipheriv('aes256', HASHKEY, HASHIV);
  decrypt.setAutoPadding(false);
  const text = decrypt.update(TradeInfo, 'hex', 'utf8');
  const plainText = text + decrypt.final('utf8');
  const result = plainText.replace(/[\x00-\x20]+/g, '');
  return JSON.parse(result);
}

export function genDataChain(order: any) {
  return `MerchantID=${MerchantID}&TimeStamp=${order.TimeStamp
    }&Version=${Version}&RespondType=${RespondType}&MerchantOrderNo=${order.MerchantOrderNo
    }&Amt=${order.Amt}&CREDIT=${order.CREDIT}&WEBATM=${order.WEBATM}&NotifyURL=${encodeURIComponent(
      NotifyUrl,
    )}&ReturnURL=${encodeURIComponent(ReturnUrl)}&ItemDesc=${encodeURIComponent(
      order.ItemDesc,
    )}&Email=${encodeURIComponent(order.email)}`;
}