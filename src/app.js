//gameScene.js

var gameScene = cc.Scene.extend({
   onEnter: function() {
      this._super();
      var layer = new game();
      this.addChild(layer);



      //var layer2 = new showText();
      //this.addChild(layer2);
   }
});

var filename = "res/prot2.txt"


var novelText

var mnagelayer;
var mnagelayer2;
var game = cc.Layer.extend({
   sprite: null,
   mnagelayer: null,
   mnagelayer2:null,

   ctor: function() {
      this._super();

      var size = cc.director.getWinSize();

      mnagelayer = new mnage();
      mnagelayer.init();
      this.addChild(mnagelayer);

      /*mnagelayer2 = new mnage();
      mnagelayer2.init();
      this.addChild(mnagelayer2);
*/
      // タップイベントリスナーを登録する
      cc.eventManager.addListener({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches: true,
         onTouchBegan: this.onTouchBegan,
         onTouchMoved: this.onTouchMoved,
         onTouchEnded: this.onTouchEnded
      }, this);

      return true;
   },


   onTouchBegan: function(touch, event) {
     var num = mnagelayer.word_id+4;
      mnagelayer.SetLabelString(num);

     var num_BG = mnagelayer.BG_id+4;
      mnagelayer.SetLabelString2(num_BG);

     var num_CL = mnagelayer.CHAR_L_id+4;
      mnagelayer.SetLabelString3(num_CL);

     var num_CR = mnagelayer.CHAR_R_id+4;
      mnagelayer.SetLabelString4(num_CR);

      return true;
   },
   onTouchMoved: function(touch, event) {},
   onTouchEnded: function(touch, event) {
      // 次のシーンに切り替える
      //cc.director.runScene(new NextScene());
      if (audioEngine.isMusicPlaying()) {
         //audioEngine.stopMusic();
         audioEngine.playEffect(res.ok_mp3);
      }
   },
});




var labelBG;
var labelCHAR_L;
var labelCHAR_R;
var mnage = cc.Layer.extend({
  jsonData:null,
   BG_id: null,
   BG:[],
   BGM: null,
   CHAR_L:[],
   CHAR_L_id: null,
   CHAR_R:[],
   CHAR_R_id: null,
   word:[],
   word_id:null,


   init: function() {
      this._super();

      this.word = [];
      this.BG = [];
      this.CHAR_L = [];
      this.CHAR_R = [];

      //jsonファイルからデータを読み込み
      this.jsonData=this.LoadDataJson(res.Data2_json);

      if(this.jsonData==null) {
        console.log("error:",res.Data2_json)
        return;
      }
      this.BGM = this.jsonData[0].BGM;
      //読み込んだjsonファイルを解析
      /*this.BG = this.jsonData[2].BG;
      this.BGM = this.jsonData[0].BGM;
      this.CHAR_L = this.jsonData[3].CHAR_L;
      this.CHAR_R = this.jsonData[4].CHAR_R;*/

      //セリフを配列wordにぶっこみ
      for(var i=1;i<this.jsonData.length;i++){
        this.word.push(this.jsonData[i].word)
      }

      for(var j=2;j<this.jsonData.length;j++){
        this.BG.push(this.jsonData[j].BG)
      }

      for(var k=3;k<this.jsonData.length;k++){
        this.CHAR_L.push(this.jsonData[k].CHAR_L)
      }

      for(var l=4;l<this.jsonData.length;l++){
        this.CHAR_R.push(this.jsonData[l].CHAR_R)
      }

      //コンソールに出力してみた（カットしてもいい）
      for(var i=0;i<this.word.length;i++){
        console.log("word:",this.word[i]);
      }
/*
      var labelBG = new cc.Sprite.create(this.BG);
      labelBG.setPosition(240, 160);
      labelBG.setScale(0.7);
      this.addChild(labelBG);

      var labelCHAR_L = new cc.Sprite.create(this.CHAR_L);
      labelCHAR_L.setPosition(120, 160);
      labelCHAR_L.setScale(0.55);
      this.addChild(labelCHAR_L);

      var labelCHAR_R = new cc.Sprite.create(this.CHAR_R);
      labelCHAR_R.setPosition(330, 160);
      labelCHAR_R.setScale(0.55);
      this.addChild(labelCHAR_R);
*/

      var size = cc.director.getWinSize();

      //var labelWord = Data.node.getChildByName("Label");
        this.labelWord = new cc.LabelTTF("", "MSゴシック", 13);
        this.labelWord.setPosition(240, 50);
      //自動折り返し範囲指定
        this.labelWord.setDimensions(cc.size(size.width - 100, 0));
      //左揃え
        this.labelWord.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        this.addChild(  this.labelWord, 1);

      //ラベルにセリフ番号0を与える
      this.SetLabelString(0);

      //音楽再生エンジン
      audioEngine = cc.audioEngine;
      //bgm再生
      if (!audioEngine.isMusicPlaying()) {
        audioEngine.playMusic(this.BGM, true);
        //audioEngine.playMusic("res/bgm_main.mp3", true);
         //audioEngine.playMusic(res.umi_mp3, true);
      }

      labelBG = new cc.Sprite.create(this.BG);
      labelBG.setPosition(-20, -20);
      labelBG.setScale(0.7);
      this.addChild(labelBG);
      this.SetLabelString2(0);

      labelCHAR_L = new cc.Sprite.create(this.CHAR_L);
      labelCHAR_L.setPosition(50, 9);
      labelCHAR_L.setScale(0.55);
      this.addChild(labelCHAR_L);
      this.SetLabelString3(0);

      labelCHAR_R = new cc.Sprite.create(this.CHAR_R);
      labelCHAR_R.setPosition(280, 9);
      labelCHAR_R.setScale(0.55);
      this.addChild(labelCHAR_R);
      this.SetLabelString4(0);


      //メッセージウィンドウ出力
      var Message_win =
         cc.Sprite.create(res.message_win_png);
      Message_win.setPosition(size.width / 2, size.height / 5.5);
      Message_win.setScale(0.62);
      this.addChild(Message_win, 0);

      //文章出力
      var novelText = cc.LabelTTF.create("" + "Data2_json", "MSゴシック", 12);
      novelText.setPosition(size.width / 4, size.height / 5.5);
      novelText.setScale(1);
      this.addChild(novelText);

      //自動折り返し範囲指定
      novelText.setDimensions(cc.size(size.width - 100, 0));

      //左揃え
      novelText.textAlign = cc.TEXT_ALIGNMENT_LEFT;

      //novelText.setPosition(230, -980);
      this.addChild(novelText);

      //文字数カウント
      this.count = 0;

      //this.scheduleUpdate();


      //this.count++;
      //return console.log(this.count);

      // }
   },

   LoadDataJson: function(resfile) {

    var ret;

      var text = cc.loader._loadTxtSync(resfile);
      if(text== null) return null;

      var json = JSON.parse(text);
    //  this._dataJson = json;

      //  console.log(   this._dataJson[2].word);
     return json;
   },

   SetLabelString: function(num){

     if(0 <= num  && num < this.word.length )
     this.labelWord.setString(this.word[num]);

     this.word_id = num;
   },

   SetLabelString2: function(num_BG){
     if(0 <= num_BG && num_BG < this.BG.length)
     labelBG.setTexture(this.BG[num_BG]);

     this.BG_id = num_BG;
   },

   SetLabelString3: function(num_CL){
     if(0 <= num_CL && num_CL < this.CHAR_L.length)
     labelCHAR_L.setTexture(this.CHAR_L[num_CL]);

     this.CHAR_L_id = num_CL;

   },

   SetLabelString4: function(num_CR){
     if(0 <= num_CR && num_CR < this.CHAR_R.length)
     labelCHAR_R.setTexture(this.CHAR_R[num_CR]);

     this.CHAR_R_id = num_CR;

   },


});
