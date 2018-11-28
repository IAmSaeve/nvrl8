import MazeGame
import subprocess
import datetime
import json
import requests
import asyncio
from time import sleep, strftime, localtime
from sense_hat import SenseHat

sense = SenseHat()

# https://www.pythonforbeginners.com/requests/using-requests-in-python
# response = requests.get("https://jsonplaceholder.typicode.com/todos") # fetch json fra api
# todos = json.loads(response.text) # json object

# Data der skal læses fra databasen
# : alarmTime, tripTime, tripDelay, canceledBool
# Data der skal sendes til databasen
# : currentDate, timeToCompleteMaze (mm:ss:ms)


# subprocess.Popen(["omxplayer ~/Documents/sæve/Project/CrazyFrog.mp3 -o alsa"], shell=True)

# format 2018-07-29 09:17:13.812189 for klokken
currentTime = datetime.datetime.now()  # Nuværende tid

alarmTime = datetime.time(14, 19, 0, 0)


async def update_time():
    while True:
        global currentTime
        currentTime = datetime.datetime.now()
        await asyncio.sleep(1)
        if MazeGame.GetGameState() == True:  # Returnerer game_over
            print(localtime())
            print(currentTime)
            sense.show_message(strftime("%H:%M", localtime()), scroll_speed=0.06)


async def alarm_start():
    while True:
        print(currentTime.hour)
        print(alarmTime.hour)
        if currentTime.hour == alarmTime.hour and currentTime.minute == alarmTime.minute:
            eloop = asyncio.get_event_loop()  # Async loop
            corss = asyncio.wait([MazeGame.game_start()])  # Tilføj flere funktioner med komma
            loop.run_until_complete(corss)


loop = asyncio.get_event_loop()  # Async loop
cors = asyncio.wait([update_time(),alarm_start()])  # Tilføj flere funktioner med komma
loop.run_until_complete(cors)
