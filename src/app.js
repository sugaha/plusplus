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

    var str2;
    cc.loader.loadTxt(filename, function(obj, str) {
      str2 = str;
      //return console.log(str);
    });

var novelText;
/*var showText = cc.Layer.extend({
  //sprite:null,
  ctor:function(){
    //初期化
    this._super();
    return true;
  },
  init:function(message){
    var size = cc.director.getwinSize();

    //メッセージを保持
    this.string = message;

    //文字表示
//    novelText = cc.LabelTTF.create("aaaa"+str2, "Arial", 12);
    this.novelText = cc.LabelTTF.create("aaaa", "Arial", 22);
    this.novelText.setPosition(size.width / 2, size.height /5.5);
        this.novelText.setScale(1.5);
        //novelText.fillStyle = "white";
    //自動折り返し範囲指定
    this.novelText.setDimentions(cc.size(size.width - 100,0));

    //左揃え
    this.novelText.textAlign = cc.TEXT_ALIGNMENT_LEFT;

    this.novelText.setPosition(100,0);
    this.addChild(novelText);

    //文字数カウント
    this.scheduleUpdate();
  },

  //一文字ずつ更新
  update:function(){
    //文字の表示終わったら更新止める
    if(this.count >= this.string.length){
      this.unscheduleUpdate();
    }

    novelText.string = this.string.substring(0,this.count);
    return console.log(str);
    this.count++;
  },
});*/

var game = cc.Layer.extend({
  sprite:null,
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();


        //音楽再生エンジン
        audioEngine = cc.audioEngine;
        //bgm再生
        if (!audioEngine.isMusicPlaying()) {
          //audioEngine.playMusic("res/bgm_main.mp3", true);
          //audioEngine.playMusic(res.umi_mp3, true);
        }
                //背景出力
                var BG = cc.Sprite.create(res.BG_2);
                BG.setPosition(size.width / 2, size.height /2);
                BG.setScale(0.6);
                this.addChild(BG, 0);

                //メッセージウィンドウ出力
                var Message_win =
                cc.Sprite.create(res.message_win_png);
                Message_win.setPosition(size.width / 2, size.height /5.5);
                Message_win.setScale(0.62);
                this.addChild(Message_win, 0);

                //文章出力
                var novelText = cc.LabelTTF.create(""+str2, "Arial", 12);
                    novelText.setPosition(size.width / 2, size.height /5.5);
                    novelText.setScale(1);
                    this.addChild(novelText);

                    //自動折り返し範囲指定
                    novelText.setDimensions(cc.size(size.width - 100,0));

                    //左揃え
                    novelText.textAlign = cc.TEXT_ALIGNMENT_LEFT;

                    novelText.setPosition(230,-980);
                    this.addChild(novelText);

                    //文字数カウント
                    this.count = 0;

                    this.scheduleUpdate();


                      //this.count++;
                      //return console.log(this.count);

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
/*
    //一文字ずつ更新する
    update:function (dt) {
    //文字の表示が終わったら更新を止める
        if(this.count >= this.string.length){
        this.unscheduleUpdate();
    }
    this.label.string = this.string.substring(0,this.count);
		return console.log(this.count);
		this.count++;
},*/

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        //cc.director.runScene(new NextScene());
    },
});
