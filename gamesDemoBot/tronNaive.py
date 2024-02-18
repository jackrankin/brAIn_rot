import random

def next_move(board, row, col):
    #0, 1, 2, or 3
    #right, down, left, and up
    dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    valid_moves = []

    # Check each direction
    for direction in dirs:
        new_row = row + direction[0]
        new_col = col + direction[1]

        # Check if the new position is within the board boundaries and is a free space
        if 0 <= new_row < len(board) and 0 <= new_col < len(board[0]) and board[new_row][new_col] == 0:
            valid_moves.append(direction)

    if valid_moves:
        # If there are valid moves, randomly select one
        chosen_direction = random.choice(valid_moves)
        return dirs.index(chosen_direction)
    else:
        # If there are no valid moves, return a random direction
        return random.randint(0, 3)