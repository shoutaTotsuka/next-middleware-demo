This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## 動作確認  
- ブラックリストに存在するIPからのアクセスは401  
[next-middleware-demo.vercel.app](https://next-middleware-demo.vercel.app)  

- 本番環境では`/api/*`への過剰なアクセスに対して429  
[next-middleware-demo.vercel.app](https://next-middleware-demo.vercel.app)  

- 開発環境では全てのアクセスに対してBasic認証を要求  
[next-middleware-demo-git-develop-shoutatotsuka.vercel.app](https://next-middleware-demo-git-develop-shoutatotsuka.vercel.app)

## Basic認証
- VecelのSettingタブのEnvironment Variablesでユーザー名とパスワードを指定  

| key | value  |
| :--- | :--- |
| `BASIC_AUTH_USER` | user |
| `BASIC_AUTH_PASS` | pass |

## IP制限
- VecelのStorageタブからEdge Configを追加後IPアドレスの配列を作る  
```
{
  "BLACK_LIST": [
    "xxx.xxx.xxx.xxx"
  ],
  "WHITE_LIST": [
    "xxx.xxx.xxx.xxx"
  ]
}
```

## Rate Limit
- VecelのStorageタブでKVを追加  
- `@vercel/kv`と`@upstash/ratelimit`を利用  
- `middleware.ts`で任意の閾値を指定する  
```
// 同一IPから10秒間で5回以上のリクエストがあった場合にトラフィックを制限
const ratelimit: Ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '10 s'),
});
```
