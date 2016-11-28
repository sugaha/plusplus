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
    /*
        var str2;
        cc.loader.loadTxt(filename, function(obj, str) {
          str2 = str;
          //return console.log(str);
        });
    */

var novelText

var game = cc.Layer.extend({
    sprite: null,
    ctor: function() {
        this._super();

        var size = cc.director.getWinSize();

        //var Data = ccs.load(res.Data_json);
        //this.addChild(Data.node);
        var mnagelayer = new mnage();
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
        i = i + 1;
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

    ctor: function() {
        this._super();

        var i = 2;

                var size = cc.director.getWinSize();

        //while (i < 3) {
            //var labelWord = Data.node.getChildByName("Label");
            var labelWord = new cc.LabelTTF("", "Arial", 13);
            labelWord.setPosition(240, 50);
            //自動折り返し範囲指定
            labelWord.setDimensions(cc.size(size.width - 100, 0));
            //左揃え
            labelWord.textAlign = cc.TEXT_ALIGNMENT_LEFT;
            this.addChild(labelWord, 1);

            cc.loader.loadJson(res.Data_json, function(err, data) { //JSONファイルから読み込む
                if (!err) {
                    //var label = new ccui.Text(); //ラベルを作成
                    //label.setFontSize(28); //フォントサイズを設定
                    //listView.setItemModel(label); //ラベルをリストの項目用のオブジェクトとして設定
                    labelWord.setString(data[i].word); //挿入したラベルにデータを表示
                }
            })


            var labelBG = new cc.Sprite.create();
            labelBG.setPosition(240, 160);
            labelBG.setScale(0.7);
            this.addChild(labelBG);

//            this.changeword(i);
            /*
            cc.loader.loadJson(res.Data_json, function(err, data) { //JSONファイルから読み込む
                if (!err) {
                    var label = new ccui.Widget(); //ラベルを作成
                    //label.setFontSize(28); //フォントサイズを設定
                    labelBG.setTexture(data[0].BG); //挿入したラベルにデータを表示
                }
            })*/


            //音楽再生エンジン
            audioEngine = cc.audioEngine;
            //bgm再生
            if (!audioEngine.isMusicPlaying()) {
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
            var novelText = cc.LabelTTF.create("" + "Data_json", "Arial", 12);
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

    test:function(){

    },


    //
    // changeWord: function(i){
    //   cc.loader.loadJson(res.Data_json, function(err, data) { //JSONファイルから読み込む
    //       if (!err) {
    //           //var label = new ccui.Text(); //ラベルを作成
    //           //label.setFontSize(28); //フォントサイズを設定
    //           //listView.setItemModel(label); //ラベルをリストの項目用のオブジェクトとして設定
    //           labelWord.setString(data[i].word); //挿入したラベルにデータを表示
    //       }
    //   })
    //
    // },



  });

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
