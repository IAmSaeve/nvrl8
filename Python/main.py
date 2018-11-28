from MazeGame import game_start, game_stop
import subprocess
import datetime
import json
import requests
import asyncio
from time import sleep
from sense_hat import SenseHat

sense = SenseHat()

#https://www.pythonforbeginners.com/requests/using-requests-in-python
#response = requests.get("https://jsonplaceholder.typicode.com/todos") # fetch json fra api
#todos = json.loads(response.text) # json object

#subprocess.Popen(["omxplayer ~/Documents/sæve/Project/CrazyFrog.mp3 -o alsa"], shell=True)


#format 2018-07-29 09:17:13.812189 for klokken
currentTime = datetime.datetime.now() #Nuværende tid

async def updateTime():
	global currentTime
	currentTime = datetime.datetime.now()
	await asyncio.sleep(1)

loop = asyncio.get_event_loop() #Async loop
cors = asyncio.wait([updateTime(),game_start()]) #Tilføj flere funktioner med komma
loop.run_until_complete(cors)

