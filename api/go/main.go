package main

import (
	"fmt"
	"log"
	"net/http"
	"chess/packages/connector"
)

func main() {
	http.HandleFunc("/", connector.ProcessRequest)
	fmt.Println("Server is listening on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
