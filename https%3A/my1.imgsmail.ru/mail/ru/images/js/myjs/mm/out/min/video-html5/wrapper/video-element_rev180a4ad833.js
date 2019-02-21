define(["jquery","base/event","util/helpers","video-html5/quality-selector","video-html5/storage"],function(a,b,c,d,e){"use strict";var f=b.extend({props:{defaultOptions:{delayAfterSetQuality:2e3}},public:{init:function(a){return this.options=c.extend(!0,{},this.defaultOptions,a),this.$video=this.options.$video,this.video=this.$video.get(0),this.initVideo(),this},initVideo:function(){this.currentQuality=this.getVideoQuality(),this.currentQuality&&(this.video.src=this.currentQuality.src,this.options.time>0&&this.$video.off("loadeddata").on("loadeddata",function(){this.seek(this.options.time)}.bind(this))),this.options.onReady()},getId:function(){return"video"},setQuality:function(a){var b=this.video.currentTime,c=this.video.paused===!1;this.currentQuality=this.getQualityByIndex(a),this.video.src=this.currentQuality.src,this.video.load(),this.$video.off("loadeddata").on("loadeddata",function(){this.video.pause(),this._newQualityLoad=!0,this.$video.trigger("video.qualityChanged",[this.currentQuality.name,a]),setTimeout(function(){this._newQualityLoad=!1,this.video.currentTime=b,this.options.stat.send({name:"click.seek"},!0),c&&this.video.play()}.bind(this),this.options.delayAfterSetQuality)}.bind(this)),e.setParam("quality",a)},isPaused:function(){return this.video.paused},play:function(){this.started=!0,this.video.play()},pause:function(){this.video.pause()},seek:function(a){this.video.currentTime=a},isSeeking:function(){return this.video.seeking},getCurrentTime:function(){return this.video.currentTime},getDuration:function(){return this.video.duration},setVolume:function(a){this.video&&(this.video.volume=a)},getVolume:function(){return this.video.volume},getCdn:function(){return this.video.src.match(/cdn\d+/)[0]},getBufferedPercent:function(){var a=0;return this.video.buffered.length>0&&(a=this.video.buffered.end(0)/(this.getDuration()/100)),a},destroy:function(){this.candy&&(this.candy.destroy(),delete this.candy),f.__super__.destroy.call(this)}},protected:{getVideoQuality:function(){return d.getVideoQuality(this.options.qualityList,this.options.external)},getQualityByIndex:function(a){return d.getQualityByIndex(this.options.qualityList,a)}}});return f});