from collections import defaultdict
import numpy as np
import time

class Connect4:
	def __init__(self, player1, player2, render):
		self.p1 = player1
		self.p2 = player2
		self.board = [[0] * 7 for _ in range(6)]
		self.turn = 1
		self.render = True
		self.init_game()

	def _detect_win(self):
		ans = 0
		dp = defaultdict(lambda : [1,1,1])
		back_dp = defaultdict(lambda : [1,1,1])
		for i in range(len(self.board)):
			for j in range(len(self.board[0])):
				if self.board[i][j]:
					if i and j and self.board[i][j] == self.board[i-1][j-1]:
						dp[(i,j)][0] = dp[(i-1,j-1)][0] + 1
					if j and self.board[i][j] == self.board[i][j-1]:
						dp[(i,j)][1] = dp[(i,j-1)][1] + 1
					if i and self.board[i][j] == self.board[i-1][j]:
						dp[(i,j)][2] = dp[(i-1,j)][2] + 1
					if 4 in dp[(i,j)]:
						return self.board[i][j]
				back_i = i
				back_j = j - 1
				if self.board[back_i][back_j]:
					if i and self.board[back_i][back_j] == self.board[back_i-1][back_j+1]:
						back_dp[(back_i,back_j)][0] = back_dp[(back_i-1,back_j+1)][0] + 1
					if i and self.board[back_i][back_j] == self.board[back_i-1][back_j]:
						back_dp[(back_i,back_j)][1] = back_dp[(back_i-1,back_j)][1] + 1
					if self.board[back_i][back_j] == self.board[back_i][back_j+1]:
						back_dp[(back_i,back_j)][2] = back_dp[(back_i,back_j+1)][2] + 1
					if 4 in back_dp[(back_i,back_j)]:
						return self.board[back_i][back_j]
		return 0

	def _play_move(self):
		col = None
		if self.turn == 1:
			col = self.p1(self.board)
		else:
			col = self.p1(self.board)
		for i in range(len(self.board)):
			if self.board[i][col] == 0:
				self.board[i][col] = self.turn
				break
		self.turn = 3 - self.turn
		return self._detect_win()

	def _render(self):
		# clears teh lines
		LINE_UP = '\033[1A'
		LINE_CLEAR = '\x1b[2K'
		for i in range(6):
			print(LINE_UP, end=LINE_CLEAR)

		for i in self.board[::-1]:
			arr = []
			for char in i:
				if char == 2:
					arr.append("🔴")
				elif char == 1:
					arr.append("🔵")
				else:
					arr.append("⚪️")
			print("".join(arr))

	def init_game(self):
		win = 0
		while not win:

			self._play_move()
			if self.render:
				time.sleep(1)
				self._render()
			win = self._detect_win()
			if win:
				print("PLAYER", win, "HAS WON")

def random_agent(board):
	poss = []
	for i in range(len(board[0])):
		s = 0
		for j in range(len(board)):
			s += board[j][i] == 0
		if s:
			poss.append(i)
	if not poss:
		return -1
	return np.random.choice(poss)

