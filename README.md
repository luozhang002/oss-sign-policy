# 使用说明

虽然 OSS 并未提供小程序的 sdk, 但是提供了通用的 API 接口, 而微信小程序的上传方法, 本质上是一个 POST 请求. 经过查阅 [OSS](https://help.aliyun.com/document_detail/31988.html?spm=a2c4g.11186623.2.2.W0gqKB#reference_smp_nsw_wdb) 和 [微信小程序的文档](https://developers.weixin.qq.com/miniprogram/dev/api/network-file.html), 采用后端计算参数传递给小程序的方式来实现上传,主要是计算policy和signature参数

### node后端使用
``` JavaScript

const mpHelper = new MpUploadOssHelper({
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    timeout: 1,     // 限制参数的有效时间(单位: 小时)
    maxSize: 10     // 限制上传文件大小(单位: Mb)
});

// 生成的参数
const params = mpHelper.createUploadParams();

```

### 获取policy

```javascript
params.policy即可
```

### 获取signature

```javascript
params.signature即可
```
  