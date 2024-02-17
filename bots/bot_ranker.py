import os
import importlib
import sys
import numpy as np
import time
from collections import defaultdict

import games.filler


def rank_bot(bot, game):
	folder_path = "./" + game + "_bots"

	files = [f[:-3] for f in os.listdir(folder_path) if f.endswith(".py") and f != "__init__.py"]

	for file_name in files:
		module_name = f"{game}_bots.{file_name}"
		module = importlib.import_module(module_name)
		for func_name in dir(module):
			if callable(getattr(module, func_name)):
				globals()[func_name] = getattr(module, func_name)


def random_agent(board):
	return np.random.choice(np.arange(1, 9))

# you pass in two agents that both take in the game array and 
# make a move assuming that it is their turn.
for i in range(8): print()

games.filler.Filler(random_agent, random_agent, True)
rank_bot(None, "filler")
