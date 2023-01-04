/**
**
**	Compile this with
** 	> GOARCH=wasm GOOS=js go build -o lib.wasm sxg_lib.go
**	then, Copy lib.wasm to the chrome_extension directory
**
 */

package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"syscall/js"
	"time"
	"github.com/WICG/webpackage/go/signedexchange"

	"github.com/WICG/webpackage/go/signedexchange/version"
)

func initCertFetcher() (signedexchange.CertFetcher, error) {
	certFetcher := signedexchange.DefaultCertFetcher
	return certFetcher, nil
}

type Response struct {
	Url     string `json:"url"`
	Payload string `json:"payload"`
	Err     string `json:"error"`
	Result  int    `json:"result"`
}

func verify(url string, rnd string) {

	var ch = make(chan string, 1)
	var errCh = make(chan error, 1)
	var done = make(chan bool, 1)

	go func() {

		var latestVersion = string(version.AllVersions[len(version.AllVersions)-1])
		var in io.Reader
		var stdoutLogger = log.New(os.Stdout, "ERROR: ", 0)
		var e *signedexchange.Exchange
		ver, ok := version.Parse(latestVersion)

		if !ok {
			ch <- string("")
			errCh <- fmt.Errorf("failed to parse version ")
		} else {

			client := http.DefaultClient
			req, err := http.NewRequest("GET", url, nil)
			if err != nil {
				ch <- string("")
				errCh <- err

			} else {
				mimeType := ver.MimeType()
				req.Header.Add("Accept", mimeType)
				resp, err := client.Do(req)
				if err != nil {
					ch <- string("")
					errCh <- err
				} else {
					in = resp.Body
					defer resp.Body.Close()
					e, err = signedexchange.ReadExchange(in)
					if err != nil {
						ch <- string("")
						errCh <- err
					} else {
						certFetcher, err := initCertFetcher()
						if err != nil {
							ch <- string("")
							errCh <- err
						} else {
							verificationTime := time.Now()
							decodedPayload, ok := e.Verify(verificationTime, certFetcher, stdoutLogger)
							if !ok {
								ch <- string("")
								errCh <- fmt.Errorf("The exchange doesn't have a valid signature")
							} else {
								ch <- string(decodedPayload)
								errCh <- nil
							}
						}

					}

				}

			}

		}
		done <- true

	}()

	<-done
	err := <-errCh
	payload := <-ch

	assignValue := func(this js.Value, i []js.Value) interface{} {

		var f *Response
		if i[0].Int() == 0 {

			f = &Response{Url: url, Payload: "", Err: i[1].String(), Result: 0}

		} else {

			f = &Response{Url: url, Payload: i[1].String(), Err: "", Result: 1}

		}

		p, _ := json.Marshal(f)
		obj := js.Global().Get("JSON").Call("parse", string(p))

		js.Global().Get("window").Call("assignSXGResult", obj, rnd)
		return 0
	}

	js.Global().Set("assignValue", js.FuncOf(assignValue))

	if err != nil {
		args := []js.Value{js.ValueOf(0), js.ValueOf(err.Error())}
		var x js.Value
		assignValue(x, args)
	} else {
		args := []js.Value{js.ValueOf(1), js.ValueOf(payload)}
		var x js.Value
		assignValue(x, args)
	}

}

func verifySignature(this js.Value, i []js.Value) interface{} {

	// go verify("http://localhost/example/index.sxg")
	fmt.Println(i[1].String() )
	go verify(i[0].String(), i[1].String())

	return 0
}

func main() {
	c := make(chan bool)
	js.Global().Set("verifySignature", js.FuncOf(verifySignature))
	<-c
}
