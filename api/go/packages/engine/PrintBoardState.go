package engine

import "fmt"

func PrintBoardState(boardState [8][8]*Piece) {
	fmt.Print("\033[H\033[2J")
	for i := 0; i < 8; i++ {
		for j := 0; j < 8; j++ {
			if boardState[i][j] != nil {
				fmt.Printf("%s%s ", boardState[i][j].Color, boardState[i][j].Type)
			} else {
				fmt.Print("[] ")
			}
		}
		fmt.Println()
	}

	fmt.Println("")
}