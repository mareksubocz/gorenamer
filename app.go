package main

import (
	"context"
	"fmt"
	"github.com/tobychui/goHidden"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"os"
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

func (a *App) ListDir(d string, showHidden bool) []string {
	entries, err := os.ReadDir(d)
	res := []string{} // Initialize as empty slice (not nil)
	if err != nil {
		fmt.Println(err)
		return res
	}
	for _, e := range entries {

		if !showHidden {
			fullPath := d + string(os.PathSeparator) + e.Name()
			hidden, err := hidden.IsHidden(fullPath, false)
			if err != nil {
				fmt.Println(err)
				return res
			}
			if hidden {
				continue
			}
		}
		res = append(res, e.Name())
	}
	return res
}

func (a *App) PickDir() string {
	res, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select a folder",
	})
	if err != nil {
		fmt.Println(err)
		return ""
	}
	return res
}
