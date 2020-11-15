"use strict";

{
	const SDK = self.SDK;

	const PLUGIN_CLASS = SDK.Plugins.Stride;

	PLUGIN_CLASS.Type = class StrideType extends SDK.ITypeBase
	{
		constructor(sdkPlugin, iObjectType)
		{
			super(sdkPlugin, iObjectType);
		}
	};
}
