# web-lab
각종 웹 서비스의 빠른 프로토타이핑을 위한 저장소입니다.

## 개발
[Docker](https://www.docker.com/products/docker-desktop)가 필요합니다.
```bash
export PORT=5000
docker-compose up --build  # 디펜던시 업데이트가 필요한 경우
docker-compose up          # 디펜던시 업데이트가 없는 경우
```

이후 `localhost:5000`을 브라우저로 방문해 봅니다.

### 환경변수
Docker는 [`.env` 파일을 감지하여 환경변수로 사용](https://docs.docker.com/compose/environment-variables/#the-env-file)합니다. 프로젝트 루트에 `.env` 파일을 다음과 같이 생성해두면 매번 환경변수를 설정하지 않아도 됩니다.
```bash
PORT=5000
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
