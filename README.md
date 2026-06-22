# downloads

여러 앱/프로젝트의 공개 배포(다운로드·인앱 업데이트) 허브입니다.
각 앱은 하위 폴더에 `version.json` + APK + 다운로드 페이지를 둡니다.

- [`booking/`](booking/) — BookingApt(골프 예약 자동화)
  - `version.json` — 최신 버전 메타(앱이 이 파일로 업데이트 판단)
  - `bookingapt-<ver>.apk` — 설치 APK
  - `index.html` — 다운로드 페이지

## 새 버전 배포 (booking)
앱 repo 에서: `make publish NOTES="릴리스 노트"` (publish-release.sh 가 booking/ 에 복사+갱신+push)
