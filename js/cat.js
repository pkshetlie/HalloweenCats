function Cat(name) {
    this.name = name;
    this.speed = 100;
    this.changeSpeed = 2000;
    this.to = ["bottom", "top", "right", "left"];
    this.toIndex = 2;
    this.moveDistance = 10;
    this.x = 0;
    this.y = 0;
    this.cat = null;
    this.timerChangeDirection = null;
    this.timerWalk = null;
    this.citrouilles = [
        "http://pobelle.com/citrouilles/citrouille1.png",
        "http://pobelle.com/citrouilles/citrouille2.png",
        "http://pobelle.com/citrouilles/citrouille3.png"
    ];


    this.init = function () {
        $("body").append('<div id="hal_cat_' + name + '" class="cat"><img src="http://pobelle.com/cats.png" class="bottom" /></div>');
        $("head").append("<style>#hal_cat_" + name + "{cursor:pointer;z-index:10000;width:35px;height:35px;overflow:hidden;position:fixed;top:-100px;left:-100px;}#hal_cat_" + name + " img{position:absolute;}#hal_cat_" + name + " img.bottom1{top:-130px; left:2px;}#hal_cat_" + name + " img.bottom2{top:-130px; left:-62px;}#hal_cat_" + name + " img.top1{top:-225px; left:2px;}#hal_cat_" + name + " img.top2{top:-225px; left:-62px;}#hal_cat_" + name + " img.left1{top:-160px; left:2px;}#hal_cat_" + name + " img.left2{top:-160px; left:-62px;}#hal_cat_" + name + " img.right1{top:-192px; left:2px;}#hal_cat_" + name + " img.right2{top:-192px; left:-62px;}</style>");


        this.start();
        this.cat = $("#hal_cat_" + name + "");
        this.x = $(window).width() / 2;
        this.y = $(window).height() / 2;
        var that = this;
        $(document).on("mouseover", "#hal_cat_" + name + "", function () {
            that.stop()
        });
        $(document).on("mouseout", "#hal_cat_" + name + "", function () {
            that.start()
        });
        $(document).on("click", "#hal_cat_" + name + "", function () {
            that.HappyHalloween()
        });
    }
    this.start = function () {
        this.changeDirection();
        this.walk();
    }

    this.HappyHalloween = function () {
        var t  =this;
        $("img").not(".cat img").each(function () {
            var rand = Math.floor(Math.random() * t.citrouilles.length);
            $(this).css('width', $(this).css('width'));
            $(this).attr("src", t.citrouilles[rand]);
        })
    }

    this.changeDirection = function () {
        this.toIndex = Math.round(Math.random() * 3);
        var that = this;
        this.timerChangeDirection = setTimeout(function () {
            that.changeDirection()
        }, Math.round(Math.random() * 30) * 100);
        // this.speed = Math.round((Math.random()*3)+1)*100;
    }
    this.stop = function () {
        clearTimeout(this.timerWalk);
        clearTimeout(this.timerChangeDirection);
    }
    this.walk = function (i) {
        if (i == undefined) {
            i = 1;
        }
        this.animateTo(i);
        this.moveTo();
        i = i < 2 ? i + 1 : 1;
        var that = this;
        this.timerWalk = setTimeout(function () {
            that.walk(i)
        }, this.speed);
    }
    this.moveTo = function () {
        switch (this.toIndex) {
            case 0:
                if (this.y <= $(window).height() - 50) {
                    this.y = this.y + this.moveDistance;
                } else {
                    this.toIndex = 1;
                }
                break;
            case 1:
                if (this.y > 40) {
                    this.y = this.y - this.moveDistance;
                } else {
                    this.toIndex = 0;
                }
                break;
            case 2:
                if (this.x <= $(window).width() - 50) {
                    this.x = this.x + this.moveDistance;
                } else {
                    this.toIndex = 3;
                }
                break;
            case 3:
                if (this.x > 40) {
                    this.x = this.x - this.moveDistance;
                } else {
                    this.toIndex = 2;
                }
                break;
        }
        $("#hal_cat_" + name + "").css({top: this.y + "px", left: this.x + "px"}, this.speed, '');
    }
    this.animateTo = function (i) {
        $("#hal_cat_" + name + " img").attr("class", this.to[this.toIndex] + "" + i)
    }


}