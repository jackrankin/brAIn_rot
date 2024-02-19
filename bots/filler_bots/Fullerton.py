# Write an algorithm to find the next best move for filler.
# You are given a 2D array board filled with integers 1-8.
import numpy as np
def next_move(board, whoami):
	s = {board[0][7] if whoami == 2 else board[7][0]}
	return np.random.choice(list({1,2,3,4,5,6,7,8} ^ s))








