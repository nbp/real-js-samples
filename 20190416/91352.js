function _jsload(src){var sc=document.createElement("script");sc.type="text/javascript";sc.async=true;sc.src=src;var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(sc,s);};(function(){document.getElementById("unit_91352").innerHTML="<h3 class=\"subtitle\">Новости партнеров</h3> <div class=\"slider involve\"> <div class=\"slider-canvas involve__canvas container_91352\" id=\"container_91352\"></div> <div class=\"involve__slider_nav involve__slider_prev slider-prev\"> <a href=\"#\" class=\"slider-link\" title=\"Предыдущий слайд\" tabindex=\"-1\"> <span class=\"vicon vicon--gull_right\"> <svg class=\"vicon__body\"><svg id=\"vicon-small_up_arrow\" viewBox=\"0 0 14 9.1\" width=\"100%\" height=\"100%\"><path d=\"M11.8 9.1L7 4.3 2.1 9.1 0 7l7-7 7 7z\"></path></svg></svg> </span> </a> </div> <div class=\"involve__slider_nav involve__slider_next slider-next\"> <a href=\"#\" class=\"slider-link\" title=\"Следующий слайд\" tabindex=\"-1\"> <span class=\"vicon vicon--gull_left\"> <svg class=\"vicon__body\"><svg id=\"vicon-small_up_arrow\" viewBox=\"0 0 14 9.1\" width=\"100%\" height=\"100%\"><path d=\"M11.8 9.1L7 4.3 2.1 9.1 0 7l7-7 7 7z\"></path></svg></svg> </span> </a> </div> </div><style>.smi2_slider .subtitle { text-align: left; border: 0; padding: 0; font: 14px/22px Georgia, serif; color: #999; margin-bottom: 9px; padding-left: 45px; text-transform: none; }</style>";var cb=function(){/** * Идентификатор блока * * @type {number} */ var block_id = 91352; if (!window['callNumber_' + block_id]) { window['callNumber_' + block_id] = 0; } /** * FIX: Первый вызов функции сохраняет innerHTML блока в глобальную * переменную window.jsApiBlockCode, второй вызов берет сохраненный * HTML и в ставляет в блок #unit_<id>. Это патч работы jsapi загрузчика. */ if (!window.jsApiBlockCode) { window.jsApiBlockCode = {}; } if (!window.jsApiBlockCode[block_id]) { window.jsApiBlockCode[block_id] = document.getElementById("unit_" + block_id).innerHTML; } else { document.getElementById("unit_" + block_id).innerHTML = window.jsApiBlockCode[block_id]; } var random = Math.random(); /*randoms*/ if(random <= 1) { /*console.log('smi2');*/ block__rotation_id = 91351; } else if((random > 0.45) && (random <= 1)) { /*console.log('m24');*/ block__rotation_id = 86821; } else if((random > 0.6)){ /*console.log('tass');*/ /* block__rotation_id = 85408; */ } else { /*console.log('error');*/ }; /** * Размер страницы (количество) загружаемых элементов * * @type {number} */ var page_size = 12; /** * Максимальное количество загружаемых страниц элементов * * @type {number} */ var max_page_count = 1; /** * Родительский элемент контейнера * * @type {HTMLElement} */ var parent_element = JsAPI.Dom.getElement("container_91352"); /** FIX: Данный блок 4 раза загружается на 1 странице - все данные попадают * в первый блок (id=container-87540), я удаляю id у первого чтобы второй скрипт брал * второй div[id=container-87540] и т.д. со вторым, третьим... **/ parent_element.id = null; parent_element.parentNode.parentNode.id = null; /** * Настройки блока * * @type {*} */ var properties = undefined; /** * Callback-функция рендера содержимого элемента * * @type {function(HTMLElement, *, number)} */ var item_content_renderer = function (parent, model, index) { JsAPI.Dom.appendChild(parent, JsAPI.Dom.createDom('article', 'slider-item involve__item', JsAPI.Dom.createDom('a', { 'href': model['url'], 'target': '_blank' }, [ JsAPI.Dom.createDom('div', 'photo', JsAPI.Dom.createDom('img', { 'src': model['image'], 'alt': '' })), JsAPI.Dom.createDom('h3', 'involve__name', model['title']) ]) )); }; /** * Маска требуемых параметров (полей) статей * * @type {number|undefined} */ var opt_fields = JsAPI.Dao.NewsField.TITLE | JsAPI.Dao.NewsField.IMAGE; /** * Создание list-блока */ JsAPI.Dao.getNews({ 'count': page_size, 'block_id': block__rotation_id, 'fields': opt_fields }, function (items) { items.forEach(function(model, index) { item_content_renderer(parent_element, model, index); }); var block = document.querySelectorAll('.container_91352')[window['callNumber_' + block_id]]; /*headers*/ var headEl = block.parentNode.previousElementSibling; var agency = ''; if(block__rotation_id == 85408) { agency = 'тасс' } else if(block__rotation_id == 91351) { agency = 'Новости партнеров' } else if(block__rotation_id == 86821) { agency = 'м24' }; headEl.innerHTML = agency; /* Генерируем событие после загрузки тизеров */ var event = document.createEvent('Event'); event.initEvent("smi2Loaded", true, true); block.dispatchEvent(event); window['callNumber_' + block_id]++; }, function (reason) { });};if(!window.jsapi){window.jsapi=[];_jsload("//static.smi2.net/static/jsapi/jsapi.v1.8.3.ru_RU.js");}window.jsapi.push(cb);}());(function(){ window.ttsmi2_data={blockid:91352,siteid:44322};if(!window.smi2TrackerSend){window.smi2TrackerSend={};var a=window.ttsmi2_data||{};a.bw=window.innerWidth;a.bh=window.innerHeight;var b=document.referrer;b&&""!=b&&(a.ref=b);a.rnd=Math.floor(1E13*Math.random());var c=[],d;for(d in a)a.hasOwnProperty(d)&&c.push(encodeURIComponent(d)+"="+encodeURIComponent(a[d]));var e=new Image;e.width=1;e.height=1;e.src="//target.smi2.ru/init/?"+c.join("&")}; })();/* StatMedia */(function(w,d,c){(w[c]=w[c]||[]).push(function(){try{w.statmedia44322=new StatMedia({'id':44322});}catch(e){}});if(!window.__statmedia){var p=d.createElement('script');p.type='text/javascript';p.async=true;p.src='https://stat.media/sm.js';var s=d.getElementsByTagName('script')[0];s.parentNode.insertBefore(p,s);}})(window,document,'__statmedia_callbacks');/* /StatMedia */