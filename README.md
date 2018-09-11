# web-lab
각종 웹 서비스의 빠른 프로토타이핑을 위한 저장소입니다.

## 개발
Node 8 이상이 필요합니다.
다음 명령으로 서버를 실행할 수 있습니다.
```bash
yarn run dev  # 서버 & 클라이언트 watch 및 실행
```

## 배포
### 자동 배포
Heroku의 GitHub 연동 덕분에, `master` 브랜치에 업데이트가 발생하면 자동으로 배포되도록 되어 있습니다.

### 수동 배포
수동 배포를 하고 싶다면 [Heroku CLI를 설치](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)하셔야 합니다.
이후에는 다음과 같이 Heroku Git 서버(`https://git.heroku.com/binarysound-web-lab.git`)의 `master` 브랜치를 업데이트하기만 하면 간단히 배포할 수 있습니다.
```bash
heroku login
git push heroku master
```
