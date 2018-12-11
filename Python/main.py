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
	def update_time(q):
		while True:
			print("Updating time.")
			currentTime = datetime.datetime.now()
			if game.game_over[0]:  # Returnerer game_over
				print(str(currentTime) + "\n")
				t = Process(target=sense.show_message(
					strftime("%H:%M", localtime()), scroll_speed=0.06))
				if not t.is_alive():
					t.start()
				elif not game.game_over[0]:
					t.terminate()
			if not game.game_over[0]:
				break
		print("Ending update time process")


	def update_alarm(q):
		while True:
			print("Updating alarm.")
			try:
				alarmTime = q.get()
				response = requests.get(
					"http://nvrl8.azurewebsites.net/api/setting/")  # API kald
				# Gemmer json data som OrderedDict
				dataArray = json.loads(response.text, object_pairs_hook=OrderedDict)
				timeArray = str(dataArray["goTime"]).split(
					":")  # goTime er nøglen i arrayet
				Hours = int(timeArray[0])
				Minutes = int(timeArray[1])
				alarmTime = alarmTime.replace(hour=Hours, minute=Minutes)
				q.put(alarmTime)
			except Exception as e:
				print("Fejl i forbindelse til webservicen\n" + str(e))
			sleep(10)


	def checkWinWithinMinute(alarmTime):
		global hasWon
		currentTime = datetime.datetime.now()
		if hasWon and ((alarmTime.minute > currentTime.minute) or (
				alarmTime.hour > currentTime.hour and alarmTime.minute < currentTime.minute)):
			hasWon = False


	def alarm_start(q, conn0):
		print("Alarm started\n")
		while True:
			print("Checking time and alarm time")
			global hasWon
			alarmTime = q.get()
			currentTime = datetime.datetime.now()
			checkWinWithinMinute(alarmTime)
			if currentTime.hour == alarmTime.hour and currentTime.minute == alarmTime.minute and not hasWon:
				print("Running maze game")
				conn0.send("playing")
				#thread0.terminate()
				game.game_over[0] = False
				subprocess.Popen(["omxplayer ~/Documents/sæve/Project/CrazyFrog.mp3 -o alsa"], shell=True)
				game.game_start()
				hasWon = True
				conn0.send(hasWon)
				sense.clear()
			conn0.send(hasWon)
			q.put(alarmTime)
			sleep(3)

	print("Staring threads...")
	queue = Queue()
	parent_conn0, child_conn0 = Pipe()
	thread0 = Process(target=update_time, args=(queue,))
	thread1 = Process(target=update_alarm, args=(queue,))
	thread2 = Process(target=alarm_start, args=(queue, child_conn0))
	thread0.start()
	thread1.start()
	thread2.start()
	queue.put(alarmTime)


	while True:
		if parent_conn0.recv() == "playing":
			print("Killing thread0")
			thread0.terminate()
			hasWon = False

		if type(parent_conn0.recv()) is bool:
			hasWon = parent_conn0.recv()
		else:
			hasWon = False
		print("HasWon is: " + str(hasWon))
		if not thread0.is_alive() and hasWon:
			print("Starting thread0 with pid: " + str(thread0.pid))
			thread0.run()
		elif thread0.is_alive():
			print("Thread0 is alive with pid: " + str(thread0.pid))
		if not thread1.is_alive() and hasWon:
			print("Starting thread1 with pid: " + str(thread1.pid))
			thread1.run()
		elif thread1.is_alive():
			print("Thread1 is alive with pid: " + str(thread1.pid))
		if not thread2.is_alive():
			print("Starting thread2 with pid: " + str(thread2.pid))
			thread2.run()
		elif thread2.is_alive():
			print("Thread2 is alive with pid: " + str(thread2.pid))


except KeyboardInterrupt:
	sys.exit()
except Exception as e:
	print("Der opstod en uventet fejl med beskeden:\n" + str(e))

if __name__ == "__main__":
	print("Stuck in main")
	pass