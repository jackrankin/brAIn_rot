import os
import importlib
import sys
import numpy as np
import time
from collections import defaultdict

# the games
import games.filler
import games.tron
import games.connect4

games_dictionary = {
	"filler" : games.filler.Filler,
	"connect4" : games.connect4.Connect4,
	"tron" : games.tron.Tron
}

def get_bot_dict(game):
    folder_path = f"./{game}_bots"

    files = [f for f in os.listdir(folder_path) if f.endswith(".py") and f != "__init__.py"]

    bot_functions = {}

    for file_name in files:
        module_name = f"{game}_bots.{file_name[:-3]}"
        
        try:
            module = importlib.import_module(module_name)
        except ImportError as e:
            print(f"Error importing module {module_name}: {e}")
            continue

        for func_name in dir(module):
            if callable(getattr(module, func_name)):
                bot_functions[func_name] = getattr(module, func_name)

    return bot_functions

def rank_bot(bot, game_name):
	game_bots = get_bot_dict(game_name)
	rank = len(game_bots)

	for bot in game_bots:
		opp = game_bots[bot]
		env = games_dictionary[game_name]()
		



