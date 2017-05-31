/**
 * 注：区分RSA私钥的类型，有pkcs1和pkcs8。pkcs8格式的私钥主要用于Java中
 
 pkcs1格式：
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY------

 pkcs8格式：
-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----

 */
var RSA = require('../../utils/wx_rsa.js')
//获取应用实例
var app = getApp()
var Sig = ""
var encStr =""

Page({
  data: {
    output: '上方输入框输入数据后点击下方对应按钮转换',
    input:''

  },
  input_rsa:function(e){
    this.setData({
      input:e.detail.value
    })
    let v = e.detail.value
    console.log(v)
  },

  // 加签
  jiaqian: function () {
    console.log('加签RSA1:')
    var sign_rsa = new RSA.RSAKey();
    sign_rsa = RSA.KEYUTIL.getKey(privateKey);
    console.log('加签RSA:')
    console.log(sign_rsa)
    var hashAlg = 'sha1';
    Sig = sign_rsa.signString("signData", hashAlg);
    Sig = RSA.hex2b64(Sig); // hex 转 b64
    console.log("加签结果：" + Sig)
    this.setData({
      output: Sig
    })
  },

   // 验签
  yanqian: function () {
    var verify_rsa = new RSA.RSAKey();
    verify_rsa = RSA.KEYUTIL.getKey(publicKey);
    console.log('验签RSA:')
    console.log(verify_rsa)
    if (Sig == ""){
      wx.showToast({
        title: '请先验签',
        icon: 'loading',
        duration: 1000
      })
    }else{
      Sig = RSA.b64tohex(Sig)
      var ver = verify_rsa.verifyString("signData", Sig)
      console.log('验签结果：' + ver)
      this.setData({
        output: ver
      })
    }
  
  },

  //加密
  jiami: function () {
    var input_rsa = this.data.input;
    var encrypt_rsa = new RSA.RSAKey();
    encrypt_rsa = RSA.KEYUTIL.getKey(publicKey);
    console.log('加密RSA:')
    console.log(encrypt_rsa)
    encStr = encrypt_rsa.encrypt(input_rsa)
    encStr = RSA.hex2b64(encStr);
    console.log("加密结果：" + encStr)

    this.setData({
      output: encStr
    })
  },

  //解密
  jiemi: function () {
    var decrypt_rsa = new RSA.RSAKey();
    decrypt_rsa = RSA.KEYUTIL.getKey(privateKey);
    console.log('解密RSA:')
    console.log(decrypt_rsa)
    console.log(encStr+"00--00")
    if (encStr.length <=0){
      wx.showToast({
        title: '请先加密',
        icon: 'loading',
        duration: 1000
      })
    }else{
      
      encStr = RSA.b64tohex(encStr);
      console.log(encStr + "001--100")
      var decStr = decrypt_rsa.decrypt(encStr)
      console.log("解密结果：" + decStr)
      this.setData({
        output: decStr
      })
    }
   
  },

  onLoad: function () {
    console.log('onLoad')
   
  }
})
var privateKey = '-----BEGIN RSA PRIVATE KEY-----MIICXgIBAAKBgQCoChRDJ6e7BTE5yYBIS + NGYBpDs7ftEematqhvMmOFcJng7qjJk + yJ1j7DCqbCD2f / BI6gTfGXASiYuO6kklZu8Pkw4HAUkaaGyhaC8Z + TMg79PPRz5hziEdFXPTdXvXudiXbI2Wi6D90ZaSwN6ZHs7Mtc5VgGK3jxS35iLm+ oAQIDAQABAoGBAI + nHi9SxUdSZwS5yBsGFSNioNFj4Eag243RvShicUXwPvxVyqGY / cvQBhODFZAsz4Dpimxsda3b5bK51fmGyK / nXraHRunWcG7cDDB0EnRpGh4LvMI5Tny + kV0v07N0kkYF+ Lig88IjyBXMAY8m97QK / Huf6MsDFo7B6maSvlmBAkEA35GXk6achryGAoUyyLSro7bI9A9 + wXWFdXoqu1 / X1sZ8taGy7saB + XEA6EQ + XHRp7rZkQ5StoBL +reDGvLJLWQJBAMBqW / F + qg1VpmV / EfYTSS0 + jliw / Ik4kKHLuD / bYK61FG80JIoxLbelB / 1ZVZ8WR0cUKgrmoo8HOggjocNTNOkCQQCYibK86CHGAF0C3TSgIj01r2H+u4 / FmVScqeT8AVG31aeDGbeHGOPXeJWg4 + cUl80rNUDFp2yrWipwInwWhSPJAkAf+ 02u9Ru0vbC7nARTP19hWs10Jm7DLBi2G9NTIdaPE2ADH8qXAZeUt6R9UrTtjVlpkgtu5mjMlynpImsHuTPJAkEAoU10QspqfxL4F44KdHjHY1btc8wb4soaLy / eAY8PLE + jpNh8jsqA8v1EqLQbYz50D / BpkJsT5W + wydTvtEE3sA ==-----END RSA PRIVATE KEY-----'
var publicKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoChRDJ6e7BTE5yYBIS + NGYBpDs7ftEematqhvMmOFcJng7qjJk + yJ1j7DCqbCD2f / BI6gTfGXASiYuO6kklZu8Pkw4HAUkaaGyhaC8Z+ TMg79PPRz5hziEdFXPTdXvXudiXbI2Wi6D90ZaSwN6ZHs7Mtc5VgGK3jxS35iLm+ oAQIDAQAB-----END PUBLIC KEY-----'
