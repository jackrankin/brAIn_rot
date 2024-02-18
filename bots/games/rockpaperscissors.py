import numpy as np
import time

class RPS(object):
	def __init__(self, player1, player2, render):
		self.p1 = player1
		self.p2 = player2
		self.score1 = 0
		self.score2 = 0
		self.render = render
		self.map = {'R' : '🪨', 'S' : '✂️', 'P' : '📄'}
		self.winner = 0
		self.init_game()

	def _detect_win(self):
		if self.score1 == 2:
			return 1
		elif self.score2 == 2:
			return 2
		return 0

	def _play_move(self):
		ans1 = self.p1()
		ans2 = self.p2()
		self.last1 = ans1
		self.last2 = ans2
		if ans1 == 'R' and ans2 == 'P':
			self.score2 += 1
		elif ans1 == 'P' and ans2 == 'S':
			self.score2 += 1
		elif ans1 == 'S' and ans2 == 'R':
			self.score2 += 1
		elif ans2 == 'R' and ans1 == 'P':
			self.score1 += 1
		elif ans2 == 'P' and ans1 == 'S':
			self.score1 += 1
		elif ans2 == 'S' and ans1 == 'R':
			self.score1 += 1
		else:
			if np.random.choice([0,1]):
				self.score1 += 1
			else:
				self.score2 += 1

	def _render(self):
		# clears the last result
		LINE_UP = '\033[1A'
		LINE_CLEAR = '\x1b[2K'
		for i in range(4):
			print(LINE_UP, end=LINE_CLEAR)

		print(self.map[self.last1], " VS ", self.map[self.last2])
		print("SCOREBOARD: ")
		print("P1:", self.score1)
		print("P2:", self.score2)

	def init_game(self):
		while not self._detect_win():
			self._play_move()
			if self.render:
				time.sleep(1)
				self._render()
	
		if self.score1 == 1000:
			self.winner = 1
		else:
			self.winner = 2

