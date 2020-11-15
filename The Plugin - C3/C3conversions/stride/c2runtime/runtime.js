// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.Stride = function(runtime)
{
	this.runtime = runtime;
};


(function ()
{
	var pluginProto = cr.plugins_.Stride.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	var strRuntime = null;
	var strInst = null;
	var strideapi = null;
	
	var getGameDataResponse='';
	var defaultPlayerData = '';
	var badgeList = '';
	var sessionSeconds = 60;
	var highScore = 0;
	var enableSound = 1;
	var playerName = '';
	var gender = '';
	var gradeLevel = 0;
	var ethnicity = '';
	
	var getGameDataCallback = function(result)
	{
		// Save the returned data
		getGameDataResponse = result;
		if (getGameDataResponse == null) getGameDataResponse = "";

		// Activate related trigger
		strRuntime.trigger(cr.plugins_.Stride.prototype.cnds.strOnGetGameData, strInst);
	}

	var timerDoneCallback = function()
	{
		// Activate related trigger
		strRuntime.trigger(cr.plugins_.Stride.prototype.cnds.strOnTimerDone, strInst);
	}
	
	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		
		// any other properties you need, e.g...
		// this.myValue = 0;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
		strRuntime = this.runtime;
		strInst = this;

		strideapi = {
			parentFunc: function(funcName) {
			var hasParent = window.parent && window.parent != window;
			return hasParent? window.parent["stridegame"][funcName] : function() {};
			}
		}
		
		// tell strideapi that we are alive, and get sessionTime and default playerData
		var result = strideapi.parentFunc('start')();
		
		if (!result)
			return;
		
		defaultPlayerData = result["playerData"];
		if (defaultPlayerData == null) defaultPlayerData = "";
		sessionSeconds = result["sessionTime"];
		highScore = result["highScore"];
		if (result["enableSound"])
			 enableSound = 1;
		else enableSound = 0;
		playerName = result["playerName"];
		gender = result["gender"];
		gradeLevel = result["gradeLevel"];
		ethnicity = result["ethnicity"];
		
		if (result["badges"]!=null)
		{	for (var i=0;i<result["badges"].length;i++)
			{	badgeList = badgeList + result["badges"][i]["name"] + ",";
			}
			badgeList = badgeList.substr(0,badgeList.length-1);
		}

	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	// ... other conditions here ...
	
	Cnds.prototype.strOnGetGameData = function ()
	{
		return true;
	};
	
	Cnds.prototype.strOnTimerDone = function ()
	{
		return true;
	};

	Cnds.prototype.strIsSoundEnabled = function ()
	{
		if (enableSound)
			 return true;
		else return false;
	};

	
	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	// To cause game to exit
	Acts.prototype.strExit = function ()
	{
        strideapi.parentFunc('exit')();
	};
	
	// To submit player score
	Acts.prototype.strSubmitGameScore = function (points_, highscore_)
	{
		strideapi.parentFunc('submitGameScore')(points_, highscore_);
	};

	Acts.prototype.strSetGameData = function(key_, value_)
	{
		strideapi.parentFunc('setGameData')(key_, value_);
	};
	
	Acts.prototype.strGetGameData = function(key_)
	{
		strideapi.parentFunc('getGameData')(key_, getGameDataCallback);
	};
	
	Acts.prototype.strStartTimer = function(showmessage_)
	{
		if (showmessage_)
			strideapi.parentFunc('startTimer')(timerDoneCallback, true);
		else
			strideapi.parentFunc('startTimer')(timerDoneCallback, false);
	};
	
	Acts.prototype.strStopTimer = function()
	{
		strideapi.parentFunc('stopTimer')();
	};

	Acts.prototype.strAwardBadge = function(badgename_)
	{
		strideapi.parentFunc('awardBadge')(badgename_);
	};


	// ... other actions here ...
	
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};
	
	// ... other expressions here ...

	Exps.prototype.sessionSeconds = function (ret)
	{
		ret.set_int(sessionSeconds);
	};
	
	Exps.prototype.highScore = function (ret)
	{
		ret.set_int(highScore);
	};

	Exps.prototype.defaultGameData = function (ret)
	{
		ret.set_string(defaultPlayerData);
	};

	Exps.prototype.gameData = function (ret)
	{
		ret.set_string(getGameDataResponse);
	};

	Exps.prototype.badgeList = function (ret)
	{
		ret.set_string(badgeList);
	};

	Exps.prototype.enableSound = function (ret)
	{
		ret.set_int(enableSound);
	};
	
	Exps.prototype.playerName = function (ret)
	{
		ret.set_string(playerName);
	};

	Exps.prototype.gender = function (ret)
	{
		ret.set_string(gender);
	};
	
	Exps.prototype.gradeLevel = function (ret)
	{
		ret.set_int(gradeLevel);
	};

	Exps.prototype.ethnicity = function (ret)
	{
		ret.set_string(ethnicity);
	};

	pluginProto.exps = new Exps();

}());