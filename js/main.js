window.addEventListener('DOMContentLoaded', function(){

  getJSON('seoul');
  
});

// 도시별 날씨 정보 API ajax요청(OpenWeatherMap 이용)
function getJSON(city){
  $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=123740caa750a6a4d7dcbd0085a62e00&units=metric`,
    dataType: 'json',
    type: 'GET',
    async: 'false', /* '비동기적(async)'으로 실행해 순차적이 아니라 완료되면 실행되도록 함 */
  }).done(function(data){
    $('h4').hide();
    getWeather(data); /* 데이터바인딩 */
  }).fail(function(){
    alert('오류가 발생했습니다.');
  });
};

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
    <span>(현재위치기준)</span>
    <span>${hours}:${minutes}</span>
    <span>${month}/${day}</span>
  </p>
  <p class="temperture">${Math.floor(data.main.temp)}º</p>
  <p class="temp_sub">
    <span>최고 ${Math.floor(data.main.temp_max)}º</span>
    <span>최저 ${Math.floor(data.main.temp_min)}º</span>
  </p>
  <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
  `;

  weather_info.innerHTML = items;
}
