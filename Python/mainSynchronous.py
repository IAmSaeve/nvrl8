import sys
import MazeGame
import subprocess
import datetime
import json
import requests
from time import sleep, strftime, localtime
from sense_hat import SenseHat
from collections import OrderedDict
from multiprocessing import Process, Queue, Pipe
from threading import Thread

# Data der skal læses fra databasen
# : maze.alarmTime, tripTime, tripDelay, canceledBool
# Data der skal sendes til databasen
# : currentDate, timeToCompleteMaze (mm:ss:ms)

sense = SenseHat()
game = MazeGame
hasWon = False
alarmTime = datetime.time(0,0,0,0)

try:
	def checkwinwithinminute(alarmTime):
		global hasWon
		currentTime = datetime.datetime.now()
		if hasWon and ((alarmTime.minute > currentTime.minute) or (
				alarmTime.hour > currentTime.hour and alarmTime.minute < currentTime.minute)):
			hasWon = False

	while True:
		print("Updating time.")
		currentTime = datetime.datetime.now()
		if game.game_over[0]:  # Returnerer game_over
			print(str(currentTime) + "\n")
			sense.show_message(strftime("%H:%M", localtime()), scroll_speed=0.06)

		print("Updating alarm.")
		try:
			response = requests.get(
				"http://nvrl8.azurewebsites.net/api/setting/")  # API kald
			# Gemmer json data som OrderedDict
			dataArray = json.loads(response.text, object_pairs_hook=OrderedDict)
			timeArray = str(dataArray["goTime"]).split(
				":")  # goTime er nøglen i arrayet
			Hours = int(timeArray[0])
			Minutes = int(timeArray[1])
			alarmTime = alarmTime.replace(hour=Hours, minute=Minutes)
		except Exception as e:
			print("Fejl i forbindelse til webservicen\n" + str(e))

		print("Checking time and alarm time")
		currentTime = datetime.datetime.now()
		checkwinwithinminute(alarmTime)
		if currentTime.hour == alarmTime.hour and currentTime.minute == alarmTime.minute and not hasWon:
			print("Running maze game")
			game.game_over[0] = False
			subprocess.Popen(["omxplayer ~/Documents/sæve/Project/CrazyFrog.mp3 -o alsa"], shell=True)
			game.game_start()
			hasWon = True
			sense.clear()

except KeyboardInterrupt:
	sys.exit()
except Exception as e:
	print("Der opstod en uventet fejl med beskeden:\n" + str(e))

if __name__ == "__main__":
	print("Stuck in main")
	pass
