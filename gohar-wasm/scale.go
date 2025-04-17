//go:build js && wasm

package main

import (
	"fmt"
	"syscall/js"

	"github.com/ArnaudCalmettes/gohar"
	"github.com/ArnaudCalmettes/gohar/lib/abc"
)

type ScaleSchema struct {
	RootName  string
	ScaleName string
	ABCNotes  []any
	NoteNames []any
}

func NewScaleSchema(root gohar.Pitch, pattern gohar.ScalePattern) any {
	var s ScaleSchema
	var err error
	if s.RootName, err = gohar.NoteName(gohar.DefaultPitchClass(root)); err != nil {
		panic(fmt.Errorf("NewScaleSchema: %w", err))
	}
	if s.ScaleName, err = gohar.ScalePatternName(pattern); err != nil {
		panic(fmt.Errorf("NewScaleSchema: %w", err))
	}
	notes := ScalePatternNotesFrom(pattern, root)
	s.ABCNotes = make([]any, 0, 12)
	s.NoteNames = make([]any, 0, 12)
	for _, n := range notes {
		s.ABCNotes = append(s.ABCNotes, js.ValueOf(abc.NoteToABC(n)))
		name, _ := gohar.NoteName(n.PitchClass)
		s.NoteNames = append(s.NoteNames, js.ValueOf(name))
	}

	return js.ValueOf(map[string]any{
		"rootName":  js.ValueOf(s.RootName),
		"scaleName": js.ValueOf(s.ScaleName),
		"ABCNotes":  js.ValueOf(s.ABCNotes),
		"NoteNames": js.ValueOf(s.NoteNames),
	})
}

func ScalePatternNotesFrom(pattern gohar.ScalePattern, root gohar.Pitch) []gohar.Note {
	notes := make([]gohar.Note, 0, 12)
	rootPC := gohar.DefaultPitchClass(root)
	rootBase := rootPC.Base()
	for pc := range pattern.PitchClasses(rootPC) {
		n := gohar.Note{PitchClass: pc}
		if pc.Base() < rootBase {
			n.Oct = 1
		}
		notes = append(notes, n)
	}
	return notes
}
