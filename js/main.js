var timer = {
    time: 600000,
    timerID: 0,
    timeString: '10:00.000',
    min: 10,
    sec: 0,
    dateAct: new Date(),
    dateEnd: 0,
    smartTick: function(tickValue) {
        if (this.time >= tickValue) {
            this.dateAct = new Date();
            this.time = this.dateEnd.getTime() - this.dateAct.getTime();
        } else {
            this.clear();
            console.log("clear");
        };
        timer.clockTimeFieldRefresh();
    },
    clear: function() {
        this.time = 0;
        this.stop();
        timer.clockTimeFieldRefresh();
        this.timerID = 0;
        this.dateEnd = 0;
        this.textUnderShow(false);
    },
    start: function(tickValue) {
        this.dateEndRefresh();
        document.getElementById("text-under-p").style.color = '#212121';
        if (this.timerID == 0) {
        let _this = this;
        this.timerID = setInterval(function () {_this.smartTick(tickValue);}, tickValue, tickValue);
        } else {console.log("already started");}
        this.textUnderShow(true);
    },
    stop: function() {
        clearInterval(this.timerID);
        this.timerID = 0;
        timer.clockTimeFieldRefresh();
        this.textUnderShow(false);
    },
    addTime: function(addValue) {
        this.time += addValue;
        // if {this.time > }
        timer.clockTimeFieldRefresh();
        this.dateEndRefresh();
    },
    setTime: function(setValue) {
        this.time = setValue;
        timer.clockTimeFieldRefresh();
        this.dateEndRefresh();
    },
    timeToMinSec: function() {
        let _this = this;
        this.min = Math.floor(_this.time / 60000);
        this.sec = ((this.time - this.min * 60000) / 1000);
    },
    minSecToString: function() {
        let _this = this;
        this.timeToMinSec();
        let _sec = ('00' + Math.floor(_this.sec)).slice(-2);
        let _min = ('00' + this.min).slice(-2);
        this.timeString = _min + ':' + _sec + ".";
        this.timeStringEnd = ("00" + this.sec.toFixed(3)).slice(-3);
    },
    minSecToTime: function(min, sec) {
        return min*60000+sec*1000;
    },
    startStop: function (tickValue) {
        if (this.timerID == 0) {
            this.start(tickValue);
            } else {this.stop();}
    },
    clockTimeFieldRefresh: function () {
        this.minSecToString();
        document.getElementById('clockTimeField').innerHTML = this.timeString + "<span>" + this.timeStringEnd + "</span>";
        // document.getElementById('clockTimeFieldEnd').innerHTML = this.timeStringEnd; // Какая-то фигня не понятная
    },
    dateEndRefresh: function() {
        // if (this.dateEnd == 0) {
            
        // } else if (this.timerID != 0) {}
        this.dateEnd = new Date(new Date().getTime() + this.time);
        document.getElementById('date-end').innerHTML = ('00' + this.dateEnd.getHours().toFixed(0)).slice(-2) + ':' + ('00' + this.dateEnd.getMinutes().toFixed(0)).slice(-2) + ':' + ('00' + this.dateEnd.getSeconds().toFixed(0)).slice(-2);
    },
    dateActRefresh: function() {
        this.dateAct = new Date();
        document.getElementById('date-act').innerHTML = ('00' + this.dateAct.getHours().toFixed(0)).slice(-2) + ':' + ('00' + this.dateAct.getMinutes().toFixed(0)).slice(-2) + ':' + ('00' + this.dateAct.getSeconds().toFixed(0)).slice(-2);
    },
    textUnderShow: function(_set) {
        if (_set == true) {document.getElementById("text-under-p").style.color = '#212121';
        } else { document.getElementById("text-under-p").style.color = 'transparent';
    }
    }
};
var table = {
    id: '#auk-sheet',
    ref: $('#auk-sheet').val(),
    content: $(this.id).val(),
    lines: 0,
    placeHoldingText: '1 В филадельфии всегда солнечно - 5000.00 р.',
    contentArray: 0,
    read: function () {
        this.content = $(this.id).val();
        return this.contentArray = this.content.split(/[\n\r]+/);
    },
    createText: function (Value) {
        for (i = 1; i < Value; i++) {
            this.placeHoldingText = this.placeHoldingText + '\n' + (i+1) + ' В филадельфии всегда солнечно - 5000.00 р.';
        };
        return this.placeHoldingText;
    },
    write: function (value) {
        $(this.id).val(value);
    },

    hold: function (number) {
        this.write(this.createText(number));
    },
    stringUp: function (numberFrom, numberTo) {
        _this = this
        this.read();
        let _numberTo = this.contentArray[(numberTo-1)] + '';
        this.contentArray[(numberTo-1)] = this.contentArray[(numberFrom-1)];
        this.contentArray[(numberFrom-1)] = _numberTo;
        this.write(this.contentArray.reduce(_this.reducer));
    },
    reducer: function (accumulator, currentValue) {
       return accumulator + '\n' + currentValue;
    }
};

setInterval(timer.dateActRefresh,500);

// console.log(table.read());
table.hold(11);
// console.log(table.read());
table.stringUp(6, 1);


