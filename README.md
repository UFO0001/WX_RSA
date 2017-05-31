效果演示：http://blog.csdn.NET/ufo00001/article/details/72822907

Github链接：https://github.com/UFO0001/WX_RSA

简要说明：

1. 将 wx_rsa.js文件copy到自己想放置的目录下，并在需要用到的js文件中引用 如：

var RSA = require('../../utils/wx_rsa.js')  
2. 在对应的触发事件下进行相应的
加密：
var input_rsa = this.data.input;  
    var encrypt_rsa = new RSA.RSAKey();  
    encrypt_rsa = RSA.KEYUTIL.getKey(publicKey);  
    encStr = encrypt_rsa.encrypt(input_rsa)  
    encStr = RSA.hex2b64(encStr);  
    console.log("加密结果：" + encStr)  
解密：
var decrypt_rsa = new RSA.RSAKey();  
   decrypt_rsa = RSA.KEYUTIL.getKey(privateKey);  
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
加签：
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
验签：
var verify_rsa = new RSA.RSAKey();  
   verify_rsa = RSA.KEYUTIL.getKey(publicKey);  
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
       output: Sig  
     })  
   }  
3. 注意区分RSA私钥的类型，分为pkcs1和pkcs8， pkcs8格式的私钥主要用于Java中

 pkcs1格式：
-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY------

 pkcs8格式：
-----BEGIN PRIVATE KEY-----
-----END PRIVATE KEY-----

4. 附一个在线生成RSA密钥的链接：http://www.bm8.com.cn/webtool/rsa/

5. 加密、签名 简介
数据加密：用公钥加密，只有用私钥解开，因为私钥只有你自己有，所以他保证了数据不能被别人看到
数据签名：用私钥加密，只能用公钥解密，任何人都可以用公钥验证。因为私钥只有你自己有，所以它可以保证数据只能是你发出的，不可能有别人发出，除非你得私钥丢失或被第三方破解出来。

签名起不到加密作用，但可以确定是谁发出的信息
使用公钥加密算法，可以对明文进行加密，但不能确定是谁发出该消息


欢迎留言交流指正 谢谢！：）http://blog.csdn.NET/ufo00001/article/details/72822907
