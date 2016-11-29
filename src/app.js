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
var game = cc.Layer.extend({
   sprite: null,
   mnagelayer: null,

   ctor: function() {
      this._super();

      var size = cc.director.getWinSize();

      mnagelayer = new mnage();
      mnagelayer.init();
      this.addChild(mnagelayer);

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
     var num = mnagelayer.word_id+1;
      mnagelayer.SetLabelString(num);

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





var mnage = cc.Layer.extend({
  jsonData:null,
   BG: null,
   BGM: null,
   word:[],
   word_id:null,

   init: function() {
      this._super();

      this.word = [];
      //jsonファイルからデータを読み込み
      this.jsonData=this.LoadDataJson(res.Data_json);

      if(this.jsonData==null) {
        console.log("error:",res.Data_json)
        return;
      }
      //読み込んだjsonファイルを解析
      this.BG = this.jsonData[0].BG;
      this.BGM = this.jsonData[1].BGM;
      //セリフを配列wordにぶっこみ
      for(var i=2;i<this.jsonData.length;i++){
        this.word.push(this.jsonData[i].word)
      }
      //コンソールに出力してみた（カットしてもいい）
      for(var i=0;i<this.word.length;i++){
        console.log("word:",this.word[i]);
      }


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

      //メッセージウィンドウ出力
      var Message_win =
         cc.Sprite.create(res.message_win_png);
      Message_win.setPosition(size.width / 2, size.height / 5.5);
      Message_win.setScale(0.62);
      this.addChild(Message_win, 0);

      //文章出力
      var novelText = cc.LabelTTF.create("" + "Data_json", "MSゴシック", 12);
      novelText.setPosition(size.width / 2, size.height / 5.5);
      novelText.setScale(1);
      this.addChild(novelText);

      //自動折り返し範囲指定
      novelText.setDimensions(cc.size(size.width - 100, 0));

      //左揃え
      novelText.textAlign = cc.TEXT_ALIGNMENT_LEFT;

      novelText.setPosition(230, -980);
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


});
