from MazeGame import game_start, game_stop
import subprocess
import datetime
import json
import requests
from sense_hat import SenseHat

#format 2018-07-29 09:17:13.812189 for klokken
currentTime = datetime.datetime.now()



sense = SenseHat()

#https://www.pythonforbeginners.com/requests/using-requests-in-python
#response = requests.get("https://jsonplaceholder.typicode.com/todos") # fetch json fra api
#todos = json.loads(response.text) # json object

#subprocess.Popen(["omxplayer ~/Documents/sæve/Project/CrazyFrog.mp3 -o alsa"], shell=True)
game_start()

