/*
  유입 Case에 따른 close 동작 정의
  1. 새창으로 열린 경우
    - window.opener != null
    - document.referrer == ''
  2. 화면 이동으로 열린 경우
    - window.opener == null
    - document.referrer != ''
  3. url 링크를 타거나 qr-code를 타고 브라우저 팝업으로 열린 경우
    - window.opener == null
    - document.referrer == ''
*/
function closeWindow() {
  var isPopup = !!window.opener;
  var isNavigation = document.referrer !== "";

  if (isFromApp) {
    if (isNavigation) {
      //APP에서 open시 일반 상품메인을 거쳐서 접근한 경우는 뒤로가기,
      window.history.back();
    } else {
      //APP에서 바로 open시에는 inapp close 처리
      window.location.href = "inappcmd://close";
    }
  } else {
    if (isPopup) {
      //새창으로 열린 경우는 창 닫기로 동작
      window.close();
    } else {
      if (isNavigation) {
        //화면이동으로 접근한 경우 뒤로가기
        window.history.back();
      } else {
        //url 링크를 타거나 qr-code를 타고 브라우저 팝업으로 열린 경우
        window.close();

        //창이 닫히지 않았다면 메인화면으로 이동(닫기동작 수행 불가)
        setTimeout(function () {
          if (!window.closed) {
            window.location.href = "/main/main/CPMNMN0101.hc";
          }
        }, 100);
      }
    }
  }
}
