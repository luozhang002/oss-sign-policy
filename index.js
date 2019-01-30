const crypto = require('crypto');

class MpUploadOssHelper {
    
    constructor(options) {
        this.accessKeyId = options.accessKeyId;
        this.accessKeySecret = options.accessKeySecret;
        this.timeOut = options.timeout || 1;
        this.maxSize = options.maxSize || 10;
    }

    createUploadParams() {
        const policy = this.getPolicyBase64();
        const signature = this.signature(policy);
        const objectKey =  Date.now().toString();
        return {
            policy: policy,
            signature: signature
        }
    }

    getPolicyBase64() {
        let date = new Date();
        // 设置 policy 过期时间
        date.setHours(date.getHours() + this.timeOut);
        let srcT = date.toISOString();
        const policyText = {
            expiration: srcT,
            conditions: [
                // 限制上传大小
                ['content-length-range', 0, this.maxSize * 1024 * 1024]
            ]
        };
        const buffer = new Buffer(JSON.stringify(policyText));
        return buffer.toString('base64');
    }
    
    signature(policy) {
        return crypto.createHmac('sha1', this.accessKeySecret).update(policy).digest().toString('base64');
    }
}

module.exports = MpUploadOssHelper;