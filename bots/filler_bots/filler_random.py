import numpy as np
def next_move(board, whoami):
	s = {board[0][7] if whoami == 2 else board[7][0]}
	# print(s, whoami)
	return np.random.choice(list({1,2,3,4,5,6,7,8} ^ s))