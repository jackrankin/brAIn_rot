import time
import numpy as np
from collections import defaultdict

class Filler(object):
	def __init__(self, player1, player2, render):
		self.p1 = player1
		self.p2 = player2
		self.p1set = set([(0,7)])
		self.p2set = set([(7,0)])
		self.turn = 1
		self.dirs = [(0,1), (1,0), (0,-1), (-1,0)]
		self.color_map = {1 : '🟥', 2 : '🟧', 3 : '🟨', 4 : '🟩', 5 : '🟦', 6 : '🟪', 7 : '⬜️', 8 : '🟫'}
		self.board = [[0] * 8 for _ in range(8)]
		for i in range(8):
			for j in range(8):
				self.board[i][j] = np.random.choice(np.arange(1,9))
		self.p1c = self.board[0][7] 
		self.p2c = self.board[7][0]
		self.render = render
		if render:
			for i in range(9):print()
		self.winner = 0

		self.moves = []
		self.init_game()

	def _detect_win(self):
		colors = defaultdict(int)
		for i in range(len(self.board)):
			for j in range(len(self.board[0])):
				colors[self.board[i][j]] += 1
		if len(colors) > 2:
			return 0
		if colors[self.p1c] > colors[self.p2c]:
			return 1
		elif colors[self.p1c] < colors[self.p2c]:
			return 2
		return -1

	def _update_board(self, player_set, new_color):
		vis = set()
		def dfs(i, j):
			if -1 in {i, j} or 8 in {i, j} or (i,j) in vis:
				return 
			if self.board[i][j] != new_color and (i,j) not in player_set:
				return
			if self.board[i][j] == new_color and (i,j) not in player_set:
				player_set.add((i,j))
			elif (i,j) in player_set:
				self.board[i][j] = new_color
			vis.add((i,j))
			for dx, dy in self.dirs:
				dfs(i + dx, j + dy)
		for i, j in player_set.copy():
			dfs(i,j)

	def _play_move(self):
		color = None
		if self.turn == 1:
			while color == None or color == self.p2c:
				color = self.p1(self.board, 1)
			self.p1c = color
			self._update_board(self.p1set, color)
		else:
			while color == None or color == self.p1c:
				color = self.p2(self.board, 2)
			self.p2c = color
			self._update_board(self.p2set, color)
		self.turn = 3 - self.turn 
		return self._detect_win()

	def _render(self):

		# this will clear the screen 
		LINE_UP = '\033[1A'
		LINE_CLEAR = '\x1b[2K'
		for i in range(9):
			print(LINE_UP, end=LINE_CLEAR)
		for i in self.board:
			arr = []
			for color in i:
				arr.append(self.color_map[color])
			print("".join(arr))
		print()

	def _json_render(self):
		b = []

		for i in self.board:
			arr = []
			for color in i:
				arr.append(self.color_map[color])
			b.append("".join(arr))

		self.moves.append("\n".join(b))

	def init_game(self):
		win = 0
		while not win:
			self._play_move()
			if self.render: 
				self._render()
				time.sleep(0.3)
			else:
				self._json_render()
			win = self._detect_win()
		if win == 1:
			self.winner = 1
		elif win == 2:
			self.winner = 2

