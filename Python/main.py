from MazeGame import game_start, game_stop
import subprocess

from sense_hat import SenseHat
sense = SenseHat()

#subprocess.Popen(["omxplayer ~/Documents/sæve/Project/CrazyFrog.mp3 -o alsa"], shell=True)
game_start()

for event in sense.stick.get_events():
	if event.action == "released":
		game_stop()