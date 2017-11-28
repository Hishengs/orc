cls
@echo off
set DEBUG=ORC:*,-not_this
supervisor -w app,index.js,boot.js index.js
