package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gocv.io/x/gocv"
	"image"
	"image/color"
	"log"
	"os"
	"path"
	"sync"
	"time"
)

var (
	err           error
	webcam        *gocv.VideoCapture
	frame_id      int
	faceAlgorithm = "algorithm/haarcascade_frontalface_default.xml"
	frame         []byte
	mutex         = &sync.Mutex{}
	blue          = color.RGBA{0, 0, 255, 0}
	green         = color.RGBA{0, 255, 0, 0}
	red           = color.RGBA{255, 0, 0, 0}
	imageDataPath = "data"
)

func main() {

	router := gin.Default()

	if len(os.Args) < 2 {
		webcam, err = gocv.VideoCaptureDevice(0)
	} else {
		fmt.Println(">> file/url :: " + os.Args[1])
		webcam, err = gocv.VideoCaptureFile(os.Args[1])
	}

	if err != nil {
		fmt.Printf("Error opening capture device: \n")
		return
	}

	defer webcam.Close()

	go captureVideo()

	router.GET("/video", func(c *gin.Context) {

		c.Header("Content-Type", "multipart/x-mixed-replace; boundary=frame")
		data := ""
		for {
			mutex.Lock()
			data = "--frame\r\n  Content-Type: image/jpeg\r\n\r\n" + string(frame) + "\r\n\r\n"
			mutex.Unlock()
			time.Sleep(33 * time.Millisecond)
			gin.ResponseWriter.Write(c.Writer, []byte(data))
		}
	})

	err2 := router.Run(":8080")
	if err2 == nil {
		fmt.Println("Server is running -  http://localhost:8080/")
	}

}

func captureVideo() {
	img := gocv.NewMat()
	defer img.Close()

	window := gocv.NewWindow("Face recognition")
	defer window.Close()

	classifier := gocv.NewCascadeClassifier()
	classifier.Load(faceAlgorithm)
	defer classifier.Close()

	for {
		if ok := webcam.Read(&img); !ok || img.Empty() {
			log.Printf("unable to read from web cam ")
			continue
		}

		frame_id++
		rects := classifier.DetectMultiScale(img)
		for _, r := range rects {
			imgFace := img.Region(r)
			_, err := os.Stat(imageDataPath)
			if os.IsNotExist(err) {
				errDir := os.MkdirAll(imageDataPath, 0755)
				if errDir != nil {
					log.Fatal(err)
				}
			}
			imgName := fmt.Sprintf(path.Join("./"+imageDataPath+"/%d.jpg"), time.Now().UnixNano())
			gocv.IMWrite(imgName, imgFace)
			imgFace.Close()
			text := "Who are you?"
			size := gocv.GetTextSize(text, gocv.FontHersheyPlain, 3, 2)
			pt := image.Pt(r.Min.X+(r.Min.X/2)-(size.X/2), r.Min.Y-2)
			gocv.PutText(&img, text, pt, gocv.FontHersheyPlain, 3, red, 2)
			gocv.Rectangle(&img, r, green, 2)
			frame, _ = gocv.IMEncode(".jpg", img)
		}
		window.IMShow(img)
		window.WaitKey(200)
	}
}
