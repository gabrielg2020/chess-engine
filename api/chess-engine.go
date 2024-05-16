package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type ResponseData struct {
	Message string `json:"message"`
	Status string `json:"status"`
}

func processHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Post method allowed only! Wrong method used", http.StatusMethodNotAllowed)
	}

	var requestData ResponseData // for testing both request and response are the same struct
	err := json.NewDecoder(r.Body).Decode(&requestData)
	if err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	fmt.Println(requestData.Message)

	responseData := ResponseData {
		Message: "Hello JS",
		Status: "success",
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(responseData)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/", processHandler)

	fmt.Println("Server is listening on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))

	fmt.Println("Hello World!")
}