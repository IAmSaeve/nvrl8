from sense_hat import SenseHat
from time import sleep
import subprocess

sense = SenseHat()

r = (255, 0, 0)
b = (0, 0, 0)
w = (255, 255, 255)
g = (218, 165, 32)
ng = (218, 165, 32)
currentMaze = "maze"

x_pos = 1
y_pos = 1

m1x = 1
m1y = 1
maze = [[r, r, r, r, r, r, r, r],
        [r, b, b, b, b, b, b, g],
        [r, r, r, b, r, b, b, r],
        [r, b, r, b, r, r, r, r],
        [r, b, b, b, b, b, b, r],
        [r, b, r, r, r, r, b, r],
        [r, b, b, r, b, b, b, r],
        [r, r, r, r, r, g, r, r]]

m2x = 1
m2y = 1
maze2 = [[r, r, r, r, r, r, r, r],
         [r, b, r, b, b, b, b, r],
         [r, b, r, b, r, b, r, r],
         [r, b, b, b, r, b, g, r],
         [r, b, r, b, r, r, r, r],
         [r, b, r, b, b, b, b, r],
         [r, b, r, b, r, r, b, r],
         [r, r, r, r, r, r, g, r]]

m3x = 2
m3y = 1
maze3 = [[r, r, r, r, b, r, b, r],
         [r, r, b, b, b, b, b, r],
         [r, g, b, r, r, b, r, r],
         [r, r, r, r, r, b, r, r],
         [r, b, b, b, b, b, b, r],
         [r, r, b, r, r, r, r, r],
         [r, r, b, b, b, b, b, b],
         [r, r, r, r, r, r, g, r]]

game_over = False


def check_wall(x, y, new_x, new_y):
    if maze[new_y][new_x] != r:
        return new_x, new_y
    elif maze[new_y][x] != r:
        return x, new_y
    elif maze[y][new_x] != r:
        return new_x, y
    else:
        return x, y


def move_marble(pitch, roll, x, y):
    new_x = x
    new_y = y
    if 1 < pitch < 179 and x != 0:
        new_x -= 1
    elif 181 < pitch < 359 and x != 7:
        new_x += 1
    elif 1 < roll < 179 and y != 7:
        new_y += 1
    elif 181 < roll < 359 and y != 0:
        new_y -= 1
    new_x, new_y = check_wall(x, y, new_x, new_y)
    return new_x, new_y


def game_start():
	global game_over, x_pos, y_pos, maze, maze2, maze3, currentMaze
	while not game_over:
		for event in sense.stick.get_events():
			if event.action == "released":
				game_stop()
		pitch = sense.get_orientation()['pitch']
		roll = sense.get_orientation()['roll']
		x_pos, y_pos = move_marble(pitch, roll, x_pos, y_pos)
		if maze[y_pos][x_pos] == g and currentMaze == "maze":
			#subprocess.Popen(["ps aux | grep omxplayer | grep -v grep | awk '{print $2}' | xargs kill"], shell=True)
			sense.show_message("Level 2")
			maze = maze2
			currentMaze = "maze2"
			x_pos = m2x
			y_pos = m2y
		if maze[y_pos][x_pos] == g and currentMaze == "maze2":
			sense.show_message("Level 3")
			maze2 = maze3
			currentMaze = "maze3"
			x_pos = m3x
			y_pos = m3y
		if maze[y_pos][x_pos] == g and currentMaze == "maze3":
			sense.show_message("Win!!")
			game_over = True
		maze[y_pos][x_pos] = w
		sense.set_pixels(sum(maze, []))
		sleep(0.01)
		maze[y_pos][x_pos] = b
		
def game_stop():
	sense.show_message("Game stopped")
	game_over = true
	maze[y_pos][x_pos] = b
