var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
		// 애드몹 광고 단위 id 선언
		if( /(android)/i.test(navigator.userAgent) ) { // android인 경우 id
			admob.banner.config({
				id: 'ca-app-pub-3940256099942544/6300978111',	// 테스트 id
				isTesting: true,		// 실제 id를 넣었을 때 클릭해도 테스트광고로 인식하게 할 때 true (오픈전엔 꼭 빼야함)
				//size: 'BANNER',		// 배너 크기로 다음 중 선택 -> BANNER, IAB_BANNER, IAB_LEADERBOARD, IAB_MRECT, LARGE_BANNER, SMART_BANNER, FLUID (생략시 기본값은 SMART_BANNER)
				//bannerAtTop: true,	// 배너를 위로 올리려면 true
			});
			admob.interstitial.config({
				id: 'ca-app-pub-3940256099942544/8691691433',	// 테스트 id
				//autoShow: false,	//호출시 자동으로 보이지 않게 하려면 false
			});
			admob.rewardvideo.config({
				id: 'ca-app-pub-3940256099942544/5224354917',	// 테스트 id
			});
		} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // ios인 경우 id
			admob.banner.config({
                id: 'ca-app-pub-3940256099942544/2934735716',	// 테스트 id
				//offsetTopBar: true,	// ios7 상태 표시줄과 겹치지 않으려면 true
            });
            admob.interstitial.config({
                id: 'ca-app-pub-3940256099942544/5135589807',	// 테스트 id
            });
            admob.rewardvideo.config({
                id: 'ca-app-pub-3940256099942544/1712485313',	// 테스트 id
            });
		} else { // 그 외 windows phone 인 경우 id
			admob.banner.config({
				id: 'ca-app-pub-xxx/zzz',
			});
			admob.interstitial.config({
				id: 'ca-app-pub-xxx/kkk',
			});
		}

        // back버튼 이벤트 추가
		document.addEventListener("backbutton", function (e) {
			var pageId = $(".ui-page-active").attr("id");
			if (pageId == "page1") {
				if (confirm("앱을 종료하시겠습니까?")) {
					e.preventDefault();
					navigator.app.exitApp();
				}
			} else if (pageId == "step2") {
				document.location.replace("#page1");
			} else {
				history.back();
				//navigator.app.backHistory();
			}
		}, false);

		setTimeout(function(){	// 첫화면 2.5초 후에 넘어가도록 처리
			var pageId = $(".ui-page-active").attr("id");
			if(pageId == "page0"){
				document.location.replace("#page1");
			}

			admob.banner.prepare();			// 배너 준비 및 호출
			admob.rewardvideo.prepare();	// 리워드 광고 준비
		},2500);

		this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

		// 각 버튼 별 클릭시 이동할 곳 설정
		$("#youtube").click({url:"#page2", me:this}, this.openPage);
		$("#afreecatv").click({url:"http://play.afreecatv.com/dlghfjs/216307994", me:this}, this.showUrl);
		$("#twitch").click({url:"https://www.twitch.tv/hanryang1125", me:this}, this.showUrl);
		$("#facebook").click({url:"https://www.facebook.com/2ahrin", me:this}, this.showUrl);
		$("#instagram").click({url:"https://www.instagram.com/tzuyang70/", me:this}, this.showUrl);
		$("#twitter").click({url:"https://twitter.com/rudalson", me:this}, this.showUrl);
		$("#tiktok").click({url:"http://vt.tiktok.com/JXoXVs/", me:this}, this.showUrl);
		$("#toonation").click({url:"https://rudalson.com/", me:this}, this.showUrl);
		$("#twip").click({url:"https://twip.kr/아이디코드", me:this}, this.showUrl);
		$("#daumcafe").click({url:"http://cafe.daum.net/flower7695", me:this}, this.showUrl);
		$("#navercafe").click({url:"https://cafe.naver.com/lilka", me:this}, this.showUrl);
		$("#tistory").click({url:"https://rudalson.tistory.com", me:this}, this.showUrl);
		$("#naverblog").click({url:"https://flex77.blog.me/", me:this}, this.showUrl);
		$("#kakaotalk").click({url:"http://pf.kakao.com/아이디코드", me:this}, this.showUrl);	// 오픈채팅방

		// 유튜브 리스트 클릭시 호출할 함수 설정
		$(".mlist").click(this.playYT);

		// 비밀 유튜브 리스트 클릭시 호출할 함수 설정 (리워드 광고 본 사람만 시청가능)
		$(".slist").click(this.secretChk);

		document.addEventListener('admob.rewardvideo.events.REWARD',function(event){	// 리워드광고 다 보고난 후 보상처리
			try {
				window.InAppYouTube.openVideo(sid, {
				fullscreen: false
				}, function(result) {
					//alert(JSON.stringify(result));
				}, function(reason) {
					//alert(reason);
				});
			} catch(e) {
				// Exception!
			}
		});

		document.addEventListener('admob.rewardvideo.events.CLOSE',function(event){	// 리워드광고 닫았을 때 후 처리
			admob.rewardvideo.prepare();
		});

		document.addEventListener('admob.rewardvideo.events.LOAD_FAIL',function(event){	// 리워드광고 불러오기 실패 후 처리
			adLoadChk = "N";	// 리워드 못불러왔을 때 플래그 값만 추가
		});

    },

	openPage: function(e) {	// 받아온 페이지id로 이동하는 함수
		this.src = "img/crystal-ball-click.png";
		e.data.me.btnClick();	// 버튼 클릭 효과 호출
		var pg = e.data.url;
		document.location = pg;
		setTimeout(function(){
			this.src = "img/crystal-ball.png";
		}.bind(this),1000);
	},

	showUrl: function(e) {	// 받아온 URL주소 열어주는 함수
		this.src = "img/crystal-ball-click.png";
		e.data.me.btnClick();	// 버튼 클릭 효과 호출
		var url = e.data.url;
		if(url == ""){
			alert("연결된 주소가 없습니다.");
			return;
		}
		adcnt += 1;	// 전면광고 여부 카운트
		e.data.me.loadShow();	//로딩 이미지 호출
		var target = "_blank";
		var options = "location=yes";
		inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);
		inAppBrowserRef.addEventListener('loadstart', app.loadStart);
/*		inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);
		inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);
		inAppBrowserRef.addEventListener('beforeload', beforeloadCallBack);
		inAppBrowserRef.addEventListener('message', messageCallBack);*/
		setTimeout(function(){
			this.src = "img/crystal-ball.png";
		}.bind(this),1000);
	},

	loadShow: function(){	// 로딩 이미지 보여주는 함수
		$.mobile.loading("show", {
			text: "Loading",
			textVisible: true,
			theme: "b",
			textonly: false,
			html: ""
		});
	},

	loadStart: function(){	// 인앱 브라우저 실행되면 로딩 이미지 숨기는 함수
		$.mobile.loading("hide");
	},

	secretChk: function() {	// 리워드 광고 볼 수 있는지 확인하고 광고 호출
		if(adLoadChk == "N"){
			adLoadChk = "";
			admob.rewardvideo.prepare();
			alert("광고를 불러오지 못했습니다.\n잠시후 다시 시도해주세요.");
		}
		else{
			sid = $(this).attr("vid");
			admob.rewardvideo.show();
		}
	},

	playYT: function() {	// 유튜브 영상 플레이
		var id = $(this).attr("vid");
		adcnt += 1;	// 전면광고 여부 카운트
		try {
			window.InAppYouTube.openVideo(id, {
			fullscreen: false
			}, function(result) {
				//alert(JSON.stringify(result));
			}, function(reason) {
				//alert(reason);
			});
		} catch(e) {
			// Exception!
		}
	},

	admobcnt: function(){	// 카운트 하여 전면광고 띄움
		if(adtotal == 0){
			return;
		}

		if(adcnt >= adtotal){
			admob.interstitial.prepare();
			adcnt = 0;
		}
	},

	btnClick: function(){	// 버튼 클릭 효과
		var my_media = new Media("/android_asset/www/sound/s1.wav");
		my_media.play();
		navigator.vibrate(50);	// 0.05초간 진동
	},
};

var inAppBrowserRef;	// 인앱브라우저로 사용할 변수 선언
var adtotal = 3;	// 애드몹 전면광고 컨텐츠 몇번 이용시 한번씩 보여줄지 지정 ( 0이면 전면광고 사용 안함, 1이상이면 해당 카운트 마다 전면 광고 보여줌)
var adcnt = 0;	// 전면광고 보여줄 페이지 전환 카운트
var adLoadChk = "";	// 리워드광고 못불러 오면 N
var sid = "";	// 시크릿 영상 클릭시 해당 유튜브 id 임시저장용

app.initialize();	// 첫 시작시 호출

$(document).on("pagechange",function(event){	// 페이지가 바뀔 때 마다 실행
	app.admobcnt();	// 전면 광고 함수 호출
});

$(document).on("scrollstop",function(event){	// 스크롤이 멈추는 시점마다 실행
	app.admobcnt();	// 전면 광고 함수 호출
});
