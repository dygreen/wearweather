# wearweather
> 날씨 API를 이용한 기온별 옷차림 가이드 서비스
>
> [개인 프로젝트: 2022.06.05 ~ 2022.06.06]
>
> 주소: https://dygreen.github.io/wearweather/index.html

***
## Service Info
: 매일 날씨를 확인하고 기온에 알맞은 옷을 고르곤 하는데, <br> 문득 하나의 서비스를 통해 그 Needs를 충족시키면 편리할 것 같아 실행해본 프로젝트입니다.
<br>

#### _해당 프로젝트의 서비스는..._
* 도시 이름을 (영문으로) 검색하면 그에 맞는 날씨 + (현재위치의)시간을 보여줍니다.
* 해당 기온에 맞도록 배경 이미지가 바뀝니다(총 4가지 계절로 나눔).
* 해당 기온에 맞는 옷차림을 추천해줍니다(총 8가지 기온으로 나눔).

***
## Code Info
* 100% vanilla JS 코드
* Bootstrap을 이용해 반응형UI 설계
* [OpenWeatherMap](https://openweathermap.org/)에서 도시별 날씨 정보 API 요청
* input창의 `keydown`이 `enter`일 때 그 값을 `ajax 요청 함수`의 `parameter`로 집어넣어 API 정보 가져옴
* 요청이 완료되면(.done) 로딩중 메시지 사라짐 + 날씨 정보 html에 `데이터바인딩` + 배경이미지/옷차림 가이드 바뀜
* 반응형(pc|mobile)
* 100% scss 스타일링

***
## 코드 수정 📝
* [06.11] 모바일 반응형 화면 제작(media query)
* [06.12] css 코드 -> scss로 변경(컴파일링)
* [06.19] `font-size` px 단위 -> rem 단위로 변경
* [07.03] `AJAX` -> `fetch()` 로 변경 (`async/await` 사용)
```javascript
// 기존 코드 (AJAX)
function getJSON(city){
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=123740caa750a6a4d7dcbd0085a62e00&units=metric`,
    dataType: 'json',
    type: 'GET',
    async: 'false', 
  }).done(function(data){
    $('h4').hide();
    getWeather(data);
    imgChange(data);
    clothChange(data);
  }).fail(function(){
    alert('오류가 발생했습니다.');
  });
};
```
<br>

```javascript
// 수정한 코드 (fetch)
async function getJSON(city){
  const OPEN_API_DOMAIN = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=123740caa750a6a4d7dcbd0085a62e00&units=metric`;

  await fetch(OPEN_API_DOMAIN, {method: "GET"})
  .then((response) => response.json())
  .then((data) => {
    $('h4').hide();
    getWeather(data);
    imgChange(data);
    clothChange(data);
  })
  .catch(() => alert('오류가 발생했습니다.'));
}
```

***
## 개선할 사항 🚀
* ~~100% vanila JS로 만들 것(`AJAX` -> `fetch()`)~~
* API를 불러오는데 걸리는 시간 단축 필요

***
#### _* 자세한 실행과정 정리(노션: https://prickle-turn-785.notion.site/WearWeather-0056f45ce459414e94405ddc6ede7be7)_
