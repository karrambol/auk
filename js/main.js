var timer = {
    time: 600000,
    timerID: 0,
    timeString: '10:00.000',
    min: 10,
    sec: 0,
    dateAct: new Date(),
    dateEnd: 0,
    // Умный тик
    smartTick: function(tickValue) {
        if (this.time >= tickValue) {
            this.dateAct = new Date();
            this.time = this.dateEnd.getTime() - this.dateAct.getTime();
        } else {
            clearInterval(this.timerID);
            this.timerID = 0;
            timer.clockTimeFieldRefresh();
            this.time = 0;
            document.querySelector('.start-stop-btn').innerHTML = 'СТАРТ';
        };
        timer.clockTimeFieldRefresh();
    },
    // Ф-ция кнопки обнулить
    clear: function() {
        this.time = 0;
        this.stop();
        timer.clockTimeFieldRefresh();
        this.timerID = 0;
        this.dateEnd = 0;
        this.textUnderShow(false);
    },
    // Старт
    start: function(tickValue) {
        this.dateEndRefresh();
        document.getElementById("text-under-p").style.color = '#212121';
        if (this.timerID == 0) {
        let _this = this;
        this.timerID = setInterval(function () {_this.smartTick(tickValue);}, tickValue, tickValue);
        } else {console.log("already started");}
        this.textUnderShow(true);        
        document.querySelector('.start-stop-btn').innerHTML = 'СТОП';
    },
    // Стоп
    stop: function() {
        clearInterval(this.timerID);
        this.timerID = 0;
        timer.clockTimeFieldRefresh();
        this.textUnderShow(false);
        document.querySelector('.start-stop-btn').innerHTML = 'СТАРТ';
    },
    // Добавить время таймера
    addTime: function(addValue) {
        this.time += addValue;
        // if {this.time > }
        timer.clockTimeFieldRefresh();
        this.dateEndRefresh();
    },
    // Установить время таймера
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
    // Ф-ция для кнопки старт/стоп
    startStop: function (tickValue) {
        if (this.timerID == 0) {
            this.start(tickValue);
            } else {this.stop();}
    },
    // Обновить текстовое поле с обратным отсчётом
    clockTimeFieldRefresh: function () {
        this.minSecToString();
        document.getElementById('clockTimeField').innerHTML = this.timeString + "<span>" + this.timeStringEnd + "</span>";
    },
    // Обновить время окончания таймера
    dateEndRefresh: function() {
        
        this.dateEnd = new Date(new Date().getTime() + this.time);
        document.getElementById('date-end').innerHTML = ('00' + this.dateEnd.getHours().toFixed(0)).slice(-2) + ':' + ('00' + this.dateEnd.getMinutes().toFixed(0)).slice(-2) + ':' + ('00' + this.dateEnd.getSeconds().toFixed(0)).slice(-2);
    },
    // Обновить текущее время
    dateActRefresh: function() {
        this.dateAct = new Date();
        document.getElementById('date-act').innerHTML = ('00' + this.dateAct.getHours().toFixed(0)).slice(-2) + ':' + ('00' + this.dateAct.getMinutes().toFixed(0)).slice(-2) + ':' + ('00' + this.dateAct.getSeconds().toFixed(0)).slice(-2);
    },
    // Показывать/не показывать текст снизу
    textUnderShow: function(_set) {
        if (_set == true) {document.getElementById("text-under-p").style.color = '#212121';
        } else { document.getElementById("text-under-p").style.color = 'transparent';
    }
    }
};
var prevLength = 0;
var _this = 0;
var prevAcc = 0;
var table = {
    selectorPos: 0,
    id: '#auk-sheet',
    ref: $('#auk-sheet').val(),
    content: $(this.id).val(),
    lines: 0,
    placeHoldingText: '1 Бегущий по лезвию 2049 - 5000 р.',
    contentArray: [0],
    isToped: false,
    // Прочитать textarea и записать в таблицу
    read: function () {
        this.content = $(this.id).val();
        this.contentArray = this.content.split(/[\n\r]+/);
        return this.contentArray;
    },
    // Создать текст для теста
    createText: function (Value) {
        for (i = 1; i < Value; i++) {
            this.placeHoldingText = this.placeHoldingText + '\n' + (i+1) + ' Бегущий по лезвию 2049 - 5000 р.';
        };
        return this.placeHoldingText;
    },
    // Запись текста
    write: function (value) {
        $(this.id).val(value);
    },
    // Заполнить number'ом строк 
    hold: function (number) {
        this.write(this.createText(number));
    },
    // Поменять строки numberFrom и numberTo местами
    stringSwap: function (numberFrom, numberTo) {
        _this = this
        this.read();
        let _numberTo = this.contentArray[(numberTo-1)] + '';
        this.contentArray[(numberTo-1)] = this.contentArray[(numberFrom-1)];
        this.contentArray[(numberFrom-1)] = _numberTo;
        this.write(this.contentArray.reduce(_this.reducer));
    },
    reducer: function (accumulator, currentValue) {
       return accumulator + '\n' + currentValue;
    },
    // Поднять строку number на одну вверх
    stringUp: function (number) {
        if (number == 1) {return};
        this.stringSwap(number, number-1);
    },
    // Поднять строку number на первое место
    stringTop: function (number) {
        for (i = number; i > 1; i-- ) {
            this.stringSwap(i, (i-1));
        };
    },
    // Поднять строку под курсором на одну вверх
    stringUpBtn: function () {
        _this = this;
        this.read();
        this.selector();
        this.isToped = false;
        this.contentArray.reduce(_this.strUpBtnReducer, 0);
    },
    strUpBtnReducer: function (acc, str, num) {
        let accPrev = acc;
        acc = acc + str.length + 1;
        
        if (acc > _this.selectorPos && _this.isToped == false) {
            _this.stringUp(num+1); 
            _this.isToped = true;
            _this.selertorPlace(accPrev-1-prevLength);
        };
        prevLength = str.length;
        return acc;
    },
    // Поднять строку под курсором на первое место
    stringTopBtn: function () {
        _this = this;
        this.read();
        this.selector();
        this.isToped = false;
        this.contentArray.reduce(_this.strTopBtnReducer, 0);       
    },
    strTopBtnReducer: function (acc, str, num) {
        accPrev = acc;
        acc = acc + str.length + 1;
        curLength = str.length+1;
        if (acc > _this.selectorPos && _this.isToped == false) {
            _this.stringTop(num+1); 
            _this.isToped = true;
            _this.selertorPlace(acc - prevLength);
        };
        prevLength = curLength;
        return acc;
    },
    // Определение позиции курсора
    selector: function() {
        return this.selectorPos =  $('#auk-sheet').prop("selectionStart");
    },
    // Установка курсора в pos
    selertorPlace: function (pos) {
        if (pos >= 0) {
        $('#auk-sheet').prop("selectionStart", pos);
        $('#auk-sheet').prop("selectionEnd", pos);
        $('#auk-sheet').focus();
        } else {
        $('#auk-sheet').prop("selectionStart", 0);
        $('#auk-sheet').prop("selectionEnd", 0);
        $('#auk-sheet').focus();
        }

    },
    // Мультипликация font size
    fzMulti: function (mult) {
        let fzCurrent = $('#auk-sheet').css('font-size');
        let fzNew = parseInt(fzCurrent) * mult;
        $('#auk-sheet').css('font-size', fzNew + 'px');
    },
    // Мультипликация line heght
    lhMulti: function (mult) {
        let lhCurrent = $('#auk-sheet').css('line-height');
        let fzCurrent = $('#auk-sheet').css('font-size');
        let lhCur = parseInt(lhCurrent) / parseInt(fzCurrent);
        let lhNew = lhCur * mult;
        $('#auk-sheet').css('line-height', lhNew);
    },

    
};


var auto = {
    
    content: [],

    names: [],
    prices: [],
    adds:[],
    container: $('#auto-sheet'),
    addLot: () => {
        let i = 1 + $('#auto-sheet').children().length;
        $('#auto-sheet').append('<div class="row lot-row justify-content-center" id="lot-' + i + '"><input type="text" class="lot-title" id="title-' + i + '"> <div class="between">-</div> <input type="number" class="lot-price" onchange="auto.sorting()" id="price-' + i + '"> <div class="between">р.</div> <input type="number" class="lot-add-price" id="add-' + i + '"><div class="between between-2"></div> <button  title = "Добавить ставку" type="button" class="btn btn-dark" onclick="auto.addPrice(' + i + '), auto.sorting();">+</button></div>');
        // document.getElementById('price-' + i).value = 0;
        // document.getElementById('add-' + i).value = 0;
    },
    read: () => {
        let a = $('#auto-sheet').children().length;
        
        for (i=1; i <= a; i++) {
            if (auto.content.length < i) {auto.content.push({name: '', price: '', add: '', priceMath: '', addMath: ''})};
            auto.content[(i-1)].name = document.getElementById('title-' + i).value;
            auto.content[(i-1)].price = document.getElementById('price-' + i).value;
            auto.content[(i-1)].add = document.getElementById('add-' + i).value;  

            auto.content[(i-1)].priceMath = parseFloat(document.getElementById('price-' + i).value);
            auto.content[(i-1)].addMath = parseFloat(document.getElementById('add-' + i).value);   
            
            // if (isNaN(auto.content[(i-1)].price)) {auto.content[(i-1)].priceMath = 0}
            // if (isNaN(auto.content[(i-1)].add)) {auto.content[(i-1)].addMath = 0}

        };
        
        
    },
    write: () => {
        a = auto.content.length;
        for (i=1; i <= a; i++) {
            document.getElementById('title-' + i).value = auto.content[(i-1)].name;
            document.getElementById('price-' + i).value = auto.content[(i-1)].price;
            document.getElementById('add-' + i).value = auto.content[(i-1)].add;           
        };
    },
    addPrice: (num) => {
        
        if ( document.getElementById('price-' + num).value == '') {document.getElementById('price-' + num).value = 0}
        if ( document.getElementById('add-' + num).value == '') {return}
        document.getElementById('price-' + num).value = 0 + parseInt(document.getElementById('price-' + num).value) + parseInt(document.getElementById('add-' + num).value);

    },
    sorting: () => {
        auto.read();
        auto.content.sort(function (a, b) {
            ai = a.priceMath
            bi = b.priceMath
            if (isNaN(a.priceMath)) {ai = 0}
            if (isNaN(b.priceMath)) {bi = 0}
            

            if (ai > bi) {
              return -1;
            }
            if (ai < bi) {
              return 1;
            }
            return 0;
          });

          auto.write();
    },



};

const legacyOn = () => {
    document.getElementById('auto-container').style = 'display: none;';
    document.getElementById('legacy-sheet').style = 'display: unset;';
    for (i=0; i<auto.content.length; i++) {
    table.contentArray[i] = auto.content[i].name + ' - ' + auto.content[i].price + ' р.';
    console.dir(table.contentArray);
    table.write(table.contentArray.reduce(table.reducer));
    };
};
const autoOn = () => {
    document.getElementById('auto-container').style = 'display: unset;';
    document.getElementById('legacy-sheet').style = 'display: none;';
}



const autoHoldTest = (num) => {
    for (i=1; i<num; i++) {
        auto.addLot();
    };
    auto.read();
    for (i=1; i<=num; i++) {
        auto.content[(i-1)].name = i + ' Скотт пилигрим против всех';
        auto.content[(i-1)].price = i*1000;
        auto.content[(i-1)].add = i*100;
    };
    auto.write();
};

const autoHold = (num) => {
    for (i=1; i<num; i++) {
        auto.addLot();
    };
};


// document.getElementById('price-1').value = 0;
// document.getElementById('add-1').value = 0;
autoHold(10);
// autoHoldTest(10);
// console.dir(auto.content[0].name);







setInterval(timer.dateActRefresh,500);





table.read();
















// document.getElementById('buttons-col').oninput = buttonsRefresh();




// input1.oninput = function() {
//     input2.value = this.value;
//     input2.dispatchEvent(new Event('input'));
//   };