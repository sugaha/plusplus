var filename = "res/prot2.txt"

    var str2;
    cc.loader.loadTxt(filename, function(obj, str) {
      str2 = str;
      //return console.log(str);
    });

var noveltext = cc.Layer.extend({
	ctor:function(){
		this._super();

    var Message_win =
    cc.Sprite.create(res.message_win_png);
    Message_win.setPosition(size.width / 2, size.height /5.5);
    Message_win.setScale(0.62);
    this.addChild(Message_win, 0);

		return true;
	},
	init:function(message){
		var size = cc.winSize;

		this.msg = message;
		this.msgLabel = cc.LabelTTF.create(""+str2, "Arial", 12);
		// 左詰め
		this.msgLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		// 表示位置指定
		this.msgLabel.setPosition(size.width*0.5, size.height*0.5);
		// 表示範囲指定
		this.msgLabel.setDimensions(size.width, 0);

		this.cnt = 0;
		this.addChild(this.msgLabel);
		// 0.05秒おきにupdateが呼ばれる
		this.schedule(this.update, 0.05);
	},
	update:function(dt){
		if( this.cnt > this.msg.length ) {
			this.unschedule(this.update);
		}
//		cc.log(this.msgLabel.getString());
		// 先頭からthis.cnt分の文字列を設定
		this.msgLabel.setString(this.msg.substring(0, this.cnt));
		this.cnt++;
	}
});

var novelScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new noveltext();
        this.addChild(layer);

    }
});

noveltext.create = function() {
	var ss = new noveltext();
	return ss;
};
