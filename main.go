package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	// echoのインスタンスを作成
	e := echo.New()
	// すべてのリクエストで差し込みたいミドルウェアを設定
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	// 静的ファイルのパスを設定
	e.Static("/assets", "public/assets")
	// htmlファイルの登録
	e.File("/", "public/index.html")
	e.File("/training", "public/training.html")
	e.File("/test", "public/test.html")
	// サーバーの起動
	e.Logger.Fatal(e.Start(":8080"))
}
