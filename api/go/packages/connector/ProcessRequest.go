package connector

import (
	"encoding/json"
	"net/http"
	"chess/packages/engine"
)

func ProcessRequest(w http.ResponseWriter, r *http.Request) {
	// Add CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Post method allowed only! Wrong method used", http.StatusMethodNotAllowed)
		return
	}

	var boardState [8][8]*engine.Piece
	err := json.NewDecoder(r.Body).Decode(&boardState)
	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	engine.PrintBoardState(boardState)

	response := ResponseData{
		Message: "Board state received successfully",
		Status:  "success",
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
