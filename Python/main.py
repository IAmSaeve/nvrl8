import MazeGame
import subprocess
import datetime
import json
import requests
import asyncio
from time import sleep, strftime, localtime
from sense_hat import SenseHat
from collections import OrderedDict
from multiprocessing import Process
from threading import Thread

sense = SenseHat()

# Data der skal læses fra databasen
# : alarmTime, tripTime, tripDelay, canceledBool
# Data der skal sendes til databasen
# : currentDate, timeToCompleteMaze (mm:ss:ms)


# subprocess.Popen(["omxplayer ~/Documents/sæve/Project/CrazyFrog.mp3 -o alsa"], shell=True)

# format 2018-07-29 09:17:13.812189 for klokken

currentTime = datetime.datetime.now()  # Nuværende tid
Hours = 00  # Prevents exception
Minutes = 00  # Prevents exception
alarmTime = datetime.time(Hours, Minutes, 0, 0)


def update_time():
	while True:
		print("Updating time.")
		global currentTime
		currentTime = datetime.datetime.now()
		if not MazeGame.GetGameState():  # Returnerer game_over
			#print(localtime())
			print(str(currentTime) + "\n")
			t = Thread(sense.show_message(strftime("%H:%M", localtime()), scroll_speed=0.06))
			if not t.isAlive():
				t.run()


def update_alarm():
	while True:
		print("Updating alarm.\n")
		global Hours, Minutes
		#response = requests.get("https://nvrl8-ws.azurewebsites.net/api/setting/")  # API kald
		#dataArray = json.loads(response.text, object_pairs_hook=OrderedDict)  # Gemmer json data som OrderedDict
		#timeArray = str(dataArray["goTime"]).split(":")  # goTime er nøglen i arrayet
		#Hours = int(timeArray[0])
		#Minutes = int(timeArray[1])
		#print("New time is: " + dataArray["goTime"])
		sleep(10)
	# sleep(60)


def alarm_start():
	print("Alarm started\n")
	while True:
		if currentTime.hour == alarmTime.hour and currentTime.minute == alarmTime.minute:
			loop = asyncio.get_event_loop()  # Async loop
			cors = asyncio.wait([MazeGame.game_start()])  # Tilføj flere funktioner med komma
			loop.run_until_complete(cors)


processes = [
	update_alarm,
	update_time,
	alarm_start
]

for process in processes:
	Process(target=process).start()
