import numpy as np
def next_move(board):
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
