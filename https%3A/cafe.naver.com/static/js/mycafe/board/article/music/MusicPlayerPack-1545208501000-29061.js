!function(d){function b(e){if(a[e]){return a[e].exports;}var c=a[e]={exports:{},id:e,loaded:!1};return d[e].call(c.exports,c,c.exports,b),c.loaded=!0,c.exports;}var a={};return b.m=d,b.c=a,b.p="",b(0);}([function(d,b,a){a(3),d.exports=a(2);},,function(module,exports,__webpack_require__){eval('PlayerManagerClass = function (options) {\n    this.init(options);\n}\n\nPlayerManagerClass.prototype.init = function (options) {\n    var protocol = (!!location.href.match(/http:.*/)) ? "http:" : "https:";\n    var cacheEvictParam = Math.floor(new Date().getTime() / (1000 * 60 * 10)) * (1000 * 60 * 10);\n\n    options = (!!options) ? options : {};\n    options.playerLauncherCheckerJsUrl = (!!options.playerLauncherCheckerJsUrl ? options.playerLauncherCheckerJsUrl : protocol+({"playerLauncherCheckerJsUrl":"//playerui.music.naver.com/js/lib/PlayerAgentChecker.js","musicPlayerLauncherUrl":"//playerui.music.naver.com/js/lib/launcher/MusicPlayerLauncher.js","nmpLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/NMPLauncher.js","nmpLauncherSwfUrl":"//playerui.music.naver.com/js/lib/launcher/NMP_web_player_launcher.swf","nmpflashObjectJsUrl":"//playerui.music.naver.com/js/lib/launcher/flashObject.js","webStreamingPlayerLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/WebStreamingPlayerLauncher.js","nmpPlayerUrl":"https://player.music.naver.com","playeruiUrl":"https://playerui.music.naver.com"}).playerLauncherCheckerJsUrl+"?v="+cacheEvictParam);\n    options.musicPlayerLauncherUrl = (!!options.musicPlayerLauncherUrl ? options.musicPlayerLauncherUrl : protocol+({"playerLauncherCheckerJsUrl":"//playerui.music.naver.com/js/lib/PlayerAgentChecker.js","musicPlayerLauncherUrl":"//playerui.music.naver.com/js/lib/launcher/MusicPlayerLauncher.js","nmpLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/NMPLauncher.js","nmpLauncherSwfUrl":"//playerui.music.naver.com/js/lib/launcher/NMP_web_player_launcher.swf","nmpflashObjectJsUrl":"//playerui.music.naver.com/js/lib/launcher/flashObject.js","webStreamingPlayerLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/WebStreamingPlayerLauncher.js","nmpPlayerUrl":"https://player.music.naver.com","playeruiUrl":"https://playerui.music.naver.com"}).musicPlayerLauncherUrl+"?v="+cacheEvictParam);\n    options.nmpLauncherJsUrl = (!!options.nmpLauncherJsUrl ? options.nmpLauncherJsUrl : protocol+({"playerLauncherCheckerJsUrl":"//playerui.music.naver.com/js/lib/PlayerAgentChecker.js","musicPlayerLauncherUrl":"//playerui.music.naver.com/js/lib/launcher/MusicPlayerLauncher.js","nmpLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/NMPLauncher.js","nmpLauncherSwfUrl":"//playerui.music.naver.com/js/lib/launcher/NMP_web_player_launcher.swf","nmpflashObjectJsUrl":"//playerui.music.naver.com/js/lib/launcher/flashObject.js","webStreamingPlayerLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/WebStreamingPlayerLauncher.js","nmpPlayerUrl":"https://player.music.naver.com","playeruiUrl":"https://playerui.music.naver.com"}).nmpLauncherJsUrl+"?v="+cacheEvictParam);\n    options.nmpLauncherSwfUrl = (!!options.nmpLauncherSwfUrl ? options.nmpLauncherSwfUrl : protocol+({"playerLauncherCheckerJsUrl":"//playerui.music.naver.com/js/lib/PlayerAgentChecker.js","musicPlayerLauncherUrl":"//playerui.music.naver.com/js/lib/launcher/MusicPlayerLauncher.js","nmpLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/NMPLauncher.js","nmpLauncherSwfUrl":"//playerui.music.naver.com/js/lib/launcher/NMP_web_player_launcher.swf","nmpflashObjectJsUrl":"//playerui.music.naver.com/js/lib/launcher/flashObject.js","webStreamingPlayerLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/WebStreamingPlayerLauncher.js","nmpPlayerUrl":"https://player.music.naver.com","playeruiUrl":"https://playerui.music.naver.com"}).nmpLauncherSwfUrl+"?v="+cacheEvictParam);\n    options.nmpflashObjectJsUrl = (!!options.nmpflashObjectJsUrl ? options.nmpflashObjectJsUrl : protocol+({"playerLauncherCheckerJsUrl":"//playerui.music.naver.com/js/lib/PlayerAgentChecker.js","musicPlayerLauncherUrl":"//playerui.music.naver.com/js/lib/launcher/MusicPlayerLauncher.js","nmpLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/NMPLauncher.js","nmpLauncherSwfUrl":"//playerui.music.naver.com/js/lib/launcher/NMP_web_player_launcher.swf","nmpflashObjectJsUrl":"//playerui.music.naver.com/js/lib/launcher/flashObject.js","webStreamingPlayerLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/WebStreamingPlayerLauncher.js","nmpPlayerUrl":"https://player.music.naver.com","playeruiUrl":"https://playerui.music.naver.com"}).nmpflashObjectJsUrl+"?v="+cacheEvictParam);\n    options.webStreamingPlayerLauncherJsUrl = (!!options.webStreamingPlayerLauncherJsUrl ? options.webStreamingPlayerLauncherJsUrl : protocol+({"playerLauncherCheckerJsUrl":"//playerui.music.naver.com/js/lib/PlayerAgentChecker.js","musicPlayerLauncherUrl":"//playerui.music.naver.com/js/lib/launcher/MusicPlayerLauncher.js","nmpLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/NMPLauncher.js","nmpLauncherSwfUrl":"//playerui.music.naver.com/js/lib/launcher/NMP_web_player_launcher.swf","nmpflashObjectJsUrl":"//playerui.music.naver.com/js/lib/launcher/flashObject.js","webStreamingPlayerLauncherJsUrl":"//playerui.music.naver.com/js/lib/launcher/WebStreamingPlayerLauncher.js","nmpPlayerUrl":"https://player.music.naver.com","playeruiUrl":"https://playerui.music.naver.com"}).webStreamingPlayerLauncherJsUrl+"?v="+cacheEvictParam);\n    options.nmpFlashDivId = (!!options.nmpFlashDivId ? options.nmpFlashDivId : "nmpPlayerLauncherSwf");\n\n    this.options = options;\n}\n\nPlayerManagerClass.prototype.reset = function (options) {\n    this.init(options);\n}\n\nPlayerManagerClass.prototype.open = function() {\n    this._control("open");\n}\n\nPlayerManagerClass.prototype.add = function(commaSeperatedTrackIds) {\n    this._control("add", commaSeperatedTrackIds);\n}\n\nPlayerManagerClass.prototype.play = function(commaSeperatedTrackIds) {\n    this._control("play", commaSeperatedTrackIds);\n}\n\nPlayerManagerClass.prototype._control = function(command, commaSeperatedTrackIds) {\n\n    if (window.oPlayerLauncher === undefined) {\n        var options = {\n            playerLauncherCheckerJsUrl: this.options.playerLauncherCheckerJsUrl,\n            nmpLauncherJsUrl: this.options.nmpLauncherJsUrl,\n            nmpLauncherSwfUrl: this.options.nmpLauncherSwfUrl,\n            nmpflashObjectJsUrl: this.options.nmpflashObjectJsUrl,\n            webStreamingPlayerLauncherJsUrl: this.options.webStreamingPlayerLauncherJsUrl,\n            nmpFlashDivId: this.options.nmpFlashDivId,\n\n            onloadCallback: function() {\n                if(window.oPlayerLauncher){\n                    if(command == "add"){\n                        window.oPlayerLauncher.add(commaSeperatedTrackIds);\n                    }else if(command == "play"){\n                        window.oPlayerLauncher.play(commaSeperatedTrackIds);\n                    }else if (command == "open") {\n                        window.oPlayerLauncher.open();\n                    }else{}\n                }\n            }\n        };\n\n        var script = document.createElement("script");\n        script.onreadystatechange = function () {\n            if (this.readyState == \'loaded\' || this.readyState == \'complete\') {\n                if (!window.oPlayerLauncher) {\n                    window.oPlayerLauncher = new MusicPlayerLauncher(options)\n                }\n            }\n        }\n\n        script.onload = function () {\n            if (!window.oPlayerLauncher) {\n                window.oPlayerLauncher = new MusicPlayerLauncher(options)\n            }\n        }\n\n        script.src = this.options.musicPlayerLauncherUrl;\n        document.getElementsByTagName("head")[0].appendChild(script);\n\n    } else {\n\n        if(window.oPlayerLauncher){\n            if(command == "add"){\n                window.oPlayerLauncher.add(commaSeperatedTrackIds);\n            }else if(command == "play"){\n                window.oPlayerLauncher.play(commaSeperatedTrackIds);\n            }else if (command == "open") {\n                window.oPlayerLauncher.open();\n            }else{}\n        }\n    }\n}\n\nif (!window.PlayerManager) {\n    window.PlayerManager = new PlayerManagerClass();\n}\n\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9QbGF5ZXJNYW5hZ2VyLmpzP2QwYTMiXSwic291cmNlc0NvbnRlbnQiOlsiUGxheWVyTWFuYWdlckNsYXNzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB0aGlzLmluaXQob3B0aW9ucyk7XG59XG5cblBsYXllck1hbmFnZXJDbGFzcy5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIHByb3RvY29sID0gKCEhbG9jYXRpb24uaHJlZi5tYXRjaCgvaHR0cDouKi8pKSA/IFwiaHR0cDpcIiA6IFwiaHR0cHM6XCI7XG4gICAgdmFyIGNhY2hlRXZpY3RQYXJhbSA9IE1hdGguZmxvb3IobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAoMTAwMCAqIDYwICogMTApKSAqICgxMDAwICogNjAgKiAxMCk7XG5cbiAgICBvcHRpb25zID0gKCEhb3B0aW9ucykgPyBvcHRpb25zIDoge307XG4gICAgb3B0aW9ucy5wbGF5ZXJMYXVuY2hlckNoZWNrZXJKc1VybCA9ICghIW9wdGlvbnMucGxheWVyTGF1bmNoZXJDaGVja2VySnNVcmwgPyBvcHRpb25zLnBsYXllckxhdW5jaGVyQ2hlY2tlckpzVXJsIDogcHJvdG9jb2wrZ2xvYmFsUHJvcGVydGllcy5wbGF5ZXJMYXVuY2hlckNoZWNrZXJKc1VybCtcIj92PVwiK2NhY2hlRXZpY3RQYXJhbSk7XG4gICAgb3B0aW9ucy5tdXNpY1BsYXllckxhdW5jaGVyVXJsID0gKCEhb3B0aW9ucy5tdXNpY1BsYXllckxhdW5jaGVyVXJsID8gb3B0aW9ucy5tdXNpY1BsYXllckxhdW5jaGVyVXJsIDogcHJvdG9jb2wrZ2xvYmFsUHJvcGVydGllcy5tdXNpY1BsYXllckxhdW5jaGVyVXJsK1wiP3Y9XCIrY2FjaGVFdmljdFBhcmFtKTtcbiAgICBvcHRpb25zLm5tcExhdW5jaGVySnNVcmwgPSAoISFvcHRpb25zLm5tcExhdW5jaGVySnNVcmwgPyBvcHRpb25zLm5tcExhdW5jaGVySnNVcmwgOiBwcm90b2NvbCtnbG9iYWxQcm9wZXJ0aWVzLm5tcExhdW5jaGVySnNVcmwrXCI/dj1cIitjYWNoZUV2aWN0UGFyYW0pO1xuICAgIG9wdGlvbnMubm1wTGF1bmNoZXJTd2ZVcmwgPSAoISFvcHRpb25zLm5tcExhdW5jaGVyU3dmVXJsID8gb3B0aW9ucy5ubXBMYXVuY2hlclN3ZlVybCA6IHByb3RvY29sK2dsb2JhbFByb3BlcnRpZXMubm1wTGF1bmNoZXJTd2ZVcmwrXCI/dj1cIitjYWNoZUV2aWN0UGFyYW0pO1xuICAgIG9wdGlvbnMubm1wZmxhc2hPYmplY3RKc1VybCA9ICghIW9wdGlvbnMubm1wZmxhc2hPYmplY3RKc1VybCA/IG9wdGlvbnMubm1wZmxhc2hPYmplY3RKc1VybCA6IHByb3RvY29sK2dsb2JhbFByb3BlcnRpZXMubm1wZmxhc2hPYmplY3RKc1VybCtcIj92PVwiK2NhY2hlRXZpY3RQYXJhbSk7XG4gICAgb3B0aW9ucy53ZWJTdHJlYW1pbmdQbGF5ZXJMYXVuY2hlckpzVXJsID0gKCEhb3B0aW9ucy53ZWJTdHJlYW1pbmdQbGF5ZXJMYXVuY2hlckpzVXJsID8gb3B0aW9ucy53ZWJTdHJlYW1pbmdQbGF5ZXJMYXVuY2hlckpzVXJsIDogcHJvdG9jb2wrZ2xvYmFsUHJvcGVydGllcy53ZWJTdHJlYW1pbmdQbGF5ZXJMYXVuY2hlckpzVXJsK1wiP3Y9XCIrY2FjaGVFdmljdFBhcmFtKTtcbiAgICBvcHRpb25zLm5tcEZsYXNoRGl2SWQgPSAoISFvcHRpb25zLm5tcEZsYXNoRGl2SWQgPyBvcHRpb25zLm5tcEZsYXNoRGl2SWQgOiBcIm5tcFBsYXllckxhdW5jaGVyU3dmXCIpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbn1cblxuUGxheWVyTWFuYWdlckNsYXNzLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdGhpcy5pbml0KG9wdGlvbnMpO1xufVxuXG5QbGF5ZXJNYW5hZ2VyQ2xhc3MucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9jb250cm9sKFwib3BlblwiKTtcbn1cblxuUGxheWVyTWFuYWdlckNsYXNzLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihjb21tYVNlcGVyYXRlZFRyYWNrSWRzKSB7XG4gICAgdGhpcy5fY29udHJvbChcImFkZFwiLCBjb21tYVNlcGVyYXRlZFRyYWNrSWRzKTtcbn1cblxuUGxheWVyTWFuYWdlckNsYXNzLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24oY29tbWFTZXBlcmF0ZWRUcmFja0lkcykge1xuICAgIHRoaXMuX2NvbnRyb2woXCJwbGF5XCIsIGNvbW1hU2VwZXJhdGVkVHJhY2tJZHMpO1xufVxuXG5QbGF5ZXJNYW5hZ2VyQ2xhc3MucHJvdG90eXBlLl9jb250cm9sID0gZnVuY3Rpb24oY29tbWFuZCwgY29tbWFTZXBlcmF0ZWRUcmFja0lkcykge1xuXG4gICAgaWYgKHdpbmRvdy5vUGxheWVyTGF1bmNoZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHBsYXllckxhdW5jaGVyQ2hlY2tlckpzVXJsOiB0aGlzLm9wdGlvbnMucGxheWVyTGF1bmNoZXJDaGVja2VySnNVcmwsXG4gICAgICAgICAgICBubXBMYXVuY2hlckpzVXJsOiB0aGlzLm9wdGlvbnMubm1wTGF1bmNoZXJKc1VybCxcbiAgICAgICAgICAgIG5tcExhdW5jaGVyU3dmVXJsOiB0aGlzLm9wdGlvbnMubm1wTGF1bmNoZXJTd2ZVcmwsXG4gICAgICAgICAgICBubXBmbGFzaE9iamVjdEpzVXJsOiB0aGlzLm9wdGlvbnMubm1wZmxhc2hPYmplY3RKc1VybCxcbiAgICAgICAgICAgIHdlYlN0cmVhbWluZ1BsYXllckxhdW5jaGVySnNVcmw6IHRoaXMub3B0aW9ucy53ZWJTdHJlYW1pbmdQbGF5ZXJMYXVuY2hlckpzVXJsLFxuICAgICAgICAgICAgbm1wRmxhc2hEaXZJZDogdGhpcy5vcHRpb25zLm5tcEZsYXNoRGl2SWQsXG5cbiAgICAgICAgICAgIG9ubG9hZENhbGxiYWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZih3aW5kb3cub1BsYXllckxhdW5jaGVyKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoY29tbWFuZCA9PSBcImFkZFwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vUGxheWVyTGF1bmNoZXIuYWRkKGNvbW1hU2VwZXJhdGVkVHJhY2tJZHMpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihjb21tYW5kID09IFwicGxheVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vUGxheWVyTGF1bmNoZXIucGxheShjb21tYVNlcGVyYXRlZFRyYWNrSWRzKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYgKGNvbW1hbmQgPT0gXCJvcGVuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vUGxheWVyTGF1bmNoZXIub3BlbigpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSAnbG9hZGVkJyB8fCB0aGlzLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgICAgIGlmICghd2luZG93Lm9QbGF5ZXJMYXVuY2hlcikge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cub1BsYXllckxhdW5jaGVyID0gbmV3IE11c2ljUGxheWVyTGF1bmNoZXIob3B0aW9ucylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzY3JpcHQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cub1BsYXllckxhdW5jaGVyKSB7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9QbGF5ZXJMYXVuY2hlciA9IG5ldyBNdXNpY1BsYXllckxhdW5jaGVyKG9wdGlvbnMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzY3JpcHQuc3JjID0gdGhpcy5vcHRpb25zLm11c2ljUGxheWVyTGF1bmNoZXJVcmw7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgICBpZih3aW5kb3cub1BsYXllckxhdW5jaGVyKXtcbiAgICAgICAgICAgIGlmKGNvbW1hbmQgPT0gXCJhZGRcIil7XG4gICAgICAgICAgICAgICAgd2luZG93Lm9QbGF5ZXJMYXVuY2hlci5hZGQoY29tbWFTZXBlcmF0ZWRUcmFja0lkcyk7XG4gICAgICAgICAgICB9ZWxzZSBpZihjb21tYW5kID09IFwicGxheVwiKXtcbiAgICAgICAgICAgICAgICB3aW5kb3cub1BsYXllckxhdW5jaGVyLnBsYXkoY29tbWFTZXBlcmF0ZWRUcmFja0lkcyk7XG4gICAgICAgICAgICB9ZWxzZSBpZiAoY29tbWFuZCA9PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5vUGxheWVyTGF1bmNoZXIub3BlbigpO1xuICAgICAgICAgICAgfWVsc2V7fVxuICAgICAgICB9XG4gICAgfVxufVxuXG5pZiAoIXdpbmRvdy5QbGF5ZXJNYW5hZ2VyKSB7XG4gICAgd2luZG93LlBsYXllck1hbmFnZXIgPSBuZXcgUGxheWVyTWFuYWdlckNsYXNzKCk7XG59XG5cblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9QbGF5ZXJNYW5hZ2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=');},function(module,exports){eval('/**\n * Created by naver on 9/7/16.\n */\n// var WebStreamingPlayerLauncher = require(\'./sublaunchers/WebStreamingPlayerLauncher\');\n// var NMPLauncher = require(\'./sublaunchers/NMPLauncher\');\n\n/**\n * flash & hls - hybrid launcher\n * @param options\n * @constructor\n */\nfunction MusicPlayerLauncher(options) {\n    this.launcher = null;\n\n    this._inited = false;\n\n    this._init(options);\n}\n\n/**\n * flash, hls 플레이어 런처 선택\n *\n * @param options\n * @returns {*}\n * @private\n */\nMusicPlayerLauncher.prototype._init = function(options) {\n    var self = this;\n\n    var script = document.createElement("script");\n    script.onreadystatechange = function () {\n        if (this.readyState == \'loaded\' || this.readyState == \'complete\') {\n            options.webStreamingPossableAgent = window.checkWebStreamingPossableAgent();\n            self._initLauncher(self, options);\n        }\n    }\n\n    script.onload = function () {\n        options.webStreamingPossableAgent = window.checkWebStreamingPossableAgent();\n        self._initLauncher(self, options);\n    }\n\n    script.src = options.playerLauncherCheckerJsUrl;\n    document.getElementsByTagName("head")[0].appendChild(script);\n}\n\n\n\nMusicPlayerLauncher.prototype._initLauncher = function(self, options) {\n    switch (this._getLauncherTypeForThisBrowser(options.webStreamingPossableAgent)) {\n        case "flash":\n            var script = document.createElement("script");\n            /**\n             * IE style onload check\n             */\n\n\n            script.onreadystatechange = function () {\n                if (this.readyState == \'loaded\' || this.readyState == \'complete\') {\n                    if (self._inited) {\n                        return ;\n                    }\n                    self._inited = true;\n\n                    self.launcher = new NMPLauncher(options);\n                }\n            }\n            /**\n             * Web Standard onload check\n             */\n            script.onload = function () {\n                if (self._inited) {\n                    return ;\n                }\n                self._inited = true;\n\n                self.launcher = new NMPLauncher(options);\n            };\n            script.type= \'text/javascript\';\n            script.charset = "utf-8";\n            script.src = options.nmpLauncherJsUrl;\n            document.getElementsByTagName("head")[0].appendChild(script);\n            break;\n\n        case "web":\n            var script = document.createElement("script");\n            script.onload = function () {\n                if (self._inited) {\n                    return ;\n                }\n                self._inited = true;\n\n                self.launcher = new WebStreamingPlayerLauncher(options);\n                if(!!options.onloadCallback) {\n                    options.onloadCallback();\n                }\n            };\n            script.src = options.webStreamingPlayerLauncherJsUrl;\n            document.getElementsByTagName("head")[0].appendChild(script);\n            break;\n\n        default:\n            return ;\n    }\n}\n\n\n/**\n * 현재 브라우저에 적합한 런처타입 선택\n * @returns {boolean}\n */\nMusicPlayerLauncher.prototype._getLauncherTypeForThisBrowser = function(webStreamingPossableAgent) {\n    if (webStreamingPossableAgent) {\n        return "web";\n    } else {\n        return "flash";\n    }\n}\n\n/**\n * 플레이어 open\n */\nMusicPlayerLauncher.prototype.open = function() {\n    if (!this.launcher) { return; }\n\n    this.launcher.open();\n}\n\n/**\n * 플레이어 open + 재생\n * @param trackIdsCommaSeperateString\n */\nMusicPlayerLauncher.prototype.play = function(trackIdsCommaSeperateString) {\n    if (!this.launcher) { return; }\n\n    if (!trackIdsCommaSeperateString || trackIdsCommaSeperateString.length === 0) {\n        this.launcher.open();\n        return;\n    }\n\n    this.launcher.play(trackIdsCommaSeperateString);\n}\n\n/**\n * 플레이어 open + 곡추가\n * @param trackIdsCommaSeperateString\n */\nMusicPlayerLauncher.prototype.add = function(trackIdsCommaSeperateString) {\n    if (!this.launcher) { return; }\n\n    if (!trackIdsCommaSeperateString || trackIdsCommaSeperateString.length === 0) {\n        this.launcher.open();\n        return;\n    }\n\n    this.launcher.add(trackIdsCommaSeperateString);\n}\n\n\n/**\n * module export\n */\nif (typeof module !== \'undefined\' && typeof module.exports !== \'undefined\'){\n    module.exports = MusicPlayerLauncher;\n}\nif (window !== \'undefined\') {\n    window.MusicPlayerLauncher = MusicPlayerLauncher;\n}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2FwcC9sYXVuY2hlci9NdXNpY1BsYXllckxhdW5jaGVyLmpzPzM3ZGQiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IG5hdmVyIG9uIDkvNy8xNi5cbiAqL1xuLy8gdmFyIFdlYlN0cmVhbWluZ1BsYXllckxhdW5jaGVyID0gcmVxdWlyZSgnLi9zdWJsYXVuY2hlcnMvV2ViU3RyZWFtaW5nUGxheWVyTGF1bmNoZXInKTtcbi8vIHZhciBOTVBMYXVuY2hlciA9IHJlcXVpcmUoJy4vc3VibGF1bmNoZXJzL05NUExhdW5jaGVyJyk7XG5cbi8qKlxuICogZmxhc2ggJiBobHMgLSBoeWJyaWQgbGF1bmNoZXJcbiAqIEBwYXJhbSBvcHRpb25zXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTXVzaWNQbGF5ZXJMYXVuY2hlcihvcHRpb25zKSB7XG4gICAgdGhpcy5sYXVuY2hlciA9IG51bGw7XG5cbiAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuX2luaXQob3B0aW9ucyk7XG59XG5cbi8qKlxuICogZmxhc2gsIGhscyDtlIzroIjsnbTslrQg65+w7LKYIOyEoO2DnVxuICpcbiAqIEBwYXJhbSBvcHRpb25zXG4gKiBAcmV0dXJucyB7Kn1cbiAqIEBwcml2YXRlXG4gKi9cbk11c2ljUGxheWVyTGF1bmNoZXIucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gJ2xvYWRlZCcgfHwgdGhpcy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIG9wdGlvbnMud2ViU3RyZWFtaW5nUG9zc2FibGVBZ2VudCA9IHdpbmRvdy5jaGVja1dlYlN0cmVhbWluZ1Bvc3NhYmxlQWdlbnQoKTtcbiAgICAgICAgICAgIHNlbGYuX2luaXRMYXVuY2hlcihzZWxmLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9wdGlvbnMud2ViU3RyZWFtaW5nUG9zc2FibGVBZ2VudCA9IHdpbmRvdy5jaGVja1dlYlN0cmVhbWluZ1Bvc3NhYmxlQWdlbnQoKTtcbiAgICAgICAgc2VsZi5faW5pdExhdW5jaGVyKHNlbGYsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHNjcmlwdC5zcmMgPSBvcHRpb25zLnBsYXllckxhdW5jaGVyQ2hlY2tlckpzVXJsO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzY3JpcHQpO1xufVxuXG5cblxuTXVzaWNQbGF5ZXJMYXVuY2hlci5wcm90b3R5cGUuX2luaXRMYXVuY2hlciA9IGZ1bmN0aW9uKHNlbGYsIG9wdGlvbnMpIHtcbiAgICBzd2l0Y2ggKHRoaXMuX2dldExhdW5jaGVyVHlwZUZvclRoaXNCcm93c2VyKG9wdGlvbnMud2ViU3RyZWFtaW5nUG9zc2FibGVBZ2VudCkpIHtcbiAgICAgICAgY2FzZSBcImZsYXNoXCI6XG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSUUgc3R5bGUgb25sb2FkIGNoZWNrXG4gICAgICAgICAgICAgKi9cblxuXG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gJ2xvYWRlZCcgfHwgdGhpcy5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuX2luaXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9pbml0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubGF1bmNoZXIgPSBuZXcgTk1QTGF1bmNoZXIob3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXZWIgU3RhbmRhcmQgb25sb2FkIGNoZWNrXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX2luaXRlZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLl9pbml0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5sYXVuY2hlciA9IG5ldyBOTVBMYXVuY2hlcihvcHRpb25zKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzY3JpcHQudHlwZT0gJ3RleHQvamF2YXNjcmlwdCc7XG4gICAgICAgICAgICBzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiAgICAgICAgICAgIHNjcmlwdC5zcmMgPSBvcHRpb25zLm5tcExhdW5jaGVySnNVcmw7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJ3ZWJcIjpcbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5faW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuX2luaXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmxhdW5jaGVyID0gbmV3IFdlYlN0cmVhbWluZ1BsYXllckxhdW5jaGVyKG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGlmKCEhb3B0aW9ucy5vbmxvYWRDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9ubG9hZENhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNjcmlwdC5zcmMgPSBvcHRpb25zLndlYlN0cmVhbWluZ1BsYXllckxhdW5jaGVySnNVcmw7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIO2YhOyerCDruIzrnbzsmrDsoIDsl5Ag7KCB7ZWp7ZWcIOufsOyymO2DgOyehSDshKDtg51cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5NdXNpY1BsYXllckxhdW5jaGVyLnByb3RvdHlwZS5fZ2V0TGF1bmNoZXJUeXBlRm9yVGhpc0Jyb3dzZXIgPSBmdW5jdGlvbih3ZWJTdHJlYW1pbmdQb3NzYWJsZUFnZW50KSB7XG4gICAgaWYgKHdlYlN0cmVhbWluZ1Bvc3NhYmxlQWdlbnQpIHtcbiAgICAgICAgcmV0dXJuIFwid2ViXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiZmxhc2hcIjtcbiAgICB9XG59XG5cbi8qKlxuICog7ZSM66CI7J207Ja0IG9wZW5cbiAqL1xuTXVzaWNQbGF5ZXJMYXVuY2hlci5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghdGhpcy5sYXVuY2hlcikgeyByZXR1cm47IH1cblxuICAgIHRoaXMubGF1bmNoZXIub3BlbigpO1xufVxuXG4vKipcbiAqIO2UjOugiOydtOyWtCBvcGVuICsg7J6s7IOdXG4gKiBAcGFyYW0gdHJhY2tJZHNDb21tYVNlcGVyYXRlU3RyaW5nXG4gKi9cbk11c2ljUGxheWVyTGF1bmNoZXIucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbih0cmFja0lkc0NvbW1hU2VwZXJhdGVTdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMubGF1bmNoZXIpIHsgcmV0dXJuOyB9XG5cbiAgICBpZiAoIXRyYWNrSWRzQ29tbWFTZXBlcmF0ZVN0cmluZyB8fCB0cmFja0lkc0NvbW1hU2VwZXJhdGVTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMubGF1bmNoZXIub3BlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5sYXVuY2hlci5wbGF5KHRyYWNrSWRzQ29tbWFTZXBlcmF0ZVN0cmluZyk7XG59XG5cbi8qKlxuICog7ZSM66CI7J207Ja0IG9wZW4gKyDqs6HstpTqsIBcbiAqIEBwYXJhbSB0cmFja0lkc0NvbW1hU2VwZXJhdGVTdHJpbmdcbiAqL1xuTXVzaWNQbGF5ZXJMYXVuY2hlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24odHJhY2tJZHNDb21tYVNlcGVyYXRlU3RyaW5nKSB7XG4gICAgaWYgKCF0aGlzLmxhdW5jaGVyKSB7IHJldHVybjsgfVxuXG4gICAgaWYgKCF0cmFja0lkc0NvbW1hU2VwZXJhdGVTdHJpbmcgfHwgdHJhY2tJZHNDb21tYVNlcGVyYXRlU3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmxhdW5jaGVyLm9wZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubGF1bmNoZXIuYWRkKHRyYWNrSWRzQ29tbWFTZXBlcmF0ZVN0cmluZyk7XG59XG5cblxuLyoqXG4gKiBtb2R1bGUgZXhwb3J0XG4gKi9cbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgIT09ICd1bmRlZmluZWQnKXtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IE11c2ljUGxheWVyTGF1bmNoZXI7XG59XG5pZiAod2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5NdXNpY1BsYXllckxhdW5jaGVyID0gTXVzaWNQbGF5ZXJMYXVuY2hlcjtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hcHAvbGF1bmNoZXIvTXVzaWNQbGF5ZXJMYXVuY2hlci5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==');}]);MusicPlayer=Class({name:"MusicPlayer",_sFlashDivId:"",__init:function(a){if(a){this._initVar(a);}this._setEvent();},_initVar:function(a){this._sFlashDivId=a.sFlashDivId;PlayerManager.init({nmpFlashDivId:this._sFlashDivId});},_setEvent:function(){var b=$$("._musicPlayerTemplate");for(var a=0;a<b.length;a++){Event.register(b[a],"click",this._onEvent.bindForEvent(this));}},_onEvent:function(a){if(oUtil.checkEvent(a)){oUtil.processEvent(a,this);}},_clickPlayItem:function(b,a){this._playMusicItem(a);},_playMusicItem:function(a){PlayerManager.play(a);},_clickMoveToHelpPage:function(){var a="https://help.naver.com/support/contents/contents.nhn?serviceNo=522&categoryNo=12510";window.open(a);}});if(typeof window.jsCompFileCheckSum=="undefined"){window.jsCompFileCheckSum={};}window.jsCompFileCheckSum.MusicPlayerPack=true;