/**
 * BookingApt 예약 결과 수신 → Google 시트 기록 + 메일 발송
 *
 * 설치:
 *  1) https://sheets.new 로 새 스프레드시트 생성
 *  2) 확장 프로그램 → Apps Script → 이 코드를 통째로 붙여넣기
 *  3) 아래 RECIPIENT 를 본인 메일 주소로 수정
 *  4) 배포 → 새 배포 → 유형 "웹 앱" → 실행: 나, 액세스: "모든 사용자"
 *     → 생성된 URL(끝이 /exec)을 복사
 *  5) 앱 설정 → "예약 결과 서버 전송" 켜고 그 URL 붙여넣기 → 저장
 *
 * 메일이 너무 잦으면 sendMail() 안의 조건을 바꿔 실패(또는 성공)만 보내도 됩니다.
 */
var RECIPIENT = 'YOUR_EMAIL@example.com';   // ← 받을 메일 주소로 변경
var SHEET_NAME = 'log';

function doPost(e) {
  var d = {};
  try { d = JSON.parse(e.postData.contents); } catch (err) {}

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['수신시각', '기기', '결과', '사유', '슬롯', '타임', '운영일', '버전', 'UUID']);
  }
  sh.appendRow([new Date(), d.device || '', d.result || '', d.reason || '',
                d.slot || '', d.time || '', d.target || '', d.version || '', d.uuid || '']);

  sendMail(d);
  return ContentService.createTextOutput('ok');
}

function sendMail(d) {
  // 성공/실패 모두 발송. 특정 결과만 원하면: if (d.result !== '실패') return;
  try {
    var subject = '[BookingApt] ' + (d.device || '?') + ' ' + (d.result || '');
    var body =
        '기기: ' + (d.device || '') + '\n' +
        '결과: ' + (d.result || '') + '\n' +
        '사유: ' + (d.reason || '') + '\n' +
        '슬롯: ' + (d.slot || '') + '\n' +
        '타임: ' + (d.time || '') + '\n' +
        '운영일: ' + (d.target || '') + '\n' +
        '버전: ' + (d.version || '') + '\n' +
        '수신: ' + new Date();
    MailApp.sendEmail(RECIPIENT, subject, body);
  } catch (err) {}
}

function doGet(e) {
  return ContentService.createTextOutput('BookingApt report endpoint OK');
}
