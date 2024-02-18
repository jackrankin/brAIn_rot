from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from bot_ranker import play_two, get_leaderboard

app = Flask(__name__)
CORS(app)

@app.route('/two_play/<player1>/<player2>/<game_name>', methods=['GET'])
def two_play(player1, player2, game_name):
	result = play_two(player1, player2, game_name)
	return jsonify(result)

@app.route('/leaderboard/<game_name>', methods=['GET'])
def leaderboard(game_name):
	result = get_leaderboard(game_name)
	return jsonify(result)

@app.route('/get_rank/<game_name>/<bot_name>', methods=['GET'])
def get_rank(game_name, bot_name):
	result = get_leaderboard(game_name)
	for key in result:
		if result[key] == bot_name:
			return {"rank" : str(key)}
	return {}

@app.route('/', methods=['GET'])
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)