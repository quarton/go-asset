go-asset
==========

go-asset creates a Go file that contains a byte slice representing the input text file. This lets you embed an asset into your Go binary.

```
echo "<html>example</html>" | go-asset
```


```
package main

var asset []byte

func init() {
	asset = []byte{0x3c, 0x68, 0x74, 0x6d, 0x6c, 0x3e, 0x65, 0x78, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x3c, 0x2f, 0x68, 0x74, 0x6d, 0x6c, 0x3e, 0xa}
}
```



Installation
------------

Use the Node Package Manager (NPM) to install this module locally or globally.

    $ npm install [-g] go-asset


Usage
-----

```
go-asset: Usage: go-asset [options]
options:
	-h, --help 					Print this help and exit.
	-i, --input=[file|stdin]			Filename to embed or read from stdin.
	-o , --output=[file|stdout]			Go output file or write to stdout.
	-p main, --package=main 			Go package name.
	-v asset, --variable=asset 			Go variable name to contain asset.
```

```
go-asset --input=index.html --output=asset.go
```
