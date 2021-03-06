var size;
//1:地面　2:UI　3:プレイヤ　4:ゾンビ 5:こうもり 6:スライム
//var level = [];
//var tileSize = 96;
var playerPosition; //マップ内のプレイやの位置(ｘ、ｙ)を保持する
var playerSprite; //プレイヤーのスプライト
var winSize;

var gameScene = cc.Scene.extend({
   onEnter: function() {
      this._super();

      winSize = cc.director.getWinSize();

      var background = new backgroundLayer();
      this.addChild(background);
      var level = new levelLayer();
      this.addChild(level);
      var player = new playerLayer();
      this.addChild(player);
      var enemys = new enemyLayer();
      this.addChild(enemys);
   }
});


var backgroundLayer = cc.Layer.extend({
   ctor: function() {
      this._super();

      var backgroundSprite = cc.Sprite.create(res.BG);
      var size = backgroundSprite.getContentSize();
      //console.log(size);
      this.addChild(backgroundSprite);
      //console.log(winSize.width,winSize.height);
      backgroundSprite.setPosition(winSize.width / 2, winSize.height / 2);
      //背景画像を画面の大きさに合わせるためのScaling処理
      backgroundSprite.setScale(winSize.width / size.width, winSize.height / size.height);
   }

});

var levelLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      var size = cc.director.getWinSize();
      for (i = 0; i < 7; i++) {　　　　　　
         for (j = 0; j < 10; j++) {
            switch (level[i][j]) {
               case 1:
                  var groundSprite = cc.Sprite.create(res.ground_png);
                  groundSprite.setPosition(tileSize / 2 + tileSize * j, 96 * (8 - i) - tileSize / 1.5);
                  this.addChild(groundSprite);
                  break;
               case 2:
                  var uiSprite = cc.Sprite.create(res.ui_panel_png);
                  uiSprite.setPosition(tileSize / 1 + tileSize * j, 96 * (7.8 - i) - tileSize / 2);
                  this.addChild(uiSprite);
                  break;
            }
         }
      }
   }
});


var player;
var playerLayer = cc.Layer.extend({
   ctor: function() {
      this._super();
      player = new Player();
      this.addChild(player);
      //ショッピングカートを操作するレイヤー




      cc.eventManager.addListener(listener, leftBtn);

   }

});


var Player = cc.Sprite.extend({
   ctor: function() {
      this._super();
      this.workingFlag = false;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.atackFlag = false;
      this.jumpFlag = false;
      for (i = 0; i < 7; i++) {　　　　　　
         for (j = 0; j < 10; j++) {
            if (level[i][j] == 3) {
               this.setPosition(tileSize / 2 + tileSize * j, 96 * (7 - i) - tileSize / 2);
               playerPosition = {
                  x: j,
                  y: i
               };
            }
         }
      }
      //this.schedule(this.working,0.08);
      /*
        // 2.　SpriteFrame　を利用しての歩行アニメーション
          //スプライトフレームを格納する配列
          var animationframe = [];
          //スプライトフレームを作成
          var frame1 = new cc.SpriteFrame(res.player01_png, cc.rect(0, 0, 96, 96));
          var frame2 = new cc.SpriteFrame(res.player02_png, cc.rect(0, 0, 96, 96));
          //スプライトフレームを配列に登録
          animationframe.push(frame1);
          animationframe.push(frame2);
          //スプライトフレームの配列を連続再生するアニメーションの定義
          var animation = new cc.Animation(animationframe, 0.08);
          //永久ループのアクションを定義
          var action = new cc.RepeatForever(new cc.animate(animation));
          //実行
          this.runAction(action);
      */
      /*
          //３．テクスチャーからスプライトフレームを切り出す方法
              //スプライトフレームを格納する配列
              var texture = cc.textureCache.addImage(res.player_sheet);
              //スプライトフレームを作成
              var frame1 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(0, 0, 96, 96));
              var frame2 = new cc.SpriteFrame.createWithTexture(texture, cc.rect(96, 0, 96, 96));
              //スプライトフレームを配列に登録
              var animationframe = [];
              animationframe.push(frame1);
              animationframe.push(frame2);
              //スプライトフレームの配列を連続再生するアニメーションの定義
              var animation = new cc.Animation(animationframe, 0.08);
              //永久ループのアクションを定義
              var action = new cc.RepeatForever(new cc.animate(animation));
              //実行
              this.runAction(action);
      */


      // スプライトシートをキャッシュに登録
      cc.spriteFrameCache.addSpriteFrames(res.player_plist, res.player_sheet);

      // スプライトフレームを取得 player01,player02はplistの中で定義されいいる
      var frame1 = cc.spriteFrameCache.getSpriteFrame("player01");
      var frame2 = cc.spriteFrameCache.getSpriteFrame("player02");
      var frame3 = cc.spriteFrameCache.getSpriteFrame("player03");
      var frame4 = cc.spriteFrameCache.getSpriteFrame("player04");

      var frame5 = cc.spriteFrameCache.getSpriteFrame("player05");
      var frame6 = cc.spriteFrameCache.getSpriteFrame("player06");
      var frame7 = cc.spriteFrameCache.getSpriteFrame("player07");

      //スプライトフレームを配列に登録
      var animationframe = [];
      animationframe.push(frame1);
      animationframe.push(frame2);
      animationframe.push(frame3);
      animationframe.push(frame4);

      //スプライトフレームの配列を連続再生するアニメーションの定義
      var animation = new cc.Animation(animationframe, 0.2);

      //永久ループのアクションを定義
      var action = new cc.RepeatForever(new cc.animate(animation));

      //実行
      this.initWithFile(res.player_sheet);
      this.runAction(action);

      /*//攻撃実行
      if(this.atackFlag == true){
      this.initWithFile(res.player_sheet);
      this.runAction(atackact);

    }*/

      this.scheduleUpdate();
   },


   //移動のため
   update: function(dt) {
      console.log(this.jumpFlag, this.ySpeed);

      if (this.xSpeed > 0) { //スピードが正の値（右方向移動）
         //　向きを判定させる
         this.setFlippedX(false);
      }
      if (this.xSpeed < 0) { //スピードが負の値（左方向移動）
         this.setFlippedX(true);
      }
      //プレイヤーを降下させる処理　ジャンプボタンが押されてないときで、プレイヤが空中にある場合
      if (this.jumpFlag == false) {
         if (this.getPosition().y < tileSize * 1.6) this.ySpeed = 0;
         else this.ySpeed = this.ySpeed - 0.5;

      }
      //位置を更新する
      this.setPosition(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed);

   }

   //攻撃のため
   /*update: function(dt) {
      console.log(this.atackFlag, this.ySpeed);

      if (this.xSpeed > 0) { //スピードが正の値（右方向移動）
         //　向きを判定させる
         this.setFlippedX(false);
      }
      if (this.xSpeed < 0) { //スピードが負の値（左方向移動）
         this.setFlippedX(true);
      }
      //プレイヤーを攻撃させる処理　攻撃ボタンが押されてないときで、プレイヤが空中にある場合
      if (this.jumpFlag == false) {
         if (this.getPosition().y < tileSize * 1.6) this.ySpeed = 0;
         else this.ySpeed = this.ySpeed - 0.5;

      }
      //位置を更新する
      this.setPosition(this.getPosition().x + this.xSpeed, this.getPosition().y + this.ySpeed);

   }*/


});


//タッチリスナーの実装
var listener = cc.EventListener.create({
   event: cc.EventListener.TOUCH_ONE_BY_ONE,
   // swallowTouches: true,

   onTouchBegan: function(touch, event) {
      var target = event.getCurrentTarget();
      var location = target.convertToNodeSpace(touch.getLocation());
      var spriteSize = target.getContentSize();
      var spriteRect = cc.rect(0, 0, spriteSize.width, spriteSize.height);
      //タッチした場所が、スプライトの内部に収まっていたら
      if (cc.rectContainsPoint(spriteRect, location)) {
         console.log(target.getTag() + "Btnがタッチされました");

         //タッチしたスプライトが左ボタンだったら
         if (target.getTag()　 == 1) {
            player.xSpeed = -2.5;
            leftBtn.setOpacity(255);
            rightBtn.setOpacity(128);
         } else {
            //タッチしたスプライトが右ボタンだったら
            if (target.getTag()　 == 2) {
               player.xSpeed = 2.5;
               rightBtn.setOpacity(255);
               leftBtn.setOpacity(128);
            }
         }

         //タッチしたスプライトがジャンプボタンだったら
         if (target.getTag()　 == 3) {
            if (player.jumpFlag == false && player.ySpeed == 0) player.ySpeed = 9;
            player.jumpFlag = true;
            jumpBtn.setOpacity(255);
         }
         //タッチしたスプライトが剣ボタンだったら
         if (target.getTag()　 == 4) {
            if (player.atackFlag == false && player.ySpeed == 0) //player.ySpeed = 9;
            player.atackFlag = true;
            kenBtn.setOpacity(255);

            player.initWithFile(res.player_sheet);
            player.runAction(player.atackact);
            plater.scheduleUpdate();

          }
      }
      return true;
   },
   //タッチを止めたときは、移動スピードを0にする
   onTouchEnded: function(touch, event) {
      player.jumpFlag = false;
      player.atackFlag = false;
      player.xSpeed = 0;
      //player.ySpeed = 0;
      leftBtn.setOpacity(128);
      rightBtn.setOpacity(128);
      kenBtn.setOpacity(128);
      jumpBtn.setOpacity(128);
   }

});

//キーボードリスナーの実装
var keylistener = cc.EventListener.create({
   event: cc.EventListener.KEYBOARD,
   // swallowTouches: true,

   onKeyPressed: function(keyCode, event) {
      if (keyCode == 65) { // a-Keyで左に移動
         player.xSpeed = -2.5;
         leftBtn.setOpacity(255);
         rightBtn.setOpacity(128);
      }
      if (keyCode == 68) { // d-Keyで右に移動
         player.xSpeed = 2.5;
         rightBtn.setOpacity(255);
         leftBtn.setOpacity(128);
      }
      if (keyCode == 32 || keycode == 38) { // スペースキーか上矢印キーでジャンプ
         if (player.jumpFlag == false && player.ySpeed == 0) player.ySpeed = 9;
         player.jumpFlag = true;
         jumpBtn.setOpacity(255);
      }
      return true;
   },
   onKeyReleased: function(keyCode, event) {
      player.jumpFlag = false;
      player.xSpeed = 0;
      //player.ySpeed = 0;
      leftBtn.setOpacity(128);
      rightBtn.setOpacity(128);
      kenBtn.setOpacity(128);
      jumpBtn.setOpacity(128);
   },

});
