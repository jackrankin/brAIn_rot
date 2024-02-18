import os
import importlib
import sys
import numpy as np
import time
from collections import defaultdict
import tracemalloc

import games.filler
import games.tron
import games.connect4
import games.rockpaperscissors

games_dictionary = {
	"filler" : games.filler.Filler,
	"connect4" : games.connect4.Connect4,
	"tron" : games.tron.Tron,
	"rockpaperscissors" : games.rockpaperscissors.RPS
}

def get_bot_dict(game):
	folder_path = f"{game}_bots"
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
			if func_name != "next_move":
				continue
			if callable(getattr(module, func_name)):
				bot_functions[module.__name__.split(".")[1]] = getattr(module, func_name)
	return bot_functions

def rank_bot(bot_name, game_name):

	lt = []
	for i in range(0, 100000):
		lt.append(i)

	game_bots = get_bot_dict(game_name)
	bot_wins = defaultdict(int)	
	rank = len(game_bots) - 1

	for bot in game_bots:
		for opp in game_bots:
			opp = game_bots[opp]
			bot = game_bots[bot]
			env = games_dictionary[game_name](bot, opp, False)

			if env.winner == 1:
				bot_wins[bot] += 1
			else:
				bot_wins[opp] += 1

	ranking = sorted(bot_wins.keys(), key = lambda x : -bot_wins[x])
	for i in range(len(ranking)):
		if ranking[i] == bot_name:
			rank = i

	return rank

def get_leaderboard(game_name):
	game_bots = get_bot_dict(game_name)
	
	print(game_name, game_bots)

	bot_wins = defaultdict(int)	
	ranking = {}

	for bot in game_bots:
		for opp in game_bots:
			print(bot, opp)
			opp_func = game_bots[opp]
			bot_func = game_bots[bot]
			env = games_dictionary[game_name](bot_func, opp_func, False)

			if env.winner == 1:
				bot_wins[bot] += 1
			else:
				bot_wins[opp] += 1

	ranks = sorted(bot_wins.keys(), key = lambda x : -bot_wins[x])
	for i in range(len(ranks)):
		ranking[str(i)] = str(ranks[i])
	return ranking

def play_two(your_bot="connect4_random", opp_bot="connect4_random", game_name="connect4"):
	
	yours = f"{game_name}_bots.{your_bot}"
	opp = f"{game_name}_bots.{opp_bot}"
	yours = importlib.import_module(yours)
	opp = importlib.import_module(opp)

	for func_name in dir(yours):
		if callable(getattr(yours, func_name)):
			your_bot = getattr(yours, func_name)

	for func_name in dir(opp):
		if callable(getattr(opp, func_name)):
			opp_bot = getattr(opp, func_name)
	
	result = games_dictionary[game_name](opp_bot, your_bot, False)

	game = {
		'moves' : result.moves,	
		'winner' : result.winner,
	}
	
	return game

def play_two_console(your_bot="connect4_random", opp_bot="connect4_random", game_name="connect4"):
	
	yours = f"{game_name}_bots.{your_bot}"
	opp = f"{game_name}_bots.{opp_bot}"
	yours = importlib.import_module(yours)
	opp = importlib.import_module(opp)

	for func_name in dir(yours):
		if callable(getattr(yours, func_name)):
			your_bot = getattr(yours, func_name)

	for func_name in dir(opp):
		if callable(getattr(opp, func_name)):
			opp_bot = getattr(opp, func_name)
	
	result = games_dictionary[game_name](opp_bot, your_bot, True)
	print(result)
	game = {
		'moves' : result.moves,	
		'winner' : result.winner,
	}
	
	return game