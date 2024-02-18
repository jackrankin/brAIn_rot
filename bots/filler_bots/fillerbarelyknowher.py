import random

def next_move(board, player):
    if player == 1:
        start_row = 0
        start_col = 7
    else:
        start_row = 7
        start_col = 0
    
    edges = find_island_and_border(board, start_row, start_col)
    occurrence_map = count_occurrences(edges)
    exclude_player_number = board[0][7] if player == 2 else board[7][0]
    exclude_opponent_number = board[0][7] if player == 1 else board[7][0]
    return find_max_occurrence(occurrence_map, exclude_player_number, exclude_opponent_number)


def dfs(grid, start_row, start_col, visited, target, island_cells):
    if (
        start_row < 0
        or start_row >= len(grid)
        or start_col < 0
        or start_col >= len(grid[0])
        or grid[start_row][start_col] != target
        or (start_row, start_col) in visited
    ):
        return

    visited.add((start_row, start_col))
    island_cells.add((start_row, start_col))

    dfs(grid, start_row + 1, start_col, visited, target, island_cells)
    dfs(grid, start_row - 1, start_col, visited, target, island_cells)
    dfs(grid, start_row, start_col + 1, visited, target, island_cells)
    dfs(grid, start_row, start_col - 1, visited, target, island_cells)


def find_island(grid, start_row, start_col):
    visited = set()
    island_cells = set()
    target = grid[start_row][start_col]
    dfs(grid, start_row, start_col, visited, target, island_cells)
    return island_cells


def find_border(grid, island_cells):
    border_cells = set()
    for row, col in island_cells:
        for dr, dc in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            r, c = row + dr, col + dc
            if (
                r < 0
                or r >= len(grid)
                or c < 0
                or c >= len(grid[0])
                or (r, c) not in island_cells
            ):
                border_cells.add((r, c))
    return border_cells


def find_border_elements(grid, island_cells, start_row, start_col):
    border_elements = {}
    for row, col in find_border(grid, island_cells):
        if row >= 0 and col >= 0 and col < len(grid[0]) and row < len(grid):  # Check if row and col are non-negative
            if grid[row][col] != grid[start_row][start_col]:
                border_elements[(row, col)] = grid[row][col]
    return border_elements


def find_island_and_border(grid, start_row, start_col):
    island_cells = find_island(grid, start_row, start_col)
    border_elements = find_border_elements(grid, island_cells, start_row, start_col)
    return border_elements

def count_occurrences(result):
    occurrence_map = {}
    for element in result.values():
        occurrence_map[element] = occurrence_map.get(element, 0) + 1
    return occurrence_map

def find_max_occurrence(occurrence_map, exclude_number=None, exclude_number2=None):
    max_key = None
    max_value = float('-inf')

    for key, value in occurrence_map.items():
        if key != exclude_number and value > max_value:
            max_key = key
            max_value = value

    if max_key is None:  # If no valid max_key found, return None
        possible_values = [key for key in occurrence_map.keys() if key != exclude_number and key != exclude_number2]
        if possible_values:
            return random.choice(possible_values)
        else:
            return None

    return max_key

