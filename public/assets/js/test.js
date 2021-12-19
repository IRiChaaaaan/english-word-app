// 今何問目か
var num_question = 0;
// 正解ID
var correctID = -1;
// 正解
var correct = null;
// 時間
var start_time = null;
// 終了判定
var in_game = false;

function onTimer(){
  var val = document.getElementById('prog');
  var now_time = new Date();
  if (val.value > 0) {
    var diff = now_time.getTime() - start_time.getTime();
		val.value = 1000 - diff / 5;
		setTimeout(onTimer, 10);
	}
  else{
    GameOver();
  }
}

function OnClick(){
  num_question = 0;
  correctID = -1;
  correct = null;
  start_time = null;
  in_game = true;
  ShowQuestion();
}

// 問題を表示
function ShowQuestion(){
  num_question += 1;
  document.getElementById("question_num").innerHTML=num_question + "問目";
  // 問題をファイルから読み込む
  var request = new XMLHttpRequest();
  request.open("get", "assets/data/words0" + (Math.floor(Math.random() * 9) + 1) + ".xml", false);
  request.send(null);
  var lines = request.responseText.split("\n");
  // シーン変更
  document.getElementById("timer").style.display ="block";
  document.getElementById("sceneGame").style.display ="block";
  document.getElementById("sceneTop").style.display ="none";
  document.getElementById("sceneOver").style.display ="none";
  // 4問をランダムに選択
  var num = CreateRandom(lines.length, 4);
  // 問題文表示
  var target = document.getElementById("output");
  correctID = Math.floor(Math.random() * 4);
  var data = lines[num[correctID]].split(",");
  correct = data;
  target.innerHTML = data[0];
  // 選択肢表示
  var select1 = document.getElementById("select1");
  data = lines[num[0]].split(",");
  select1.innerHTML = data[1];
  var select2 = document.getElementById("select2");
  data = lines[num[1]].split(",");
  select2.innerHTML = data[1];
  var select3 = document.getElementById("select3");
  data = lines[num[2]].split(",");
  select3.innerHTML = data[1];
  var select4 = document.getElementById("select4");
  data = lines[num[3]].split(",");
  select4.innerHTML = data[1];
  // 制限時間
  document.getElementById('prog').value = 1000;
  start_time = new Date();
  onTimer();
}

// 指定の長さの範囲からランダムな数字を指定数返す（重複なし）
function CreateRandom(max, num){
  var arr = [];
  for(let i = 0; i < max; i++){
    arr.push(i);
  }
  var data = []
  for(let i = 0; i < num; i++){
    var r = Math.floor(Math.random() * max);
    data.push(arr[r]);
    delete arr[r];
  }
  return data
}

// 正解か間違いか判定
function Judge(num){
  if(num == correctID) {
    ShowQuestion();
    audioElement = document.getElementById("audioElement1");
    audioElement.currentTime = 0;
    audioElement.play();
  }
  else{
    GameOver();
  }
}

// ゲームオーバー
function GameOver(){
  if(in_game){
    in_game = false;
    audioElement = document.getElementById("audioElement2");
    audioElement.currentTime = 0;
    audioElement.play();
    // シーン変更
    document.getElementById("timer").style.display ="none";
    document.getElementById("sceneGame").style.display ="none";
    document.getElementById("sceneOver").style.display ="block";
    // 正解数表示
    document.getElementById("correct-num").innerHTML = num_question - 1 + "問正解!!";
    // 正解表示
    var ans = correct[0] + " : ";
    for(let i = 0; i < correct.length - 1; i++){
      ans += correct[i + 1];
      if(i < correct.length - 2) ans += ",";
    }
    document.getElementById("answer").innerHTML = ans;
  }
}
