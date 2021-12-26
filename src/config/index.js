const configDefault = {
  development: {
    campaignId: 0,
    appName: 'Mystery Box - RADA.network',
    appUrl: 'http://localhost:3000',
    configUrl:
      'https://s3.ap-southeast-1.amazonaws.com/config.mixed.finance/network_3434ffsdf.json',
  },
  production: {
    campaignId: 0,
    appName: 'Mystery Box - RADA.network',
    appUrl: 'https://box.1alo.com',
    configUrl:
      'https://s3.ap-southeast-1.amazonaws.com/config.mixed.finance/network_jjjdk.json',
  },
}
const config = {
  ...configDefault[process.env.NODE_ENV],
  // ...configDefault['development'],
  version: '0.0.2',
}
export default config
