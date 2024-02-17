import random

def check_winner(board, player):
    # Check horizontal
    for row in range(6):
        for col in range(4):
            if board[row][col] == player and board[row][col+1] == player and board[row][col+2] == player and board[row][col+3] == player:
                return True

    # Check vertical
    for row in range(3):
        for col in range(7):
            if board[row][col] == player and board[row+1][col] == player and board[row+2][col] == player and board[row+3][col] == player:
                return True

    # Check diagonals
    for row in range(3):
        for col in range(4):
            if board[row][col] == player and board[row+1][col+1] == player and board[row+2][col+2] == player and board[row+3][col+3] == player:
                return True
            if board[row][col+3] == player and board[row+1][col+2] == player and board[row+2][col+1] == player and board[row+3][col] == player:
                return True

    return False

def whose_turn(board):
    num_ones = sum(row.count(1) for row in board)
    num_twos = sum(row.count(2) for row in board)
    if num_ones == num_twos:
        return 1  # Player 1's turn
    else:
        return 2  # Player 2's turn

def next_move(board):
    player = whose_turn(board)

    # Check if there's a winning move for the player
    for col in range(7):
        for row in range(6):
            if board[row][col] == 0:
                board[row][col] = player
                if check_winner(board, player):
                    return col
                board[row][col] = 0

    # Check if there's a winning move for the opponent and block it
    opponent = 3 - player  # The opponent's player number
    for col in range(7):
        for row in range(6):
            if board[row][col] == 0:
                board[row][col] = opponent
                if check_winner(board, opponent):
                    board[row][col] = player
                    return col
                board[row][col] = 0

    # If no winning move, choose a random column
    available_moves = [col for col in range(7) if board[0][col] == 0]
    return random.choice(available_moves)