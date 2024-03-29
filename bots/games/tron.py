import time
import numpy as np
from collections import defaultdict

class Tron(object):
	def __init__(self, player1, player2, render):
		self.p1 = player1
		self.p2 = player2
		self.p1trail = set([(9,2)])
		self.p2trail = set([(9,18)])
		self.dirs = [(0,1), (1,0), (0,-1), (-1,0)]
		self.color_map = {1 : '🟦', 2 : '🟥', 0 : '⬜️'}
		self.board = [[0] * 20 for _ in range(20)]
		self.p1c = [9, 2]
		self.p2c = [9, 18]
		self.board[9][2] = 1
		self.board[9][18] = 2
		self.render = render
		if render:
			for i in range(21):
				print()
		self.winner = 0
		self.moves = []
		self.init_game()

	def _detect_loss(self):
		dead1 = 0
		dead2 = 0
		if (self.p1c[0], self.p1c[1]) in (self.p1trail | self.p2trail) or self.p1c[0] in {-1, 20} or self.p1c[1] in {-1, 20}:
			dead1 = 1
		if (self.p2c[0], self.p2c[1]) in (self.p1trail | self.p2trail) or self.p2c[0] in {-1, 20} or self.p2c[1] in {-1, 20}:
			dead2 = 2
		return dead1 + dead2

	def _play_move(self):
		move1 = self.p1(self.board, self.p1c, self.p2c)
		move2 = self.p2(self.board, self.p2c, self.p1c)

		self.p1c[0] += self.dirs[move1][0]
		self.p1c[1] += self.dirs[move1][1]
		self.p2c[0] += self.dirs[move2][0]
		self.p2c[1] += self.dirs[move2][1]
		if move1 < 0 or move1 > 3:
			self.winner = 2
			return 
		if move2 < 0 or move2 > 3:
			self.winner = 1
			return 
		loss = self._detect_loss()
		if not loss:
			self.board[self.p1c[0]][self.p1c[1]] = 1
			self.p1trail.add((self.p1c[0], self.p1c[1]))
			self.board[self.p2c[0]][self.p2c[1]] = 2
			self.p2trail.add((self.p2c[0], self.p2c[1]))
		return loss 

	def _render(self):
		# this will clear the screen 
		LINE_UP = '\033[1A'
		LINE_CLEAR = '\x1b[2K'
		for i in range(21):
			print(LINE_UP, end=LINE_CLEAR)
		for i in self.board:
			arr = []
			for color in i:
				arr.append(self.color_map[color])
			print(" ".join(arr))
		print()

	def _json_render(self):
		b = [	]
		for i in self.board:
			arr = []
			for color in i:
				arr.append(self.color_map[color])
			b.append(" ".join(arr))

		self.moves.append("\n".join(b))

	def init_game(self):
		loss = 0
		while not loss and not self.winner:
			loss = self._play_move()
			if self.render:
				time.sleep(0.5)
				self._render()
			else:
				self._json_render()
		if loss == 1:
			self.winner = 2
		elif loss == 2:
			self.winner = 1

		# print(self.winner)
