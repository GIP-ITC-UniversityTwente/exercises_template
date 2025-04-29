Prism.languages.mapfile = {
	'comment': {
		pattern: /(^|[^\\])#.*/,
		lookbehind: true,
		greedy: true
	},
  'constant': /\"(ows|wms|wfs|gml)_.*?\"|\"map\"/,
	'string': {
		pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
		greedy: true
	},
	'string-interpolation': {
		pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
		greedy: true,
		inside: {
			'interpolation': {
				// "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
				pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
				lookbehind: true,
				inside: {
					'format-spec': {
						pattern: /(:)[^:(){}]+(?=\}$)/,
						lookbehind: true
					},
					'conversion-option': {
						pattern: /![sra](?=[:}]$)/,
						alias: 'punctuation'
					},
					rest: null
				}
			},
			'string': /[\s\S]+/
		}
	},
  'variable': /\b(?:_(?=\s*:)|ALIGN|ALPHACOLOR|ANCHORPOINT|ANGLE|ANTIALIAS|BACKGROUNDCOLOR|BUFFER|CENTER|CHARACTER|CLASSGROUP|CLASSITEM|COLOR|COLORRANGE|CONFIG|CONNECTION|CONNECTIONTYPE|DATA|DEBUG|DRIVER|DUMP|EMPTY|ENCODING|ERROR|EXPRESSION|EXTENSION|EXTENT|FILLED|FILTER|FILTERITEM|FONT|FONTSET|FOOTER|FORCE|FORMATOPTION|FROM|GAP|GEOMTRANSFORM|GRATICULE|GRID|GRIDSTEP|GROUP|HEADER|IMAGE|IMAGECOLOR|IMAGEMODE|IMAGEPATH|IMAGEQUALITY|IMAGETYPE|IMAGEURL|INCLUDE|INDEX|INITIALGAP|INTERVALS|ITEMS|KEYIMAGE|KEYSIZE|KEYSPACING|LABELCACHE_MAP_EDGE_BUFFER|LABELCACHE|LABELFORMAT|LABELITEM|LABELMAXSCALEDENOM|LABELMINSCALEDENOM|LABELREQUIRES|LABELSIZEITEM|LATLON|LINECAP|LINEJOIN|LINEJOINMAXSIZE|LOG|MARKER|MARKERSIZE|MASK|MAXARCS|MAXBOXSIZE|MAXDISTANCE|MAXFEATURES|MAXINTERVAL|MAXLENGTH|MAXOVERLAPANGLE|MAXSCALE|MAXSCALEDENOM|MAXSIZE|MAXSUBDIVIDE|MAXTEMPLATE|MAXWIDTH|MIMETYPE|MINARCS|MINBOXSIZE|MINDISTANCE|MINFEATURESIZE|MININTERVAL|MINSCALE|MINSCALEDENOM|MINSIZE|MINSUBDIVIDE|MINTEMPLATE|MINWIDTH|NAME|OFFSET|OFFSITE|OPACITY|OUTLINECOLOR|OUTLINEWIDTH|PARTIALS|POLAROFFSET|POSITION|POSTLABELCACHE|PRIORITY|PROCESSING|QUERYFORMAT|REPEATDISTANCE|REQUIRES|RESOLUTION|SCALE|SHADOWCOLOR|SHADOWSIZE|SHAPEPATH|SIZE|SIZEUNITS|STATUS|STYLEITEM|SYMBOLSCALE|SYMBOLSCALEDENOM|SYMBOLSET|TABLE|TEMPLATE|TEMPLATEPATTERN|TEXT|TILEINDEX|TILEITEM|TITLE|TO|TOLERANCE|TOLERANCEUNITS|TRANSFORM|TRANSPAREN|TYPE|UNITS|WIDTH|WRAP)\b/,
  'keyword': /\b(?:)CLASS|COMPOSITE|END|FEATURE|JOIN|LABEL|LAYER|LEADER|LEGEND|MAP|METADATA|OUTPUTFORMAT|PATTERN|POINTS|PROJECTION|QUERYMAP|REFERENCE|SCALEBAR|STYLE|SYMBOL|VALIDATION|WEB\b/,
  'function': /\b(?:)AUTO|AUTO2|BEVEL|BITMAP|BUTT|CC|CIRCLE|CL|CR|CSV|DD|DEFAULT|ELLIPSE|EMBED|FALSE|FEET|FOLLOW|GIANT|HATCH|HILITE|INCHES|KILOMETERS|LARGE|LC|LINE|LL|LR|MEDIUM|METERS|MILES|MITER|MULTIPLE|MYGIS|NORMAL|OFF|OGR|ON|ONE-TO-MANY|ONE-TO-ONE|ORACLESPATIAL|PIXELS|PIXMAP|PNG24|POINT|POLYGON|POSTGIS|QUERY|RASTER|ROUND|RGB|RGBA|SDE|SELECTED|SIMPLE|SINGLE|SMALL|SQUARE|TINY|TRUE|TRUETYPE|UC|UL|UR|VECTOR|WFS|WMS\b/,
  'number': {
		pattern: RegExp(
			/(^|[^\w$])/.source +
			'(?:' +
			(
				// constant
				/NaN|Infinity/.source +
				'|' +
				// binary integer
				/0[bB][01]+(?:_[01]+)*n?/.source +
				'|' +
				// octal integer
				/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
				'|' +
				// hexadecimal integer
				/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
				'|' +
				// decimal bigint
				/\d+(?:_\d+)*n/.source +
				'|' +
				// decimal number (integer or float) but no bigint
				/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
			) +
			')' +
			/(?![\w$])/.source
		),
		lookbehind: true
	}
};

Prism.languages.mapfile['string-interpolation'].inside['interpolation'].inside.rest = Prism.languages.mapfile;
Prism.languages.map = Prism.languages.mapfile;
