window.addEventListener('DOMContentLoaded', function(){
  
  // 날씨 기본값: seoul
  getJSON('seoul');

  // 검색어(도시이름) 입력 후 enter를 눌렀을 때, 값을 가져와 getJSON()에 파라미터로 넣기
  let searched = document.querySelector('input');

  searched.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
      let input_value = this.value;
      getJSON(input_value);
    }
  });
  
});


// 도시별 날씨 정보 API ajax요청(OpenWeatherMap 이용)
async function getJSON(city){
  const OPEN_API_DOMAIN = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=123740caa750a6a4d7dcbd0085a62e00&units=metric`;

  await fetch(OPEN_API_DOMAIN, {method: "GET"}) /* '동기적(sync)'으로 실행해 데이터 수신이 완료되면 순차적으로 실행되도록 함 */
  .then((response) => response.json())
  .then((data) => {
    $('h4').hide();
    getWeather(data); /* 데이터바인딩 */
    imgChange(data); /* 배경이미지 바꾸기 */
    clothChange(data); /* 옷차림 가이드 바꾸기 */
  })
  .catch(() => alert('오류가 발생했습니다.'));
}


// 날씨정보 데이터바인딩
function getWeather(data){
  let weather_info = document.querySelector('.weather_info');
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // 데이터바인딩으로 html 집어넣기 (+ Math.floor()함수를 통해 기온 소수점 버림)
  let items = `
  <p class="city_name">${data.name}</p>
  <p class="date_info">
    <span>${hours}:${minutes}</span>
    <span>${month}/${day}</span>
    <span>(현재위치기준)</span>
  </p>
  <p class="temp_all">
    <span class="temp_main">${Math.floor(data.main.temp)}º</span>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
    <span>최고 ${Math.floor(data.main.temp_max)}º</span>
    <span>최저 ${Math.floor(data.main.temp_min)}º</span>
  </p>
  `;

  weather_info.innerHTML = items;
}


// 4계절 날씨 배경 이미지 바꾸는 함수
function imgChange(data){
  let background = document.querySelector('.container-sm');
  let curr_temp = Math.floor(data.main.temp);

  // 4계절 기온에 따라 나누기
  let spring = curr_temp >= 12 && curr_temp < 20; // 12~20
  let summer = 20 <= curr_temp; // 20~
  let fall = curr_temp >= 5 && curr_temp < 12; // 5~12
  let winter = curr_temp < 5; // ~5

  if(spring){
    background.style.backgroundImage = "url('image/weather1.jpg')";
  } else if(summer){
    background.style.backgroundImage = "url('image/weather2.jpg')";
  } else if(fall){
    background.style.backgroundImage = "url('image/weather3.jpg')";
  } else if(winter){
    background.style.backgroundImage = "url('image/weather4.jpg')";
  }
}


// 8분류 기온에 따른 옷차림 가이드를 바꾸는 함수
function clothChange(data){
  let clothes = document.querySelector('.clothes');
  let curr_temp = Math.floor(data.main.temp);

  // 8분류 기온 나누기
  let summer = curr_temp >= 28; // 28~
  let early_summer = curr_temp >= 23 && curr_temp <= 27; // 23~27
  let early_spring = curr_temp >= 20 && curr_temp <= 22; // 20~22
  let spring = curr_temp >= 17 && curr_temp <= 19; // 17~19
  let early_fall = curr_temp >= 12 && curr_temp <=16; // 12~16
  let fall = curr_temp >= 9 && curr_temp <= 11; // 9~11
  let early_winter = curr_temp >= 5 && curr_temp <= 8; // 5~8
  let winter = curr_temp <= 4; // ~4

  if(summer){
    clothes.innerHTML = `
      <li>민소매</li>
      <li>숏팬츠</li>
    `;
  } else if(early_summer){
    clothes.innerHTML = `
      <li>티셔츠</li>
      <li>반바지</li>
    `;
  } else if(early_spring){
    clothes.innerHTML = `
      <li>셔츠</li>
      <li>7부바지</li>
      <li>면바지</li>
    `;
  } else if(spring){
    clothes.innerHTML = `
      <li>후드티</li>
      <li>바람막이</li>
      <li>슬랙스</li>
    `;
  } else if(early_fall){
    clothes.innerHTML = `
      <li>기모후드티</li>
      <li>가디건</li>
      <li>니트/맨투맨</li>
    `;
  } else if(fall){
    clothes.innerHTML = `
      <li>트렌치코드</li>
      <li>야상</li>
      <li>자켓</li>
    `;
  } else if(early_winter){
    clothes.innerHTML = `
      <li>코트</li>
      <li>가죽자켓</li>
      <li>니트+플리스</li>
    `;
  } else if(winter){
    clothes.innerHTML = `
      <li>패딩</li>
      <li>두꺼운 코트</li>
      <li>히트텍/내복</li>
      <li>목도리, 장갑</li>
    `;
  };
}