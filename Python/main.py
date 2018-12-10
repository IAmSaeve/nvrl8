import sys
import MazeGame
import subprocess
import datetime
import json
import requests
from time import sleep, strftime, localtime
from sense_hat import SenseHat
from collections import OrderedDict
from multiprocessing import Process, Queue
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
				t = Thread(sense.show_message(
					strftime("%H:%M", localtime()), scroll_speed=0.06))
				if not t.isAlive():
					t.run()


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
				#alarmTime = datetime.time(Hours, Minutes, 0, 0)
				alarmTime = alarmTime.replace(hour=Hours, minute=Minutes)
				q.put(alarmTime)

				#print("New time is: " + str(alarmTime.hour) + ":" + str(alarmTime.minute))
			except:
				print("Fejl i forbindelse til webservicen")
			sleep(10)


	def checkWinWthinMinute(alarmTime, hasWon):
		#global hasWon
		#print("time is: " + str(alarmTime.hour) + ":" + str(alarmTime.minute))
		currentTime = datetime.datetime.now()
		if hasWon and ((alarmTime.minute > currentTime.minute) or (
				alarmTime.hour > currentTime.hour and alarmTime.minute < currentTime.minute)):
			return False


	def alarm_start(q):
		print("Alarm started\n")
		while True:
			global hasWon, thread0, thread1, thread2
			alarmTime = q.get()
			hasWon = q.get()
			currentTime = datetime.datetime.now()
			#print("\nConditions:\nCurrent time: " + str(currentTime) + "\nHas won: " + str(hasWon) + "\nAlarm time: " + str(alarmTime.hour) + str(alarmTime.minute) + "\n")
			hasWon = checkWinWthinMinute(alarmTime, hasWon)
			if currentTime.hour == alarmTime.hour and currentTime.minute == alarmTime.minute and not hasWon:
				print("Running maze game")
				thread0.terminate()
				game.game_over[0] = False
				subprocess.Popen(["omxplayer ~/Documents/sæve/Project/CrazyFrog.mp3 -o alsa"], shell=True)
				game.game_start()
				hasWon = True
				sense.clear()
			q.put(alarmTime)
			q.put(hasWon)
			sleep(3)

	print("Staring threads...")
	queue = Queue()
	thread0 = Process(target=update_time, args=(queue,))
	thread1 = Process(target=update_alarm, args=(queue,))
	thread2 = Process(target=alarm_start, args=(queue,))
	thread0.start()
	thread1.start()
	thread2.start()
	queue.put(alarmTime)
	queue.put(hasWon)

	while True:
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
		sleep(1)

except KeyboardInterrupt:
	sys.exit()
except Exception as e:
	print("Der opstod en uventet fejl med beskeden:\n" + str(e))

if __name__ == "__main__":
	pass