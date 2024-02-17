import numpy as np
import os
import importlib

def rank_bot(bot, game):
	rank = float('inf')

	directory = "./" + game + "_bots"

	for filename in os.listdir(directory):
		f = os.path.join(directory, filename)
		if os.path.isfile(f):
			opp_bot = importlib.import_module(f) 
			print(dir(opp_bot))


	return rank

rank_bot(None, "filler")