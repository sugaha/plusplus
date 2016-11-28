//gameScene.js
var novelScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new novel();
        this.addChild(layer);
        //var layer2 = new showText();
        //this.addChild(layer2);
    }
});

var novelText;

var novel = cc.Layer.extend({
    ctor: function() { //コンストラクタ
        this._super(); //親クラスのメソッド継承

        var mainscene = ccs.load(res.Data_json); //JSONファイル読み込み
        this.addChild(mainscene.node); //レイヤーに追加

        var labelWord = mainscene.node.getChildByName("Label"); //Label取得
        var listView = mainscene.node.getChildByName("listView"); //ListViewを取得
        listView.setBounceEnabled(true); //スクロールの端で跳ね返る
        listView.setItemsMargin(20); //リストの間隔

    cc.loader.loadJson(res.Data_json,function(err, data){ //JSONファイルから読み込む
      if(!err){
        var label = new ccui.Text(); //ラベルを作成
        label.setFontSize(28); //ファンとサイズを設定
        label.setTouchEnabled(true); //リストで選択可能にする
        listView.setItemModel(label); //ラベルをリストの項目用のオブジェクトとして設定
        for(var int = 0; int < data.length; int++){
          listView.insertDefaultItem(int);;//int番目(0始まり)にデフォルトの項目を挿入
          listView.getItem(int).setString(data[int].BG);//挿入したラベルにデータを表示
        }
        listView.addEventListener(function(list,type){
          switch(type){
            case ccui.ListView.ON_SELECTED_ITEM_START: //アイテムにタッチ開始時
                 break;
            case ccui.ListView.ON_SELECTED_ITEM_END: //アイテム選択時（タッチ後スクロールせずに離した場合）
                 labelWord.setString(data[list.getCurSelectedIndex()].word);
                 break;
          }
        ),this};
      }

    });

        return true;
    }


    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        //cc.director.runScene(new NextScene());
    },
});
