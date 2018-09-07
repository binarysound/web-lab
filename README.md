# Not A Bean

## 개발
Node 8 이상이 필요합니다.
다음 명령으로 서버를 실행할 수 있습니다.
```bash
yarn run watch-server  # 서버 빌드
yarn run start-dev     # 서버 실행
```

## 배포
[Heroku CLI를 설치](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)하셔야 합니다.
이후에는 다음과 같이 간단히 배포할 수 있습니다.
```bash
heroku login
git push heroku master
```
