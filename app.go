package main

import (
	"context"
	"fmt"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"os"
	"strconv"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) ListDir(d string) []string {
	entries, err := os.ReadDir(d)
	var res []string
	if err != nil {
		fmt.Println(err)
	}
	for i, e := range entries {
		res = append(res, strconv.Itoa(i)+"_"+e.Name())
	}
	return res
}

func (a *App) PickDir() string {
	res, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select a folder",
	})
	if err != nil {
		fmt.Println(err)
	}
	return res
}
