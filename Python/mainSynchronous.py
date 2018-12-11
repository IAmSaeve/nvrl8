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
			goTimeArray = str(dataArray["goTime"]).split(
				":")  # goTime er nøglen i arrayet
			awakeTimeArray = str(dataArray["awakeTime"]).split(
				":")  # awakeTime er nøglen i arrayet
			goTime = datetime.time(int(goTimeArray[0]), int(goTimeArray[1]), 0, 0)
			awakeTime = datetime.time(int(awakeTimeArray[0]), int(awakeTimeArray[1]), 0, 0)

			hour = goTime.hour
			minute = goTime.minute
			for _ in range(0, awakeTime.hour):
				if hour == 0:
					hour = 24
				hour -= 1
			for _ in range(0, awakeTime.minute):
				if minute == 0:
					if hour == 0:
						hour = 23
					else:
						hour -= 1
					minute = 60
				minute -= 1
			alarmTime = alarmTime.replace(hour=hour, minute=minute)
			print("New time is: " + str(alarmTime))
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
