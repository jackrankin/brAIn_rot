from flask import Flask, jsonify
from bot_ranker import play_two, get_leaderboard

app = Flask(__name__)

@app.route('/two_play/<player1>/<player2>/<game_name>')
def two_play(player1, player2, game_name):
	result = play_two(player1, player2, game_name)
	return jsonify(result)


@app.route('/leaderboard/<game_name>')
def leaderboard(game_name):
	result = get_leaderboard(game_name)
	return jsonify(result)

@app.route('/', methods=['GET'])
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)