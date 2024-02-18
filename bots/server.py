from flask import Flask, jsonify
from bot_ranker import play_two

app = Flask(__name__)

@app.route('/two_play/<player1>/<player2>/<game_name>', methods=['GET'])
def two_play(player1, player2, game_name):
	result = play_two(player1, player2, game_name)
	return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)