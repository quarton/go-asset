var dashdash	= require('dashdash');
var fs 			= require("fs")

var options = [
    {
        names: ['help', 'h'],
        type: 'bool',
        help: 'Print this help and exit.'
    },
    {
        names: ['input', 'i'],
        type: 'string',
        help: 'Filename to embed or read from stdin',
        default: 'stdin',
        helpArg: '[file|stdin]'
    },
    {
        names: ['output', 'o'],
        type: 'string',
        help: 'Go output file or write to stdout',
        default: 'stdout',
        helpArg: '[file|stdout]'
    },
    {
        names: ['package', 'p'],
        type: 'string',
        help: 'Go package name',
        default: 'main',
        helpArg: 'main'
    },
    {
        names: ['variable', 'v'],
        type: 'string',
        help: 'Go variable name to contain asset',
        default: 'asset',
        helpArg: 'asset'
    }

];

var parser = dashdash.createParser({options: options});
try {
    var opts = parser.parse(process.argv);
    var args = opts._args;
} catch (e) {
    console.error('go-asset: error: %s', e.message);
    process.exit(1);
}

if (opts.help) {
    var help = parser.help().trimRight();
    console.log("go-asset: Usage: go-asset [options]\n" + "options:\n" + help);
    process.exit(0);
}

if (opts.input == 'stdin') {
	var file = fs.readFileSync(0, "utf8")
}else{
	var file = fs.readFileSync(opts.input, "utf8")
}

var buf = Buffer.from(file, 'utf8');

var out = ""
if (buf.length > 0){
	for (var i = 0; i < buf.length; i++) {
		out += '0x'+ buf[i].toString(16) + ', ';
	}
	out = out.substring(0, out.length-2);
}
out = 'package '+opts.package+'\n\nvar '+opts.variable+' []byte\n\nfunc init() {\n\t'+opts.variable+' = []byte{'+out+'}\n}\n'

if (opts.output == 'stdout') {
	process.stdout.write(out);
}else{
	fs.writeFileSync(opts.output, out, "utf8")
}
