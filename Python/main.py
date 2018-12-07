import sys
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

# currentTime = datetime.datetime.now()  # Nuværende tid
Hours = 11  # Prevents exception
Minutes = 19  # Prevents exception
alarmTime = datetime.time(Hours, Minutes, 0, 0)

try:
	def update_time():
		while True:
			try:
				print("Updating time.")
				print("Game state is: " + str(MazeGame.GetGameState()))
				currentTime = datetime.datetime.now()
				if MazeGame.GetGameState():  # Returnerer game_over
					# print(localtime())
					print(str(currentTime) + "\n")
					t = Thread(sense.show_message(
						strftime("%H:%M", localtime()), scroll_speed=0.06))
					if not t.isAlive() and MazeGame.GetGameState():
						t.run()
			except KeyboardInterrupt:
				sys.exit()


	def update_alarm():
		while True:
			print("Updating alarm.\n")
			global Hours, Minutes
			try:
				response = requests.get(
					"http://nvrl8.azurewebsites.net/api/setting/")  # API kald
				# Gemmer json data som OrderedDict
				dataArray = json.loads(response.text, object_pairs_hook=OrderedDict)
				timeArray = str(dataArray["goTime"]).split(
					":")  # goTime er nøglen i arrayet
				Hours = int(timeArray[0])
				Minutes = int(timeArray[1])
				print("New time is: " + dataArray["goTime"])
			except KeyboardInterrupt:
				sys.exit()
			except:
				print("Fejl i forbindelse til webservicen")
			sleep(10)


	def alarm_start():
		print("Alarm started\n")
		while True:
			try:
				currentTime = datetime.datetime.now()
				print("Hour data: " + str(currentTime.hour) + " " + str(alarmTime.hour))
				print("Hour data: " + str(currentTime.minute) + " " + str(alarmTime.minute))
				if currentTime.hour == alarmTime.hour and currentTime.minute == alarmTime.minute:
					print("Maze")
					MazeGame.game_start()
				sleep(3)
			except KeyboardInterrupt:
				sys.exit()


	processes = [
		# update_alarm,
		update_time,
		alarm_start
	]

	for process in processes:
		Process(target=process).start()

except KeyboardInterrupt:
	sys.exit()
