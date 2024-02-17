from rockpaperscissors import RPS
from rockpaperscissors import random_agent

def other_agent():
    return 'P'

# you pass in two agents that both take in the game array and 
# make a move assuming that it is their turn.
for i in range(4): print()
RPS(random_agent, other_agent)