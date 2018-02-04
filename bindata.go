package web

//go:generate go-bindata -pkg=web -o=bindata_gen.go -ignore="index\.bundle\.js\.map" build/...
var Prefix = "build"
