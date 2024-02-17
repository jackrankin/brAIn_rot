import sys
from bot_ranker import play_two

player1 = sys.argv[1]
player2 = sys.argv[2]
game_name = sys.argv[3]

play_two(player1, player2, game_name)