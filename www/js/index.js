/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
        // back버튼 이벤트 추가
		document.addEventListener("backbutton", function(e){
			var pageId = $(".ui-page-active").attr("id");
			if(pageId == "page1"){
				if(confirm("앱을 종료하시겠습니까?")){
					e.preventDefault();
					navigator.app.exitApp();
				}
			}
			else if(pageId == "step2"){
				document.location.replace("#page1");
			}
			else{
				history.back();
				//navigator.app.backHistory();
			}
		}, false);

		setTimeout(function(){	// 첫화면 2.5초 후에 넘어가도록 처리
			var pageId = $(".ui-page-active").attr("id");
			if(pageId == "page0"){
				document.location.replace("#page1");
			}

		},2500);

		this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {

		// 각 버튼 별 클릭시 이동할 곳 설정
		$("#youtube").click("#page2", this.openPage);
		$("#afreecatv").click("http://play.afreecatv.com/dlghfjs/216307994", this.showUrl.bind(this));
		$("#twitch").click("https://www.twitch.tv/hanryang1125", this.showUrl.bind(this));
		$("#facebook").click("https://www.facebook.com/%EB%8D%95%EC%9E%90%EC%A0%84%EC%84%B1%EC%8B%9C%EB%8C%80-728776874206366/", this.showUrl.bind(this));
		$("#instagram").click("https://www.instagram.com/tzuyang70/", this.showUrl.bind(this));
		$("#twitter").click("https://twitter.com/lily199iu", this.showUrl.bind(this));
		$("#tiktok").click("http://vt.tiktok.com/JXoXVs/", this.showUrl.bind(this));
		$("#toonation").click("https://toon.at/donate/chobo904", this.showUrl.bind(this));
		$("#twip").click("https://twip.kr/아이디코드", this.showUrl.bind(this));
		$("#daumcafe").click("http://cafe.daum.net/flower7695", this.showUrl.bind(this));
		$("#navercafe").click("https://cafe.naver.com/lilka", this.showUrl.bind(this));
		$("#tistory").click("https://studymake.tistory.com/113", this.showUrl.bind(this));
		$("#naverblog").click("https://flex77.blog.me/", this.showUrl.bind(this));
		$("#kakaotalk").click("http://pf.kakao.com/아이디코드", this.showUrl.bind(this));	// 오픈채팅방

		// 유튜브 리스트 클릭시 호출할 함수 설정
		$(".mlist").click(this.playYT);

    },

	openPage: function(e) {	// 받아온 페이지id로 이동하는 함수
		var pg = e.data;
		document.location = pg;
	},

	showUrl: function(e) {	// 받아온 URL주소 열어주는 함수
		var url = e.data;
		if(url == ""){
			alert("연결된 주소가 없습니다.");
			return;
		}

		this.loadShow();	//로딩 이미지 호출
		var target = "_self";
		var options = "location=yes";
		inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);
		inAppBrowserRef.addEventListener('loadstart', app.loadStart);
/*		inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);
		inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);
		inAppBrowserRef.addEventListener('beforeload', beforeloadCallBack);
		inAppBrowserRef.addEventListener('message', messageCallBack);*/
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

	playYT: function() {	// 유튜브 영상 플레이
		var id = $(this).attr("vid");

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
	}

};

var inAppBrowserRef;	// 인앱브라우저로 사용할 변수 선언

app.initialize();
